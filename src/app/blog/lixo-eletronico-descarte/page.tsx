import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

const SLUG = "lixo-eletronico-descarte";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Lixo eletrônico: como descartar corretamente sem poluir | Reciclativa",
  description:
    "Guia prático de descarte de lixo eletrônico (e-lixo): o que é, riscos ambientais, como separar por tipo e onde levar com segurança.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "Lixo eletrônico: como descartar corretamente sem poluir",
    description:
      "Guia prático de descarte de lixo eletrônico (e-lixo): separação por tipo e onde levar.",
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
        headline="Lixo eletrônico: como descartar corretamente sem poluir"
        description="Entenda o que é lixo eletrônico, por que ele é perigoso e como separar e descartar corretamente."
        datePublished="2025-12-07"
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
        <span className="text-slate-700">Lixo eletrônico</span>
      </div>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
          Sustentabilidade
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Lixo eletrônico: como descartar corretamente sem poluir
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Celulares antigos, cabos, carregadores, pilhas, baterias e eletrodomésticos quebrados não
          deveriam ir para o lixo comum. O e-lixo pode conter metais e componentes que contaminam solo
          e água. Este guia te mostra como separar e onde levar, com um passo a passo simples.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/coleta-seletiva-no-brasil"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver: Coleta seletiva no Brasil
          </Link>
          <Link
            href="/blog/reduzir-lixo-na-rotina"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: Reduzir lixo na rotina
          </Link>
        </div>
      </header>

      {/* Corpo editorial — PADRÃO ITAD */}
      <section className="mt-10">
        <article className="mx-auto max-w-3xl">
          <div
            className={[
              "text-slate-800 leading-relaxed space-y-5",
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
            <h2>O que é lixo eletrônico (e por que ele é diferente)</h2>
            <p>
              Lixo eletrônico (e-lixo) é todo resíduo de equipamentos elétricos e eletrônicos: celulares,
              notebooks, TVs, impressoras, cabos, carregadores, pilhas, baterias e eletrodomésticos.
            </p>

            <h2>Por que não deve ir para o lixo comum</h2>
            <ul>
              <li>
                <strong>Risco ambiental:</strong> componentes podem contaminar solo e água.
              </li>
              <li>
                <strong>Risco de segurança:</strong> baterias podem aquecer ou estufar.
              </li>
              <li>
                <strong>Perda de recursos:</strong> materiais recicláveis são desperdiçados.
              </li>
            </ul>

            <h2>Regra de ouro: separar por categoria</h2>

            <h3>1) Pilhas e baterias</h3>
            <ul>
              <li>Isole os polos com fita, evite calor e umidade.</li>
              <li>Leve a pontos de coleta específicos.</li>
            </ul>

            <h3>2) Pequenos eletrônicos</h3>
            <ul>
              <li>Celulares, tablets, roteadores, fones.</li>
              <li>Guarde cabos juntos para facilitar a triagem.</li>
            </ul>

            <h3>3) Cabos e carregadores</h3>
            <ul>
              <li>Enrole e organize antes de descartar.</li>
              <li>Destino varia conforme a cidade.</li>
            </ul>

            <h3>4) Eletrodomésticos maiores</h3>
            <ul>
              <li>Prefira ecopontos e coleta agendada.</li>
            </ul>

            <h2>Onde descartar</h2>
            <ol>
              <li>Ecopontos municipais.</li>
              <li>Logística reversa em lojas.</li>
              <li>Campanhas e mutirões.</li>
            </ol>

            <h2>Como reduzir e-lixo</h2>
            <ul>
              <li>Reparo e manutenção.</li>
              <li>Reuso e doação.</li>
              <li>Compra consciente.</li>
            </ul>
          </div>

          <div className="mt-10">
            <RecommendedLinks
              links={[
                {
                  href: "/blog/coleta-seletiva-no-brasil",
                  title: "Coleta seletiva no Brasil",
                  description: "Como funciona e como participar.",
                },
                {
                  href: "/blog/o-que-pode-ser-reciclado",
                  title: "O que pode ser reciclado",
                  description: "Guia rápido para acertar no descarte.",
                },
                {
                  href: "/blog/itad",
                  title: "ITAD (Asset Disposition)",
                  description: "Destinação corporativa de ativos de TI.",
                },
              ]}
            />
          </div>
        </article>
      </section>

      {/* CTA final (inalterado) */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Próximo passo recomendado
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Para acertar o básico do descarte no dia a dia, revise o guia do que pode ser reciclado.
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
    </main>
  );
}
