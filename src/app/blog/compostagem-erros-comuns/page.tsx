import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://www.reciclativa.com";

const SLUG = "compostagem-erros-comuns";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Erros mais comuns na compostagem doméstica (e como corrigir) | Reciclativa",
  description:
    "Cheiro forte, mosquitinhos, composto encharcado: veja os erros mais comuns de quem está começando a compostar em casa e como corrigir cada um.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Erros mais comuns na compostagem doméstica (e como corrigir)",
    description:
      "Os erros mais comuns de quem está começando a compostar em casa, e como corrigir cada um.",
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
        headline="Erros mais comuns na compostagem doméstica (e como corrigir)"
        description="Os erros mais comuns de quem está começando a compostar em casa, e como corrigir cada um."
        datePublished="2026-07-04"
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
        <span className="text-slate-700">Erros na compostagem</span>
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
          Por Eduardo Pompeu · Publicado em 04/07/2026
        </p>

        <div className="mt-3 inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 ring-1 ring-violet-200">
          Guias
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Erros mais comuns na compostagem doméstica (e como corrigir)
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          A maioria dos problemas de quem desiste de compostar em casa vem de um punhado de erros
          repetidos — cheiro, mosquitinho, composto encharcado. Veja o que causa cada um e o ajuste
          simples que resolve, sem precisar recomeçar do zero.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/guias/compostagem"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver guia completo de compostagem
          </Link>
          <Link
            href="/blog/reduzir-lixo-na-rotina"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: reduzir lixo na rotina
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
                Quase todo problema de compostagem vem do{" "}
                <strong className="text-slate-900">desequilíbrio</strong> entre material “verde” e
                “marrom”.
              </li>
              <li>
                Cheiro e mosquito geralmente indicam{" "}
                <strong className="text-slate-900">falta de aeração ou excesso de úmido</strong>.
              </li>
              <li>
                Nenhum desses erros exige recomeçar — a maioria se corrige em{" "}
                <strong className="text-slate-900">poucos dias</strong>.
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
            <h2>Erro 1: colocar só “verde” e esquecer o “marrom”</h2>
            <p>
              É o erro mais comum de quem começa: jogar só restos de comida (o “verde”, úmido e rico em
              nitrogênio) sem equilibrar com material seco (o “marrom”, como folhas secas ou papelão
              picado). O resultado é cheiro forte e composto encharcado. A correção é simples: para cada
              porção de resíduo fresco, cubra com uma camada de material seco.
            </p>

            <h2>Erro 2: colocar itens proibidos “só um pouquinho”</h2>
            <p>
              Carne, gordura, laticínios e fezes de animais atraem pragas e geram odor forte, mesmo em
              pequena quantidade. Não existe “exceção pequena” nesse caso — esses itens simplesmente não
              vão para a composteira doméstica.
            </p>

            <h2>Erro 3: não mexer a composteira</h2>
            <p>
              Sem revolver a mistura, o processo perde aeração e o material do fundo pode apodrecer em
              vez de compostar. Misturar levemente uma a duas vezes por semana (dependendo do método)
              resolve a maior parte dos problemas de cheiro e lentidão.
            </p>

            <h2>Erro 4: deixar restos de comida expostos</h2>
            <p>
              Resíduo fresco exposto na superfície é o principal chamariz de mosquitinhos. A solução é
              sempre cobrir com uma camada de “marrom” (folhas secas, papelão picado) imediatamente após
              adicionar resíduo novo — não deixar para depois.
            </p>

            <h2>Erro 5: excesso de líquido (chorume)</h2>
            <p>
              Quando a composteira produz muito líquido, geralmente é sinal de excesso de “verde” e pouca
              drenagem. Aumente a proporção de material seco e verifique se o recipiente tem escoamento
              adequado — se for composteira com torneira, use o líquido diluído com cautela, quando
              aplicável.
            </p>

            <h2>Erro 6: composto seco demais, sem decompor</h2>
            <p>
              O oposto também trava o processo: falta de umidade e de material “verde” deixa a
              decomposição lenta. A textura ideal é parecida com uma esponja úmida — nem encharcada, nem
              seca. Se estiver seco, adicione restos vegetais e, se necessário, um pouco de água.
            </p>

            <h2>Quando desistir não é a resposta</h2>
            <p>
              A maioria de quem para de compostar desiste justamente na fase de ajuste — nas primeiras
              semanas, é normal precisar corrigir a proporção algumas vezes até encontrar o equilíbrio.
              Depois disso, a rotina fica simples. Para o passo a passo completo (métodos, materiais e
              como começar do zero), veja o{" "}
              <Link href="/guias/compostagem">guia de compostagem</Link>.
            </p>
          </div>

          <div className="mt-10">
            <RecommendedLinks
              items={[
                {
                  href: "/guias/compostagem",
                  title: "Compostagem: guia prático para começar",
                  description: "Métodos, passo a passo e como escolher a composteira certa.",
                },
                {
                  href: "/blog/reduzir-lixo-na-rotina",
                  title: "Reduzir lixo na rotina",
                  description: "12 hábitos simples que funcionam de verdade.",
                },
                {
                  href: "/residuos-solidos",
                  title: "Página pilar: Resíduos sólidos",
                  description: "Classificação e boas práticas no dia a dia.",
                },
              ]}
            />
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">FAQ rápido</h2>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Minha composteira atrai baratas, é normal?
                </h3>
                <p className="mt-2">
                  Não deveria ser rotina. Geralmente indica resíduo exposto ou item proibido (carne,
                  gordura) na mistura — cubra bem com material seco e revise o que está sendo adicionado.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Quanto tempo até os erros pararem de acontecer?
                </h3>
                <p className="mt-2">
                  Na maioria dos casos, 2 a 4 semanas de ajuste já estabilizam a rotina, desde que a
                  proporção verde/marrom seja corrigida.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Preciso recomeçar se errei a proporção?
                </h3>
                <p className="mt-2">
                  Quase nunca. Basta ajustar adicionando mais material seco (se estiver úmido/com cheiro)
                  ou mais resíduo fresco e um pouco de água (se estiver seco demais).
                </p>
              </div>
            </div>
          </div>

          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Próximo passo recomendado
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Se ainda não começou, veja o passo a passo completo de compostagem, com métodos para
              apartamento e casa.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/guias/compostagem"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Ver guia de compostagem
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
