import Link from "next/link";

type CardLinkProps = {
  href: string;
  title: string;
  description?: string;
};

export function CardLink({ href, title, description }: CardLinkProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <div className="font-medium text-slate-900 group-hover:text-slate-950">
        {title}
      </div>
      {description ? (
        <div className="mt-2 text-sm text-slate-600">{description}</div>
      ) : null}
    </Link>
  );
}
