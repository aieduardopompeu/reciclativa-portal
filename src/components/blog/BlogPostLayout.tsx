// src/components/blog/BlogPostLayout.tsx
import Link from "next/link";
import TableOfContents from "@/components/blog/TableOfContents";

type RelatedLink = { title: string; href: string };
type Breadcrumb = { label: string; href: string };

type BlogPostLayoutProps = {
  title: string;
  excerpt: string;
  category: string;
  dateISO: string; // YYYY-MM-DD
  readMin?: number;
  breadcrumbs?: Breadcrumb[];
  updatedISO?: string; // opcional
  related?: RelatedLink[];
  children: React.ReactNode;
};

function toBRDate(iso: string) {
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  if (!y || !m || !d) return iso;
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

export default function BlogPostLayout({
  title,
  excerpt,
  category,
  dateISO,
  readMin,
  breadcrumbs,
  updatedISO,
  related,
  children,
}: BlogPostLayoutProps) {
  const crumbs: Breadcrumb[] =
    breadcrumbs?.length
      ? breadcrumbs
      : [
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            {category}
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
            {excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              Blog Reciclativa
            </span>
            <span>•</span>
            <span>{toBRDate(dateISO)}</span>
            {typeof readMin === "number" && (
              <>
                <span>•</span>
                <span>{readMin} min</span>
              </>
            )}
            {updatedISO && (
              <>
                <span>•</span>
                <span className="text-slate-500">
                  Atualizado em {toBRDate(updatedISO)}
                </span>
              </>
            )}
          </div>

          {/* Breadcrumb */}
          <nav className="mt-8 text-sm text-slate-600" aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2">
              {crumbs.map((c, idx) => (
                <li key={`${c.href}-${idx}`} className="flex items-center gap-2">
                  {idx > 0 && <span className="text-slate-400">/</span>}
                  <Link href={c.href} className="hover:underline">
                    {c.label}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">Post</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ARTICLE */}
          <article
            id="post-content"
            className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="prose prose-slate max-w-none prose-h2:scroll-mt-24 prose-h3:scroll-mt-24">
              {children}
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                Reciclativa
              </p>
              <p className="mt-2 text-sm text-slate-800">
                Transforme resíduos em recursos! Navegue pelos guias e aprenda a
                separar sem contaminar.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
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
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            {/* TOC automático */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Neste artigo
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Atalhos para as seções principais.
              </p>

              <div className="mt-4">
                <TableOfContents contentSelector="#post-content" />
              </div>
            </section>

            {/* Relacionados */}
            {related && related.length > 0 && (
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                  Relacionados
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Continue a leitura com conteúdos complementares.
                </p>

                <div className="mt-4 space-y-3">
                  {related.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="block rounded-2xl border border-slate-200 bg-white p-4 hover:bg-slate-50"
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {r.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{r.href}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* CTA Anuncie */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Quer anunciar?
              </h2>
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
        </div>
      </section>
    </main>
  );
}
