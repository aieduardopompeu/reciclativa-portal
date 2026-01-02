import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "Sustentabilidade | Reciclativa",
  description:
    "HÃ¡bitos sustentÃ¡veis, consumo consciente e prÃ¡ticas para reduzir impacto ambiental no dia a dia.",
  alternates: { canonical: "/sustentabilidade" },
  openGraph: {
    title: "Sustentabilidade | Reciclativa",
    description:
      "Ideias prÃ¡ticas para reduzir impacto, reaproveitar recursos e tomar decisÃµes mais conscientes.",
    url: "/sustentabilidade",
    type: "article",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO com imagem */}
      <header className="relative overflow-hidden border-b border-slate-200">
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

        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Reciclativa
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Sustentabilidade: hÃ¡bitos e consumo consciente
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Ideias prÃ¡ticas para reduzir impacto, reaproveitar recursos e tomar
            decisÃµes mais conscientes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voltar para a Home
            </Link>

            <Link
              href="/guias"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
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
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">
                  Sustentabilidade
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* ConteÃºdo */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Coluna principal */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                ConteÃºdo em construÃ§Ã£o
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Esta rota foi criada para remover 404 e servir de base para uma
                pÃ¡gina pilar/guia. Em seguida, vamos incluir seÃ§Ãµes prÃ¡ticas,
                checklist, FAQ e links internos.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    HÃ¡bitos sustentÃ¡veis
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    ReduÃ§Ã£o de desperdÃ­cio, reuso e escolhas do dia a dia.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Consumo consciente
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Como comprar melhor, descartar certo e evitar rejeito.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Profissionais */}
            <ProfissionaisCta />

            {/* CTA Anuncie */}
            <AdCtaCard />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                PrÃ³ximos passos
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Criar FAQ (SEO) nesta pÃ¡gina</li>
                <li>Adicionar links internos para guias e blog</li>
                <li>Montar checklist â€œcomece hojeâ€</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Links Ãºteis
              </h3>
              <div className="mt-4 space-y-3">
                <Link
                  href="/guias"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver guias â†’
                </Link>
                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver blog â†’
                </Link>
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  PÃ¡gina pilar: Reciclagem â†’
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica rÃ¡pida
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Comece reduzindo: menos descarte sempre vence â€œreciclar maisâ€.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
