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
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
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
            <span className="text-slate-700">Post</span>
          </li>
        </ol>
      </nav>

      {/* Header (card) */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
          {category}
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          {title}
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          {excerpt}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span>{toBRDate(dateISO)}</span>
          {typeof readMin === "number" && (
            <>
              <span className="text-slate-300">•</span>
              <span>{readMin} min</span>
            </>
          )}
          {updatedISO && (
            <>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">
                Atualizado em {toBRDate(updatedISO)}
              </span>
            </>
          )}
        </div>

        {/* Ações rápidas (opcional via related[0..1] pode ficar só no lado) */}
        {related?.length ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {related.slice(0, 2).map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold ${
                  r === related[0]
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {r.title}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      {/* Layout: conteúdo + sidebar */}
      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Conteúdo */}
        <article
          id="post-content"
          className="prose prose-slate max-w-none lg:col-span-2"
        >
          {children}
        </article>

        {/* Sidebar */}
        <aside className="space-y-6 lg:col-span-1">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
              Neste artigo
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Atalhos para as seções principais.
            </p>
            <div className="mt-4">
              <TableOfContents contentSelector="#post-content" />
            </div>
          </section>

          {related && related.length > 0 && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Relacionados
              </h2>
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

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
              Quer anunciar?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Soluções sustentáveis, coleta, reciclagem e serviços.
            </p>
            <Link
              href="/anuncie"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Ver mídia kit →
            </Link>
          </section>
        </aside>
      </section>
    </main>
  );
}
