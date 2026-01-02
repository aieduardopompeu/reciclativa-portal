import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "FAQ | Reciclativa",
  description:
    "Perguntas frequentes sobre reciclagem, coleta seletiva, símbolos da reciclagem e descarte correto.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Reciclativa",
    description:
      "Respostas diretas para dúvidas comuns sobre reciclagem, coleta seletiva e descarte.",
    url: "/faq",
    type: "website",
  },
};

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "O que é reciclagem, na prática?",
    a: "É o processo de transformar resíduos em matéria-prima para novos produtos. Na prática, o que mais ajuda é separar corretamente, manter seco e evitar contaminação (restos de comida, gordura e líquidos).",
  },
  {
    q: "Tudo que tem símbolo de reciclagem é reciclável?",
    a: "Não necessariamente. O símbolo pode indicar material, composição ou orientação de descarte, mas a aceitação depende da coleta/triagem local e da condição do item (limpo e seco).",
  },
  {
    q: "Precisa lavar as embalagens para reciclar?",
    a: "Não precisa “lavar perfeito”. O ideal é retirar excesso de comida e líquidos e manter seco. Se o material estiver muito contaminado (engordurado/cheio de restos), tende a virar rejeito na triagem.",
  },
  {
    q: "O que mais contamina a coleta seletiva?",
    a: "Orgânicos misturados com recicláveis, papel engordurado, embalagens com restos de comida e itens molhados. A contaminação aumenta o rejeito e prejudica a triagem.",
  },
  {
    q: "Qual é a regra de ouro para separar resíduos?",
    a: "Separar seco e limpo o suficiente para não contaminar: recicláveis de um lado; orgânicos e rejeitos do outro. Em dúvida, priorize reduzir rejeito e seguir a orientação local.",
  },
  {
    q: "O que fazer quando não existe coleta seletiva no meu bairro?",
    a: "Busque ecopontos, cooperativas, pontos de entrega voluntária (PEVs) e ações locais. Se nada existir, foque em reduzir e reusar; isso já diminui bastante o volume de rejeito.",
  },
  {
    q: "Isopor (PS) é reciclável?",
    a: "Depende do município/cooperativa. Em muitos lugares a aceitação é limitada. Quando aceito, precisa estar limpo e seco. Se estiver com restos de comida, tende a virar rejeito.",
  },
  {
    q: "Papel e papelão podem ir para reciclagem se estiverem úmidos ou engordurados?",
    a: "Em geral, não. Papel molhado ou engordurado costuma ser rejeito, porque compromete o processo e contamina outros materiais.",
  },
  {
    q: "Qual a diferença entre reciclagem e economia circular?",
    a: "Reciclagem é uma etapa do fim do ciclo. Economia circular começa antes: reduzir, reusar, reparar e manter materiais em uso pelo máximo de tempo possível.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
      <summary className="cursor-pointer list-none text-sm font-extrabold text-slate-900">
        <span className="align-middle">{q}</span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{a}</p>
    </details>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO padrão */}
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
            FAQ: dúvidas frequentes
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Respostas diretas para as dúvidas mais comuns sobre reciclagem,
            coleta seletiva, símbolos e descarte correto.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/reciclagem"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Página pilar: Reciclagem
            </Link>

            <Link
              href="/guias"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Ver guias
            </Link>
          </div>

          {/* Breadcrumb */}
          <nav className="mt-8 text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">FAQ</span>
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
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Perguntas e respostas
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Clique para abrir cada resposta. Conteúdo direto, sem enrolação.
                  </p>
                </div>

                <Link
                  href="/simbolos-da-reciclagem"
                  className="inline-flex w-fit items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Ver símbolos →
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                {FAQS.map((f) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} />
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Ainda com dúvida?
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  Se a sua dúvida for específica da sua cidade/UF, o caminho mais
                  seguro é consultar a regra local e os pontos de coleta disponíveis.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/coleta-seletiva"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                  >
                    Ver coleta seletiva
                  </Link>
                  <Link
                    href="/contato"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Falar com a Reciclativa
                  </Link>
                </div>
              </div>
            </div>

            {/* CTAs padrão do portal */}
            <ProfissionaisCta />
            <AdCtaCard />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Atalhos úteis
              </h3>

              <div className="mt-4 space-y-3">
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Reciclagem →
                </Link>
                <Link
                  href="/coleta-seletiva"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Coleta seletiva →
                </Link>
                <Link
                  href="/simbolos-da-reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Símbolos da reciclagem →
                </Link>
                <Link
                  href="/guias"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Guias →
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica rápida
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  O que mais “resolve” é reduzir contaminação: seco, sem resto de
                  comida e bem separado.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
