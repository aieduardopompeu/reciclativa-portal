// src/app/blog/reduzir-lixo-na-rotina/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

const SLUG = "reduzir-lixo-na-rotina";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Como reduzir lixo na rotina: hábitos simples com grande impacto | Reciclativa",
  description:
    "Guia prático para reduzir lixo no dia a dia com hábitos simples: compras, cozinha, banheiro, limpeza, descarte e organização sem radicalismo.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "Como reduzir lixo na rotina: hábitos simples com grande impacto",
    description:
      "Guia prático para reduzir lixo no dia a dia com hábitos simples: compras, cozinha, banheiro, limpeza, descarte e organização sem radicalismo.",
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
        headline="Como reduzir lixo na rotina: hábitos simples com grande impacto"
        description="Guia prático para reduzir lixo no dia a dia com hábitos simples: compras, cozinha, banheiro, limpeza, descarte e organização sem radicalismo."
        datePublished="2025-12-09"
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
        <span className="text-slate-700">Reduzir lixo na rotina</span>
      </div>

      {/* Header do artigo */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
          Sustentabilidade
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Como reduzir lixo na rotina: hábitos simples com grande impacto
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Reduzir lixo não é “virar zero waste do dia para a noite”. É escolher alguns hábitos
          inteligentes que diminuem resíduos e facilitam a reciclagem. Aqui você vai encontrar um
          plano prático, por áreas da casa, com trocas simples e passos de descarte correto.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/reciclagem"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Página pilar: Reciclagem
          </Link>
          <Link
            href="/guias"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver guias práticos
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <article className="prose prose-slate mt-10 max-w-none">
        <h2>O que significa “reduzir lixo” na prática</h2>
        <p>
          Pense em três frentes simples:
          <strong> reduzir</strong> o que você compra/gera, <strong>reutilizar</strong> o que já tem
          e <strong>separar corretamente</strong> o que vai para reciclagem. O segredo é começar
          pequeno, medir resultados e manter consistência.
        </p>

        <h2>Checklist rápido: 10 hábitos que já reduzem muito o lixo</h2>
        <ol>
          <li>Leve ecobag e evite sacolas extras.</li>
          <li>Prefira refil (sabão, limpeza, cosméticos) quando existir.</li>
          <li>Compre “a granel” itens secos (quando for viável).</li>
          <li>Evite descartáveis: copo, canudo, talheres.</li>
          <li>Planeje refeições para reduzir sobra de comida.</li>
          <li>Tenha 2 lixeiras: recicláveis e orgânicos/rejeitos (no mínimo).</li>
          <li>Enxágue leve: retire excesso de comida e líquidos das embalagens.</li>
          <li>Separe vidro com segurança (embalado/identificado quando quebrado).</li>
          <li>Guarde um saco/caixa para eletrônicos e pilhas (descarte correto).</li>
          <li>Antes de comprar, pergunte: “preciso mesmo ou dá para reaproveitar?”</li>
        </ol>

        <h2>Por cômodo: como reduzir lixo sem complicar</h2>

        <h3>Cozinha</h3>
        <ul>
          <li>
            <strong>Planejamento:</strong> monte uma lista semanal e evite compras “no impulso”.
          </li>
          <li>
            <strong>Armazenamento:</strong> potes de vidro/plástico durável reduzem filme plástico.
          </li>
          <li>
            <strong>Orgânicos:</strong> se puder, separe restos para compostagem (mesmo que seja
            comunitária).
          </li>
          <li>
            <strong>Recicláveis:</strong> retire o excesso de comida e mantenha seco para não
            contaminar.
          </li>
        </ul>

        <h3>Banheiro</h3>
        <ul>
          <li>
            <strong>Refil</strong> de sabonete/shampoo quando existir.
          </li>
          <li>
            <strong>Escova</strong> com refil (quando disponível) reduz plástico.
          </li>
          <li>
            <strong>Evite “mini frascos”</strong>: prefira tamanho maior e durável.
          </li>
        </ul>

        <h3>Lavanderia e limpeza</h3>
        <ul>
          <li>
            <strong>Concentrados/refis</strong> diminuem embalagem e transporte.
          </li>
          <li>
            <strong>Panos reutilizáveis</strong> no lugar de papel (quando fizer sentido).
          </li>
          <li>
            <strong>Dosagem certa</strong> evita desperdício e melhora desempenho.
          </li>
        </ul>

        <h2>Separação correta: o que mais “estraga” a reciclagem</h2>
        <p>
          O maior problema é a <strong>contaminação</strong>: embalagem cheia de comida, líquido ou
          gordura. Isso pode inviabilizar uma carga inteira na triagem.
        </p>

        <ul>
          <li>
            <strong>Não precisa lavar com água em excesso.</strong> Normalmente, basta remover o
            resto de comida e deixar escorrer.
          </li>
          <li>
            <strong>Embalagens engorduradas</strong> (ex.: papel muito oleoso) geralmente não são
            recicláveis.
          </li>
          <li>
            <strong>Vidro quebrado</strong> deve ser embalado e identificado para segurança.
          </li>
        </ul>

        <p>
          Se você quer aprofundar:{" "}
          <Link href="/blog/cores-da-coleta-seletiva">cores da coleta seletiva</Link> e{" "}
          <Link href="/blog/o-que-pode-ser-reciclado">o que pode ser reciclado</Link>.
        </p>

        <h2>Uma regra simples: comece por 2 mudanças por semana</h2>
        <p>
          A forma mais eficiente de manter hábito é reduzir fricção. Sugestão:
        </p>
        <ul>
          <li>
            Semana 1: ecobag + separar recicláveis secos
          </li>
          <li>
            Semana 2: refil/embalagem maior + organizar orgânicos
          </li>
          <li>
            Semana 3: reduzir descartáveis + criar “caixa do e-lixo”
          </li>
          <li>
            Semana 4: revisar compras (o que mais gera embalagem)
          </li>
        </ul>

        <h2>Links úteis para continuar</h2>
        <ul>
          <li>
            <Link href="/reciclagem">Página pilar: Reciclagem</Link>
          </li>
          <li>
            <Link href="/blog/coleta-seletiva-no-brasil">Coleta seletiva no Brasil</Link>
          </li>
          <li>
            <Link href="/blog/lixo-eletronico-descarte">Lixo eletrônico: descarte correto</Link>
          </li>
          <li>
            <Link href="/blog/tipos-de-reciclagem">Tipos de reciclagem</Link>
          </li>
        </ul>

        <h2>FAQ: dúvidas comuns sobre reduzir lixo</h2>

        <h3>Preciso lavar tudo antes de reciclar?</h3>
        <p>
          Normalmente não. O ideal é retirar excesso de alimento e líquidos. Lavar “perfeito” gasta
          água e nem sempre é necessário para a triagem.
        </p>

        <h3>O que fazer quando não existe coleta seletiva no bairro?</h3>
        <p>
          Procure ecopontos, PEVs e cooperativas. Muitos mercados e shoppings recebem materiais
          específicos. Veja também: <Link href="/blog/coleta-seletiva-no-brasil">coleta seletiva</Link>.
        </p>

        <h3>Papel com gordura pode ir para reciclagem?</h3>
        <p>
          Em geral, não. A gordura contamina as fibras e dificulta o processo. Dependendo do caso,
          pode ir para orgânico ou rejeito.
        </p>

        <h3>Reduzir lixo é caro?</h3>
        <p>
          Não precisa ser. Muitas mudanças são de organização e hábito (planejamento de compras,
          evitar desperdício). Trocas “premium” são opcionais.
        </p>
      </article>

      {/* CTA final */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Próximo passo recomendado
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Se você ainda tem dúvidas do que é reciclável, comece por este guia: o que pode e o que
          não pode ser reciclado, com exemplos práticos.
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
