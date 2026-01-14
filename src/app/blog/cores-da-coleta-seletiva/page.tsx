// src/app/blog/cores-da-coleta-seletiva/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.reciclativa.com"
).replace(/\/+$/, "");

const SLUG = "cores-da-coleta-seletiva";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Cores da coleta seletiva: padrão, variações e como não errar | Reciclativa",
  description:
    "Entenda as cores da coleta seletiva (papel, plástico, vidro, metal, orgânico e rejeito), variações por cidade e dicas práticas para separar corretamente sem confusão.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Cores da coleta seletiva: padrão, variações e como não errar",
    description:
      "Guia prático sobre as cores da coleta seletiva e como separar resíduos corretamente, mesmo quando sua cidade usa variações.",
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
        <div className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
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

      {/* Corpo editorial (padrão itad: sem prose) */}
      <section className="mt-10">
        <article className="mx-auto max-w-3xl">
          {/* Box editorial: resumo rápido */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Em 30 segundos
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                Memorize as quatro principais: <strong className="text-slate-900">azul</strong>{" "}
                (papel), <strong className="text-slate-900">vermelho</strong> (plástico),{" "}
                <strong className="text-slate-900">verde</strong> (vidro) e{" "}
                <strong className="text-slate-900">amarelo</strong> (metal).
              </li>
              <li>
                O que mais “derruba” a reciclagem é <strong className="text-slate-900">contaminação</strong>:
                reciclável sujo pode virar rejeito.
              </li>
              <li>
                Há <strong className="text-slate-900">variações por cidade</strong>; quando faltar
                padrão, separe por material e mantenha seco.
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
            <h2>O que são as cores da coleta seletiva</h2>
            <p>
              As cores são um <strong>código visual</strong> para orientar a separação de resíduos.
              Elas facilitam a coleta e a triagem, reduzindo contaminação (um dos principais motivos
              de rejeição na reciclagem).
            </p>

            <h2>O padrão mais comum (o que você precisa memorizar)</h2>
            <p>
              Se você quer um atalho, memorize estas quatro cores — as mais frequentes no dia a dia:
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
                <strong>Evite:</strong> papel engordurado, papel higiênico, guardanapo sujo, papel
                muito contaminado.
              </li>
              <li>
                <strong>Dica:</strong> papel deve estar seco; umidade e gordura dificultam a reciclagem.
              </li>
            </ul>

            <h3>Vermelho — Plástico</h3>
            <ul>
              <li>
                Garrafas PET, frascos de limpeza, potes rígidos, tampas (quando aceitas localmente).
              </li>
              <li>
                <strong>Evite:</strong> plástico muito sujo/engordurado, embalagens metalizadas/multicamadas
                (depende da coleta local).
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
                <strong>Dica:</strong> se sua cidade tem coleta orgânica/compostagem, separar certo melhora o resultado.
              </li>
            </ul>

            <h3>Cinza — Rejeito (não reciclável)</h3>
            <ul>
              <li>Resíduos sem reciclagem local, contaminados, misturados ou sem tecnologia viável.</li>
              <li>
                <strong>Dica:</strong> rejeito é o que sobrou após reduzir, reutilizar e separar corretamente.
              </li>
            </ul>

            <h3>Branco — Resíduos de serviços de saúde</h3>
            <p>
              Essa cor costuma ser usada em contextos específicos (unidades de saúde). Em casa, não é o padrão do dia a dia.
            </p>

            <h3>Preto — Madeira</h3>
            <p>
              Pode aparecer em alguns sistemas e ecopontos para separar madeira, mas não é o mais comum no cotidiano.
            </p>

            <h3>Laranja — Resíduos perigosos</h3>
            <p>
              Também é mais comum em contextos específicos. Em casa, foque em separar corretamente e buscar descarte adequado quando necessário (ex.: e-lixo).
            </p>

            <h2>O ponto mais importante: sua cidade pode ter variações</h2>
            <p>
              Nem todo local usa exatamente as mesmas cores. O que não muda é o princípio:{" "}
              <strong>separar por material</strong> e evitar contaminação. Se tiver dúvida:
            </p>
            <ol>
              <li>Veja a sinalização do seu condomínio, prédio, escola, mercado ou ecoponto.</li>
              <li>Se não tiver sinalização, separe por material (papel/plástico/vidro/metal) e mantenha seco.</li>
              <li>Em caso de dúvida, priorize não contaminar (melhor rejeito do que contaminar recicláveis).</li>
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
          </div>

          {/* Links úteis (padrão itad) */}
          <div className="mt-10">
            <RecommendedLinks
              links={[
                {
                  href: "/blog/o-que-pode-ser-reciclado",
                  title: "O que pode ser reciclado",
                  description: "Checklist prático para separar sem erro.",
                },
                {
                  href: "/blog/coleta-seletiva-no-brasil",
                  title: "Coleta seletiva no Brasil",
                  description: "O que fazer quando não há coleta na sua rua/bairro.",
                },
                {
                  href: "/reciclagem",
                  title: "Página pilar: Reciclagem",
                  description: "Conceitos, etapas e materiais mais comuns.",
                },
                {
                  href: "/blog/lixo-eletronico-descarte",
                  title: "Lixo eletrônico: descarte correto",
                  description: "Onde descartar e como reduzir risco/contaminação.",
                },
              ]}
            />
          </div>

          {/* FAQ (padrão itad: box) */}
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">FAQ: dúvidas comuns</h2>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Se minha cidade usa cores diferentes, o que eu faço?
                </h3>
                <p className="mt-2">
                  Siga a sinalização local. Se não existir, separe por material (papel/plástico/vidro/metal)
                  e mantenha recicláveis secos. Isso costuma funcionar bem na triagem.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Preciso lavar as embalagens?</h3>
                <p className="mt-2">
                  Em geral, não precisa lavar “perfeito”. O essencial é retirar excesso de alimento e líquidos
                  para evitar contaminação. Deixe escorrer e mantenha seco.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Papel engordurado vai no azul?</h3>
                <p className="mt-2">
                  Normalmente não. Gordura contamina as fibras e dificulta a reciclagem. Dependendo do caso,
                  pode ir para orgânico ou rejeito.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Espelho e lâmpada vão no verde (vidro)?</h3>
                <p className="mt-2">
                  Não é o mesmo fluxo do vidro comum. Lâmpadas e espelhos costumam ter descarte específico.
                  Procure ecopontos/PEVs e orientações locais.
                </p>
              </div>
            </div>
          </div>

          {/* CTA final (mantido, no padrão itad) */}
          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Próximo passo recomendado
            </h2>
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
        </article>
      </section>
    </main>
  );
}
