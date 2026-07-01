import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "Economia Circular | Reciclativa",
  description:
    "Economia circular: reduzir, reusar, reparar e reciclar — conceito, exemplos práticos e como aplicar em casa ou no negócio.",
  alternates: { canonical: "/economia-circular" },
  openGraph: {
    title: "Economia Circular | Reciclativa",
    description:
      "Reduzir, reusar, reparar e reciclar: conceito, exemplos práticos e modelos de negócio circulares.",
    url: "/economia-circular",
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
            Economia circular: reuso, reparo e reciclagem
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Como produtos e materiais podem circular mais tempo, reduzindo lixo e custo.
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

          <nav className="mt-8 text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">Economia circular</span>
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
                O que é economia circular (de verdade)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Economia circular é um modelo de produção e consumo que busca manter materiais e
                produtos em uso pelo maior tempo possível, em vez de descartá-los depois de um
                único uso. Na prática, isso significa priorizar reduzir, reusar, reparar e
                remanufaturar — e só depois reciclar o que realmente não tem mais uso possível.
                O objetivo final é reduzir a extração de recursos naturais e a geração de
                resíduos ao mesmo tempo.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Reuso e reparo</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Estender a vida útil antes de reciclar: manutenção e conserto.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Modelos circulares</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Logística reversa, remanufatura e serviços que reduzem desperdício.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Circular x linear (a diferença que importa)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                O modelo tradicional de produção é linear: extrair matéria-prima, produzir,
                consumir e descartar. Esse fluxo de mão única esgota recursos naturais e gera
                cada vez mais lixo, porque o valor do material é usado uma única vez. O modelo
                circular reorganiza essa lógica: produtos são desenhados para durar mais, ser
                reparados com facilidade e, quando chegam ao fim de vida, seus materiais voltam
                ao ciclo produtivo em vez de irem para o aterro.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <strong>Modelo linear:</strong> extrair → produzir → consumir → descartar.
                </li>
                <li>
                  <strong>Modelo circular:</strong> desenhar para durar, reusar, reparar e
                  reinserir materiais no ciclo produtivo.
                </li>
                <li>
                  <strong>Reciclagem é parte do ciclo</strong> — mas é a última etapa, não a
                  primeira solução. Reduzir e reusar evitam que o resíduo exista.
                </li>
              </ul>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/sustentabilidade"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver sustentabilidade →
                </Link>
                <Link
                  href="/residuos-solidos"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver resíduos sólidos →
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Como aplicar no dia a dia e no negócio
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Em casa, economia circular aparece em decisões simples: comprar produtos mais
                duráveis, consertar em vez de trocar, doar o que ainda funciona e comprar usado
                quando possível. Em empresas, o modelo se traduz em logística reversa (recolher
                embalagens ou produtos pós-consumo), remanufatura (recondicionar peças e
                equipamentos) e serviços que substituem a posse pelo uso, como aluguel e
                compartilhamento — reduzindo a necessidade de fabricar itens novos.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Leituras recomendadas
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Continue por estas páginas internas (melhor sequência de aprendizado).
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Página pilar: Reciclagem →
                </Link>
                <Link
                  href="/guias/coleta-seletiva"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Coleta seletiva →
                </Link>
                <Link
                  href="/guias"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Guias práticos →
                </Link>
                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver blog →
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
                    Economia circular é a mesma coisa que reciclagem?
                  </p>
                  <p className="mt-1">
                    Não. Reciclagem é uma das etapas do ciclo, geralmente a última. Reduzir,
                    reusar e reparar costumam ter impacto ambiental maior.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Isso só se aplica a empresas grandes?
                  </p>
                  <p className="mt-1">
                    Não — pequenos negócios e pessoas físicas também aplicam economia circular ao
                    reparar, doar, comprar usado ou compartilhar em vez de comprar novo.
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
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Página pilar: Reciclagem →
                </Link>
                <Link
                  href="/guias"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver guias →
                </Link>
                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver blog →
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica rápida
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Circularidade começa antes da reciclagem: reduzir, reusar e
                  reparar costuma gerar mais impacto.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
