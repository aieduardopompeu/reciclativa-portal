// src/app/blog/tipos-de-reciclagem/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

const SLUG = "tipos-de-reciclagem";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Tipos de reciclagem: mecânica, química, energética e orgânica | Reciclativa",
  description:
    "Entenda os tipos de reciclagem (mecânica, química, energética e orgânica), exemplos práticos, quando cada uma é usada e como isso afeta o descarte no dia a dia.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "Tipos de reciclagem: mecânica, química, energética e orgânica",
    description:
      "Guia didático sobre os principais tipos de reciclagem, com exemplos e orientações para separar resíduos sem erro.",
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
        headline="Tipos de reciclagem: mecânica, química, energética e orgânica"
        description="Guia didático sobre tipos de reciclagem: mecânica, química, energética e orgânica, com exemplos e o que isso muda no descarte do dia a dia."
        datePublished="2025-12-03"
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
        <span className="text-slate-700">Tipos de reciclagem</span>
      </div>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
          Reciclagem
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Tipos de reciclagem: mecânica, química, energética e orgânica
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          “Reciclar” não é um único processo. Existem diferentes tipos de reciclagem, e cada um faz
          sentido para materiais e contextos específicos. Entender isso ajuda a separar melhor e a
          perceber por que alguns resíduos “até são recicláveis”, mas não são reciclados em toda
          cidade.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/o-que-pode-ser-reciclado"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Guia: o que pode ser reciclado
          </Link>
          <Link
            href="/blog/reciclagem-plastico"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: reciclagem de plástico
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <article className="prose prose-slate mt-10 max-w-none">
        <h2>Por que existem tipos diferentes de reciclagem</h2>
        <p>
          Materiais têm composições, contaminação e valor de mercado diferentes. Além disso, a
          reciclagem depende de infraestrutura (coleta, triagem, indústria). Por isso, o caminho
          “mais usado” varia: alguns materiais vão para reciclagem mecânica, outros exigem processos
          químicos, e orgânicos seguem para compostagem ou biodigestão.
        </p>

        <h2>1) Reciclagem mecânica</h2>
        <p>
          É a mais comum no dia a dia. O material é <strong>separado, limpo/beneficiado</strong> e
          transformado fisicamente (moído, triturado, fundido e reprocessado) sem alterar sua
          estrutura química de forma profunda.
        </p>

        <h3>Exemplos</h3>
        <ul>
          <li>
            <strong>Papel/papelão:</strong> vira polpa e retorna como papel reciclado (quando seco e pouco contaminado).
          </li>
          <li>
            <strong>Metais:</strong> latas e sucata são fundidas e reprocessadas.
          </li>
          <li>
            <strong>Plásticos rígidos:</strong> PET, PEAD e PP costumam ter boa aceitação em muitos locais.
          </li>
          <li>
            <strong>Vidro:</strong> é triturado e retorna como matéria-prima (quando a coleta aceita).
          </li>
        </ul>

        <p>
          Para acertar na separação: <Link href="/blog/o-que-pode-ser-reciclado">o que pode ser reciclado</Link> e{" "}
          <Link href="/blog/cores-da-coleta-seletiva">cores da coleta seletiva</Link>.
        </p>

        <h2>2) Reciclagem química</h2>
        <p>
          Aqui o material passa por processos que <strong>alteram sua estrutura química</strong>,
          transformando-o em matéria-prima química (monômeros, óleos, gases etc.). É mais complexa e
          costuma ser usada quando a reciclagem mecânica é difícil (por mistura, contaminação ou
          baixa qualidade).
        </p>

        <h3>Exemplos</h3>
        <ul>
          <li>
            <strong>Plásticos mistos:</strong> alguns podem virar insumos químicos.
          </li>
          <li>
            <strong>Casos específicos:</strong> quando há tecnologia e viabilidade econômica local.
          </li>
        </ul>

        <p>
          Na prática: muitos resíduos “até poderiam” ir para reciclagem química, mas isso depende de
          cadeia industrial. Por isso, seu papel principal é <strong>separar corretamente</strong> e evitar contaminação.
        </p>

        <h2>3) Reciclagem energética (recuperação de energia)</h2>
        <p>
          Em vez de transformar o resíduo em novo material, o foco é <strong>recuperar energia</strong>
          por meio de processos como coprocessamento e outras formas de aproveitamento energético.
          É um tema que varia muito por políticas e estrutura local.
        </p>

        <h3>Quando aparece</h3>
        <ul>
          <li>Resíduos com baixo potencial de reciclagem mecânica.</li>
          <li>Materiais muito contaminados ou misturados.</li>
          <li>Contextos industriais com controle e tecnologia adequados.</li>
        </ul>

        <p>
          Importante: isso não substitui reduzir/reutilizar/reciclar; é uma alternativa para parte do
          “rejeito” quando bem regulamentada e controlada.
        </p>

        <h2>4) Reciclagem orgânica (compostagem e biodigestão)</h2>
        <p>
          Resíduos orgânicos podem virar <strong>composto</strong> (adubo) via compostagem ou gerar
          <strong> biogás</strong> e outros subprodutos via biodigestão. É uma das formas mais
          eficientes de reduzir lixo doméstico, porque orgânicos representam uma parte grande do lixo.
        </p>

        <h3>Exemplos</h3>
        <ul>
          <li>Restos de alimentos, cascas, borra de café, folhas (dependendo do sistema).</li>
          <li>Compostagem doméstica, comunitária ou municipal.</li>
          <li>Biodigestores em contextos maiores.</li>
        </ul>

        <p>
          Complemento direto: <Link href="/blog/reduzir-lixo-na-rotina">reduzir lixo na rotina</Link>.
        </p>

        <h2>O que isso muda no seu descarte (o essencial)</h2>
        <p>
          Você não precisa “adivinhar” qual reciclagem será usada. Seu foco é:
        </p>
        <ul>
          <li>
            <strong>Separar por material</strong> (papel, plástico, metal, vidro) e manter recicláveis secos.
          </li>
          <li>
            <strong>Evitar contaminação</strong> (comida, líquidos, gordura).
          </li>
          <li>
            <strong>Dar destino correto ao e-lixo</strong> (pilhas, baterias, eletrônicos).
          </li>
          <li>
            <strong>Reduzir e reutilizar</strong> antes de reciclar (maior impacto).
          </li>
        </ul>

        <p>
          Se você quer entender o sistema de ponta a ponta, leia:{" "}
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
            <Link href="/blog/o-que-e-reciclagem">O que é reciclagem</Link>
          </li>
          <li>
            <Link href="/blog/lixo-eletronico-descarte">Lixo eletrônico: descarte correto</Link>
          </li>
        </ul>

        <h2>FAQ: dúvidas comuns sobre tipos de reciclagem</h2>

        <h3>Reciclagem mecânica é a mesma coisa que reutilização?</h3>
        <p>
          Não. Reutilização é usar o item de novo sem transformá-lo (ex.: pote virando recipiente).
          Reciclagem mecânica transforma o material para virar matéria-prima de outro produto.
        </p>

        <h3>Por que alguns plásticos não são reciclados na minha cidade?</h3>
        <p>
          Porque a reciclagem depende de triagem, tecnologia e mercado local. Alguns plásticos têm
          baixa aceitação por mistura, contaminação e dificuldade de processamento.
        </p>

        <h3>Compostagem é reciclagem?</h3>
        <p>
          Sim, costuma ser chamada de “reciclagem orgânica” porque transforma resíduos orgânicos em
          composto (ou biogás) e reduz o que vai para aterros.
        </p>

        <h3>Reciclagem energética é “ruim”?</h3>
        <p>
          Depende do controle, tecnologia e regulamentação. Em geral, ela aparece como alternativa
          para parte do rejeito quando a reciclagem de material não é viável.
        </p>
      </article>

      {/* CTA final */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Próximo passo recomendado</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Para aplicar tudo isso no dia a dia sem errar, revise o guia do que pode ser reciclado com
          exemplos e cuidados de contaminação.
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
