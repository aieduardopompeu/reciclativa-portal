"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "reciclativa_cookie_consent_v1";
// valores: "accepted" | "rejected"
type ConsentValue = "accepted" | "rejected";

function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {}
}

function getConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // só exibe se ainda não houve escolha
    const existing = getConsent();
    if (!existing) setVisible(true);
  }, []);

  function accept() {
    setConsent("accepted");
    // Se GA estiver presente, tentamos atualizar consent (não quebra se não existir)
    try {
      // @ts-expect-error - window.gtag pode não existir
      window.gtag?.("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    } catch {}
    setVisible(false);
  }

  function reject() {
    setConsent("rejected");
    try {
      // @ts-expect-error - window.gtag pode não existir
      window.gtag?.("consent", "update", {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Cookies e privacidade</p>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-700">
            Usamos cookies para melhorar a experiência, medir desempenho e apoiar a manutenção do
            portal. Você pode saber mais em{" "}
            <Link href="/cookies" className="font-semibold text-emerald-800 hover:underline">
              /cookies
            </Link>
            ,{" "}
            <Link href="/privacidade" className="font-semibold text-emerald-800 hover:underline">
              /privacidade
            </Link>{" "}
            e{" "}
            <Link href="/lgpd" className="font-semibold text-emerald-800 hover:underline">
              /lgpd
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={reject}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Rejeitar
          </button>

          <Link
            href="/cookies"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Preferências
          </Link>

          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
