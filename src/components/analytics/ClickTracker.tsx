"use client";

import { useEffect } from "react";
import { trackEvent } from "./gaEvents";

function pickDatasetParams(dataset: DOMStringMap) {
  const params: Record<string, any> = {};

  for (const [k, v] of Object.entries(dataset)) {
    if (!v) continue;
    if (!k.startsWith("ga")) continue;
    if (k === "gaEvent") continue;

    const name = k.slice(2);
    const paramKey = name.charAt(0).toLowerCase() + name.slice(1);
    params[paramKey] = v;
  }

  return params;
}

export default function ClickTracker() {
  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const el = target.closest<HTMLElement>("[data-ga-event]");
      if (!el) return;

      const eventName = el.dataset.gaEvent;
      if (!eventName) return;

      const params = pickDatasetParams(el.dataset);

      if (!params.href && (el as HTMLAnchorElement).getAttribute) {
        const href = (el as HTMLAnchorElement).getAttribute("href");
        if (href) params.href = href;
      }

      trackEvent(eventName, params);
    }

    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true } as any);
  }, []);

  return null;
}
