import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

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
            Sustentabilidade: hábitos e consumo consciente
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Ideias práticas para reduzir impacto, reaproveitar recursos e tomar
            decisões mais conscientes.
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
                <span className="font-medium text-slate-700">Sustentabilidade</span>
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
            {/* Bloco de abertura (prioridade 1) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                Sustentabilidade na prática (sem complicar)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Sustentabilidade é tomar decisões melhores no dia a dia: reduzir desperdício,
                reusar antes de descartar e consumir com mais intenção. Nesta página você
                encontra um mapa simples do que realmente muda resultado — em casa, na escola
                e no trabalho.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Hábitos</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Redução de desperdício, reuso e escolhas do cotidiano.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Consumo</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Comprar melhor, descartar certo e evitar rejeito.
                  </p>
                </div>
              </div>
            </div>

            {/* Seção base */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Onde começar (3 passos)
              </h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <strong>Reduzir:</strong> compre menos, planeje, evite descartáveis quando possível.
                </li>
                <li>
                  <strong>Reusar e reparar:</strong> estenda a vida útil antes de pensar em reciclar.
                </li>
                <li>
                  <strong>Separar certo:</strong> reciclável seco, orgânico separado e rejeito minimizado.
                </li>
              </ol>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/economia-circular"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Entender economia circular →
                </Link>
                <Link
                  href="/coleta-seletiva"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver coleta seletiva →
                </Link>
              </div>
            </div>

            {/* Leituras recomendadas */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Leituras recomendadas
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Páginas internas que se conectam diretamente com sustentabilidade.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/residuos-solidos"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Resíduos sólidos →
                </Link>
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
                  Guias práticos →
                </Link>
                <Link
                  href="/faq"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  FAQ →
                </Link>
              </div>
            </div>

            {/* CTA Profissionais */}
            <ProfissionaisCta />

            {/* CTA Anuncie */}
            <AdCtaCard />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* FAQ rápido (substitui “Próximos passos”) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                FAQ rápido
              </h3>

              <div className="mt-4 space-y-4 text-sm text-slate-700">
                <div>
                  <p className="font-semibold text-slate-900">
                    Sustentabilidade é só reciclar?
                  </p>
                  <p className="mt-1">
                    Reciclar ajuda, mas a ordem mais eficiente é: reduzir, reusar/reparar e,
                    por fim, separar corretamente para reciclagem.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    O que mais dá resultado no dia a dia?
                  </p>
                  <p className="mt-1">
                    Evitar descartáveis, planejar compras e reduzir desperdício de alimentos
                    costuma ter impacto maior do que pequenas trocas.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Como evitar “contaminar” a reciclagem?
                  </p>
                  <p className="mt-1">
                    Remova excesso de sujeira, mantenha recicláveis secos e não misture com
                    orgânicos. Use a coleta seletiva local como referência.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/guias/coleta-seletiva"
                  className="inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Coleta seletiva →
                </Link>
                <Link
                  href="/residuos-solidos"
                  className="inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Resíduos sólidos →
                </Link>
                <Link
                  href="/simbolos-da-reciclagem"
                  className="inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Símbolos →
                </Link>
              </div>
            </div>

            {/* Checklist “comece hoje” */}
            <div className="rounded-3xl border border-slate-200 bg-emerald-50/50 p-6">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Comece hoje (checklist)
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Leve ecobag e evite descartáveis (copos/talheres/canudos).</li>
                <li>Planeje compras e reduza desperdício de alimentos.</li>
                <li>Separe recicláveis secos e mantenha orgânicos à parte.</li>
                <li>Repare e doe antes de descartar (roupas, eletrônicos, móveis).</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Links úteis
              </h3>
              <div className="mt-4 space-y-3">
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
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Página pilar: Reciclagem →
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica rápida
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Comece reduzindo: menos descarte sempre vence “reciclar mais”.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
