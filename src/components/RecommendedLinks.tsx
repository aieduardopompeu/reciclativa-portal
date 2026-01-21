import Link from "next/link";

type Item = {
  href: string;
  title?: string;
  label?: string;
  description?: string;
};

type Props = {
  /** Aceita ambos para compatibilidade */
  title?: string;
  links?: { href: string; label: string }[];
  items?: { href: string; title: string; description?: string }[];

  /** Layout opcional */
  gridCols?: string;
  className?: string;
};

export default function RecommendedLinks(props: Props) {
  const heading = props.title ?? "Leituras recomendadas";

  // Normaliza "items" e "links" para uma lista única
  const normalized: Item[] = [
    ...(props.items ?? []).map((i) => ({
      href: i.href,
      title: i.title,
      description: i.description,
    })),
    ...(props.links ?? []).map((l) => ({
      href: l.href,
      label: l.label,
    })),
  ].filter((x) => x && typeof x.href === "string" && x.href.length > 0);

  if (normalized.length === 0) return null;

  const gridCols = props.gridCols ?? "grid-cols-1 sm:grid-cols-2";

  return (
    <section
      className={[
        "mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm",
        props.className ?? "",
      ].join(" ")}
    >
      <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
        {heading}
      </h2>

      <div className={`mt-4 grid ${gridCols} gap-3`}>
        {normalized.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="block rounded-xl border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50"
          >
            <div className="text-sm font-semibold text-slate-900">
              {it.title ?? it.label ?? it.href}
              <span className="ml-1 text-slate-500">→</span>
            </div>
            {it.description ? (
              <div className="mt-1 text-sm text-slate-600">{it.description}</div>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
