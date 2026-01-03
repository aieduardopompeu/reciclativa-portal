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
          ITAD é o conjunto de processos para destinar equipamentos de TI ao fim de vida
          com segurança, rastreabilidade e conformidade. Na prática, envolve inventário,
          triagem, reuso quando possível, sanitização de dados quando aplicável e destinação final.
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

      {/* Conteúdo */}
      <article className="prose prose-slate mt-10 max-w-none">
        <h2>O que significa ITAD</h2>
        <p>
          ITAD vem de <em>IT Asset Disposition</em>: a destinação (e gestão de fim de vida)
          de ativos de TI como notebooks, desktops, servidores, storages, equipamentos de rede,
          periféricos e mídias de armazenamento. O foco é combinar sustentabilidade com governança:
          recuperar valor quando possível e garantir destinação correta do que não pode ser reutilizado.
        </p>

        <h2>Por que ITAD é diferente de “reciclar eletrônicos”</h2>
        <ul>
          <li>
            <strong>Segurança:</strong> ativos podem conter dados sensíveis (mesmo em aparelhos antigos).
          </li>
          <li>
            <strong>Rastreabilidade:</strong> empresas precisam comprovar o destino (auditoria/compliance).
          </li>
          <li>
            <strong>Recuperação de valor:</strong> reuso/redistribuição/revenda podem reduzir custo total.
          </li>
          <li>
            <strong>Destinação técnica:</strong> reciclagem de e-lixo corporativo costuma exigir tratamento especializado.
          </li>
        </ul>

        <h2>Etapas típicas de um programa ITAD</h2>
        <ol>
          <li>
            <strong>Inventário:</strong> listar ativos, patrimônio, estado e risco (ex.: presença de mídia).
          </li>
          <li>
            <strong>Triagem:</strong> definir destino (reuso, doação, revenda, reciclagem, descarte final).
          </li>
          <li>
            <strong>Sanitização de dados:</strong> quando aplicável, realizar apagamento seguro e manter evidências.
          </li>
          <li>
            <strong>Logística:</strong> coleta/transporte e cadeia de custódia até o operador responsável.
          </li>
          <li>
            <strong>Documentação:</strong> relatórios e comprovação de destinação (conforme política interna e exigências).
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
          ITAD normalmente é a “camada profissional” para lidar com volumes corporativos.
          Para descarte doméstico, o caminho mais prático continua sendo ecopontos e logística reversa.
        </p>

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

        <h2>FAQ rápido</h2>

        <h3>ITAD é só para empresas?</h3>
        <p>
          Na prática, sim: o termo é mais usado no contexto corporativo (inventário, rastreabilidade,
          documentação). Para pessoas, o equivalente costuma ser “descarte de e-lixo” e logística reversa.
        </p>

        <h3>ITAD sempre envolve apagamento de dados?</h3>
        <p>
          Nem sempre — depende do ativo e da política interna. Mas, quando há mídia/armazenamento,
          a sanitização costuma ser uma etapa crítica do processo.
        </p>

        <h3>ITAD é sustentabilidade ou segurança?</h3>
        <p>
          É os dois: reduz descarte irregular e melhora recuperação de materiais, enquanto reduz riscos
          de vazamento ao controlar o fim de vida de ativos.
        </p>
      </article>

      {/* CTA final */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Próximo passo recomendado
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Se você chegou aqui pelo descarte doméstico, comece pelo guia de lixo eletrônico e veja como
          separar por tipo com segurança.
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
    </main>
  );
}
