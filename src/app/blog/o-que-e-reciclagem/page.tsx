// src/app/blog/o-que-e-reciclagem/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

const SLUG = "o-que-e-reciclagem";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "O que é reciclagem: conceito, etapas e por que isso muda tudo | Reciclativa",
  description:
    "Entenda o que é reciclagem, como funciona (etapas), por que nem tudo recicla, o papel da coleta seletiva e como separar corretamente para aumentar o reaproveitamento.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "O que é reciclagem: conceito, etapas e por que isso muda tudo",
    description:
      "Guia completo para entender reciclagem: conceito, etapas, benefícios, limites e como separar resíduos na prática sem erro.",
    url: `/blog/${SLUG}`,
    type: "article",
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <ArticleJsonLd
        siteUrl={SITE_URL}
        url={URL}
        headline="O que é reciclagem: conceito, etapas e por que isso muda tudo"
        description="Entenda o que é reciclagem, como funciona na prática (etapas), por que nem tudo recicla e como separar corretamente para aumentar o reaproveitamento."
        datePublished="2025-12-01"
      />

      {/* Breadcrumb */}
      <div className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">O que é reciclagem</span>
      </div>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
          Reciclagem
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          O que é reciclagem: conceito, etapas e por que isso muda tudo
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Reciclagem é o processo de transformar resíduos em matéria-prima para criar novos produtos.
          Parece simples, mas na prática depende de separação correta, triagem, logística e indústria.
          Neste guia você vai entender o conceito, as etapas e por que “nem tudo recicla” em toda cidade.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/o-que-pode-ser-reciclado"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver lista: o que pode ser reciclado
          </Link>
          <Link
            href="/blog/coleta-seletiva-no-brasil"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: coleta seletiva no Brasil
          </Link>
        </div>
      </header>

      {/* Conteúdo (padrão ITAD: sem prose) */}
      <section className="mt-10">
        <article className="mx-auto max-w-3xl">
          {/* Box editorial: resumo rápido */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Em 30 segundos
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                Reciclagem é transformar resíduo em <strong className="text-slate-900">matéria-prima</strong>{" "}
                para fabricar novos produtos.
              </li>
              <li>
                Para acontecer de verdade, precisa de <strong className="text-slate-900">separação correta</strong>,{" "}
                <strong className="text-slate-900">triagem</strong> e <strong className="text-slate-900">indústria</strong>.
              </li>
              <li>
                O principal inimigo é <strong className="text-slate-900">contaminação</strong> (comida, líquido, gordura)
                — pode inviabilizar cargas inteiras.
              </li>
            </ul>
          </div>

          {/* Tipografia editorial (igual padrão do ITAD) */}
          <div
            className={[
              "mt-10 text-slate-800 leading-relaxed",
              "space-y-5",

              // H2/H3
              "[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-slate-900",
              "[&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-slate-900",

              // parágrafos
              "[&_p]:text-base [&_p]:leading-relaxed",
              "[&_strong]:font-semibold [&_strong]:text-slate-900",

              // listas
              "[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6",
              "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6",
              "[&_li]:mt-2",

              // links
              "[&_a]:font-semibold [&_a]:text-emerald-700 hover:[&_a]:underline",
            ].join(" ")}
          >
            <h2>O que é reciclagem (definição simples)</h2>
            <p>
              Reciclagem é transformar um resíduo em <strong>matéria-prima</strong> para fabricar outro produto.
              O objetivo é reduzir o uso de recursos naturais, diminuir a quantidade de lixo enviada a aterros
              e recuperar valor econômico de materiais.
            </p>

            <h2>Reciclar não é a mesma coisa que reutilizar</h2>
            <ul>
              <li>
                <strong>Reutilizar:</strong> usar o mesmo item novamente (ex.: pote virando recipiente).
              </li>
              <li>
                <strong>Reciclar:</strong> transformar o material para virar outro produto (ex.: garrafa PET virando fibra).
              </li>
            </ul>

            <h2>As etapas da reciclagem (como funciona na prática)</h2>
            <ol>
              <li>
                <strong>Separação na origem:</strong> você separa recicláveis (secos) do orgânico/rejeito.
              </li>
              <li>
                <strong>Coleta:</strong> por coleta seletiva, PEV/ecoponto ou entrega em cooperativas.
              </li>
              <li>
                <strong>Triagem:</strong> separação por material e qualidade (papel, plástico, metal, vidro).
              </li>
              <li>
                <strong>Beneficiamento:</strong> limpeza, compactação, trituração, prensagem, etc.
              </li>
              <li>
                <strong>Indústria:</strong> o material vira matéria-prima e entra na fabricação de novos produtos.
              </li>
            </ol>

            <h2>Por que “nem tudo recicla” (mesmo quando parece reciclável)</h2>
            <p>Existem três motivos principais:</p>
            <ul>
              <li>
                <strong>Infraestrutura local:</strong> nem toda cidade tem triagem e cadeia industrial para todos os materiais.
              </li>
              <li>
                <strong>Contaminação:</strong> comida, líquidos e gordura podem inviabilizar cargas inteiras.
              </li>
              <li>
                <strong>Material misturado:</strong> embalagens multicamadas e metalizadas são mais difíceis de processar.
              </li>
            </ul>

            <h2>O que você pode fazer para “a reciclagem acontecer de verdade”</h2>

            <h3>1) Separe o básico (sem complicar)</h3>
            <ul>
              <li>
                <strong>Recicláveis secos:</strong> papel, plástico, metal e vidro (quando aceito na sua região).
              </li>
              <li>
                <strong>Orgânico/rejeito:</strong> restos de comida, papel sujo, itens sem reciclagem local.
              </li>
            </ul>

            <h3>2) Evite contaminação</h3>
            <ul>
              <li>Retire excesso de alimento e líquidos.</li>
              <li>Não precisa lavar “perfeito”; o objetivo é reduzir sujeira e manter seco.</li>
              <li>Papel engordurado costuma virar rejeito.</li>
            </ul>

            <h3>3) Descarte itens especiais separadamente</h3>
            <ul>
              <li>
                <strong>E-lixo:</strong> eletrônicos, cabos, carregadores —{" "}
                <Link href="/blog/lixo-eletronico-descarte">veja o guia</Link>.
              </li>
              <li>
                <strong>Pilhas e baterias:</strong> pontos de coleta específicos (logística reversa).
              </li>
              <li>
                <strong>Lâmpadas:</strong> descarte específico em ecopontos/PEVs.
              </li>
            </ul>

            <h2>Benefícios da reciclagem (sem exageros)</h2>
            <ul>
              <li>
                <strong>Redução de resíduos</strong> enviados para aterros.
              </li>
              <li>
                <strong>Recuperação de materiais</strong> e economia de recursos.
              </li>
              <li>
                <strong>Geração de valor</strong> na cadeia de triagem e reciclagem.
              </li>
            </ul>

            <h2>Onde a reciclagem “encaixa” na economia circular</h2>
            <p>
              Reciclagem é parte de um sistema maior. Em geral, a ordem mais eficiente é:
              <strong> reduzir → reutilizar → reparar → reciclar</strong>. Veja uma visão completa:{" "}
              <Link href="/blog/economia-circular-e-linear">economia circular vs. economia linear</Link>.
            </p>
          </div>

          {/* Links úteis (padrão ITAD: componente) */}
          <div className="mt-10">
            <RecommendedLinks
              links={[
                {
                  href: "/blog/o-que-pode-ser-reciclado",
                  title: "O que pode ser reciclado (lista prática)",
                  description: "Checklist direto, com exemplos e dicas para evitar contaminação.",
                },
                {
                  href: "/blog/coleta-seletiva-no-brasil",
                  title: "Coleta seletiva no Brasil",
                  description: "O que fazer quando a coleta não existe ou não é consistente.",
                },
                {
                  href: "/blog/cores-da-coleta-seletiva",
                  title: "Cores da coleta seletiva",
                  description: "Padrão mais comum, variações e como não se confundir.",
                },
                {
                  href: "/blog/tipos-de-reciclagem",
                  title: "Tipos de reciclagem",
                  description: "Quais são e como funcionam (mecânica, química, energética etc.).",
                },
                {
                  href: "/reciclagem",
                  title: "Página pilar: Reciclagem",
                  description: "Visão geral do tema com conteúdos conectados.",
                },
              ]}
            />
          </div>

          {/* FAQ (padrão ITAD: box) */}
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              FAQ: dúvidas comuns sobre reciclagem
            </h2>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Reciclar é suficiente para “resolver o lixo”?
                </h3>
                <p className="mt-2">
                  Não. Reciclagem é importante, mas reduzir e reutilizar geralmente têm impacto maior,
                  porque evitam gerar resíduo.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Preciso lavar embalagens antes de reciclar?
                </h3>
                <p className="mt-2">
                  Em geral, não precisa lavar “perfeito”. Retirar excesso de comida e líquidos e manter
                  seco já ajuda muito.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Por que papel com gordura não recicla?
                </h3>
                <p className="mt-2">
                  A gordura contamina as fibras e dificulta o processo. Dependendo do caso, pode ir para
                  orgânico ou rejeito.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Se não existe coleta seletiva no meu bairro, como faço?
                </h3>
                <p className="mt-2">
                  Procure ecopontos/PEVs e cooperativas. Veja o guia:{" "}
                  <Link href="/blog/coleta-seletiva-no-brasil">coleta seletiva no Brasil</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* CTA final (mantido no padrão do site) */}
          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Próximo passo recomendado
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Para aplicar o básico sem errar, use a lista prática do que pode ser reciclado, com exemplos
              e dicas para evitar contaminação.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog/o-que-pode-ser-reciclado"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Ver lista: o que pode ser reciclado
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Voltar ao Blog
              </Link>
            </div>
          </section>
        </article>
      </section>
    </main>
  );
}
