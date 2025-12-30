// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  BLOG_POSTS,
  BLOG_OG_DEFAULT,
  type BlogCategory,
  type BlogPost,
} from "../../content/blog/posts";

// Força consistência (evita /blog estático “descasado” do /blog/[slug])
export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

export const metadata: Metadata = {
  title: "Blog | Reciclativa",
  description:
    "Atualizações, tendências e conteúdos complementares para separar resíduos com segurança, evitar contaminação e aplicar economia circular no dia a dia.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Reciclativa",
    description:
      "Conteúdos práticos sobre reciclagem, sustentabilidade e economia circular.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: BLOG_OG_DEFAULT,
        width: 1200,
        height: 630,
        alt: "Reciclativa — Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Reciclativa",
    description:
      "Conteúdos práticos sobre reciclagem, sustentabilidade e economia circular.",
    images: [BLOG_OG_DEFAULT],
  },
};

const order: BlogCategory[] = [
  "Economia circular",
  "Guias",
  "Reciclagem",
  "Sustentabilidade",
];

function getCategories(posts: BlogPost[]): BlogCategory[] {
  const set = new Set<BlogCategory>();
  posts.forEach((p) => set.add(p.category));
  return order.filter((c) => set.has(c));
}

function toBRDate(iso: string) {
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

export default function BlogPage({
  searchParams,
}: {
  searchParams?: { tag?: string };
}) {
  const tagParam = (searchParams?.tag || "").trim();
  const categories = getCategories(BLOG_POSTS);

  const activeTag = categories.includes(tagParam as BlogCategory)
    ? (tagParam as BlogCategory)
    : null;

  const filtered = activeTag
    ? BLOG_POSTS.filter((p) => p.category === activeTag)
    : BLOG_POSTS;

  // Ordena por data desc
  const posts = [...filtered].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="text-xs font-extrabold tracking-wide text-emerald-700">
          RECICLATIVA • BLOG
        </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
          Blog da Reciclativa
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
          Conteúdos práticos sobre reciclagem, sustentabilidade e economia
          circular. Guias diretos para separar resíduos, evitar contaminação e
          aumentar o impacto no dia a dia.
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

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Link
            href="/blog"
            className={`rounded-full px-3 py-1 text-sm font-semibold ring-1 ${
              !activeTag
                ? "bg-emerald-600 text-white ring-emerald-600"
                : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            Todos
          </Link>

          {categories.map((c) => (
            <Link
              key={c}
              href={`/blog?tag=${encodeURIComponent(c)}`}
              className={`rounded-full px-3 py-1 text-sm font-semibold ring-1 ${
                activeTag === c
                  ? "bg-emerald-600 text-white ring-emerald-600"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {c}
            </Link>
          ))}

          <div className="ml-auto text-sm text-slate-500">
            {posts.length} artigos
          </div>
        </div>
      </header>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:bg-slate-50"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                {p.category}
              </span>
              <span className="text-xs text-slate-500">
                {toBRDate(p.dateISO)}
                {p.readMin ? ` • ${p.readMin} min` : ""}
              </span>
            </div>
            <h2 className="mt-3 text-lg font-extrabold tracking-tight text-slate-900">
              {p.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {p.excerpt}
            </p>
          </Link>
        ))}
      </section>

      <footer className="mt-10 text-xs text-slate-500">
        Fonte: <code>src/content/blog/posts.ts</code> — {BLOG_POSTS.length} posts
        cadastrados.
      </footer>
    </main>
  );
}
