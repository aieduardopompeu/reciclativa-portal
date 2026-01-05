import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "Coleta Seletiva | Reciclativa",
  description:
    "Coleta seletiva: como separar, cores, fluxo e boas práticas para reduzir contaminação e aumentar a reciclagem.",
  alternates: { canonical: "/guias/coleta-seletiva" },
  openGraph: {
    title: "Coleta Seletiva | Reciclativa",
    description:
      "Cores, dicas e organização para tornar a separação eficiente e correta.",
    url: "/coleta-seletiva",
    type: "article",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO com imagem (padrão do site) */}
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
            Coleta seletiva: como separar sem erro
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Um guia prático para organizar a separação, reduzir contaminação e
            aumentar a chance de o material ser realmente reciclado.
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
                <span className="font-medium text-slate-700">Coleta seletiva</span>
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
            {/* Bloco de abertura */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                O que você vai aprender aqui
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                A coleta seletiva funciona melhor quando a separação é simples e
                consistente: manter recicláveis secos, evitar contaminação e seguir
                as regras locais (que podem variar por cidade/operador). Este guia
                reúne o essencial para você separar com segurança e reduzir rejeito.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Separação</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Seco x orgânico x rejeito, sem complicar.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Cores</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Padrões por material e variações locais.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Boas práticas</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Como evitar contaminação na triagem.
                  </p>
                </div>
              </div>
            </div>

            {/* Comece pelo essencial */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Comece pelo essencial (rápido)
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <strong>Reciclável seco:</strong> se está com resto de comida/óleo, tende a virar rejeito.
                </li>
                <li>
                  <strong>Não precisa lavar “perfeito”:</strong> remover excesso e manter seco já melhora muito.
                </li>
                <li>
                  <strong>Regra local manda:</strong> alguns materiais são aceitos em um lugar e recusados em outro.
                </li>
              </ul>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/simbolos-da-reciclagem"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver símbolos da reciclagem →
                </Link>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver FAQ →
                </Link>
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                  Nota importante
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Este guia é educativo e prático. Para materiais específicos e dias/rotas de coleta,
                  confirme as regras do seu município, cooperativa ou operadora local.
                </p>
              </div>
            </div>

            {/* Cores da coleta seletiva */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Cores da coleta seletiva (padrão mais comum)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                As cores podem variar por projeto/local, mas este é o padrão mais difundido.
                Se na sua cidade a coleta for “seco x orgânico”, priorize essa separação.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Azul — Papel</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Folhas, jornais, caixas secas (evite papel sujo/engordurado).
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Vermelho — Plástico</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Garrafas, potes, embalagens (seco, sem resto de comida).
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Verde — Vidro</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Garrafas e potes. Embale vidro quebrado para segurança.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Amarelo — Metal</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Latas e metais limpos. Evite perfurocortantes soltos.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">Atalho que funciona quase sempre</p>
                <p className="mt-2 text-sm text-slate-700">
                  Se você só conseguir fazer uma coisa: separe <strong>orgânico</strong> do <strong>seco</strong>,
                  mantendo o seco sem restos de alimento. Isso reduz contaminação e aumenta reaproveitamento.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Checklist “comece hoje” (5 minutos)
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Separe 2 recipientes: orgânico e seco (reciclável).",
                  "Mantenha recicláveis secos (principalmente papel).",
                  "Remova excesso de comida/óleo das embalagens.",
                  "Amasse garrafas PET e caixas (economiza espaço).",
                  "Embale vidro quebrado com segurança e identifique.",
                  "Verifique as regras locais para materiais “duvidosos”.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-sm text-slate-800">• {item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/reciclagem"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ir para o pilar: Reciclagem →
                </Link>
                <Link
                  href="/guias"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver mais guias →
                </Link>
              </div>
            </div>

            {/* Erros comuns */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Erros comuns que viram rejeito (e como evitar)
              </h2>

              <div className="mt-4 space-y-3">
                {[
                  {
                    t: "Reciclável com resto de comida",
                    d: "Remova o excesso e mantenha seco. Contaminação faz o material perder valor na triagem.",
                  },
                  {
                    t: "Misturar orgânico e seco na mesma sacola",
                    d: "Separe em dois recipientes. O “seco” contaminado tende a ser descartado.",
                  },
                  {
                    t: "Papel engordurado (ex.: pizza)",
                    d: "Geralmente não é reciclável. Se estiver limpo e seco, ok; se estiver engordurado, vira rejeito.",
                  },
                  {
                    t: "Vidro quebrado sem proteção",
                    d: "Embale em caixa ou jornal e identifique para evitar acidentes com coletores e cooperativas.",
                  },
                  {
                    t: "Materiais “dúbios” sem checar regra local",
                    d: "Alguns lugares aceitam isopor, outros não. Confirme antes para evitar contaminação do lote.",
                  },
                ].map((x) => (
                  <div key={x.t} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">{x.t}</p>
                    <p className="mt-2 text-sm text-slate-700">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leituras recomendadas */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Leituras recomendadas
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Para aprofundar, siga estes atalhos internos.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Página pilar: Reciclagem →
                </Link>
                <Link
                  href="/residuos-solidos"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Resíduos sólidos (classificação) →
                </Link>
                <Link
                  href="/economia-circular"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Economia circular →
                </Link>
                <Link
                  href="/guias"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Guias práticos →
                </Link>
              </div>
            </div>

            {/* FAQ (SEO + utilidade) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                FAQ: dúvidas rápidas sobre coleta seletiva
              </h2>

              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Precisa lavar todas as embalagens?
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    O importante é remover o excesso e manter seco, reduzindo cheiro e contaminação.
                    Não precisa “lavar perfeito”.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Papel toalha e guardanapo são recicláveis?
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Em geral, não. Principalmente se estiverem sujos/engordurados. Podem ir para orgânico (quando aplicável)
                    ou rejeito, conforme regra local.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Vidro sempre vai para a reciclagem?
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Em muitos locais, sim (garrafas e potes). Mas lâmpadas, espelhos e certos vidros exigem descarte específico.
                    Verifique a orientação local.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Isopor (EPS) pode ir no reciclável?
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Depende da cidade/cooperativa. Se for aceito, deve estar limpo e seco. Se não for aceito, vira rejeito.
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
                  Se você tiver dúvida, priorize separar <strong>orgânico</strong> do <strong>seco</strong> e mantenha o seco
                  sem resto de comida.
                </p>
              </div>
            </div>

            {/* Caixa de confiança (substitui “Próximos passos”) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Por que isso importa
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                A maior parte dos problemas da coleta seletiva vem de contaminação e mistura de materiais.
                Pequenas rotinas (separar seco do orgânico, manter seco e embalar vidro) aumentam muito
                a chance de reaproveitamento.
              </p>
              <div className="mt-4">
                <Link
                  href="/sustentabilidade"
                  className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver Sustentabilidade →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
