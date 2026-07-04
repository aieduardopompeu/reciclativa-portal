import Link from "next/link";
import { getRadarHomeData, relativeTimeFromNow } from "@/lib/radar";
import { RadarTagBadge } from "./RadarTagBadge";
import { RadarMiniCard } from "./RadarMiniCard";
import { RadarCtaStrip } from "./RadarCtaStrip";

export default async function RadarAmbiental() {
  const data = await getRadarHomeData();

  // Sem matéria publicada nenhuma: a seção inteira some da home.
  const mainCard = data.destaque ?? data.secundarias[0] ?? null;
  if (!mainCard) return null;

  const sideCards = data.destaque ? data.secundarias : data.secundarias.slice(1);
  const tempoMain = mainCard.publicado_em
    ? relativeTimeFromNow(new Date(mainCard.publicado_em))
    : "";

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a5c2e]">
            Radar Ambiental
          </p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d0e8d4] bg-[#eaf5ec] px-3 py-1">
            <span className="pulse-dot" aria-hidden />
            <span className="text-xs font-semibold text-[#1a5c2e]">
              curadoria editorial Reciclativa
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-black text-[#0d1f12]">
            O que está acontecendo no setor
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#0d1f12]/70">
            Matérias selecionadas pela nossa equipe sobre reciclagem, descarte e
            legislação ambiental.
          </p>
        </div>

        <Link
          href="/radar"
          className="rounded-lg border border-[#d0e8d4] bg-white px-4 py-2 text-sm font-semibold text-[#1a5c2e] transition hover:bg-[#f5f9f5]"
        >
          Ver todas →
        </Link>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Card principal grande */}
        <Link
          href={`/radar/${mainCard.id}`}
          aria-label={`Ler matéria completa: ${mainCard.titulo}`}
          className="group relative flex flex-col justify-between overflow-hidden rounded-xl p-7 text-white"
        >
          <div
            className="absolute inset-0 bg-[#0d1f12] bg-cover bg-center"
            style={mainCard.imagem_url ? { backgroundImage: `url(${mainCard.imagem_url})` } : undefined}
            aria-hidden
          />
          {mainCard.imagem_url ? (
            <div className="absolute inset-0 bg-[#0d1f12]/65" aria-hidden />
          ) : null}

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                <span className="pulse-dot" style={{ background: "#ffffff" }} aria-hidden />
                Novo
              </span>
              <RadarTagBadge tag={mainCard.tag} />
            </div>

            <h3 className="mt-4 text-2xl font-black leading-snug sm:text-3xl">
              {mainCard.titulo}
            </h3>
          </div>

          <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-white/70">
              {mainCard.cidade_uf ? `${mainCard.cidade_uf} · ` : ""}
              {tempoMain}
            </p>
            <span className="text-sm font-semibold text-white transition group-hover:underline">
              Ler matéria completa →
            </span>
          </div>
        </Link>

        {/* Coluna lateral: cards secundários empilhados */}
        {sideCards.length > 0 ? (
          <div className="flex flex-col gap-4">
            {sideCards.map((n) => (
              <RadarMiniCard key={n.id} noticia={n} />
            ))}
          </div>
        ) : null}
      </div>

      {data.grid.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.grid.map((n) => (
            <RadarMiniCard key={n.id} noticia={n} />
          ))}
        </div>
      ) : null}

      <div className="mt-6">
        <RadarCtaStrip />
      </div>
    </section>
  );
}
