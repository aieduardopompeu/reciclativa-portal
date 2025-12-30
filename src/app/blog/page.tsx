// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, BLOG_OG_DEFAULT, type BlogCategory, type BlogPost } from "../../content/blog/posts";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Blog | Reciclativa",
  description:
    "Conteúdos práticos sobre reciclagem, sustentabilidade e economia circular. Guias diretos para separar resíduos, evitar contaminação e aumentar o impacto no dia a dia.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Reciclativa",
    description:
      "Conteúdos práticos sobre reciclagem, sustentabilidade e economia circular. Guias diretos para separar resíduos, evitar contaminação e aumentar o impacto no dia a dia.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: BLOG_OG_DEFAULT,
        width: 1200,
        height: 630,
        alt: "Reciclativa – Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Reciclativa",
    description:
      "Conteúdos práticos sobre reciclagem, sustentabilidade e economia circular. Guias diretos para separar resíduos, evitar contaminação e aumentar o impacto no dia a dia.",
    images: [BLOG_OG_DEFAULT],
  },
};

type CategoryUI = "Todos" | BlogCategory;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatDateBR(iso: string) {
  const [y, m, d] = iso.split("-").map((x) => Number(x));
  const dd = String(d).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${dd}/${mm}/${y}`;
}

function getCategories(posts: BlogPost[]): CategoryUI[] {
  const set = new Set<BlogCategory>();
  posts.forEach((p) => set.add(p.category));
  const list = Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
  return ["Todos", ...list];
}

type BlogPageProps = {
  // Em algumas versões, searchParams vem como Promise.
  // Tipar assim evita o erro e funciona em ambos os casos.
  searchParams?: Promise<{ tag?: string }> | { tag?: string };
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const categories = getCategories(BLOG_POSTS);

  // Resolve Promise (se vier assim) sem quebrar quando vier como objeto
  const sp =
    searchParams && typeof (searchParams as any).then === "function"
      ? await (searchParams as Promise<{ tag?: string }>)
      : (searchParams as { tag?: string } | undefined);

  const tagParam = (sp?.tag || "").trim();
  const activeTag: CategoryUI =
    tagParam && categories.includes(tagParam as CategoryUI)
      ? (tagParam as CategoryUI)
      : "Todos";

  const filtered =
    activeTag === "Todos"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeTag);

  const sorted = [...filtered].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));

  const totalCount = BLOG_POSTS.length;
  const count = sorted.length;

  // Curadoria: "Comece aqui"
  const startHereSlugs = [
    "o-que-e-reciclagem",
    "o-que-pode-ser-reciclado",
    "economia-circular-exemplos",
  ];
  const startHere = startHereSlugs
    .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
    .filter(Boolean) as BlogPost[];

  // Curadoria: "Mais lidos"
  const mostReadSlugs = [
    "o-que-pode-ser-reciclado",
    "o-que-e-reciclagem",
    "economia-circular-exemplos",
  ];
  const mostRead = mostReadSlugs
    .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
    .filter(Boolean) as BlogPost[];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <header className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="text-xs font-semibold tracking-widest text-emerald-600">
          RECICLATIVA • BLOG
        </div>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Blog da Reciclativa
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Conteúdos práticos sobre reciclagem, sustentabilidade e economia circular. Guias diretos
          para separar resíduos, evitar contaminação e aumentar o impacto no dia a dia.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/guias"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver guias
          </Link>
          <Link
            href="/reciclagem"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Página pilar: Reciclagem
          </Link>
        </div>

        {/* Chips / filtro */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((c) => {
            const href = c === "Todos" ? "/blog" : `/blog?tag=${encodeURIComponent(c)}`;
            const isActive = c === activeTag;
            return (
              <Link
                key={c}
                href={href}
                className={cn(
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 transition",
                  isActive
                    ? "bg-emerald-600 text-white ring-emerald-600"
                    : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                )}
              >
                {c}
              </Link>
            );
          })}
          <div className="ml-auto text-xs text-slate-500">
            {activeTag === "Todos" ? `${totalCount} artigos` : `${count} de ${totalCount} artigos`}
          </div>
        </div>
      </header>

      {/* Conteúdo + Sidebar */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          {/* Comece aqui */}
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">Comece aqui</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Uma trilha curta para entender o básico e separar corretamente.
                </p>
              </div>
              {startHere[0]?.slug ? (
                <Link
                  href={`/blog/${startHere[0].slug}`}
                  className="text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Começar →
                </Link>
              ) : null}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {startHere.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50"
                >
                  <div className="text-xs font-semibold text-emerald-700">{p.category}</div>
                  <div className="mt-2 line-clamp-2 text-base font-bold text-slate-900 group-hover:underline">
                    {p.title}
                  </div>
                  <div className="mt-2 line-clamp-3 text-sm text-slate-600">{p.excerpt}</div>
                  <div className="mt-4 text-xs text-slate-500">
                    {formatDateBR(p.dateISO)} {p.readMin ? `• ${p.readMin} min` : ""}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Lista / cards */}
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  {activeTag === "Todos" ? "Últimos artigos" : `Categoria: ${activeTag}`}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Conteúdos objetivos, organizados para virar hábito.
                </p>
              </div>
              <div className="text-xs text-slate-500">{count} artigos</div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {sorted.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      {p.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {formatDateBR(p.dateISO)} {p.readMin ? `• ${p.readMin} min` : ""}
                    </span>
                  </div>

                  <div className="mt-3 line-clamp-2 text-lg font-bold text-slate-900 group-hover:underline">
                    {p.title}
                  </div>
                  <div className="mt-2 line-clamp-3 text-sm text-slate-600">{p.excerpt}</div>
                </Link>
              ))}
            </div>

            {/* CTA interno */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">
                Quer acertar no descarte sem dúvida?
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Comece pelo guia prático do que pode ser reciclado — é o atalho para reduzir
                contaminação.
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/blog/o-que-pode-ser-reciclado"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Ver: o que pode ser reciclado
                </Link>
                <Link
                  href="/blog/o-que-e-reciclagem"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Ver: o que é reciclagem
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-lg font-bold tracking-tight text-slate-900">Pilares e atalhos</h3>
            <p className="mt-1 text-sm text-slate-600">
              Navegação rápida para reforçar SEO interno e facilitar a jornada.
            </p>

            <div className="mt-5 space-y-2">
              <Link
                href="/reciclagem"
                className="block rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-emerald-700 hover:bg-slate-50"
              >
                Página pilar: Reciclagem →
              </Link>
              <Link
                href="/guias"
                className="block rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Guias práticos →
              </Link>
              <Link
                href="/diretorio"
                className="block rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Diretório (em breve) →
              </Link>
            </div>

            <div className="mt-6 text-xs text-slate-500">
              Dica editorial: cada post deve linkar 3–6 conteúdos relacionados e 1 página pilar.
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-lg font-bold tracking-tight text-slate-900">Mais lidos</h3>
            <p className="mt-1 text-sm text-slate-600">
              Os conteúdos que resolvem as dúvidas mais comuns.
            </p>

            <div className="mt-5 space-y-3">
              {mostRead.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 hover:bg-slate-50"
                >
                  <div className="text-xs font-semibold text-emerald-700">{p.category}</div>
                  <div className="mt-1 line-clamp-2 text-sm font-bold text-slate-900 hover:underline">
                    {p.title}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-lg font-bold tracking-tight text-slate-900">Quer anunciar?</h3>
            <p className="mt-1 text-sm text-slate-600">
              Soluções sustentáveis, coleta, reciclagem, educação ambiental e produtos eco.
            </p>

            <div className="mt-5">
              <Link
                href="/anuncie"
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Ver mídia kit →
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
