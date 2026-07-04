// src/app/radar/[id]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { RadarTagBadge } from "@/components/radar/RadarTagBadge";
import { getPublicNoticiaById } from "@/lib/radar";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://www.reciclativa.com";

function toBRDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const noticia = await getPublicNoticiaById(Number(id));
  if (!noticia) return { title: "Matéria não encontrada | Radar Ambiental" };

  const url = `${SITE_URL}/radar/${noticia.id}`;
  return {
    title: `${noticia.titulo} | Radar Ambiental — Reciclativa`,
    description: noticia.resumo,
    alternates: { canonical: url },
    openGraph: {
      title: noticia.titulo,
      description: noticia.resumo,
      url,
      type: "article",
    },
  };
}

export default async function RadarDetailPage({ params }: Props) {
  const { id } = await params;
  const noticiaId = Number(id);
  if (!Number.isFinite(noticiaId)) return notFound();

  const noticia = await getPublicNoticiaById(noticiaId);
  if (!noticia) return notFound();

  const url = `${SITE_URL}/radar/${noticia.id}`;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <ArticleJsonLd
        siteUrl={SITE_URL}
        url={url}
        headline={noticia.titulo}
        description={noticia.resumo}
        datePublished={noticia.publicado_em ?? new Date().toISOString()}
        publisherName="Reciclativa"
        type="NewsArticle"
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-[#0d1f12]/60">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <span className="text-[#0d1f12]/30">/</span>
          <li>
            <Link href="/radar" className="hover:underline">
              Radar Ambiental
            </Link>
          </li>
          <span className="text-[#0d1f12]/30">/</span>
          <li className="max-w-[280px] truncate font-medium text-[#0d1f12]/80 sm:max-w-none">
            {noticia.titulo}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mt-6 rounded-xl border border-[#d0e8d4] bg-[#f5f9f5] p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <RadarTagBadge tag={noticia.tag} />
          {noticia.cidade_uf ? (
            <span className="text-xs font-semibold text-[#0d1f12]/60">
              {noticia.cidade_uf}
            </span>
          ) : null}
        </div>

        <h1 className="mt-4 text-3xl font-black tracking-tight text-[#0d1f12] sm:text-4xl">
          {noticia.titulo}
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[#0d1f12]/70">{noticia.resumo}</p>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0d1f12]/50">
          {noticia.publicado_em ? `Publicado em ${toBRDate(noticia.publicado_em)}` : ""}
          {noticia.fonte_nome ? ` · Fonte: ${noticia.fonte_nome}` : ""}
        </p>
      </header>

      {/* Corpo */}
      {noticia.conteudo ? (
        <article
          className={[
            "mt-10 text-[#0d1f12] leading-relaxed space-y-5",
            "[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-[#0d1f12]",
            "[&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-[#0d1f12]",
            "[&_p]:text-base [&_p]:leading-relaxed",
            "[&_strong]:font-semibold [&_strong]:text-[#0d1f12]",
            "[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6",
            "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6",
            "[&_li]:mt-2",
            "[&_a]:font-semibold [&_a]:text-[#1a5c2e] hover:[&_a]:underline",
          ].join(" ")}
          // Conteúdo vem apenas do pipeline interno autenticado por RADAR_API_KEY
          // (Make → Claude → /api/radar/ingest), nunca de input de usuário final.
          dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
        />
      ) : null}

      {/* CTA de coleta */}
      <div className="mt-10 rounded-xl border border-[#d0e8d4] bg-[#eaf5ec] p-6">
        <p className="text-sm font-semibold text-[#0d1f12]">
          Sua empresa precisa descartar eletrônicos?
        </p>
        <Link
          href="/profissionais"
          className="mt-2 inline-flex items-center text-sm font-bold text-[#1a5c2e] hover:underline"
        >
          Encontre perto de você →
        </Link>
      </div>

      <div className="mt-8">
        <Link href="/radar" className="text-sm font-semibold text-[#1a5c2e] hover:underline">
          ← Voltar para o Radar Ambiental
        </Link>
      </div>
    </main>
  );
}
