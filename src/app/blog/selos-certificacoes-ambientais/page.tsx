import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://www.reciclativa.com";

const SLUG = "selos-certificacoes-ambientais";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Selos e certificações ambientais: o que realmente significam | Reciclativa",
  description:
    "FSC, Cradle to Cradle, OK Compost: entenda o que cada selo ambiental realmente certifica, quem audita e como diferenciar certificação real de marketing.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Selos e certificações ambientais: o que realmente significam",
    description:
      "O que FSC, Cradle to Cradle e OK Compost certificam de verdade, e como identificar selo sem lastro.",
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
        headline="Selos e certificações ambientais: o que realmente significam"
        description="O que selos como FSC, Cradle to Cradle e OK Compost certificam de verdade, e como diferenciar certificação real de marketing."
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
        <span className="text-slate-700">Selos e certificações ambientais</span>
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

        <div className="mt-3 inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
          Sustentabilidade
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Selos e certificações ambientais: o que realmente significam
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Nem todo selo “verde” numa embalagem representa uma certificação de verdade. Veja o que
          selos como FSC, Cradle to Cradle e OK Compost realmente auditam, quem está por trás de cada
          um, e como identificar quando é só marketing.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/bioplasticos-solucao-ou-greenwashing"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver: bioplásticos e greenwashing
          </Link>
          <Link
            href="/blog/materiais-biodegradaveis-escova-de-dente-de-bambu"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: materiais biodegradáveis
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
                Um selo de verdade tem <strong className="text-slate-900">auditoria independente</strong>{" "}
                por trás — não é a própria marca se autodeclarando.
              </li>
              <li>
                Selos diferentes certificam <strong className="text-slate-900">coisas diferentes</strong>{" "}
                (origem florestal, circularidade, compostabilidade) — não são intercambiáveis.
              </li>
              <li>
                Frase vaga tipo “eco-friendly” <strong className="text-slate-900">sem selo nenhum</strong>{" "}
                não é certificação, é só texto de embalagem.
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
            <h2>O que separa um selo real de um selo “de fachada”</h2>
            <p>
              A diferença central é a auditoria independente. Um selo ambiental sério é emitido por uma
              organização separada da empresa que fabrica o produto, com critérios técnicos publicados e
              processo de verificação recorrente. Quando o “selo” é só uma frase ou ícone criado pela
              própria marca, sem organização certificadora por trás, não há nada realmente sendo
              verificado — é exatamente o padrão de{" "}
              <Link href="/blog/bioplasticos-solucao-ou-greenwashing">greenwashing</Link> que já vimos em
              relação a bioplásticos.
            </p>

            <h2>FSC (Forest Stewardship Council)</h2>
            <p>
              O selo FSC certifica manejo florestal responsável: produtos de origem florestal (papel,
              madeira, celulose) que vêm de florestas geridas de forma a conservar a biodiversidade e
              respeitar comunidades locais. É um dos selos ambientais mais conhecidos mundialmente e tem
              representação formal no Brasil através do FSC Brasil.
            </p>

            <h2>Cradle to Cradle</h2>
            <p>
              Avalia o produto sob uma lógica de economia circular: materiais usados, potencial de reuso
              e reciclagem, uso de energia renovável na fabricação e gestão responsável de água. Tem
              quatro níveis de classificação — Bronze, Prata, Ouro e Platina — sendo Platina o mais
              exigente. É um selo relevante especificamente para quem quer entender{" "}
              <Link href="/economia-circular">economia circular</Link> aplicada a produto real, não só
              conceito.
            </p>

            <h2>OK Compost (TÜV Áustria)</h2>
            <p>
              Certifica compostabilidade — mas atenção ao detalhe que mais gera confusão: existem versões
              diferentes do selo. “OK Compost Industrial” certifica que o material se decompõe em
              condições de compostagem industrial (temperatura e umidade controladas), enquanto “OK
              Compost Home” é mais rigoroso e garante que o material realmente compostada em condições
              domésticas comuns. Um produto com selo industrial não necessariamente compostada na sua
              composteira de quintal.
            </p>

            <h2>Selos brasileiros específicos</h2>
            <p>
              Além dos selos internacionais, existem certificadoras nacionais voltadas a setores
              específicos — como o IBD Certificações, uma das maiores certificadoras brasileiras de
              cultivo sem substâncias químicas e transgênicos, relevante principalmente no setor
              alimentício.
            </p>

            <h2>Sinais de alerta: quando desconfiar</h2>
            <ul>
              <li>
                <strong>Ícone sem nome de certificadora:</strong> se não dá para identificar quem emitiu
                o selo, provavelmente não é uma certificação real.
              </li>
              <li>
                <strong>Termo vago sem definição:</strong> “eco”, “verde”, “natural” sem explicar
                critério nenhum não é certificação.
              </li>
              <li>
                <strong>Selo que não aparece no site da certificadora:</strong> certificadoras sérias
                mantêm registro público de quem está certificado — vale conferir.
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <RecommendedLinks
              items={[
                {
                  href: "/blog/bioplasticos-solucao-ou-greenwashing",
                  title: "Bioplásticos: solução ou greenwashing?",
                  description: "Como identificar sinais de greenwashing na prática.",
                },
                {
                  href: "/blog/materiais-biodegradaveis-escova-de-dente-de-bambu",
                  title: "Materiais biodegradáveis",
                  description: "O que são de fato e exemplos práticos do dia a dia.",
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
                  Todo selo verde numa embalagem é confiável?
                </h3>
                <p className="mt-2">
                  Não. Só é confiável quando há uma organização certificadora independente por trás, com
                  critérios publicados — não basta ser um ícone criado pela própria marca.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  OK Compost Industrial serve para minha composteira em casa?
                </h3>
                <p className="mt-2">
                  Não necessariamente. Esse selo certifica decomposição em condições industriais
                  controladas — para compostagem doméstica, o selo correto é o OK Compost Home.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Como confirmar se um selo é real?
                </h3>
                <p className="mt-2">
                  Busque o nome da certificadora e confira se ela mantém registro público de empresas
                  certificadas — a maioria das certificadoras sérias disponibiliza essa consulta no
                  próprio site.
                </p>
              </div>
            </div>
          </div>

          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Próximo passo recomendado
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Para aprofundar em como identificar greenwashing em materiais específicos, veja o guia de
              bioplásticos.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog/bioplasticos-solucao-ou-greenwashing"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Ver: bioplásticos e greenwashing
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
