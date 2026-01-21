// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { POSTS, getAllTags, getAllCategories, type CategoryUI, type PostCard } from "@/content/blog/posts";

export const metadata: Metadata = {
  title: "Blog | Reciclativa",
  description:
    "Conteúdos práticos sobre reciclagem, sustentabilidade e economia circular. Guias diretos para separar resíduos, evitar contaminação e aumentar o impacto no dia a dia.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Reciclativa",
    description:
      "Conteúdos práticos sobre reciclagem, sustentabilidade e economia circular.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/og/blog-default.webp",
        width: 1200,
        height: 630,
        alt: "Reciclativa — Blog",
      },
    ],
  },
};

function toBRDate(iso: string) {
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

type SearchParams = Record<string, string | string[] | undefined>;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  // Mantém compatibilidade com seu /blog atual: ?tag=Categoria
  const rawTag = sp?.tag;
  const tagValue = Array.isArray(rawTag) ? rawTag[0] : rawTag;
  const tagParam = (tagValue ?? "").toString().trim();

  const categories = getAllCategories();
  const activeCategory = categories.includes(tagParam as CategoryUI)
    ? (tagParam as CategoryUI)
    : null;

  const filtered = activeCategory ? POSTS.filter((p) => p.category === activeCategory) : POSTS;
  const postsSorted = [...filtered].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));

  const startCards = [
    POSTS.find((p) => p.slug === "o-que-e-reciclagem"),
    POSTS.find((p) => p.slug === "o-que-pode-ser-reciclado"),
    POSTS.find((p) => p.slug === "economia-circular-exemplos"),
  ].filter(Boolean) as PostCard[];

  const mostRead = [
    POSTS.find((p) => p.slug === "o-que-pode-ser-reciclado"),
    POSTS.find((p) => p.slug === "o-que-e-reciclagem"),
    POSTS.find((p) => p.slug === "economia-circular-exemplos"),
  ].filter(Boolean) as PostCard[];

  const tags = getAllTags();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO com imagem (padrão Sustentabilidade/Reciclagem/Guias) */}
      <header className="relative overflow-hidden border-b border-slate-200">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.webp')" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white"
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Reciclativa
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Blog da Reciclativa
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Conteúdos práticos sobre reciclagem, sustentabilidade e economia
            circular. Guias diretos para separar resíduos, evitar contaminação e
            aumentar o impacto no dia a dia.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/guias"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Ver guias
            </Link>

            <Link
              href="/reciclagem"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Página pilar: Reciclagem
            </Link>
          </div>

          {/* Breadcrumb simples */}
          <nav className="mt-8 text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">Blog</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* Conteúdo */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* CHIPS: Categorias (filtro no /blog) + Tags (atalhos para páginas de tag) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/blog"
              className={`rounded-full px-3 py-1 text-sm font-semibold ring-1 ${
                !activeCategory
                  ? "bg-emerald-600 text-white ring-emerald-600"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              Todos
            </Link>

            {categories.map((c: CategoryUI) => (
              <Link
                key={c}
                href={`/blog?tag=${encodeURIComponent(c)}`}
                className={`rounded-full px-3 py-1 text-sm font-semibold ring-1 ${
                  activeCategory === c
                    ? "bg-emerald-600 text-white ring-emerald-600"
                    : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                }`}
              >
                {c}
              </Link>
            ))}

            <div className="ml-auto text-sm text-slate-500">
              {postsSorted.length} artigos
            </div>
          </div>

        {/* Tags (estilo "wrap" igual ao print) */}
        {tags.length > 0 && (
          <div className="mt-4 border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                Tags
              </p>
              <span className="text-xs text-slate-500">{tags.length} tags</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {/* "Todos" (leva para /blog sem filtro) */}
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-white hover:ring-slate-300"
              >
                Todos
              </Link>

              {tags.map((t) => (
                <Link
                  key={t}
                  href={`/blog/tags/${t}`}
                  className="inline-flex items-center rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-white hover:ring-slate-300"
                  title={`Ver tag: ${t.replace(/-/g, " ")}`}
                >
                  {t.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </div>
        )}
        </div>

        {/* 2 COLUNAS */}
        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* COLUNA PRINCIPAL */}
          <div className="space-y-6 lg:col-span-2">
            {/* COMEÇE AQUI */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Comece aqui
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Uma trilha curta para entender o básico e separar corretamente.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {startCards.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      {p.category}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900 line-clamp-2">
                      {p.title}
                    </p>
                    <p className="mt-2 text-sm text-slate-700 line-clamp-3">
                      {p.excerpt}
                    </p>
                    <p className="mt-3 text-xs text-slate-500">
                      {toBRDate(p.dateISO)} • {p.readMin} min
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* ÚLTIMOS ARTIGOS */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Últimos artigos
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Conteúdos objetivos, organizados para virar hábito.
                  </p>
                </div>
                <div className="text-sm text-slate-500">
                  {postsSorted.length} artigos
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {postsSorted.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:bg-slate-50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                        {p.category}
                      </span>
                      <span className="text-xs text-slate-500">
                        {toBRDate(p.dateISO)} • {p.readMin} min
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-extrabold tracking-tight text-slate-900">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {p.excerpt}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Quer acertar no descarte sem dúvida?
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  Comece pelo guia prático do que pode ser reciclado — é o atalho
                  para reduzir contaminação.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/blog/o-que-pode-ser-reciclado"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                  >
                    Ver: o que pode ser reciclado
                  </Link>
                  <Link
                    href="/blog/o-que-e-reciclagem"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Ver: o que é reciclagem
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Pilares e atalhos
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Navegação rápida para facilitar sua jornada e aprofundar o tema.
              </p>

              <div className="mt-4 space-y-3">
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Página pilar: Reciclagem →
                </Link>
                <Link
                  href="/guias"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Guias práticos →
                </Link>
                <Link
                  href="/diretorio"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Diretório de soluções →
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Como aproveitar melhor
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Se você está começando, leia a trilha “Comece aqui”. Depois,
                  vá para os guias e aplique o checklist na sua rotina.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Mais lidos
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Os conteúdos que resolvem as dúvidas mais comuns.
              </p>

              <div className="mt-4 space-y-3">
                {mostRead.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block rounded-2xl border border-slate-200 bg-white p-4 hover:bg-slate-50"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      {p.category}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {p.title}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Quer anunciar?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Soluções sustentáveis, coleta, reciclagem, educação ambiental e
                produtos eco.
              </p>
              <Link
                href="/anuncie"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Ver mídia kit →
              </Link>
            </section>
          </aside>
        </section>
      </section>
    </main>
  );
}
