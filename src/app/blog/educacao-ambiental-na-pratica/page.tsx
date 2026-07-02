import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://www.reciclativa.com";

const SLUG = "educacao-ambiental-na-pratica";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Educação ambiental na prática: como aplicar em casa, na escola e no trabalho | Reciclativa",
  description:
    "Educação ambiental não é só teoria: veja projetos práticos para escola, condomínio e empresa que realmente mudam hábito, com exemplos e base legal.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Educação ambiental na prática: como aplicar em casa, na escola e no trabalho",
    description:
      "Projetos práticos de educação ambiental para escola, condomínio e empresa, com exemplos reais.",
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
        headline="Educação ambiental na prática: como aplicar em casa, na escola e no trabalho"
        description="Projetos práticos de educação ambiental para escola, condomínio e empresa, com exemplos reais e base legal."
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
        <span className="text-slate-700">Educação ambiental na prática</span>
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

        <div className="mt-3 inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
          Sustentabilidade
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Educação ambiental na prática: como aplicar em casa, na escola e no trabalho
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Educação ambiental não é uma matéria isolada nem uma palestra única — é um processo contínuo
          de formar consciência e transformar isso em hábito. Este guia reúne projetos práticos,
          testados em escolas, condomínios e empresas, que geram resultado visível em vez de ficar só
          no discurso.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/educacao-ambiental"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver página pilar: Educação ambiental
          </Link>
          <Link
            href="/blog/reduzir-lixo-na-rotina"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: Reduzir lixo na rotina
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
                Educação ambiental funciona melhor como <strong className="text-slate-900">rotina</strong>,
                não como evento isolado.
              </li>
              <li>
                Projetos com <strong className="text-slate-900">resultado visível</strong> (horta,
                composteira, mutirão) engajam mais do que aula teórica sozinha.
              </li>
              <li>
                No Brasil, o tema tem <strong className="text-slate-900">respaldo legal</strong> desde
                1999, o que ajuda a justificar investimento em escolas e empresas.
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
            <h2>O que é educação ambiental (e por que rotina vence teoria)</h2>
            <p>
              Educação ambiental é o processo de formar consciência sobre o impacto das escolhas no
              meio ambiente e transformar isso em ação concreta. No Brasil, a{" "}
              <a
                href="https://www.planalto.gov.br/ccivil_03/leis/l9795.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política Nacional de Educação Ambiental (Lei nº 9.795/1999)
              </a>{" "}
              trata o tema como componente essencial da educação nacional, a ser trabalhado de forma
              integrada em todos os níveis de ensino — não como disciplina isolada, mas como algo
              presente na rotina.
            </p>
            <p>
              Isso importa na prática: campanhas pontuais geram pico de atenção, mas hábito se forma com
              repetição, reforço visual e metas simples de acompanhar. Por isso os projetos mais
              eficazes combinam explicação curta com uma ação recorrente.
            </p>

            <h2>Na escola: projetos com resultado visível</h2>
            <ul>
              <li>
                <strong>Horta escolar:</strong> conecta consumo de alimentos com origem, e costuma ser o
                projeto de maior engajamento entre crianças e adolescentes.
              </li>
              <li>
                <strong>Composteira no pátio:</strong> transforma resto de merenda em adubo, com
                resultado visível em semanas.
              </li>
              <li>
                <strong>Gincana de separação de resíduos:</strong> reforça o que já vimos sobre{" "}
                <Link href="/blog/cores-da-coleta-seletiva">cores da coleta seletiva</Link> de forma
                lúdica, sem depender de aula expositiva.
              </li>
            </ul>

            <h2>No condomínio: comunicação clara em vez de regra escrita</h2>
            <p>
              Regulamento interno sozinho raramente muda comportamento. O que funciona: sinalização
              visual nas lixeiras (cor + exemplos do que entra em cada uma), um canal simples para
              dúvidas (grupo, mural) e parceria com uma cooperativa local para dar destino real ao que é
              separado — sem isso, o morador perde a confiança de que separar “adianta alguma coisa”.
            </p>

            <h2>Na empresa: metas simples e visíveis</h2>
            <p>
              Treinamento único de lançamento tende a ser esquecido em semanas. O que sustenta o hábito:
              treinamentos curtos e recorrentes, pontos de coleta seletiva visíveis no escritório e uma
              meta simples de acompanhar (ex: redução de copo descartável, volume de reciclável
              separado). Empresas que tratam isso como projeto contínuo — não campanha de lançamento —
              relatam adesão maior a médio prazo.
            </p>

            <h2>Erros comuns que travam o resultado</h2>
            <ul>
              <li>
                <strong>Falar só em teoria:</strong> sem ação prática, a informação não vira hábito.
              </li>
              <li>
                <strong>Campanha sem continuidade:</strong> um evento único gera pico e depois cai a
                zero.
              </li>
              <li>
                <strong>Separar sem destino real:</strong> se o material separado não tem para onde ir,
                a confiança das pessoas cai rápido.
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <RecommendedLinks
              items={[
                {
                  href: "/educacao-ambiental",
                  title: "Página pilar: Educação ambiental",
                  description: "Visão geral do tema com conteúdos conectados.",
                },
                {
                  href: "/blog/reduzir-lixo-na-rotina",
                  title: "Reduzir lixo na rotina",
                  description: "12 hábitos simples que funcionam de verdade.",
                },
                {
                  href: "/blog/cores-da-coleta-seletiva",
                  title: "Cores da coleta seletiva",
                  description: "Base visual para qualquer projeto de educação ambiental.",
                },
              ]}
            />
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">FAQ rápido</h2>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Educação ambiental é obrigatória nas escolas?
                </h3>
                <p className="mt-2">
                  A Lei nº 9.795/1999 trata o tema como componente essencial da educação nacional, a ser
                  trabalhado de forma integrada em todos os níveis de ensino.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Preciso de orçamento grande para começar?
                </h3>
                <p className="mt-2">
                  Não. Uma gincana de separação ou uma sinalização melhor nas lixeiras já muda
                  comportamento, sem custo relevante.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Como saber se o projeto está funcionando?
                </h3>
                <p className="mt-2">
                  Defina uma métrica simples desde o início (volume separado, participação, redução de
                  descartável) e acompanhe mês a mês — sem métrica, é difícil sustentar o projeto.
                </p>
              </div>
            </div>
          </div>

          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Próximo passo recomendado
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Para dar o primeiro passo prático, comece pelos hábitos individuais antes de escalar para
              projeto de escola, condomínio ou empresa.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog/reduzir-lixo-na-rotina"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Ver: reduzir lixo na rotina
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
