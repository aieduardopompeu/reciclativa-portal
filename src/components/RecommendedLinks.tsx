import Link from "next/link";

export type RecommendedLink = {
  href: string;
  title: string;
  description?: string;
};

type Props = {
  title?: string;
  description?: string;
  links: RecommendedLink[];
  columns?: 1 | 2 | 3;
};

export default function RecommendedLinks({
  title = "Links úteis para continuar",
  description = "Sugestões do Reciclativa para aprofundar (sequência recomendada).",
  links,
  columns = 2,
}: Props) {
  const gridCols =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <section className="not-prose rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-extrabold tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>

      <div className={`mt-4 grid ${gridCols} gap-3`}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50"
          >
            <div className="text-sm font-semibold text-slate-800">
              {l.title} →
            </div>
            {l.description ? (
              <div className="mt-1 text-xs leading-relaxed text-slate-600">
                {l.description}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
