// src/app/blog/economia-circular-e-linear/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";

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

      {/* Conteúdo */}
      <article className="prose prose-slate mt-10 max-w-none">
        <h2>O que é economia linear</h2>
        <p>
          Economia linear é um fluxo “de mão única”: <strong>extrair recursos</strong>,{" "}
          <strong>produzir</strong>, <strong>consumir</strong> e <strong>descartar</strong>. Ela
          funciona bem para escalar produção e consumo, mas tende a aumentar resíduos e pressão sobre
          recursos naturais.
        </p>

        <h2>O que é economia circular</h2>
        <p>
          Economia circular busca manter produtos e materiais em uso pelo maior tempo possível,
          reduzindo perdas. Isso envolve <strong>design para durabilidade</strong>,{" "}
          <strong>reuso</strong>, <strong>reparo</strong>, <strong>remanufatura</strong> e{" "}
          <strong>reciclagem</strong> (que é importante, mas não é a única estratégia).
        </p>

        <h2>Diferenças principais (tabela mental)</h2>
        <ul>
          <li>
            <strong>Linear:</strong> comprar → usar → jogar fora.
          </li>
          <li>
            <strong>Circular:</strong> comprar melhor → usar por mais tempo → reparar/reutilizar →
            reciclar o que sobrar.
          </li>
        </ul>

        <h2>Exemplos práticos do dia a dia</h2>

        <h3>1) Garrafa e embalagem</h3>
        <ul>
          <li>
            <strong>Linear:</strong> comprar bebida → descartar embalagem sem separar.
          </li>
          <li>
            <strong>Circular:</strong> preferir refil/retornável quando existir → separar corretamente para reciclagem.
          </li>
        </ul>

        <h3>2) Roupas</h3>
        <ul>
          <li>
            <strong>Linear:</strong> comprar barato e trocar rápido.
          </li>
          <li>
            <strong>Circular:</strong> comprar melhor, ajustar/recosturar, revender/doar, reaproveitar tecido.
          </li>
        </ul>

        <h3>3) Eletrônicos</h3>
        <ul>
          <li>
            <strong>Linear:</strong> trocar aparelho por qualquer defeito e descartar no lixo comum.
          </li>
          <li>
            <strong>Circular:</strong> reparar quando viável, revender/doar, destinar como e-lixo (logística reversa).
          </li>
        </ul>

        <p>
          Veja também: <Link href="/blog/lixo-eletronico-descarte">lixo eletrônico: descarte correto</Link>.
        </p>

        <h2>Os “R’s” da circularidade (ordem que faz sentido)</h2>
        <p>
          Muita gente pensa só em reciclar, mas a ordem mais eficiente costuma ser:
        </p>
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
            <strong>Design:</strong> produtos multicamadas/misturados são mais difíceis de reciclar.
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
          Complemento direto: <Link href="/blog/reduzir-lixo-na-rotina">reduzir lixo na rotina</Link>.
        </p>

        <h2>Links úteis para continuar</h2>
        <ul>
          <li>
            <Link href="/reciclagem">Página pilar: Reciclagem</Link>
          </li>
          <li>
            <Link href="/blog/tipos-de-reciclagem">Tipos de reciclagem</Link>
          </li>
          <li>
            <Link href="/blog/reciclagem-plastico">Reciclagem de plástico</Link>
          </li>
          <li>
            <Link href="/blog/o-que-pode-ser-reciclado">O que pode ser reciclado</Link>
          </li>
        </ul>

        <h2>FAQ: dúvidas comuns sobre economia circular</h2>

        <h3>Economia circular é só reciclagem?</h3>
        <p>
          Não. Reciclagem é uma parte. Circularidade começa antes: reduzir, reutilizar e reparar são
          etapas com impacto maior porque evitam gerar resíduo.
        </p>

        <h3>Se eu separar o lixo, já estou fazendo economia circular?</h3>
        <p>
          Separar corretamente ajuda muito, mas circularidade também envolve reduzir consumo,
          escolher produtos mais duráveis e incentivar reuso e reparo.
        </p>

        <h3>Economia circular é mais cara?</h3>
        <p>
          Nem sempre. Muitos hábitos circulares economizam dinheiro (reparo, reuso, planejamento de
          compras, menos desperdício).
        </p>

        <h3>Qual o primeiro passo mais simples?</h3>
        <p>
          Comece com duas ações: reduzir descartáveis e separar recicláveis secos. Depois avance
          para refis, reuso e reparos.
        </p>
      </article>

      {/* CTA final */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Próximo passo recomendado</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Para aplicar circularidade no descarte, revise o guia do que pode ser reciclado e como
          evitar contaminação na separação.
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
