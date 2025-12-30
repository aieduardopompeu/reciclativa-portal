// src/app/blog/o-que-e-reciclagem/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

const SLUG = "o-que-e-reciclagem";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "O que é reciclagem: conceito, etapas e por que isso muda tudo | Reciclativa",
  description:
    "Entenda o que é reciclagem, como funciona (etapas), por que nem tudo recicla, o papel da coleta seletiva e como separar corretamente para aumentar o reaproveitamento.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "O que é reciclagem: conceito, etapas e por que isso muda tudo",
    description:
      "Guia completo para entender reciclagem: conceito, etapas, benefícios, limites e como separar resíduos na prática sem erro.",
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
        headline="O que é reciclagem: conceito, etapas e por que isso muda tudo"
        description="Entenda o que é reciclagem, como funciona na prática (etapas), por que nem tudo recicla e como separar corretamente para aumentar o reaproveitamento."
        datePublished="2025-12-01"
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
        <span className="text-slate-700">O que é reciclagem</span>
      </div>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
          Reciclagem
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          O que é reciclagem: conceito, etapas e por que isso muda tudo
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Reciclagem é o processo de transformar resíduos em matéria-prima para criar novos produtos.
          Parece simples, mas na prática depende de separação correta, triagem, logística e indústria.
          Neste guia você vai entender o conceito, as etapas e por que “nem tudo recicla” em toda cidade.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/o-que-pode-ser-reciclado"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver lista: o que pode ser reciclado
          </Link>
          <Link
            href="/blog/coleta-seletiva-no-brasil"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: coleta seletiva no Brasil
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <article className="prose prose-slate mt-10 max-w-none">
        <h2>O que é reciclagem (definição simples)</h2>
        <p>
          Reciclagem é transformar um resíduo em <strong>matéria-prima</strong> para fabricar outro produto.
          O objetivo é reduzir o uso de recursos naturais, diminuir a quantidade de lixo enviada a aterros
          e recuperar valor econômico de materiais.
        </p>

        <h2>Reciclar não é a mesma coisa que reutilizar</h2>
        <ul>
          <li>
            <strong>Reutilizar:</strong> usar o mesmo item novamente (ex.: pote virando recipiente).
          </li>
          <li>
            <strong>Reciclar:</strong> transformar o material para virar outro produto (ex.: garrafa PET virando fibra).
          </li>
        </ul>

        <h2>As etapas da reciclagem (como funciona na prática)</h2>
        <ol>
          <li>
            <strong>Separação na origem:</strong> você separa recicláveis (secos) do orgânico/rejeito.
          </li>
          <li>
            <strong>Coleta:</strong> por coleta seletiva, PEV/ecoponto ou entrega em cooperativas.
          </li>
          <li>
            <strong>Triagem:</strong> separação por material e qualidade (papel, plástico, metal, vidro).
          </li>
          <li>
            <strong>Beneficiamento:</strong> limpeza, compactação, trituração, prensagem, etc.
          </li>
          <li>
            <strong>Indústria:</strong> o material vira matéria-prima e entra na fabricação de novos produtos.
          </li>
        </ol>

        <h2>Por que “nem tudo recicla” (mesmo quando parece reciclável)</h2>
        <p>
          Existem três motivos principais:
        </p>
        <ul>
          <li>
            <strong>Infraestrutura local:</strong> nem toda cidade tem triagem e cadeia industrial para todos os materiais.
          </li>
          <li>
            <strong>Contaminação:</strong> comida, líquidos e gordura podem inviabilizar cargas inteiras.
          </li>
          <li>
            <strong>Material misturado:</strong> embalagens multicamadas e metalizadas são mais difíceis de processar.
          </li>
        </ul>

        <h2>O que você pode fazer para “a reciclagem acontecer de verdade”</h2>
        <h3>1) Separe o básico (sem complicar)</h3>
        <ul>
          <li>
            <strong>Recicláveis secos:</strong> papel, plástico, metal e vidro (quando aceito na sua região).
          </li>
          <li>
            <strong>Orgânico/rejeito:</strong> restos de comida, papel sujo, itens sem reciclagem local.
          </li>
        </ul>

        <h3>2) Evite contaminação</h3>
        <ul>
          <li>Retire excesso de alimento e líquidos.</li>
          <li>Não precisa lavar “perfeito”; o objetivo é reduzir sujeira e manter seco.</li>
          <li>Papel engordurado costuma virar rejeito.</li>
        </ul>

        <h3>3) Descarte itens especiais separadamente</h3>
        <ul>
          <li>
            <strong>E-lixo:</strong> eletrônicos, cabos, carregadores —{" "}
            <Link href="/blog/lixo-eletronico-descarte">veja o guia</Link>.
          </li>
          <li>
            <strong>Pilhas e baterias:</strong> pontos de coleta específicos (logística reversa).
          </li>
          <li>
            <strong>Lâmpadas:</strong> descarte específico em ecopontos/PEVs.
          </li>
        </ul>

        <h2>Benefícios da reciclagem (sem exageros)</h2>
        <ul>
          <li>
            <strong>Redução de resíduos</strong> enviados para aterros.
          </li>
          <li>
            <strong>Recuperação de materiais</strong> e economia de recursos.
          </li>
          <li>
            <strong>Geração de valor</strong> na cadeia de triagem e reciclagem.
          </li>
        </ul>

        <h2>Onde a reciclagem “encaixa” na economia circular</h2>
        <p>
          Reciclagem é parte de um sistema maior. Em geral, a ordem mais eficiente é:
          <strong> reduzir → reutilizar → reparar → reciclar</strong>. Veja uma visão completa:{" "}
          <Link href="/blog/economia-circular-e-linear">economia circular vs. economia linear</Link>.
        </p>

        <h2>Links úteis para continuar</h2>
        <ul>
          <li>
            <Link href="/blog/o-que-pode-ser-reciclado">O que pode ser reciclado (lista prática)</Link>
          </li>
          <li>
            <Link href="/blog/coleta-seletiva-no-brasil">Coleta seletiva no Brasil</Link>
          </li>
          <li>
            <Link href="/blog/cores-da-coleta-seletiva">Cores da coleta seletiva</Link>
          </li>
          <li>
            <Link href="/blog/tipos-de-reciclagem">Tipos de reciclagem</Link>
          </li>
          <li>
            <Link href="/reciclagem">Página pilar: Reciclagem</Link>
          </li>
        </ul>

        <h2>FAQ: dúvidas comuns sobre reciclagem</h2>

        <h3>Reciclar é suficiente para “resolver o lixo”?</h3>
        <p>
          Não. Reciclagem é importante, mas reduzir e reutilizar geralmente têm impacto maior, porque evitam gerar resíduo.
        </p>

        <h3>Preciso lavar embalagens antes de reciclar?</h3>
        <p>
          Em geral, não precisa lavar “perfeito”. Retirar excesso de comida e líquidos e manter seco já ajuda muito.
        </p>

        <h3>Por que papel com gordura não recicla?</h3>
        <p>
          A gordura contamina as fibras e dificulta o processo. Dependendo do caso, pode ir para orgânico ou rejeito.
        </p>

        <h3>Se não existe coleta seletiva no meu bairro, como faço?</h3>
        <p>
          Procure ecopontos/PEVs e cooperativas. Veja o guia:{" "}
          <Link href="/blog/coleta-seletiva-no-brasil">coleta seletiva no Brasil</Link>.
        </p>
      </article>

      {/* CTA final */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Próximo passo recomendado</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Para aplicar o básico sem errar, use a lista prática do que pode ser reciclado, com exemplos
          e dicas para evitar contaminação.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/o-que-pode-ser-reciclado"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver lista: o que pode ser reciclado
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
