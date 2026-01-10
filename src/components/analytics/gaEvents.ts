"use client";

type EventParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  // Sempre empurra no dataLayer (GTM)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });

  // Também envia via gtag (GA4), se existir
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}
