"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const DEFAULT_WARNING_MS = 2 * 60 * 1000;

export default function IdleLogout({
  logoutHref,
  timeoutMs = DEFAULT_IDLE_TIMEOUT_MS,
  warningMs = DEFAULT_WARNING_MS,
}: {
  logoutHref: string;
  timeoutMs?: number;
  warningMs?: number;
}) {
  const [showWarning, setShowWarning] = useState(false);
  const warningTimerRef = useRef<number | null>(null);
  const logoutTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (warningTimerRef.current) window.clearTimeout(warningTimerRef.current);
    if (logoutTimerRef.current) window.clearTimeout(logoutTimerRef.current);
    warningTimerRef.current = null;
    logoutTimerRef.current = null;
  }, []);

  const schedule = useCallback(() => {
    clearTimers();
    setShowWarning(false);

    const warningDelay = Math.max(timeoutMs - warningMs, 0);

    warningTimerRef.current = window.setTimeout(() => {
      setShowWarning(true);
    }, warningDelay);

    logoutTimerRef.current = window.setTimeout(() => {
      window.location.href = logoutHref;
    }, timeoutMs);
  }, [clearTimers, logoutHref, timeoutMs, warningMs]);

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"];

    const onActivity = () => {
      if (!showWarning) schedule();
    };

    schedule();
    events.forEach((eventName) => window.addEventListener(eventName, onActivity, { passive: true }));

    return () => {
      clearTimers();
      events.forEach((eventName) => window.removeEventListener(eventName, onActivity));
    };
  }, [clearTimers, schedule, showWarning]);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[100] mx-auto max-w-md px-4">
      <div className="rounded-2xl border border-amber-200 bg-white p-4 shadow-2xl">
        <p className="text-sm font-bold text-slate-900">Sessão quase encerrando</p>
        <p className="mt-1 text-sm text-slate-600">
          Por segurança, sua sessão será encerrada por inatividade em instantes.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={schedule}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700"
          >
            Continuar conectado
          </button>
          <a
            href={logoutHref}
            className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-50"
          >
            Sair agora
          </a>
        </div>
      </div>
    </div>
  );
}
