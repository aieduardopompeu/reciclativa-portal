import Link from "next/link";

export function RadarCtaStrip() {
  return (
    <div className="rounded-xl bg-[#0d1f12] p-7 text-white sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold sm:text-2xl">
            Sua empresa tem eletrônicos para descartar?
          </h3>
          <p className="mt-2 text-sm text-white/70">
            Descarte correto, com certificado e sem custo.
          </p>
        </div>
        <Link
          href="/profissionais"
          aria-label="Encontrar profissionais e empresas de coleta perto de você"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#1a5c2e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#227a3c]"
        >
          Encontre perto de você
        </Link>
      </div>
    </div>
  );
}
