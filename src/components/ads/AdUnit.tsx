"use client";

import { useEffect, useRef } from "react";

type AdFormat = "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";

type Props = {
  slot: string;
  format?: AdFormat;
  /** Mostrar o label "Publicidade" acima do bloco */
  showLabel?: boolean;
  className?: string;
  /** Para anúncios in-feed / in-article com layout fluid */
  layoutKey?: string;
};

const CLIENT = "ca-pub-4436420746304287";

export default function AdUnit({
  slot,
  format = "auto",
  showLabel = true,
  className = "",
  layoutKey,
}: Props) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      // @ts-expect-error adsbygoogle global injected by AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // silencioso em dev ou quando script não carregou
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {showLabel && (
        <p className="mb-1 text-center text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Publicidade
        </p>
      )}
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
      />
    </div>
  );
}
