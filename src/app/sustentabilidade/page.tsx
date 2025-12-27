import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sustentabilidade | Reciclativa",
  description:
    "Hábitos sustentáveis, consumo consciente e práticas para reduzir impacto ambiental no dia a dia.",
  alternates: { canonical: "/sustentabilidade" },
  openGraph: {
    title: "Sustentabilidade | Reciclativa",
    description:
      "Ideias práticas para reduzir impacto, reaproveitar recursos e tomar decisões mais conscientes.",
    url: "/sustentabilidade",
    type: "article",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO com imagem */}
      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.webp')" }}
          aria-hidden
        />
        {/* overlay para legibilidade */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white"
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-10 pt-40 sm:px-6 sm:pt-40 lg:px-8 lg:pt-36">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Reciclativa
          </p>

          <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Sustentabilidade: hábitos e consumo consciente
          </h1>

          <p className="mt-4 max-w-3xl text-sm text-slate-700 sm:text-base">
            Ideias práticas para reduzir impacto, reaproveitar recursos e tomar
            decisões mais conscientes.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
            >
              Voltar para a Home
            </Link>

            <Link
              href="/guias"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Ver guias
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
                <span aria-hidden className="text-slate-400">
                  /
                </span>
                <Link href="/sustentabilidade" className="hover:underline">
                  Sustentabilidade
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900">
              Conteúdo em construção
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Esta rota foi criada para remover 404 e servir de base para uma
              página pilar/guia. Em seguida, vamos incluir seções práticas,
              checklist, FAQ e links internos.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Hábitos sustentáveis
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Redução de desperdício, reuso e escolhas diárias.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Consumo consciente
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Como comprar melhor, descartar certo e evitar excesso.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Checklist rápido
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Um passo a passo simples para aplicar já.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Leituras recomendadas
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Links internos para guias e artigos relacionados.
                </p>
              </div>
            </div>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Próximos passos
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• Criar FAQ (SEO) nesta página</li>
              <li>• Adicionar links internos para guias e blog</li>
              <li>• Montar checklist “comece hoje”</li>
            </ul>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                Dica rápida
              </p>
              <p className="mt-2 text-sm text-slate-800">
                Comece reduzindo: menos descarte sempre vence “reciclar mais”.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
