import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guias práticos",
  description:
    "Coleção de guias e checklists para aplicar reciclagem e sustentabilidade no dia a dia.",
  alternates: { canonical: "/guias" },
};

const GUIDES = [
  {
    title: "Coleta seletiva: como começar",
    desc: "Categorias, erros comuns e checklist para separar resíduos do jeito certo.",
    href: "/guias/coleta-seletiva",
    tag: "Guia",
  },
  {
    title: "O que pode (e não pode) reciclar",
    desc: "Checklist prático para reduzir contaminação e aumentar reaproveitamento.",
    href: "/guias/o-que-pode-reciclar",
    tag: "Checklist",
  },
  {
    title: "Símbolos da reciclagem (o que significam)",
    desc: "Entenda os símbolos nas embalagens e como descartar com segurança.",
    href: "/simbolos-da-reciclagem",
    tag: "Essencial",
  },
];

function Card({
  title,
  desc,
  href,
  tag,
}: {
  title: string;
  desc: string;
  href: string;
  tag?: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm transition hover:bg-white hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-950 group-hover:text-emerald-900">
            {title}
          </h3>
          {tag ? (
            <p className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              {tag}
            </p>
          ) : null}
        </div>

        <span className="text-slate-300 transition group-hover:text-emerald-400">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="currentColor"
              d="M10 6l6 6-6 6-1.4-1.4L13.2 12 8.6 7.4 10 6Z"
            />
          </svg>
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-700">{desc}</p>
    </Link>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO (claro, igual o padrão do site) */}
      <header className="border-b border-slate-200 bg-emerald-50/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Guias
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Guias práticos para fazer certo
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-700 sm:text-base">
            Checklists e passo a passo para aplicar reciclagem e sustentabilidade
            sem complicação.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Voltar para a Home
            </Link>
            <Link
              href="/reciclagem"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Começar por Reciclagem
            </Link>
          </div>
        </div>
      </header>

      {/* LISTA */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">Destaques</h2>
            <p className="mt-2 text-sm text-slate-700">
              Páginas-base já publicadas (sem 404).
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 sm:inline-flex"
          >
            Ir para o Blog
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {GUIDES.map((g) => (
            <Card
              key={g.href}
              title={g.title}
              desc={g.desc}
              href={g.href}
              tag={g.tag}
            />
          ))}
        </div>

        {/* Próximos passos (SEO/arquitetura) */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-6">
          <p className="text-sm font-semibold text-slate-950">Próximos passos</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>• Criar FAQ (SEO) em cada guia</li>
            <li>• Adicionar links internos para pilares e posts relacionados</li>
            <li>• Montar checklists “comece hoje”</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
