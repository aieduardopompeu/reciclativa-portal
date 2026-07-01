import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "Meio Ambiente | Reciclativa",
  description:
    "Meio ambiente: principais causas de impacto urbano, hábitos sustentáveis e práticas para reduzir resíduos e poluição no dia a dia.",
  alternates: { canonical: "/meio-ambiente" },
  openGraph: {
    title: "Meio Ambiente | Reciclativa",
    description:
      "Conceitos, impactos e práticas para reduzir resíduos, poluição e desperdício.",
    url: "/meio-ambiente",
    type: "article",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
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
            Meio ambiente: impacto, hábitos e soluções possíveis
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Conceitos essenciais e práticas aplicáveis para reduzir resíduos,
            poluição e desperdício com ações simples no dia a dia.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voltar para a Home
            </Link>

            <Link
              href="/sustentabilidade"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Ver sustentabilidade
            </Link>
          </div>

          <nav className="mt-8 text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">Meio ambiente</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                Meio ambiente: o que podemos fazer na prática
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Cuidar do meio ambiente não depende de grandes gestos. Na maioria dos casos, as ações
                mais eficazes são simples: separar resíduos corretamente, reduzir o que é descartado
                e reutilizar antes de reciclar. Pequenas mudanças de rotina, quando praticadas por
                muitas pessoas, geram impacto real na redução de resíduos e poluição.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Esta página reúne conceitos essenciais e caminhos práticos para quem quer entender
                melhor o tema e aplicar no dia a dia — em casa, no trabalho ou na escola.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Impactos e causas
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Poluição, descarte incorreto e consumo: o que mais pesa e
                    como reduzir.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Soluções práticas
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Reduzir, reusar, reparar e separar corretamente antes de
                    pensar em “reciclar depois”.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Hábitos sustentáveis
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Pequenas rotinas que viram cultura: compras, reuso e
                    descarte consciente.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Educação ambiental
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Como criar hábitos e projetos em escola, condomínio e
                    empresas.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Principais causas de impacto ambiental urbano
              </h2>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Descarte incorreto</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Resíduos misturados sem separação vão inteiros para aterros, mesmo quando boa
                    parte poderia ser reciclada ou compostada — reduzindo a vida útil dos aterros e
                    aumentando custos de gestão urbana.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Consumo sem planejamento</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Compra por impulso e desperdício de alimentos aumentam a geração de resíduos
                    antes mesmo do descarte — o primeiro ponto de melhoria costuma ser reduzir, não
                    reciclar mais.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Poluição de solo e água
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Descarte irregular de resíduos (inclusive e-lixo e produtos químicos) pode
                    contaminar solo e lençóis freáticos quando não segue rotas de coleta
                    adequadas.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Leituras recomendadas
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/sustentabilidade"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Sustentabilidade →
                </Link>
                <Link
                  href="/economia-circular"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Economia circular →
                </Link>
                <Link
                  href="/residuos-solidos"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Resíduos sólidos →
                </Link>
                <Link
                  href="/educacao-ambiental"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Educação ambiental →
                </Link>
              </div>
            </div>

            <ProfissionaisCta />
            <AdCtaCard />
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                FAQ rápido
              </h3>
              <div className="mt-4 space-y-4 text-sm text-slate-700">
                <div>
                  <p className="font-semibold text-slate-900">
                    O que tem maior impacto: reciclar ou reduzir?
                  </p>
                  <p className="mt-1">
                    Reduzir. Evitar que o resíduo exista tem impacto maior do que dar destinação
                    correta a ele depois de gerado.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Descarte incorreto de e-lixo contamina o solo?
                  </p>
                  <p className="mt-1">
                    Pode, sim — componentes eletrônicos têm metais pesados que exigem descarte em
                    pontos de coleta específicos, não no lixo comum.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Links úteis
              </h3>

              <div className="mt-4 space-y-3">
                <Link
                  href="/sustentabilidade"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Sustentabilidade →
                </Link>
                <Link
                  href="/economia-circular"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Economia circular →
                </Link>
                <Link
                  href="/guias/coleta-seletiva"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Coleta seletiva →
                </Link>
                <Link
                  href="/residuos-solidos"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Resíduos sólidos →
                </Link>
                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Blog →
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica rápida
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  O maior ganho costuma vir de reduzir desperdício e contaminação
                  — antes de depender da reciclagem.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
