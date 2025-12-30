// src/app/blog/cores-da-coleta-seletiva/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

const SLUG = "cores-da-coleta-seletiva";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Cores da coleta seletiva: padrão, variações e como não errar | Reciclativa",
  description:
    "Entenda as cores da coleta seletiva (papel, plástico, vidro, metal, orgânico e rejeito), variações por cidade e dicas práticas para separar corretamente sem confusão.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "Cores da coleta seletiva: padrão, variações e como não errar",
    description:
      "Guia prático sobre as cores da coleta seletiva e como separar resíduos corretamente, mesmo quando sua cidade usa variações.",
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
        headline="Cores da coleta seletiva: padrão, variações e como não errar"
        description="Guia prático sobre as cores da coleta seletiva, o que vai em cada uma, variações locais e dicas para separar resíduos sem confusão."
        datePublished="2025-12-05"
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
        <span className="text-slate-700">Cores da coleta seletiva</span>
      </div>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 ring-1 ring-violet-200">
          Guias
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Cores da coleta seletiva: padrão, variações e como não errar
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          As cores ajudam a separar resíduos por tipo, mas existem variações por cidade, cooperativa
          e local de descarte. Aqui você vai entender o padrão mais usado, o que vai em cada cor e
          como resolver as situações “confusas” sem comprometer a reciclagem.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/o-que-pode-ser-reciclado"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Guia: o que pode ser reciclado
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
        <h2>O que são as cores da coleta seletiva</h2>
        <p>
          As cores são um <strong>código visual</strong> para orientar a separação de resíduos.
          A ideia é facilitar o trabalho de coleta e triagem, reduzindo contaminação (um dos
          principais motivos de rejeição na reciclagem).
        </p>

        <h2>O padrão mais comum (o que você precisa memorizar)</h2>
        <p>
          Se você quer um atalho: memorize estas quatro cores principais, que aparecem com mais
          frequência:
        </p>
        <ul>
          <li>
            <strong>Azul:</strong> papel e papelão
          </li>
          <li>
            <strong>Vermelho:</strong> plástico
          </li>
          <li>
            <strong>Verde:</strong> vidro
          </li>
          <li>
            <strong>Amarelo:</strong> metal
          </li>
        </ul>

        <h2>O que vai em cada cor (com exemplos práticos)</h2>

        <h3>Azul — Papel e papelão</h3>
        <ul>
          <li>Folhas, jornais, revistas, caixas de papelão, embalagens de papel.</li>
          <li>
            <strong>Evite:</strong> papel engordurado, papel higiênico, guardanapo sujo, papel muito contaminado.
          </li>
          <li>
            <strong>Dica:</strong> papel deve estar seco; umidade e gordura dificultam a reciclagem.
          </li>
        </ul>

        <h3>Vermelho — Plástico</h3>
        <ul>
          <li>Garrafas PET, frascos de limpeza, potes rígidos, tampas (quando aceitas localmente).</li>
          <li>
            <strong>Evite:</strong> plástico muito sujo/engordurado, embalagens metalizadas/multicamadas (depende).
          </li>
          <li>
            <strong>Dica:</strong> retire o excesso de conteúdo e deixe escorrer; manter seco ajuda.
          </li>
        </ul>

        <h3>Verde — Vidro</h3>
        <ul>
          <li>Garrafas, potes e frascos de vidro.</li>
          <li>
            <strong>Evite:</strong> lâmpadas e espelhos (não são o mesmo fluxo do vidro comum).
          </li>
          <li>
            <strong>Dica:</strong> vidro quebrado deve ser embalado com segurança e identificado.
          </li>
        </ul>

        <h3>Amarelo — Metal</h3>
        <ul>
          <li>Latas de alumínio/aço, tampas metálicas, alguns metais limpos.</li>
          <li>
            <strong>Evite:</strong> aerossóis sem orientação local; itens com resíduo perigoso.
          </li>
          <li>
            <strong>Dica:</strong> esvazie e reduza contaminação; latas podem ser amassadas.
          </li>
        </ul>

        <h2>Cores que também aparecem (dependendo do local)</h2>

        <h3>Marrom — Orgânico</h3>
        <ul>
          <li>Restos de alimentos, cascas, borra de café, resíduos compostáveis (quando aplicável).</li>
          <li>
            <strong>Dica:</strong> se sua cidade tem coleta orgânica/compostagem, separação correta melhora muito o resultado.
          </li>
        </ul>

        <h3>Cinza — Rejeito (não reciclável)</h3>
        <ul>
          <li>Resíduos sem reciclagem local, contaminados, misturados ou sem tecnologia viável.</li>
          <li>
            <strong>Dica:</strong> rejeito não é “lixo”; é o que sobrou após reduzir, reutilizar e separar corretamente.
          </li>
        </ul>

        <h3>Branco — Resíduos de serviços de saúde</h3>
        <p>
          Essa cor costuma ser usada em contextos específicos (unidades de saúde). Em casa, não é o
          padrão do dia a dia.
        </p>

        <h3>Preto — Madeira</h3>
        <p>
          Pode aparecer em alguns sistemas e ecopontos para separar madeira, mas não é o mais comum
          no cotidiano.
        </p>

        <h3>Laranja — Resíduos perigosos</h3>
        <p>
          Também é mais comum em contextos específicos. Em casa, foque em separar corretamente e
          buscar descarte adequado quando necessário (ex.: e-lixo).
        </p>

        <h2>O ponto mais importante: sua cidade pode ter variações</h2>
        <p>
          Nem todo local usa exatamente as mesmas cores. O que não muda é o princípio:
          <strong> separar por material</strong> e evitar contaminação. Se tiver dúvida:
        </p>
        <ol>
          <li>Veja a sinalização do seu condomínio, prédio, escola, mercado ou ecoponto.</li>
          <li>
            Se não tiver sinalização, separe por material (papel/plástico/vidro/metal) e mantenha seco.
          </li>
          <li>
            Em caso de dúvida, priorize não contaminar (melhor rejeito do que contaminar recicláveis).
          </li>
        </ol>

        <h2>Erros comuns que fazem “perder” reciclagem</h2>
        <ul>
          <li>
            <strong>Reciclável sujo:</strong> embalagem com resto de comida/líquido contaminando o saco inteiro.
          </li>
          <li>
            <strong>Misturar vidro quebrado:</strong> risco para a triagem; embale com segurança.
          </li>
          <li>
            <strong>Papel molhado/engordurado:</strong> fibras contaminadas geralmente viram rejeito.
          </li>
        </ul>

        <p>
          Para fechar o básico com exemplos, veja{" "}
          <Link href="/blog/o-que-pode-ser-reciclado">o que pode ser reciclado</Link> e{" "}
          <Link href="/blog/coleta-seletiva-no-brasil">coleta seletiva no Brasil</Link>.
        </p>

        <h2>Links úteis para continuar</h2>
        <ul>
          <li>
            <Link href="/reciclagem">Página pilar: Reciclagem</Link>
          </li>
          <li>
            <Link href="/blog/reciclagem-plastico">Reciclagem de plástico</Link>
          </li>
          <li>
            <Link href="/blog/lixo-eletronico-descarte">Lixo eletrônico: descarte correto</Link>
          </li>
          <li>
            <Link href="/blog/reduzir-lixo-na-rotina">Reduzir lixo na rotina</Link>
          </li>
        </ul>

        <h2>FAQ: dúvidas comuns sobre cores da coleta seletiva</h2>

        <h3>Se minha cidade usa cores diferentes, o que eu faço?</h3>
        <p>
          Siga a sinalização local. Se não existir, separe por material (papel/plástico/vidro/metal)
          e mantenha recicláveis secos. Isso costuma funcionar bem na triagem.
        </p>

        <h3>Preciso lavar as embalagens?</h3>
        <p>
          Em geral, não precisa lavar “perfeito”. O essencial é retirar excesso de alimento e líquidos
          para evitar contaminação. Deixe escorrer e mantenha seco.
        </p>

        <h3>Papel engordurado vai no azul?</h3>
        <p>
          Normalmente não. Gordura contamina as fibras e dificulta a reciclagem. Dependendo do caso,
          pode ir para orgânico ou rejeito.
        </p>

        <h3>Espelho e lâmpada vão no verde (vidro)?</h3>
        <p>
          Não é o mesmo fluxo do vidro comum. Lâmpadas e espelhos costumam ter descarte específico.
          Procure ecopontos/PEVs e orientações locais.
        </p>
      </article>

      {/* CTA final */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Próximo passo recomendado</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Se você ainda tem dúvidas do que entra em cada material, este guia fecha a lacuna com exemplos
          e casos comuns de contaminação.
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
