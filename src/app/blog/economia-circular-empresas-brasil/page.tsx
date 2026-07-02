import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://www.reciclativa.com";

const SLUG = "economia-circular-empresas-brasil";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Economia circular nas empresas: cases reais no Brasil | Reciclativa",
  description:
    "Como empresas brasileiras de diferentes portes aplicam economia circular na prática: design modular, matéria-prima renovável, brechós e incentivo fiscal à reciclagem.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Economia circular nas empresas: cases reais no Brasil",
    description:
      "Cases reais de economia circular em empresas brasileiras, com dados de adoção do setor.",
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
        headline="Economia circular nas empresas: cases reais no Brasil"
        description="Como empresas brasileiras de diferentes portes aplicam economia circular na prática, com dados de adoção do setor."
        datePublished="2026-07-02"
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
        <span className="text-slate-700">Economia circular nas empresas</span>
      </div>

      {/* Banner */}
      <div className="relative mt-6 aspect-[3/1] w-full overflow-hidden rounded-3xl">
        <Image
          src={`/blog/${SLUG}/opengraph-image`}
          alt=""
          fill
          sizes="(min-width: 1024px) 1152px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Por Eduardo Pompeu · Publicado em 02/07/2026
        </p>

        <div className="mt-3 inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
          Economia circular
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Economia circular nas empresas: cases reais no Brasil
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Economia circular não é só conceito de slide corporativo: já aparece em setores como
          engenharia, moda, varejo e indústria química no Brasil. Veja exemplos concretos, o que cada um
          fez na prática e o que isso mostra sobre por onde começar.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/economia-circular-exemplos"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver: exemplos práticos e como aplicar
          </Link>
          <Link
            href="/blog/economia-circular-e-linear"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: economia circular vs. linear
          </Link>
        </div>
      </header>

      {/* Corpo editorial — padrão ITAD */}
      <section className="mt-10">
        <article className="mx-auto max-w-none">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Em 30 segundos
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                Segundo a CNI, a maioria das indústrias brasileiras já adota{" "}
                <strong className="text-slate-900">pelo menos uma prática</strong> associada à
                circularidade.
              </li>
              <li>
                Cases reais vão de <strong className="text-slate-900">design modular</strong> na
                engenharia a <strong className="text-slate-900">matéria-prima renovável</strong> na
                indústria têxtil e química.
              </li>
              <li>
                O <strong className="text-slate-900">brechó</strong> é um dos exemplos mais visíveis de
                economia circular no varejo brasileiro.
              </li>
            </ul>
          </div>

          <div
            className={[
              "mt-10 text-slate-800 leading-relaxed space-y-5",
              "[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-slate-900",
              "[&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-slate-900",
              "[&_p]:text-base [&_p]:leading-relaxed",
              "[&_strong]:font-semibold [&_strong]:text-slate-900",
              "[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6",
              "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6",
              "[&_li]:mt-2",
              "[&_a]:font-semibold [&_a]:text-emerald-700 hover:[&_a]:underline",
            ].join(" ")}
          >
            <h2>O quadro geral: adoção crescente, mas ainda desigual</h2>
            <p>
              Segundo levantamento da Confederação Nacional da Indústria (CNI), a maior parte das
              indústrias brasileiras já adota ao menos uma prática associada à circularidade, com
              redução de custo operacional citada como o principal ganho relatado pelas empresas. Isso
              mostra que economia circular não é só discurso ambiental — também é decisão de eficiência.
            </p>

            <h2>Design modular: Precon Engenharia</h2>
            <p>
              Um exemplo citado no setor de engenharia é o design modular, usado pela{" "}
              <strong>Precon Engenharia</strong>: estruturas pensadas para serem montadas, desmontadas e
              reaproveitadas, em vez de construções que geram entulho de difícil reaproveitamento ao
              final da obra ou reforma. A lógica é a mesma que vimos em{" "}
              <Link href="/blog/economia-circular-e-linear">economia circular vs. linear</Link>: projetar
              pensando no fim de vida do material desde o início.
            </p>

            <h2>Matéria-prima mais segura e renovável: Tarkett e C&amp;A</h2>
            <p>
              No setor industrial e de moda, empresas como <strong>Tarkett</strong> e{" "}
              <strong>C&amp;A</strong> vêm priorizando matérias-primas mais seguras, renováveis e
              atóxicas em parte da produção — uma mudança que ataca o problema na origem, antes mesmo de
              chegar na etapa de descarte ou reciclagem.
            </p>

            <h2>Impacto social como parte do ciclo: Rede Asta</h2>
            <p>
              Circularidade também aparece em modelos de negócio que unem sustentabilidade com inclusão
              produtiva. A <strong>Rede Asta</strong> é um exemplo: conecta artesãos e pequenos produtores
              a canais de venda, formalizando trabalho que muitas vezes usa materiais reaproveitados como
              matéria-prima.
            </p>

            <h2>O maior exemplo do dia a dia: brechós</h2>
            <p>
              Nem todo case de economia circular é industrial. O setor de brechós no Brasil já movimenta
              bilhões de reais por ano, segundo estimativas do Sebrae — um mercado inteiro construído em
              cima de reuso de roupas, exatamente a lógica de “reduzir → reusar → reparar → reciclar” que
              a economia circular defende.
            </p>

            <h2>Incentivo institucional: Lei de Incentivo à Reciclagem</h2>
            <p>
              Do lado do financiamento, a Lei de Incentivo à Reciclagem tem viabilizado centenas de
              projetos aprovados nos últimos anos, com recursos direcionados especificamente para cadeia
              de reciclagem e circularidade — um sinal de que o tema também está ganhando estrutura de
              política pública, não só iniciativa isolada de empresa.
            </p>

            <h2>O que isso ensina para quem quer começar</h2>
            <ul>
              <li>
                <strong>Não precisa ser indústria grande:</strong> brechós e pequenos negócios também são
                economia circular de verdade.
              </li>
              <li>
                <strong>Comece pela origem do material:</strong> escolher matéria-prima renovável evita
                problema lá na frente.
              </li>
              <li>
                <strong>Circularidade também gera eficiência:</strong> redução de custo é um resultado
                real, não só benefício de imagem.
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <RecommendedLinks
              items={[
                {
                  href: "/blog/economia-circular-exemplos",
                  title: "Economia circular no Brasil: exemplos práticos",
                  description: "O que já funciona, onde falha e como aplicar no dia a dia.",
                },
                {
                  href: "/blog/economia-circular-e-linear",
                  title: "Economia circular vs. economia linear",
                  description: "Diferenças e exemplos entre os dois modelos.",
                },
                {
                  href: "/economia-circular",
                  title: "Página pilar: Economia circular",
                  description: "Visão geral do tema com conteúdos conectados.",
                },
              ]}
            />
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">FAQ rápido</h2>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Economia circular é só para empresas grandes?
                </h3>
                <p className="mt-2">
                  Não. Brechós e pequenos negócios de reuso são exemplos concretos de economia circular
                  em escala local, sem precisar de estrutura industrial.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Circularidade reduz custo ou aumenta?
                </h3>
                <p className="mt-2">
                  Segundo dados setoriais da indústria, a redução de custo operacional costuma ser o
                  principal ganho relatado por empresas que adotam práticas circulares.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Por onde uma empresa começa?</h3>
                <p className="mt-2">
                  Geralmente pela origem do material (matéria-prima mais renovável/segura) ou pelo design
                  do produto pensando em desmontagem e reuso — os dois pontos aparecem nos exemplos
                  citados aqui.
                </p>
              </div>
            </div>
          </div>

          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Próximo passo recomendado
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Para entender a lógica por trás desses cases, veja a diferença entre modelo linear e
              circular.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog/economia-circular-e-linear"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Ver: economia circular vs. linear
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
