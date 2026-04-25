"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const DEFAULT_WARNING_MS = 2 * 60 * 1000;
const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"] as const;
const IDLE_LOGOUT_STORAGE_KEY = "reciclativa:idle-logout";

type IdleLogoutProps = {
  logoutHref: string;
  timeoutMs?: number;
  warningMs?: number;
};

function formatTime(ms: number) {
  const totalSeconds = Math.max(Math.ceil(ms / 1000), 0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function withReason(href: string, reason: "idle" | "manual") {
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}reason=${reason}`;
}

export default function IdleLogout({
  logoutHref,
  timeoutMs = DEFAULT_IDLE_TIMEOUT_MS,
  warningMs = DEFAULT_WARNING_MS,
}: IdleLogoutProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [remainingMs, setRemainingMs] = useState(warningMs);
  const warningTimerRef = useRef<number | null>(null);
  const logoutTimerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  const logoutAtRef = useRef<number>(Date.now() + timeoutMs);
  const isWarningVisibleRef = useRef(false);

  const idleLogoutHref = useMemo(() => withReason(logoutHref, "idle"), [logoutHref]);
  const manualLogoutHref = useMemo(() => withReason(logoutHref, "manual"), [logoutHref]);

  const clearTimers = useCallback(() => {
    if (warningTimerRef.current) {
      window.clearTimeout(warningTimerRef.current);
    }
    if (logoutTimerRef.current) {
      window.clearTimeout(logoutTimerRef.current);
    }
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
    }

    warningTimerRef.current = null;
    logoutTimerRef.current = null;
    countdownIntervalRef.current = null;
  }, []);

  const logoutByIdle = useCallback(() => {
    try {
      window.localStorage.setItem(IDLE_LOGOUT_STORAGE_KEY, String(Date.now()));
    } catch {
      // Ignora bloqueios de storage do navegador.
    }

    window.location.replace(idleLogoutHref);
  }, [idleLogoutHref]);

  const startCountdown = useCallback(() => {
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
    }

    const updateRemaining = () => {
      const nextRemaining = Math.max(logoutAtRef.current - Date.now(), 0);
      setRemainingMs(nextRemaining);

      if (nextRemaining <= 0) {
        logoutByIdle();
      }
    };

    updateRemaining();
    countdownIntervalRef.current = window.setInterval(updateRemaining, 1000);
  }, [logoutByIdle]);

  const schedule = useCallback(() => {
    clearTimers();
    isWarningVisibleRef.current = false;
    setShowWarning(false);
    setRemainingMs(warningMs);

    const warningDelay = Math.max(timeoutMs - warningMs, 0);
    logoutAtRef.current = Date.now() + timeoutMs;

    warningTimerRef.current = window.setTimeout(() => {
      isWarningVisibleRef.current = true;
      setShowWarning(true);
      startCountdown();
    }, warningDelay);

    logoutTimerRef.current = window.setTimeout(logoutByIdle, timeoutMs);
  }, [clearTimers, logoutByIdle, startCountdown, timeoutMs, warningMs]);

  useEffect(() => {
    const onActivity = () => {
      // Depois que o aviso aparece, exigimos clique explícito em "Continuar conectado".
      // Isso evita cancelar o aviso por movimento involuntário do mouse.
      if (!isWarningVisibleRef.current) {
        schedule();
      }
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === IDLE_LOGOUT_STORAGE_KEY && event.newValue) {
        window.location.replace(idleLogoutHref);
      }
    };

    schedule();
    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, onActivity, { passive: true });
    });
    window.addEventListener("storage", onStorage);

    return () => {
      clearTimers();
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, onActivity);
      });
      window.removeEventListener("storage", onStorage);
    };
  }, [clearTimers, idleLogoutHref, schedule]);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/20 px-4 py-5 sm:items-center">
      <div className="w-full max-w-md rounded-3xl border border-amber-200 bg-white p-5 shadow-2xl">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">
          Sessão quase encerrando
        </p>
        <h2 className="mt-2 text-xl font-black text-slate-950">
          Ainda está por aqui?
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Por segurança, sua sessão será encerrada por inatividade em{" "}
          <strong className="font-black text-slate-950">{formatTime(remainingMs)}</strong>.
        </p>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={schedule}
            className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
          >
            Continuar conectado
          </button>
          <a
            href={manualLogoutHref}
            className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-center text-sm font-bold text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
          >
            Sair agora
          </a>
        </div>
      </div>
    </div>
  );
}
