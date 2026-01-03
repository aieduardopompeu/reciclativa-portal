import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

const SLUG = "itad";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "ITAD: o que é e como funciona (IT Asset Disposition) | Reciclativa",
  description:
    "Entenda ITAD (IT Asset Disposition): destinação de ativos de TI com segurança, rastreabilidade e conformidade — do inventário ao descarte final.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "ITAD: o que é e como funciona (IT Asset Disposition)",
    description:
      "Destinação de ativos de TI com segurança, rastreabilidade e conformidade — do inventário ao descarte final.",
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
        headline="ITAD: o que é e como funciona (IT Asset Disposition)"
        description="Entenda o que é ITAD, por que ele é importante para segurança da informação e como a destinação de ativos de TI pode ser feita com rastreabilidade."
        datePublished="2026-01-03"
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
        <span className="text-slate-700">ITAD</span>
      </div>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
          Sustentabilidade
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          ITAD: o que é e como funciona (IT Asset Disposition)
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          ITAD é o conjunto de processos para destinar equipamentos de TI ao fim de vida com
          segurança, rastreabilidade e conformidade. Na prática, envolve inventário, triagem, reuso
          quando possível, sanitização de dados quando aplicável e destinação final.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/lixo-eletronico-descarte"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver: Lixo eletrônico (e-lixo)
          </Link>
          <Link
            href="/economia-circular"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: Economia circular
          </Link>
        </div>
      </header>

      {/* Corpo editorial (somente leitura/ritmo) */}
      <section className="mt-10">
        <article className="mx-auto max-w-3xl">
          {/* Box editorial: resumo rápido */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Em 30 segundos
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                <strong className="text-slate-900">ITAD</strong> é a destinação de ativos de TI com
                foco em <strong className="text-slate-900">segurança</strong> e{" "}
                <strong className="text-slate-900">rastreabilidade</strong>.
              </li>
              <li>
                O processo normalmente inclui <strong className="text-slate-900">inventário</strong>,
                triagem (reuso/reciclagem), <strong className="text-slate-900">sanitização</strong>{" "}
                quando aplicável e documentação.
              </li>
              <li>
                Para pessoas físicas, o equivalente costuma ser “descarte de e-lixo” via{" "}
                <strong className="text-slate-900">ecopontos</strong> e logística reversa.
              </li>
            </ul>
          </div>

          {/* Tipografia editorial sem plugin prose */}
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
              "[&_em]:text-slate-800",

              // listas
              "[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6",
              "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6",
              "[&_li]:mt-2",

              // links
              "[&_a]:font-semibold [&_a]:text-emerald-700 hover:[&_a]:underline",
            ].join(" ")}
          >
            <h2>O que significa ITAD</h2>
            <p>
              ITAD vem de <em>IT Asset Disposition</em>: a destinação (e gestão de fim de vida) de
              ativos de TI como notebooks, desktops, servidores, storages, equipamentos de rede,
              periféricos e mídias de armazenamento. O foco é combinar sustentabilidade com
              governança: recuperar valor quando possível e garantir destinação correta do que não
              pode ser reutilizado.
            </p>

            <h2>Por que ITAD é diferente de “reciclar eletrônicos”</h2>
            <ul>
              <li>
                <strong>Segurança:</strong> ativos podem conter dados sensíveis (mesmo em aparelhos
                antigos).
              </li>
              <li>
                <strong>Rastreabilidade:</strong> empresas precisam comprovar o destino
                (auditoria/compliance).
              </li>
              <li>
                <strong>Recuperação de valor:</strong> reuso/redistribuição/revenda podem reduzir
                custo total.
              </li>
              <li>
                <strong>Destinação técnica:</strong> reciclagem de e-lixo corporativo costuma exigir
                tratamento especializado.
              </li>
            </ul>

            <h2>Etapas típicas de um programa ITAD</h2>
            <ol>
              <li>
                <strong>Inventário:</strong> listar ativos, patrimônio, estado e risco (ex.: presença
                de mídia).
              </li>
              <li>
                <strong>Triagem:</strong> definir destino (reuso, doação, revenda, reciclagem,
                descarte final).
              </li>
              <li>
                <strong>Sanitização de dados:</strong> quando aplicável, realizar apagamento seguro e
                manter evidências.
              </li>
              <li>
                <strong>Logística:</strong> coleta/transporte e cadeia de custódia até o operador
                responsável.
              </li>
              <li>
                <strong>Documentação:</strong> relatórios e comprovação de destinação (conforme
                política interna e exigências).
              </li>
            </ol>

            <h2>Quando faz sentido (exemplos práticos)</h2>
            <ul>
              <li>Renovação de parque (troca de notebooks/desktops em lote).</li>
              <li>Desativação de servidores e infraestrutura antiga.</li>
              <li>Fechamento/mudança de unidade com descarte de ativos.</li>
              <li>Necessidade de controle por auditoria e governança.</li>
            </ul>

            <h2>Conexão com lixo eletrônico (e-lixo)</h2>
            <p>
              ITAD normalmente é a “camada profissional” para lidar com volumes corporativos. Para
              descarte doméstico, o caminho mais prático continua sendo ecopontos e logística
              reversa.
            </p>
          </div>

          {/* Links úteis */}
          <div className="mt-10">
            <RecommendedLinks
              links={[
                {
                  href: "/blog/lixo-eletronico-descarte",
                  title: "Lixo eletrônico: descarte correto",
                  description: "Guia prático para pessoas e pequenos volumes.",
                },
                {
                  href: "/blog/coleta-seletiva-no-brasil",
                  title: "Coleta seletiva no Brasil",
                  description: "Como separar e o que fazer quando não há coleta.",
                },
                {
                  href: "/residuos-solidos",
                  title: "Resíduos sólidos",
                  description: "Classificação e boas práticas no dia a dia.",
                },
                {
                  href: "/economia-circular",
                  title: "Economia circular",
                  description: "Reduzir, reusar, reparar e só depois reciclar.",
                },
              ]}
            />
          </div>

          {/* FAQ */}
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              FAQ rápido
            </h2>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  ITAD é só para empresas?
                </h3>
                <p className="mt-2">
                  Na prática, sim: o termo é mais usado no contexto corporativo (inventário,
                  documentação, rastreabilidade). Para pessoas, o equivalente costuma ser “descarte
                  de e-lixo” e logística reversa.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  ITAD sempre envolve apagamento de dados?
                </h3>
                <p className="mt-2">
                  Nem sempre — depende do ativo e da política interna. Mas, quando há
                  mídia/armazenamento, a sanitização costuma ser uma etapa crítica do processo.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  ITAD é sustentabilidade ou segurança?
                </h3>
                <p className="mt-2">
                  É os dois: reduz descarte irregular e melhora recuperação de materiais, enquanto
                  reduz riscos de vazamento ao controlar o fim de vida de ativos.
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
              Se você chegou aqui pelo descarte doméstico, comece pelo guia de lixo eletrônico e
              veja como separar por tipo com segurança.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog/lixo-eletronico-descarte"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Ver guia: lixo eletrônico
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
