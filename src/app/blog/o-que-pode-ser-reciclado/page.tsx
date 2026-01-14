// src/app/blog/o-que-pode-ser-reciclado/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

// Domínio canônico FINAL (sem fallback errado)
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.reciclativa.com"
).replace(/\/+$/, "");

const SLUG = "o-que-pode-ser-reciclado";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "O que pode ser reciclado: guia rápido para acertar no descarte | Reciclativa",
  description:
    "Lista prática do que pode (e do que não pode) ser reciclado: papel, plástico, metal, vidro, orgânicos e rejeitos, com dicas para evitar contaminação.",

  // ✅ Canonical ABSOLUTO
  alternates: { canonical: URL },

  openGraph: {
    title: "O que pode ser reciclado: guia rápido para acertar no descarte",
    description:
      "Lista prática do que pode e do que não pode ser reciclado, com exemplos e dicas para evitar contaminação e melhorar a triagem.",
    url: URL,
    type: "article",
    siteName: "Reciclativa",
    locale: "pt_BR",
    images: [{ url: `${SITE_URL}/og/blog-default.webp` }],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <ArticleJsonLd
        siteUrl={SITE_URL}
        url={URL}
        headline="O que pode ser reciclado: guia rápido para acertar no descarte"
        description="Lista prática do que pode e do que não pode ser reciclado, com exemplos por material e dicas para evitar contaminação no descarte."
        datePublished="2025-12-02"
      />

      {/* Breadcrumb */}
      <div className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">O que pode ser reciclado</span>
      </div>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 ring-1 ring-violet-200">
          Guias
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          O que pode ser reciclado: guia rápido para acertar no descarte
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Se você já ficou na dúvida na hora de separar o lixo, este guia resolve o essencial.
          A regra número 1 é simples: recicláveis devem estar <strong>secos</strong> e com{" "}
          <strong>pouca contaminação</strong>.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/cores-da-coleta-seletiva"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver: cores da coleta seletiva
          </Link>
          <Link
            href="/blog/coleta-seletiva-no-brasil"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: coleta seletiva no Brasil
          </Link>
        </div>
      </header>

      {/* Corpo editorial — PADRÃO ITAD */}
      <section className="mt-10">
        <article className="mx-auto max-w-3xl">
          {/* Em 30 segundos */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Em 30 segundos
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                Recicláveis devem estar <strong className="text-slate-900">secos</strong> e com{" "}
                <strong className="text-slate-900">pouca contaminação</strong>.
              </li>
              <li>
                Papel engordurado e resíduos de higiene quase sempre viram{" "}
                <strong className="text-slate-900">rejeito</strong>.
              </li>
              <li>
                Itens “especiais” (e-lixo, pilhas, lâmpadas) vão para{" "}
                <strong className="text-slate-900">pontos de coleta</strong>.
              </li>
            </ul>
          </div>

          {/* Texto editorial (sem prose) */}
          <div
            className={[
              "mt-10 text-slate-800 leading-relaxed space-y-5",
              "[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-slate-900",
              "[&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-slate-900",
              "[&_h4]:mt-5 [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-slate-900",
              "[&_p]:text-base [&_p]:leading-relaxed",
              "[&_strong]:font-semibold [&_strong]:text-slate-900",
              "[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6",
              "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6",
              "[&_li]:mt-2",
              "[&_a]:font-semibold [&_a]:text-emerald-700 hover:[&_a]:underline",
            ].join(" ")}
          >
            <h2>A regra de ouro (antes da lista)</h2>
            <p>
              A maioria dos recicláveis é perdida por <strong>contaminação</strong>. Por isso, antes
              de pensar no “material”, pense no estado:
            </p>
            <ul>
              <li>
                <strong>Seco:</strong> sem excesso de líquido.
              </li>
              <li>
                <strong>Sem comida:</strong> retire restos e sujeira evidente.
              </li>
              <li>
                <strong>Sem gordura:</strong> gordura é uma das maiores vilãs (especialmente para
                papel).
              </li>
            </ul>

            <h2>O que normalmente PODE ser reciclado (por material)</h2>

            <h3>Papel e papelão (geralmente no “azul”)</h3>
            <h4>Pode</h4>
            <ul>
              <li>Caixas de papelão (limpas e secas)</li>
              <li>Jornais, revistas, folhas, cadernos</li>
              <li>Embalagens de papel (secas)</li>
            </ul>
            <h4>Geralmente não pode</h4>
            <ul>
              <li>Papel higiênico, guardanapo sujo, papel toalha sujo</li>
              <li>Papel muito engordurado (ex.: caixa de pizza com gordura)</li>
              <li>Papel plastificado/metalizado (depende da composição e da coleta local)</li>
            </ul>

            <h3>Plástico (geralmente no “vermelho”)</h3>
            <h4>Pode (comumente aceito)</h4>
            <ul>
              <li>Garrafas PET (água, refrigerante)</li>
              <li>Frascos rígidos de limpeza e higiene (quando vazios e com pouco resíduo)</li>
              <li>Potes rígidos (alguns tipos) e tampas (varia por cidade/cooperativa)</li>
            </ul>
            <h4>Depende / costuma dar problema</h4>
            <ul>
              <li>Plástico filme (sacolinha, embalagem flexível) — varia muito por cidade</li>
              <li>Embalagens metalizadas/multicamadas (sachês) — aceitação geralmente menor</li>
              <li>Isopor (EPS) — depende da coleta local e se está limpo</li>
            </ul>

            <p>
              Guia aprofundado:{" "}
              <Link href="/blog/reciclagem-plastico">reciclagem de plástico</Link>.
            </p>

            <h3>Metal (geralmente no “amarelo”)</h3>
            <h4>Pode</h4>
            <ul>
              <li>Latas de alumínio e aço (vazias e com pouco resíduo)</li>
              <li>Tampas metálicas e pequenas sucatas (quando aceitas localmente)</li>
            </ul>
            <h4>Depende</h4>
            <ul>
              <li>Aerossóis e embalagens pressurizadas — siga orientação local</li>
              <li>Objetos com produto perigoso — preferir pontos específicos</li>
            </ul>

            <h3>Vidro (geralmente no “verde”)</h3>
            <h4>Pode</h4>
            <ul>
              <li>Garrafas e potes de vidro</li>
              <li>Frascos (perfume, alimentos) quando vazios</li>
            </ul>
            <h4>Geralmente não vai no “vidro comum”</h4>
            <ul>
              <li>Lâmpadas (descarte específico)</li>
              <li>Espelhos e vidros temperados (fluxo diferente)</li>
              <li>Vidro quebrado sem embalagem segura (risco na triagem)</li>
            </ul>

            <h2>Orgânico vs rejeito: o que fazer com o que NÃO recicla</h2>
            <h3>Orgânico</h3>
            <ul>
              <li>Restos de alimentos, cascas, borra de café (quando há compostagem/coleta orgânica)</li>
            </ul>

            <h3>Rejeito</h3>
            <ul>
              <li>Itens contaminados (muita comida/gordura)</li>
              <li>Materiais sem reciclagem local</li>
              <li>Resíduos de higiene (ex.: papel higiênico, fraldas)</li>
            </ul>

            <p>
              Para reduzir rejeito, veja:{" "}
              <Link href="/blog/reduzir-lixo-na-rotina">reduzir lixo na rotina</Link>.
            </p>

            <h2>Itens especiais: descarte separado (não vai na coleta comum)</h2>
            <ul>
              <li>
                <strong>Lixo eletrônico:</strong> celulares, cabos, carregadores, eletrônicos —{" "}
                <Link href="/blog/lixo-eletronico-descarte">veja o guia completo</Link>.
              </li>
              <li>
                <strong>Pilhas e baterias:</strong> pontos de coleta específicos (logística reversa).
              </li>
              <li>
                <strong>Lâmpadas:</strong> descarte específico em PEVs/ecopontos.
              </li>
            </ul>

            <h2>Como separar em casa (modelo simples e eficiente)</h2>
            <ol>
              <li>
                <strong>Recicláveis secos</strong> (papel/plástico/metal/vidro quando aceito).
              </li>
              <li>
                <strong>Orgânico + rejeito</strong> (se não houver compostagem/coleta orgânica, vai junto).
              </li>
            </ol>

            <p>
              Se você quiser usar as cores, veja:{" "}
              <Link href="/blog/cores-da-coleta-seletiva">cores da coleta seletiva</Link>.
            </p>
          </div>

          {/* RecommendedLinks — padrão ITAD */}
          <div className="mt-10">
            <RecommendedLinks
              links={[
                {
                  href: "/blog/coleta-seletiva-no-brasil",
                  title: "Coleta seletiva no Brasil →",
                  description: "Como separar e o que fazer quando não há coleta.",
                },
                {
                  href: "/blog/cores-da-coleta-seletiva",
                  title: "Cores da coleta seletiva →",
                  description: "Atalho visual para não errar na separação.",
                },
                {
                  href: "/blog/lixo-eletronico-descarte",
                  title: "Lixo eletrônico: descarte correto →",
                  description: "E-lixo, pilhas, baterias e pontos de coleta.",
                },
                {
                  href: "/blog/reduzir-lixo-na-rotina",
                  title: "Reduzir lixo na rotina →",
                  description: "Menos rejeito, mais eficiência no dia a dia.",
                },
              ]}
            />
          </div>

          {/* FAQ rápido — padrão ITAD (mesmo conteúdo, só em card) */}
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">FAQ rápido</h2>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Preciso lavar tudo antes de reciclar?
                </h3>
                <p className="mt-2">
                  Não precisa lavar “perfeito”. O essencial é retirar excesso de comida e líquidos e manter
                  recicláveis secos para evitar contaminação.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Plástico filme é reciclável?
                </h3>
                <p className="mt-2">
                  Depende da estrutura local. Quando aceito, precisa estar limpo e seco. Se estiver
                  engordurado, tende a virar rejeito.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Isopor entra na coleta seletiva?
                </h3>
                <p className="mt-2">
                  Depende da cidade e do sistema local. Se sua coleta não aceita, procure PEVs/ecopontos
                  específicos.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Vidro quebrado pode ir para reciclagem?
                </h3>
                <p className="mt-2">
                  Pode, mas precisa ser embalado com segurança e identificado para não ferir quem faz a triagem.
                </p>
              </div>
            </div>
          </div>

          {/* Próximo passo — padrão ITAD */}
          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Próximo passo recomendado
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Para consolidar o básico, veja como a coleta seletiva funciona na prática e o que fazer quando
              não existe coleta no seu bairro.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog/coleta-seletiva-no-brasil"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Ver: coleta seletiva no Brasil
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
