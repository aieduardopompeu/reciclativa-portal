"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "reciclativa_cookie_preferences_v1";
const LEGACY_STORAGE_KEY = "reciclativa_cookie_consent_v1";

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: "",
};

function buildPreferences(partial?: Partial<CookiePreferences>): CookiePreferences {
  return {
    ...DEFAULT_PREFERENCES,
    ...partial,
    necessary: true,
    updatedAt: new Date().toISOString(),
  };
}

function applyConsent(preferences: CookiePreferences) {
  try {
    window.gtag?.("consent", "update", {
      analytics_storage: preferences.analytics ? "granted" : "denied",
      ad_storage: preferences.marketing ? "granted" : "denied",
      ad_user_data: preferences.marketing ? "granted" : "denied",
      ad_personalization: preferences.marketing ? "granted" : "denied",
      functionality_storage: "granted",
      personalization_storage: preferences.marketing ? "granted" : "denied",
      security_storage: "granted",
    });
  } catch {}
}

function savePreferences(preferences: CookiePreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {}
}

function readLegacyConsent(): CookiePreferences | null {
  try {
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy === "accepted") {
      return buildPreferences({ analytics: true, marketing: true });
    }
    if (legacy === "rejected") {
      return buildPreferences({ analytics: false, marketing: false });
    }
    return null;
  } catch {
    return null;
  }
}

function getStoredPreferences(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
      return buildPreferences({
        analytics: Boolean(parsed.analytics),
        marketing: Boolean(parsed.marketing),
        updatedAt: parsed.updatedAt,
      });
    }
  } catch {}

  return readLegacyConsent();
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const existing = getStoredPreferences();

    if (!existing) {
      setVisible(true);
      setHydrated(true);
      return;
    }

    setAnalytics(existing.analytics);
    setMarketing(existing.marketing);
    applyConsent(existing);
    setHydrated(true);
  }, []);

  const previewPreferences = useMemo(
    () =>
      buildPreferences({
        analytics,
        marketing,
      }),
    [analytics, marketing]
  );

  function persistAndClose(preferences: CookiePreferences) {
    savePreferences(preferences);
    applyConsent(preferences);
    setAnalytics(preferences.analytics);
    setMarketing(preferences.marketing);
    setPreferencesOpen(false);
    setVisible(false);
  }

  function acceptAll() {
    persistAndClose(buildPreferences({ analytics: true, marketing: true }));
  }

  function rejectOptional() {
    persistAndClose(buildPreferences({ analytics: false, marketing: false }));
  }

  function saveCustomPreferences() {
    persistAndClose(previewPreferences);
  }

  if (!hydrated) return null;

  return (
    <>
      {visible ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white shadow-[0_-8px_24px_rgba(15,23,42,0.08)]">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div className="text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Cookies e privacidade</p>
              <p className="mt-1 max-w-3xl leading-relaxed text-slate-700">
                Usamos cookies necessários para o funcionamento da plataforma e, com sua escolha,
                cookies de analytics e marketing para medir desempenho, entender o uso e apoiar
                campanhas. Saiba mais em{" "}
                <Link
                  href="/politica-de-cookies"
                  className="font-semibold text-emerald-800 hover:underline"
                >
                  Política de Cookies
                </Link>
                ,{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="font-semibold text-emerald-800 hover:underline"
                >
                  Política de Privacidade
                </Link>{" "}
                e{" "}
                <Link href="/lgpd" className="font-semibold text-emerald-800 hover:underline">
                  LGPD
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={rejectOptional}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Rejeitar opcionais
              </button>

              <button
                type="button"
                onClick={() => setPreferencesOpen(true)}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Preferências
              </button>

              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Aceitar tudo
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {preferencesOpen ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/45 p-4 sm:items-center">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Preferências de cookies
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  Escolha como a plataforma pode usar cookies opcionais
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Os cookies necessários permanecem ativos para segurança, autenticação e
                  funcionamento básico. Você pode ajustar as categorias opcionais abaixo.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPreferencesOpen(false)}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Fechar
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">Necessários</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      Essenciais para login, segurança, estabilidade e funcionamento da aplicação.
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    Sempre ativo
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">Analytics</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      Mede navegação, desempenho e uso das páginas para melhorar a plataforma.
                    </p>
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(event) => setAnalytics(event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-700"
                    />
                    Ativar
                  </label>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">Marketing</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      Permite cookies ligados a mídia, campanhas, mensuração publicitária e
                      personalização de anúncios.
                    </p>
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(event) => setMarketing(event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-700"
                    />
                    Ativar
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
              <div className="text-sm text-slate-600">
                Veja também{" "}
                <Link
                  href="/politica-de-cookies"
                  className="font-semibold text-emerald-800 hover:underline"
                >
                  Política de Cookies
                </Link>
                ,{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="font-semibold text-emerald-800 hover:underline"
                >
                  Privacidade
                </Link>{" "}
                e{" "}
                <Link href="/termos-de-uso" className="font-semibold text-emerald-800 hover:underline">
                  Termos de Uso
                </Link>
                .
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={rejectOptional}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Rejeitar opcionais
                </button>
                <button
                  type="button"
                  onClick={saveCustomPreferences}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  Salvar preferências
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
