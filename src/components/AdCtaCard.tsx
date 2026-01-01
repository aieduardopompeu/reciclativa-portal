// src/components/AdCtaCard.tsx
import Link from "next/link";

type AdCtaCardProps = {
  className?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  href?: string;
};

export default function AdCtaCard({
  className = "",
  title = "Quer anunciar?",
  subtitle = "Soluções sustentáveis, coleta, reciclagem, educação ambiental e produtos eco.",
  ctaLabel = "Ver mídia kit →",
  href = "/anuncie",
}: AdCtaCardProps) {
  return (
    <section
      className={`rounded-2xl border border-black/5 bg-white p-6 shadow-sm ${className}`}
    >
      <h3 className="text-lg font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

      <div className="mt-4">
        <Link
          href={href}
          className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
