import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import type { ReactNode } from "react";
import {
  getAllCategories,
  getCategoryBySlug,
  getPostsByCategorySlug,
  toSlug,
} from "@/content/blog/posts";

type Props = { params: Promise<{ categoria: string }> };

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.reciclativa.com";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const decoded = decodeURIComponent(categoria);
  const categoryLabel = getCategoryBySlug(decoded) ?? decoded;

  return {
    title: `Categoria: ${categoryLabel} | Blog Reciclativa`,
    description: `Artigos na categoria ${categoryLabel}.`,
    alternates: { canonical: `/blog/categorias/${decoded}` },
  };
}

function toBRDate(iso: string) {
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

function Chip({
  href,
  children,
  active,
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
}) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 transition";
  const cls = active
    ? `${base} bg-emerald-600 text-white ring-emerald-600`
    : `${base} bg-white/80 text-slate-700 ring-slate-200 hover:bg-white hover:ring-slate-300`;

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params;
  const decoded = decodeURIComponent(categoria);

  const categoryLabel = getCategoryBySlug(decoded) ?? decoded;
  const posts = getPostsByCategorySlug(decoded).sort((a, b) =>
    a.dateISO < b.dateISO ? 1 : -1
  );

  const base = siteUrl();
  const canonicalUrl = `${base}/blog/categorias/${decoded}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
      { "@type": "ListItem", position: 3, name: "Categorias", item: `${base}/blog` },
      { "@type": "ListItem", position: 4, name: categoryLabel, item: canonicalUrl },
    ],
  };

  // Chips dinâmicos: “Todos” + todas as categorias do seu union
  const categories = getAllCategories();
  const chips = [
    { label: "Todos", href: "/blog", active: false },
    ...categories.map((c) => {
      const slug = toSlug(c);
      return {
        label: c,
        href: `/blog/categorias/${slug}`,
        active: slug === decoded,
      };
    }),
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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

        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-600" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <Link
                  href="/blog"
                  className="font-medium text-slate-700 hover:underline"
                >
                  Categorias
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">{categoryLabel}</span>
              </li>
            </ol>
          </nav>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Reciclativa
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Categoria: {categoryLabel}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Conteúdos organizados por tema para facilitar sua leitura.
          </p>

          {/* Chips dinâmicos */}
          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => (
              <Chip key={c.href} href={c.href} active={c.active}>
                {c.label}
              </Chip>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Voltar ao Blog
            </Link>

            <Link
              href="/reciclagem"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Página pilar: Reciclagem
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
              Nenhum artigo encontrado
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Ainda não temos artigos nesta categoria.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between gap-3">
              <p className="text-sm text-slate-600">
                {posts.length} {posts.length === 1 ? "artigo" : "artigos"} nesta categoria
              </p>
              <Link
                href="/blog"
                className="text-sm font-semibold text-emerald-700 hover:underline"
              >
                Ver todos os artigos →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {posts.map((p) => (
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

                  <h2 className="mt-3 text-base font-extrabold tracking-tight text-slate-900">
                    {p.title}
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
