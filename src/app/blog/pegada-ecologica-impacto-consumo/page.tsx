import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://www.reciclativa.com";

const SLUG = "pegada-ecologica-impacto-consumo";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Pegada ecológica: o que é e como o consumo do dia a dia impacta o meio ambiente | Reciclativa",
  description:
    "Entenda o conceito de pegada ecológica, como consumo, transporte e alimentação pesam nela, e quais mudanças práticas realmente reduzem impacto ambiental.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Pegada ecológica: o que é e como o consumo do dia a dia impacta o meio ambiente",
    description:
      "Como consumo, transporte e alimentação pesam na pegada ecológica, e o que realmente reduz impacto.",
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
        headline="Pegada ecológica: o que é e como o consumo do dia a dia impacta o meio ambiente"
        description="Entenda o conceito de pegada ecológica e quais mudanças práticas realmente reduzem impacto ambiental."
        datePublished="2026-07-03"
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
        <span className="text-slate-700">Pegada ecológica</span>
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
          Por Eduardo Pompeu · Publicado em 03/07/2026
        </p>

        <div className="mt-3 inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
          Sustentabilidade
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Pegada ecológica: o que é e como o consumo do dia a dia impacta o meio ambiente
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          “Pegada ecológica” virou expressão comum, mas poucas pessoas sabem realmente o que ela mede.
          Neste guia você entende o conceito, os fatores que mais pesam nela e — o mais importante — o
          que de fato reduz impacto, em vez de trocas simbólicas que mudam pouco na prática.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/meio-ambiente"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver página pilar: Meio ambiente
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
                Pegada ecológica mede quanto de{" "}
                <strong className="text-slate-900">recurso natural</strong> seu estilo de vida consome
                para se sustentar.
              </li>
              <li>
                <strong className="text-slate-900">Alimentação, transporte e moradia</strong> costumam
                pesar mais do que reciclagem sozinha.
              </li>
              <li>
                Reduzir consumo tem <strong className="text-slate-900">impacto maior</strong> do que
                trocar por produto “verde” sem mudar hábito.
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
            <h2>O que é pegada ecológica (definição simples)</h2>
            <p>
              Pegada ecológica é uma medida que estima quanta área de terra e água produtiva seria
              necessária para gerar os recursos que uma pessoa (ou população) consome, e para absorver os
              resíduos que ela gera. Quando essa demanda ultrapassa a capacidade que o planeta consegue
              repor, o resultado é o que se chama de “déficit ecológico”.
            </p>
            <p>
              Na prática, é uma forma de traduzir hábitos do dia a dia — o que você come, como se
              locomove, como mora — em um número que ajuda a comparar impacto entre diferentes estilos de
              vida.
            </p>

            <h2>O que mais pesa na conta (nem sempre é o que parece)</h2>

            <h3>Alimentação</h3>
            <p>
              A produção de alimentos, principalmente de origem animal, costuma ter um dos maiores pesos
              na pegada ecológica individual — mais do que a maioria das pessoas imagina quando pensa em
              “sustentabilidade”.
            </p>

            <h3>Transporte</h3>
            <p>
              Deslocamento diário, principalmente em carro individual, soma bastante ao longo do ano.
              Transporte público, bicicleta e trajetos a pé pesam significativamente menos.
            </p>

            <h3>Moradia e energia</h3>
            <p>
              Consumo de energia elétrica, aquecimento e o tamanho do espaço ocupado por pessoa também
              entram na conta — moradias menores e mais eficientes tendem a ter pegada menor.
            </p>

            <h3>Resíduos</h3>
            <p>
              Reciclagem ajuda, mas pesa menos na conta total do que reduzir consumo na origem. Por isso
              a ordem <strong>reduzir → reusar → reparar → reciclar</strong> aparece tanto quando o
              assunto é{" "}
              <Link href="/blog/economia-circular-e-linear">economia circular</Link>: cada etapa evita
              impacto antes de precisar corrigir depois.
            </p>

            <h2>O que realmente reduz impacto (e o que é mais simbólico)</h2>
            <ul>
              <li>
                <strong>Reduz de verdade:</strong> comer menos ultraprocessado e menos proteína animal,
                usar menos carro individual, comprar menos e melhor.
              </li>
              <li>
                <strong>Ajuda, mas pesa menos:</strong> separar recicláveis corretamente, evitar
                descartáveis pontualmente.
              </li>
              <li>
                <strong>Mais simbólico do que efetivo:</strong> trocar um produto por versão “eco” sem
                reduzir a quantidade consumida.
              </li>
            </ul>

            <h2>Como calcular (e por que o número exato importa menos que a direção)</h2>
            <p>
              Existem calculadoras online de pegada ecológica que estimam o número em “planetas
              necessários” com base em hábitos de consumo, moradia e transporte. O valor exato varia
              conforme a metodologia — o que importa mais é usar o resultado para identificar onde você
              pode reduzir com mais impacto, não perseguir um número perfeito.
            </p>
          </div>

          <div className="mt-10">
            <RecommendedLinks
              items={[
                {
                  href: "/blog/reduzir-lixo-na-rotina",
                  title: "Como reduzir lixo na rotina",
                  description: "12 hábitos simples que funcionam de verdade.",
                },
                {
                  href: "/blog/economia-circular-e-linear",
                  title: "Economia circular vs. economia linear",
                  description: "Por que reduzir e reusar pesam mais do que reciclar.",
                },
                {
                  href: "/meio-ambiente",
                  title: "Página pilar: Meio ambiente",
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
                  Reciclar já resolve minha pegada ecológica?
                </h3>
                <p className="mt-2">
                  Ajuda, mas pesa menos do que alimentação e transporte na conta total. Reduzir consumo
                  na origem costuma ter impacto maior.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Produto “eco” reduz minha pegada automaticamente?
                </h3>
                <p className="mt-2">
                  Não necessariamente. Se você compra a mesma quantidade, só trocando de produto, o ganho
                  costuma ser menor do que reduzir a quantidade consumida.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Por onde começar a reduzir?
                </h3>
                <p className="mt-2">
                  Pelos itens de maior peso: reduzir carne/ultraprocessado, usar menos carro individual e
                  comprar com mais intenção costumam gerar o maior impacto por esforço.
                </p>
              </div>
            </div>
          </div>

          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Próximo passo recomendado
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Para transformar isso em ação prática no dia a dia, veja os hábitos que mais reduzem
              resíduo e consumo.
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
