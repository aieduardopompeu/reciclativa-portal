import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "Guias | Reciclativa",
  description:
    "Coleção de guias e checklists para aplicar reciclagem e sustentabilidade no dia a dia.",
  alternates: { canonical: "/guias" },
  openGraph: {
    title: "Guias | Reciclativa",
    description:
      "Checklists e passo a passo para aplicar reciclagem e sustentabilidade sem complicação.",
    url: "/guias",
    type: "website",
  },
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
    title: "Compostagem: guia prático para começar",
    desc: "O que pode e não pode, métodos, passo a passo e soluções para problemas comuns.",
    href: "/guias/compostagem",
    tag: "Orgânicos",
  },
  {
    title: "Símbolos da reciclagem (o que significam)",
    desc: "Entenda os símbolos nas embalagens e como descartar com segurança.",
    href: "/simbolos-da-reciclagem",
    tag: "Essencial",
  },
];

function GuideCard({
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
      className="group block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {tag ? (
            <p className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              {tag}
            </p>
          ) : null}

          <p className="mt-2 text-sm font-semibold text-slate-900">{title}</p>
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

      <p className="mt-2 text-sm text-slate-700">{desc}</p>
      <p className="mt-3 text-sm font-semibold text-emerald-800">Abrir guia →</p>
    </Link>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO com imagem (mesmo padrão Sustentabilidade/Reciclagem) */}
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
            Guias práticos para fazer certo
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Checklists e passo a passo para aplicar reciclagem e sustentabilidade
            sem complicação.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voltar para a Home
            </Link>

            <Link
              href="/reciclagem"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Começar por Reciclagem
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
                <span className="font-medium text-slate-700">Guias</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* Conteúdo */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Coluna principal */}
          <div className="space-y-6 lg:col-span-2">
            {/* Destaques */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Destaques
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Se você está começando agora, siga esta ordem:{" "}
                    <strong>Coleta seletiva</strong> →{" "}
                    <strong>o que pode reciclar</strong> →{" "}
                    <strong>símbolos</strong>. Isso reduz erros e aumenta a chance de reaproveitamento.
                  </p>
                </div>

                <Link
                  href="/blog"
                  className="inline-flex w-fit items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Ir para o Blog
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {GUIDES.map((g) => (
                  <GuideCard
                    key={g.href}
                    title={g.title}
                    desc={g.desc}
                    href={g.href}
                    tag={g.tag}
                  />
                ))}
              </div>
            </div>

            {/* Como usar os guias (valor percebido) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Como usar estes guias (sem complicação)
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">1) Separe</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Comece por seco x orgânico e mantenha o seco sem restos de comida.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">2) Confira</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Use checklists para evitar os erros mais comuns (contaminação).
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">3) Ajuste</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Regras podem variar por cidade/cooperativa: confirme materiais “duvidosos”.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/sustentabilidade"
                  className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver Sustentabilidade →
                </Link>
                <Link
                  href="/reciclagem"
                  className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver Reciclagem →
                </Link>
                <Link
                  href="/faq"
                  className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver FAQ →
                </Link>
              </div>
            </div>

            {/* CTA Anuncie (mantido) */}
            <AdCtaCard />

            {/* CTA Profissionais */}
            <ProfissionaisCta />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Atalhos
              </h3>

              <div className="mt-4 space-y-3">
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Página pilar: Reciclagem →
                </Link>

                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver blog →
                </Link>

                <Link
                  href="/sustentabilidade"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Sustentabilidade →
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica rápida
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Se ficar na dúvida, priorize separar <strong>orgânico</strong> do <strong>seco</strong> e manter o seco
                  sem restos de comida.
                </p>
              </div>
            </div>

            {/* Bloco de confiança (sem bastidor) */}
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                Nota
              </p>
              <p className="mt-2 text-sm text-slate-800">
                Alguns materiais são aceitos em um lugar e recusados em outro. Para descarte por rota/dia e itens específicos,
                confirme as regras do seu município, cooperativa ou operadora local.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
