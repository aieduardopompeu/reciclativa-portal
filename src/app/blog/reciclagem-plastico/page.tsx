// src/app/blog/reciclagem-plastico/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

const SLUG = "reciclagem-plastico";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Reciclagem de plástico: tipos, símbolos e como separar corretamente | Reciclativa",
  description:
    "Entenda reciclagem de plástico na prática: tipos (PET, PEAD, PVC, PP, PS), símbolos, o que pode/não pode, como higienizar e evitar contaminação.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "Reciclagem de plástico: tipos, símbolos e como separar corretamente",
    description:
      "Entenda reciclagem de plástico na prática: tipos (PET, PEAD, PVC, PP, PS), símbolos, o que pode/não pode, como higienizar e evitar contaminação.",
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
        headline="Reciclagem de plástico: tipos, símbolos e como separar corretamente"
        description="Guia prático para reciclagem de plástico: tipos mais comuns, símbolos, o que costuma ser aceito, como preparar embalagens e evitar contaminação."
        datePublished="2025-12-08"
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
        <span className="text-slate-700">Reciclagem de plástico</span>
      </div>

      {/* Header do artigo */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
          Reciclagem
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Reciclagem de plástico: tipos, símbolos e como separar corretamente
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          “Plástico” não é tudo igual. Existem vários tipos (com símbolos diferentes) e a aceitação
          pode variar por cidade e cooperativa. Este guia te dá um caminho prático para separar sem
          erro, reduzir contaminação e aumentar a chance de reciclagem.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/reciclagem"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Página pilar: Reciclagem
          </Link>
          <Link
            href="/blog/o-que-pode-ser-reciclado"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Guia: o que pode ser reciclado
          </Link>
        </div>
      </header>

      {/* Conteúdo (padrão ITAD: sem prose) */}
      <section className="mt-10">
        <article className="mx-auto max-w-3xl">
          {/* Box editorial: resumo rápido */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Em 30 segundos
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                O número no triângulo (1–7) é o <strong className="text-slate-900">código de resina</strong>:
                ajuda a identificar o tipo, mas não garante reciclagem.
              </li>
              <li>
                <strong className="text-slate-900">PET (1)</strong> e <strong className="text-slate-900">PEAD (2)</strong>
                costumam ter melhor aceitação; filmes e multicamadas variam bastante.
              </li>
              <li>
                O que mais “derruba” é <strong className="text-slate-900">contaminação</strong> (gordura, comida, líquido).
                Esvaziar e manter seco já resolve a maior parte.
              </li>
            </ul>
          </div>

          {/* Tipografia editorial (igual padrão do ITAD) */}
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

              // listas
              "[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6",
              "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6",
              "[&_li]:mt-2",

              // links
              "[&_a]:font-semibold [&_a]:text-emerald-700 hover:[&_a]:underline",
            ].join(" ")}
          >
            <h2>O que faz um plástico ser reciclável (ou não)</h2>
            <p>
              A reciclagem depende de três coisas: <strong>tipo do plástico</strong>,{" "}
              <strong>limpeza/contaminação</strong> e <strong>infraestrutura local</strong> (cooperativas,
              indústrias e logística). Na prática, muitos “plásticos” até são tecnicamente recicláveis,
              mas não são coletados/triados em toda região.
            </p>

            <h2>Símbolos do plástico: o que significa o número dentro do triângulo</h2>
            <p>
              Aquele triângulo com um número (1 a 7) é o <strong>código de resina</strong>. Ele indica o
              tipo de plástico. Não é “garantia de reciclagem”, mas ajuda muito na separação.
            </p>

            <h3>1 — PET (Polietileno Tereftalato)</h3>
            <ul>
              <li>Exemplos: garrafas de refrigerante/água, algumas embalagens de alimentos.</li>
              <li>Geralmente: alta aceitação.</li>
              <li>Dica: esvazie, retire excesso de líquido e amasse para reduzir volume.</li>
            </ul>

            <h3>2 — PEAD (Polietileno de Alta Densidade)</h3>
            <ul>
              <li>Exemplos: frascos de limpeza, shampoo, detergente, galões.</li>
              <li>Geralmente: boa aceitação.</li>
              <li>Dica: remova o excesso do produto; não precisa “lavar perfeito”, só reduzir resíduo.</li>
            </ul>

            <h3>3 — PVC (Policloreto de Vinila)</h3>
            <ul>
              <li>Exemplos: tubos, alguns plásticos mais rígidos, certos filmes.</li>
              <li>Geralmente: aceitação mais limitada.</li>
              <li>Dica: quando possível, prefira descarte em pontos específicos/obras/reciclagem técnica.</li>
            </ul>

            <h3>4 — PEBD (Polietileno de Baixa Densidade)</h3>
            <ul>
              <li>Exemplos: sacolas, filmes, plásticos flexíveis.</li>
              <li>Geralmente: varia bastante por cidade.</li>
              <li>Dica: filme muito sujo/engordurado tende a ser rejeito. Limpo e seco tem mais chance.</li>
            </ul>

            <h3>5 — PP (Polipropileno)</h3>
            <ul>
              <li>Exemplos: potes de margarina, tampas, alguns copos e potes resistentes.</li>
              <li>Geralmente: aceitação comum, mas pode variar.</li>
              <li>Dica: tampa separada do pote ajuda na triagem (quando não é do mesmo material).</li>
            </ul>

            <h3>6 — PS (Poliestireno)</h3>
            <ul>
              <li>Exemplos: isopor (EPS), alguns copos e bandejas.</li>
              <li>Geralmente: aceitação irregular; EPS depende muito da estrutura local.</li>
              <li>Dica: se a sua cidade não recicla EPS, procure PEVs/locais que aceitam.</li>
            </ul>

            <h3>7 — Outros (mistos)</h3>
            <ul>
              <li>Exemplos: plásticos “mix”, policarbonato e compostos.</li>
              <li>Geralmente: baixa aceitação.</li>
              <li>Dica: trate como “depende do ponto de coleta”; se não houver, pode virar rejeito.</li>
            </ul>

            <h2>O que costuma ser aceito (e o que costuma dar problema)</h2>

            <h3>Costuma ser aceito</h3>
            <ul>
              <li>Garrafas PET e frascos de limpeza (1 e 2) limpos e secos.</li>
              <li>Potes rígidos (5) quando não estão muito contaminados.</li>
              <li>Tampas (muitas cooperativas aceitam, mas depende do material).</li>
            </ul>

            <h3>Costuma dar problema</h3>
            <ul>
              <li>Filmes plásticos muito sujos/engordurados.</li>
              <li>Embalagens com resto de alimento em excesso (contamina carga).</li>
              <li>Plásticos metalizados/multicamadas (sachês e “laminados”).</li>
            </ul>

            <p>
              Para visão geral do que entra ou não, veja{" "}
              <Link href="/blog/o-que-pode-ser-reciclado">o que pode ser reciclado</Link>.
            </p>

            <h2>Como preparar plásticos para reciclagem (sem desperdício de água)</h2>
            <ol>
              <li>
                <strong>Esvazie</strong> (retire líquidos e excesso de produto/comida).
              </li>
              <li>
                <strong>Enxágue leve</strong> quando necessário (apenas para reduzir contaminação).
              </li>
              <li>
                <strong>Seque</strong> (ou deixe escorrer). Plástico molhado + orgânico = contaminação.
              </li>
              <li>
                <strong>Compacte</strong> (amasse garrafas) para reduzir volume.
              </li>
              <li>
                <strong>Separe por “família”</strong> quando fizer sentido (potes de um lado, filmes de outro).
              </li>
            </ol>

            <h2>Coleta seletiva e descarte: como aumentar a chance de reciclar</h2>
            <p>
              Se sua cidade tem coleta, mantenha os recicláveis <strong>secos</strong> e em saco separado.
              Se não tem, procure ecopontos/PEVs/cooperativas. Este texto ajuda:{" "}
              <Link href="/blog/coleta-seletiva-no-brasil">Coleta seletiva no Brasil</Link>.
            </p>

            <h2>Reduzir plástico: o atalho mais eficaz</h2>
            <p>
              Reciclar é importante, mas reduzir o que você gera costuma ter impacto maior e imediato.
              Comece com pequenas trocas consistentes:
            </p>
            <ul>
              <li>Refil quando possível (limpeza e higiene).</li>
              <li>Evitar descartáveis no dia a dia.</li>
              <li>Comprar em maiores volumes (quando fizer sentido), reduzindo embalagens.</li>
              <li>Levar garrafa/copo reutilizável.</li>
            </ul>

            <p>
              Complemento: <Link href="/blog/reduzir-lixo-na-rotina">reduzir lixo na rotina</Link>.
            </p>
          </div>

          {/* Links úteis (padrão ITAD) */}
          <div className="mt-10">
            <RecommendedLinks
              links={[
                {
                  href: "/reciclagem",
                  title: "Página pilar: Reciclagem",
                  description: "Conceitos e etapas essenciais para entender o ciclo dos materiais.",
                },
                {
                  href: "/blog/o-que-pode-ser-reciclado",
                  title: "O que pode ser reciclado",
                  description: "Checklist prático para separar sem erro e evitar contaminação.",
                },
                {
                  href: "/blog/coleta-seletiva-no-brasil",
                  title: "Coleta seletiva no Brasil",
                  description: "O que fazer quando a coleta não é consistente na sua região.",
                },
                {
                  href: "/blog/tipos-de-reciclagem",
                  title: "Tipos de reciclagem",
                  description: "Quais são e como funcionam (mecânica, química, energética etc.).",
                },
                {
                  href: "/blog/cores-da-coleta-seletiva",
                  title: "Cores da coleta seletiva",
                  description: "Padrão mais comum, variações e como não se confundir.",
                },
              ]}
            />
          </div>

          {/* FAQ (padrão ITAD: box) */}
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              FAQ: dúvidas comuns sobre reciclagem de plástico
            </h2>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900">Preciso tirar rótulo e tampa?</h3>
                <p className="mt-2">
                  Se der para tirar sem esforço, ajuda. Mas o essencial é remover excesso de conteúdo e
                  manter seco. Em algumas cooperativas, tampas são separadas por tipo; em outras, vão junto.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Plástico filme (sacolinha, embalagem flexível) é reciclável?
                </h3>
                <p className="mt-2">
                  Depende. Muitos lugares têm dificuldade de triagem/processo para filmes. Quando aceito,
                  precisa estar limpo e seco. Se estiver engordurado, tende a virar rejeito.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Isopor (EPS) entra na reciclagem?</h3>
                <p className="mt-2">
                  Em algumas cidades, sim; em outras, não. Se sua coleta não aceita, procure PEVs específicos.
                  EPS sujo (com comida/gordura) geralmente é rejeito.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  O número no triângulo garante que vai reciclar?
                </h3>
                <p className="mt-2">
                  Não. O código indica o tipo de resina, mas a reciclagem depende da estrutura local e do
                  estado do material.
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
              Para fechar o básico e evitar contaminação, revise este guia: o que pode (e o que não pode)
              ser reciclado, com exemplos práticos.
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
