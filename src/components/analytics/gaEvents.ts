"use client";

type EventParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Dispara evento para GA4 (gtag) e também para GTM (dataLayer).
 * Assim você consegue debugar no Console e garante compatibilidade.
 */
export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  const cleanParams: Record<string, any> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) cleanParams[k] = v;
  }

  // 1) GTM / dataLayer (para debug e triggers)
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...cleanParams });
  } catch {
    // silencioso
  }

  // 2) GA4 / gtag (para GA4 DebugView e relatórios)
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, cleanParams);
    }
  } catch {
    // silencioso
  }
}
