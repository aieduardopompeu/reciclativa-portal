// src/app/blog/economia-circular-e-linear/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

const SLUG = "economia-circular-e-linear";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Economia circular vs. economia linear: diferenças e exemplos | Reciclativa",
  description:
    "Entenda economia circular e linear na prática: principais diferenças, exemplos do dia a dia, benefícios, desafios e como aplicar reduzir, reutilizar e reciclar.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "Economia circular vs. economia linear: diferenças e exemplos",
    description:
      "Diferenças entre economia circular e linear com exemplos práticos, benefícios e como aplicar reduzir, reutilizar e reciclar no dia a dia e nas empresas.",
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
        headline="Economia circular vs. economia linear: diferenças e exemplos"
        description="Entenda a diferença entre economia linear e circular com exemplos práticos, benefícios e como aplicar reduzir, reutilizar e reciclar para diminuir resíduos."
        datePublished="2025-12-06"
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
        <span className="text-slate-700">Economia circular vs. linear</span>
      </div>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
          Economia circular
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Economia circular vs. economia linear: diferenças e exemplos
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          A economia linear é o modelo “extrair, produzir, usar e descartar”. A economia circular
          tenta “fechar o ciclo”: reduzir desperdício, prolongar a vida dos produtos e recuperar
          materiais. Neste guia, você vai entender as diferenças com exemplos simples e o que dá
          para aplicar no dia a dia.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/reduzir-lixo-na-rotina"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver: Reduzir lixo na rotina
          </Link>
          <Link
            href="/reciclagem"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Página pilar: Reciclagem
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
                <strong className="text-slate-900">Linear</strong>: extrair → produzir → usar →
                descartar (mais resíduos e pressão sobre recursos).
              </li>
              <li>
                <strong className="text-slate-900">Circular</strong>: reduzir → reutilizar →
                reparar → reciclar (mantém valor e materiais em uso por mais tempo).
              </li>
              <li>
                Reciclagem ajuda, mas circularidade começa antes:{" "}
                <strong className="text-slate-900">consumir melhor</strong> e{" "}
                <strong className="text-slate-900">gerar menos lixo</strong>.
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
            <h2>O que é economia linear</h2>
            <p>
              Economia linear é um fluxo “de mão única”: <strong>extrair recursos</strong>,{" "}
              <strong>produzir</strong>, <strong>consumir</strong> e <strong>descartar</strong>. Ela
              ajuda a escalar produção e consumo, mas costuma aumentar resíduos e a pressão sobre
              recursos naturais.
            </p>

            <h2>O que é economia circular</h2>
            <p>
              Economia circular busca manter produtos e materiais em uso pelo maior tempo possível,
              reduzindo perdas. Isso envolve <strong>design para durabilidade</strong>,{" "}
              <strong>reuso</strong>, <strong>reparo</strong>, <strong>remanufatura</strong> e{" "}
              <strong>reciclagem</strong> (importante, mas não única).
            </p>

            <h2>Diferenças principais (tabela mental)</h2>
            <ul>
              <li>
                <strong>Linear:</strong> comprar → usar → jogar fora.
              </li>
              <li>
                <strong>Circular:</strong> comprar melhor → usar por mais tempo → reparar/reutilizar
                → reciclar o que sobrar.
              </li>
            </ul>

            <h2>Exemplos práticos do dia a dia</h2>

            <h3>1) Garrafa e embalagem</h3>
            <ul>
              <li>
                <strong>Linear:</strong> comprar bebida → descartar embalagem sem separar.
              </li>
              <li>
                <strong>Circular:</strong> preferir refil/retornável quando existir → separar
                corretamente para reciclagem.
              </li>
            </ul>

            <h3>2) Roupas</h3>
            <ul>
              <li>
                <strong>Linear:</strong> comprar barato e trocar rápido.
              </li>
              <li>
                <strong>Circular:</strong> comprar melhor, ajustar/recosturar, revender/doar,
                reaproveitar tecido.
              </li>
            </ul>

            <h3>3) Eletrônicos</h3>
            <ul>
              <li>
                <strong>Linear:</strong> trocar aparelho por qualquer defeito e descartar no lixo
                comum.
              </li>
              <li>
                <strong>Circular:</strong> reparar quando viável, revender/doar, destinar como e-lixo
                (logística reversa).
              </li>
            </ul>

            <p>
              Veja também:{" "}
              <Link href="/blog/lixo-eletronico-descarte">
                lixo eletrônico: descarte correto
              </Link>
              .
            </p>

            <h2>Os “R’s” da circularidade (ordem que faz sentido)</h2>
            <p>Muita gente pensa só em reciclar, mas a sequência mais eficiente costuma ser:</p>
            <ol>
              <li>
                <strong>Reduzir</strong> (menos consumo e desperdício).
              </li>
              <li>
                <strong>Reutilizar</strong> (usar de novo ou dar novo uso).
              </li>
              <li>
                <strong>Reparar</strong> (consertar para durar mais).
              </li>
              <li>
                <strong>Reciclar</strong> (quando não dá para manter em uso).
              </li>
            </ol>

            <h2>Benefícios da economia circular</h2>
            <ul>
              <li>
                <strong>Menos resíduos</strong> e menor pressão sobre aterros.
              </li>
              <li>
                <strong>Eficiência</strong> no uso de materiais e energia.
              </li>
              <li>
                <strong>Inovação</strong> em produtos, serviços e modelos de negócio.
              </li>
              <li>
                <strong>Valor econômico</strong> recuperado (materiais retornam para a cadeia).
              </li>
            </ul>

            <h2>Desafios reais (o que trava na prática)</h2>
            <ul>
              <li>
                <strong>Infraestrutura:</strong> coleta seletiva e triagem variam muito por cidade.
              </li>
              <li>
                <strong>Design:</strong> produtos multicamadas/misturados são mais difíceis de
                reciclar.
              </li>
              <li>
                <strong>Comportamento:</strong> sem separação correta, o material contamina.
              </li>
            </ul>

            <p>
              Para acertar o básico do descarte:{" "}
              <Link href="/blog/o-que-pode-ser-reciclado">o que pode ser reciclado</Link> e{" "}
              <Link href="/blog/coleta-seletiva-no-brasil">coleta seletiva no Brasil</Link>.
            </p>

            <h2>Como aplicar economia circular na sua rotina (sem radicalismo)</h2>
            <ul>
              <li>
                <strong>Planeje compras</strong> para reduzir embalagens e desperdício.
              </li>
              <li>
                <strong>Prefira refil/retornável</strong> quando existir.
              </li>
              <li>
                <strong>Conserte antes de trocar</strong> (cabos, peças simples, manutenção).
              </li>
              <li>
                <strong>Reuso:</strong> venda/doe itens em bom estado.
              </li>
              <li>
                <strong>Separe recicláveis secos</strong> e evite contaminação.
              </li>
            </ul>

            <p>
              Complemento direto:{" "}
              <Link href="/blog/reduzir-lixo-na-rotina">reduzir lixo na rotina</Link>.
            </p>
          </div>

          {/* Links úteis (padrão ITAD: componente) */}
          <div className="mt-10">
            <RecommendedLinks
              links={[
                {
                  href: "/reciclagem",
                  title: "Página pilar: Reciclagem",
                  description: "Conceitos e etapas essenciais para entender o ciclo dos materiais.",
                },
                {
                  href: "/blog/o-que-pode-ser-reciclado",
                  title: "O que pode ser reciclado",
                  description: "Checklist prático para separar sem erro e evitar contaminação.",
                },
                {
                  href: "/blog/coleta-seletiva-no-brasil",
                  title: "Coleta seletiva no Brasil",
                  description: "O que fazer quando a coleta não é consistente na sua região.",
                },
                {
                  href: "/blog/lixo-eletronico-descarte",
                  title: "Lixo eletrônico: descarte correto",
                  description: "Como destinar e-lixo com segurança e responsabilidade.",
                },
              ]}
            />
          </div>

          {/* FAQ (padrão ITAD: box) */}
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              FAQ: dúvidas comuns sobre economia circular
            </h2>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Economia circular é só reciclagem?
                </h3>
                <p className="mt-2">
                  Não. Reciclagem é uma parte. Circularidade começa antes: reduzir, reutilizar e
                  reparar costumam ter impacto maior porque evitam gerar resíduo.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Se eu separar o lixo, já estou fazendo economia circular?
                </h3>
                <p className="mt-2">
                  Separar corretamente ajuda muito, mas circularidade também envolve reduzir consumo,
                  escolher produtos mais duráveis e incentivar reuso e reparo.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Economia circular é mais cara?
                </h3>
                <p className="mt-2">
                  Nem sempre. Muitos hábitos circulares economizam dinheiro (reparo, reuso,
                  planejamento de compras, menos desperdício).
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Qual o primeiro passo mais simples?
                </h3>
                <p className="mt-2">
                  Comece com duas ações: reduzir descartáveis e separar recicláveis secos. Depois
                  avance para refis, reuso e reparos.
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
              Para aplicar circularidade no descarte (sem perder material por contaminação), revise
              o guia do que pode ser reciclado e como separar corretamente.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog/o-que-pode-ser-reciclado"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Ver guia: o que pode ser reciclado
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
