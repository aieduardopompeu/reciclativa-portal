import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://www.reciclativa.com";

const SLUG = "reciclagem-de-vidro";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Reciclagem de vidro: por que ele é infinitamente reciclável e como descartar certo | Reciclativa",
  description:
    "Vidro pode ser reciclado infinitas vezes sem perder qualidade, mas ainda é sub-aproveitado no Brasil. Veja como separar corretamente e o que evitar.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Reciclagem de vidro: por que ele é infinitamente reciclável e como descartar certo",
    description:
      "Como separar vidro corretamente e por que ele é diferente dos outros recicláveis.",
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
        headline="Reciclagem de vidro: por que ele é infinitamente reciclável e como descartar certo"
        description="Como separar vidro corretamente para reciclagem e por que ele é diferente dos outros materiais recicláveis."
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
        <span className="text-slate-700">Reciclagem de vidro</span>
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

        <div className="mt-3 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
          Reciclagem
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Reciclagem de vidro: por que ele é infinitamente reciclável e como descartar certo
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          O vidro é um dos poucos materiais que pode ser reciclado indefinidamente sem perder
          qualidade — mas isso só acontece quando ele é separado corretamente. Veja o que muda, o que
          evitar e por que garrafa quebrada precisa de cuidado especial.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/cores-da-coleta-seletiva"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver: cores da coleta seletiva
          </Link>
          <Link
            href="/blog/o-que-pode-ser-reciclado"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: o que pode ser reciclado
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
                Vidro pode ser reciclado <strong className="text-slate-900">infinitas vezes</strong> sem
                perder qualidade — diferente do plástico, que se degrada a cada ciclo.
              </li>
              <li>
                <strong className="text-slate-900">Nem todo vidro é igual:</strong> espelhos, lâmpadas e
                vidro temperado têm composição diferente e não vão na coleta comum.
              </li>
              <li>
                Vidro quebrado deve ser <strong className="text-slate-900">embalado com segurança</strong>{" "}
                antes do descarte.
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
            <h2>Por que o vidro é diferente de plástico e papel</h2>
            <p>
              A maioria dos materiais recicláveis perde qualidade a cada novo ciclo de reciclagem — é o
              caso do plástico e, em menor grau, do papel. O vidro é uma exceção: ele pode ser fundido e
              reprocessado indefinidamente sem degradar sua estrutura, desde que a matéria-prima (o
              “caco” de vidro triado) esteja limpa e separada por cor.
            </p>
            <p>
              Isso torna o vidro, em teoria, um dos materiais mais eficientes para reciclar — o problema
              não é o material em si, mas a taxa de aproveitamento, que ainda é baixa em muitas cidades
              por falta de separação correta na origem.
            </p>

            <h2>O que geralmente pode ir na coleta de vidro</h2>
            <ul>
              <li>Garrafas de bebida (vidro comum)</li>
              <li>Potes de conserva e embalagens de alimentos</li>
              <li>Frascos de perfume e cosméticos (quando vazios)</li>
            </ul>

            <h2>O que NÃO é o mesmo tipo de vidro</h2>
            <p>
              Esse é o ponto que mais gera confusão: nem todo material transparente é o mesmo vidro da
              coleta seletiva. Alguns têm composição química diferente e, se misturados ao lote de vidro
              comum, podem contaminar todo o processo de fundição.
            </p>
            <ul>
              <li>
                <strong>Espelhos:</strong> têm camada metálica no verso, composição diferente do vidro
                comum.
              </li>
              <li>
                <strong>Lâmpadas:</strong> podem conter mercúrio e outros componentes — exigem descarte
                específico em ecopontos, nunca na coleta seletiva comum.
              </li>
              <li>
                <strong>Vidro temperado e pirex:</strong> têm ponto de fusão diferente do vidro comum e
                não devem ser misturados.
              </li>
              <li>
                <strong>Cerâmica e porcelana:</strong> não são vidro, mesmo parecendo material
                semelhante — vão para rejeito.
              </li>
            </ul>

            <h2>Vidro quebrado: cuidado antes de descartar</h2>
            <p>
              Cacos de vidro representam risco real para quem faz a triagem manual nas cooperativas.
              Antes de descartar vidro quebrado:
            </p>
            <ol>
              <li>Embale em papel ou papelão para evitar cortes.</li>
              <li>Identifique a embalagem (ex: “vidro quebrado”) quando possível.</li>
              <li>
                Nunca descarte solto junto com outros recicláveis — o risco de acidente na triagem é
                real.
              </li>
            </ol>

            <h2>Cor importa na hora de reciclar</h2>
            <p>
              Vidros de cores diferentes (transparente, verde, âmbar) costumam ser separados na
              indústria, porque a mistura de cores limita o uso do material reciclado em produtos novos.
              Onde a coleta permitir, separar por cor aumenta o valor e o aproveitamento do material — mas
              se sua cidade não tiver esse nível de separação, o mais importante continua sendo manter o
              vidro limpo e fora do lote de rejeito.
            </p>
          </div>

          <div className="mt-10">
            <RecommendedLinks
              items={[
                {
                  href: "/blog/cores-da-coleta-seletiva",
                  title: "Cores da coleta seletiva",
                  description: "Padrão, variações e como não errar na separação.",
                },
                {
                  href: "/blog/o-que-pode-ser-reciclado",
                  title: "O que pode ser reciclado",
                  description: "Guia rápido por material para acertar no descarte.",
                },
                {
                  href: "/simbolos-da-reciclagem",
                  title: "Símbolos da reciclagem",
                  description: "Entenda os símbolos e códigos usados em embalagens.",
                },
              ]}
            />
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">FAQ rápido</h2>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900">Espelho quebrado pode reciclar?</h3>
                <p className="mt-2">
                  Não junto com vidro comum. A camada metálica no verso muda a composição e pode
                  contaminar o lote — o destino correto costuma ser rejeito ou ponto de coleta específico.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Preciso lavar o vidro antes?</h3>
                <p className="mt-2">
                  Basta remover resíduos e enxaguar rapidamente. Não precisa estar impecável, só sem
                  sujeira ou líquido em excesso.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Lâmpada queimada vai na coleta de vidro?
                </h3>
                <p className="mt-2">
                  Não. Lâmpadas exigem descarte específico em ecopontos por causa dos componentes
                  internos — nunca devem ir na coleta seletiva comum nem no lixo geral.
                </p>
              </div>
            </div>
          </div>

          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Próximo passo recomendado
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Para revisar o restante dos materiais recicláveis, veja o guia completo do que pode e não
              pode ser reciclado.
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
