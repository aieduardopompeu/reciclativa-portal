// src/app/blog/economia-circular-exemplos/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://www.reciclativa.com";

const SLUG = "economia-circular-exemplos";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Economia circular no Brasil: exemplos práticos e como aplicar | Reciclativa",
  description:
    "Veja exemplos práticos de economia circular no Brasil: logística reversa, retornáveis, cooperativas, reciclagem, reuso e como aplicar no dia a dia e em empresas.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Economia circular no Brasil: exemplos práticos e como aplicar",
    description:
      "Exemplos práticos de economia circular no Brasil e um passo a passo para aplicar no dia a dia e em empresas, sem complicar.",
    url: URL,
    type: "article",
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <ArticleJsonLd
        siteUrl={SITE_URL}
        url={URL}
        headline="Economia circular no Brasil: exemplos práticos e como aplicar"
        description="Exemplos práticos de economia circular no Brasil: logística reversa, retornáveis, cooperativas e reciclagem, com passos para aplicar no dia a dia e em empresas."
        datePublished="2025-12-10"
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
        <span className="text-slate-700">Economia circular no Brasil</span>
      </div>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
          Economia circular
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Economia circular no Brasil: exemplos práticos e como aplicar
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Economia circular não é só “reciclar”. É desenhar e operar sistemas para reduzir
          desperdício, manter produtos em uso por mais tempo, recuperar materiais e fechar ciclos.
          Aqui você vai ver exemplos práticos (incluindo casos comuns no Brasil) e um roteiro para
          aplicar na vida real — em casa e em negócios.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/economia-circular-e-linear"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Entender conceito: circular vs. linear
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
                Um exemplo é “circular” quando prioriza <strong className="text-slate-900">reduzir</strong>,{" "}
                <strong className="text-slate-900">reutilizar</strong>, <strong className="text-slate-900">reparar</strong>,{" "}
                <strong className="text-slate-900">remanufaturar</strong>, <strong className="text-slate-900">reciclar</strong>{" "}
                ou <strong className="text-slate-900">regenerar</strong>.
              </li>
              <li>
                No Brasil, circularidade aparece muito em <strong className="text-slate-900">retornáveis/refil</strong>,{" "}
                <strong className="text-slate-900">cooperativas</strong> e <strong className="text-slate-900">logística reversa</strong>.
              </li>
              <li>
                Para começar: separar <strong className="text-slate-900">recicláveis secos</strong> + reduzir descartáveis
                e criar uma “caixa do descarte especial” (e-lixo, pilhas, baterias).
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
            <h2>O que torna um exemplo “circular” de verdade</h2>
            <p>
              Um exemplo é circular quando ele prioriza pelo menos um destes princípios:
              <strong> reduzir</strong> (menos material/energia), <strong>reutilizar</strong> (voltar a usar),
              <strong> reparar</strong> (prolongar vida útil), <strong> remanufaturar</strong> (reconstruir),
              <strong> reciclar</strong> (voltar a ser matéria-prima) e <strong> regenerar</strong> (orgânicos/solo).
            </p>

            <h2>Exemplos práticos comuns no Brasil</h2>

            <h3>1) Retornáveis e refil</h3>
            <p>
              Garrafas retornáveis e sistemas de refil são circularidade “na veia”: reduzem embalagem e
              mantêm o item em ciclos de uso.
            </p>
            <ul>
              <li>Retornáveis (bebidas) em redes e pequenos comércios.</li>
              <li>Refil de limpeza/higiene (quando existe na sua região).</li>
            </ul>

            <h3>2) Cooperativas e cadeia da reciclagem</h3>
            <p>
              Um motor real da circularidade no Brasil é o trabalho de triagem, prensagem e comercialização
              de recicláveis. Quanto melhor a separação na origem, maior a recuperação.
            </p>
            <ul>
              <li>Separar recicláveis secos e evitar contaminação aumenta a eficiência do sistema.</li>
              <li>Materiais com maior “valor” (ex.: latas, PET) tendem a ter cadeia mais sólida.</li>
            </ul>
            <p>
              Guia direto: <Link href="/blog/o-que-pode-ser-reciclado">o que pode ser reciclado</Link>.
            </p>

            <h3>3) Logística reversa (baterias, eletrônicos, lâmpadas)</h3>
            <p>
              Em vez de ir para o lixo comum, itens especiais voltam por canais específicos (pontos de
              coleta, ecopontos, campanhas e sistemas de recebimento).
            </p>
            <ul>
              <li>Celulares, cabos, carregadores e eletrônicos em geral.</li>
              <li>Pilhas e baterias em pontos de coleta.</li>
              <li>Lâmpadas com descarte específico.</li>
            </ul>
            <p>
              Veja: <Link href="/blog/lixo-eletronico-descarte">lixo eletrônico: descarte correto</Link>.
            </p>

            <h3>4) Reuso e mercado de segunda mão</h3>
            <p>
              Revenda, doação e reuso reduzem demanda por produção nova. É circularidade com alto impacto
              e custo baixo.
            </p>
            <ul>
              <li>Roupas, móveis, eletroportáteis e itens domésticos.</li>
              <li>Reparo simples (cabos, peças, ajustes) antes de trocar.</li>
            </ul>

            <h3>5) Orgânicos: compostagem e redução de desperdício</h3>
            <p>
              Uma parte grande do lixo doméstico é orgânica. Compostagem (doméstica ou comunitária) fecha
              um ciclo importante e reduz aterros.
            </p>
            <ul>
              <li>Separar orgânicos quando houver compostagem/coleta dedicada.</li>
              <li>Planejar compras e refeições para reduzir sobra.</li>
            </ul>
            <p>
              Complemento: <Link href="/blog/reduzir-lixo-na-rotina">reduzir lixo na rotina</Link>.
            </p>

            <h3>6) Construção civil: reaproveitamento e reciclagem de entulho</h3>
            <p>
              Em várias cidades, existe cadeia para reaproveitar parte dos resíduos de obra (quando separados
              e destinados corretamente). O problema geralmente é mistura e descarte irregular.
            </p>

            <h2>Como aplicar economia circular no dia a dia</h2>
            <ol>
              <li>
                <strong>Escolha 2 hábitos fixos:</strong> separar recicláveis secos + reduzir descartáveis.
              </li>
              <li>
                <strong>Troque 1 categoria por refil/retornável</strong> quando existir (limpeza/higiene).
              </li>
              <li>
                <strong>Crie a “caixa do descarte especial”</strong> (pilhas, baterias, cabos, e-lixo).
              </li>
              <li>
                <strong>Repare/reuse antes de comprar</strong> (pequenas manutenções e doação/venda).
              </li>
            </ol>

            <h2>Como aplicar em um negócio (sem ficar teórico)</h2>
            <ul>
              <li>
                <strong>Design/compra:</strong> priorize produtos duráveis, com refil, reparáveis e com menos mistura de materiais.
              </li>
              <li>
                <strong>Operação:</strong> padronize separação interna e destinação (cooperativa/ecoponto).
              </li>
              <li>
                <strong>Fornecedor:</strong> incentive retornáveis, reuso de embalagens e logística reversa.
              </li>
              <li>
                <strong>Indicadores:</strong> reduza “rejeito” e aumente % de material recuperado.
              </li>
            </ul>
          </div>

          {/* Links úteis (padrão ITAD: componente) */}
          <div className="mt-10">
            <RecommendedLinks
              links={[
                {
                  href: "/blog/economia-circular-e-linear",
                  title: "Economia circular vs. economia linear",
                  description: "Entenda o conceito e as diferenças com exemplos simples.",
                },
                {
                  href: "/blog/coleta-seletiva-no-brasil",
                  title: "Coleta seletiva no Brasil",
                  description: "O que fazer quando a coleta não é consistente na sua região.",
                },
                {
                  href: "/blog/o-que-pode-ser-reciclado",
                  title: "O que pode ser reciclado",
                  description: "Checklist prático para separar sem erro e evitar contaminação.",
                },
                {
                  href: "/blog/cores-da-coleta-seletiva",
                  title: "Cores da coleta seletiva",
                  description: "Padrão mais comum, variações e como não se confundir.",
                },
                {
                  href: "/reciclagem",
                  title: "Página pilar: Reciclagem",
                  description: "Conceitos, etapas e materiais mais comuns.",
                },
              ]}
            />
          </div>

          {/* FAQ (padrão ITAD: box) */}
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              FAQ: dúvidas comuns
            </h2>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Isso é a mesma coisa que reciclagem?
                </h3>
                <p className="mt-2">
                  Não. Reciclagem é uma parte. Circularidade começa antes: reduzir, reutilizar e reparar costumam gerar
                  impacto maior porque evitam produzir resíduo.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Se não existe coleta seletiva onde eu moro, ainda dá para fazer algo?
                </h3>
                <p className="mt-2">
                  Sim. Você pode separar recicláveis secos e levar a ecopontos/PEVs/cooperativas quando possível, além de
                  reduzir descartáveis e usar reuso/segunda mão.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Qual o melhor primeiro passo?</h3>
                <p className="mt-2">
                  Separar recicláveis secos sem contaminação + reduzir descartáveis. Depois, adicione refil/retornável e
                  a caixa do descarte especial (e-lixo, pilhas, baterias).
                </p>
              </div>
            </div>
          </div>

          {/* CTA final */}
          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Próximo passo recomendado
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Para transformar circularidade em ação concreta, use a lista prática do que pode ser reciclado
              e como evitar contaminação no descarte.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog/o-que-pode-ser-reciclado"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Ver: o que pode ser reciclado
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
