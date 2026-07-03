// src/app/radar/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  RADAR_TAGS,
  RADAR_TAG_META,
  isRadarTag,
  getRadarListingPage,
  getRadarUfOptions,
  type RadarTag,
} from "@/lib/radar";
import { RadarMiniCard } from "@/components/radar/RadarMiniCard";
import { RadarCtaStrip } from "@/components/radar/RadarCtaStrip";

export const metadata: Metadata = {
  title: "Radar Ambiental — Reciclativa",
  description:
    "Acompanhe notícias, legislação e oportunidades sobre reciclagem e descarte de eletrônicos no Brasil. Curadoria editorial da Reciclativa.",
  alternates: { canonical: "/radar" },
  openGraph: {
    title: "Radar Ambiental — Reciclativa",
    description:
      "Matérias selecionadas sobre reciclagem, descarte e legislação ambiental.",
    url: "/radar",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

type SearchParams = { tag?: string; uf?: string; page?: string };

export default async function RadarPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const tagParam = (sp.tag ?? "").trim();
  const activeTag: RadarTag | null = isRadarTag(tagParam) ? tagParam : null;

  const uf = (sp.uf ?? "").trim().toUpperCase() || null;
  const page = Math.max(1, Number(sp.page) || 1);

  const [{ items, total, totalPages }, ufOptions] = await Promise.all([
    getRadarListingPage({ tag: activeTag, uf, page, pageSize: 20 }),
    getRadarUfOptions(),
  ]);

  function pageHref(nextPage: number) {
    const params = new URLSearchParams();
    if (activeTag) params.set("tag", activeTag);
    if (uf) params.set("uf", uf);
    if (nextPage > 1) params.set("page", String(nextPage));
    const qs = params.toString();
    return qs ? `/radar?${qs}` : "/radar";
  }

  function tagHref(tag: RadarTag | null) {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    if (uf) params.set("uf", uf);
    const qs = params.toString();
    return qs ? `/radar?${qs}` : "/radar";
  }

  return (
    <main className="min-h-screen bg-white text-[#0d1f12]">
      <header className="border-b border-[#d0e8d4] bg-[#f5f9f5]">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-sm text-[#0d1f12]/60">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#0d1f12]/30">/</span>
                <span className="font-medium text-[#0d1f12]/80">Radar Ambiental</span>
              </li>
            </ol>
          </nav>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#d0e8d4] bg-[#eaf5ec] px-3 py-1">
            <span className="pulse-dot" aria-hidden />
            <span className="text-xs font-semibold text-[#1a5c2e]">
              curadoria editorial Reciclativa
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Radar Ambiental
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[#0d1f12]/70 sm:text-base">
            Acompanhe o que está acontecendo no setor de reciclagem e descarte de
            eletrônicos no Brasil.
          </p>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href={tagHref(null)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ${
                !activeTag
                  ? "bg-[#1a5c2e] text-white ring-[#1a5c2e]"
                  : "bg-white text-[#0d1f12] ring-[#d0e8d4] hover:bg-[#f5f9f5]"
              }`}
            >
              Todos
            </Link>
            {RADAR_TAGS.map((t) => (
              <Link
                key={t}
                href={tagHref(t)}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ${
                  activeTag === t
                    ? "bg-[#1a5c2e] text-white ring-[#1a5c2e]"
                    : "bg-white text-[#0d1f12] ring-[#d0e8d4] hover:bg-[#f5f9f5]"
                }`}
              >
                {RADAR_TAG_META[t].label}
              </Link>
            ))}
          </div>

          <form method="get" className="flex items-center gap-2">
            {activeTag ? <input type="hidden" name="tag" value={activeTag} /> : null}
            <label htmlFor="uf" className="sr-only">
              Filtrar por estado
            </label>
            <select
              id="uf"
              name="uf"
              defaultValue={uf ?? ""}
              className="rounded-lg border border-[#d0e8d4] bg-white px-3 py-2 text-sm font-semibold text-[#0d1f12]"
            >
              <option value="">Todos os estados</option>
              {ufOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-lg border border-[#d0e8d4] bg-white px-3 py-2 text-sm font-semibold text-[#0d1f12] hover:bg-[#f5f9f5]"
            >
              Filtrar
            </button>
          </form>
        </div>

        <p className="mt-4 text-sm text-[#0d1f12]/60">
          {total} matéria{total === 1 ? "" : "s"} publicada{total === 1 ? "" : "s"}
        </p>

        {/* Grade */}
        {items.length === 0 ? (
          <div className="mt-6 rounded-xl border border-[#d0e8d4] bg-[#f5f9f5] p-6 text-sm text-[#0d1f12]/70">
            Nenhuma matéria publicada com esse filtro ainda.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((n) => (
              <RadarMiniCard key={n.id} noticia={n} />
            ))}
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-3">
            {page > 1 ? (
              <Link
                href={pageHref(page - 1)}
                className="rounded-lg border border-[#d0e8d4] bg-white px-4 py-2 text-sm font-semibold text-[#0d1f12] hover:bg-[#f5f9f5]"
              >
                ← Anterior
              </Link>
            ) : null}
            <span className="text-sm text-[#0d1f12]/60">
              Página {page} de {totalPages}
            </span>
            {page < totalPages ? (
              <Link
                href={pageHref(page + 1)}
                className="rounded-lg border border-[#d0e8d4] bg-white px-4 py-2 text-sm font-semibold text-[#0d1f12] hover:bg-[#f5f9f5]"
              >
                Carregar mais →
              </Link>
            ) : null}
          </div>
        ) : null}

        <div className="mt-10">
          <RadarCtaStrip />
        </div>
      </section>
    </main>
  );
}
