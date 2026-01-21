import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

// Domínio canônico final (sempre preferir domínio real)
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.reciclativa.com"
).replace(/\/+$/, "");

const SLUG = "materiais-biodegradaveis-escova-de-dente-de-bambu";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title:
    "Materiais biodegradáveis: exemplos e por que a escova de bambu faz diferença | Reciclativa",
  description:
    "Entenda o que são materiais biodegradáveis, a diferença entre biodegradável e compostável, exemplos no dia a dia e como descartar corretamente a escova de dente de bambu.",

  // Canonical ABSOLUTO (evita ambiguidade)
  alternates: { canonical: URL },

  openGraph: {
    title:
      "Materiais biodegradáveis: exemplos e por que a escova de bambu faz diferença",
    description:
      "Guia prático: o que é biodegradável, exemplos no cotidiano e descarte correto da escova de bambu.",
    url: URL,
    type: "article",
    siteName: "Reciclativa",
    locale: "pt_BR",
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
        headline="Materiais biodegradáveis: exemplos e por que a escova de bambu faz diferença"
        description="Entenda o que são materiais biodegradáveis, a diferença entre biodegradável e compostável, exemplos práticos e o descarte correto da escova de dente de bambu."
        datePublished="2026-01-20"
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
        <span className="text-slate-700">Materiais biodegradáveis</span>
      </div>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
          Sustentabilidade
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Materiais biodegradáveis: exemplos e por que a escova de bambu faz diferença
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          Materiais biodegradáveis ajudam a reduzir o impacto ambiental porque se decompõem por ação
          de microrganismos. Neste guia, você vai entender o conceito, ver exemplos práticos do dia
          a dia e aprender como descartar corretamente a escova de dente de bambu.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/economia-circular"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver: Economia circular
          </Link>
          <Link
            href="/residuos-solidos"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: Resíduos sólidos
          </Link>
        </div>
      </header>

      {/* Corpo editorial */}
      <section className="mt-10">
        <article className="mx-auto max-w-3xl">
          {/* Box editorial: resumo rápido */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Em 30 segundos
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                <strong className="text-slate-900">Biodegradável</strong> é o material que pode se
                decompor naturalmente por microrganismos — o tempo varia conforme as condições do
                ambiente.
              </li>
              <li>
                <strong className="text-slate-900">Compostável</strong> é um tipo de biodegradável
                que, em condições adequadas, pode virar composto orgânico (adubo) sem deixar
                resíduos problemáticos.
              </li>
              <li>
                A <strong className="text-slate-900">escova de bambu</strong> reduz plástico no cabo
                — mas as cerdas geralmente são de nylon e precisam ser removidas no descarte.
              </li>
            </ul>
          </div>

          {/* Tipografia editorial */}
          <div
            className={[
              "mt-10 text-slate-800 leading-relaxed",
              "space-y-5",

              "[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-slate-900",
              "[&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-slate-900",

              "[&_p]:text-base [&_p]:leading-relaxed",
              "[&_strong]:font-semibold [&_strong]:text-slate-900",
              "[&_em]:text-slate-800",

              "[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6",
              "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6",
              "[&_li]:mt-2",

              "[&_a]:font-semibold [&_a]:text-emerald-700 hover:[&_a]:underline",
            ].join(" ")}
          >
            <h2>O que são materiais biodegradáveis</h2>
            <p>
              Materiais biodegradáveis são aqueles que conseguem se decompor por ação de
              microrganismos (como bactérias e fungos), retornando ao meio ambiente como substâncias
              mais simples. Isso ajuda a reduzir o acúmulo de resíduos persistentes — principalmente
              quando o descarte é feito de forma adequada.
            </p>
            <p>
              Um detalhe importante: biodegradável não significa “some em qualquer lugar”. A
              velocidade de decomposição depende de fatores como <em>umidade</em>,{" "}
              <em>temperatura</em>, <em>oxigênio</em> e presença de microrganismos.
            </p>

            <h2>Por que isso importa (especialmente com o plástico)</h2>
            <p>
              Grande parte dos plásticos convencionais tem longa vida no ambiente e pode permanecer
              por décadas ou séculos. Itens pequenos e de descarte frequente aumentam o problema
              porque dificilmente entram em cadeias de reciclagem eficientes e podem se espalhar
              para ruas, rios e oceanos, fragmentando em microplásticos.
            </p>
            <ul>
              <li>
                <strong>Produção:</strong> frequentemente ligada a recursos fósseis.
              </li>
              <li>
                <strong>Reciclagem:</strong> nem sempre viável para itens pequenos/contaminados.
              </li>
              <li>
                <strong>Poluição difusa:</strong> risco de dispersão no ambiente.
              </li>
              <li>
                <strong>Impacto ecológico:</strong> danos à fauna e aos ecossistemas.
              </li>
            </ul>

            <h2>Escova de dente de bambu: o que é (e o que não é)</h2>
            <p>
              A escova de dente de bambu virou um exemplo popular de troca simples porque o{" "}
              <strong>cabo</strong> é feito de um material renovável e tende a ser biodegradável.
              Porém, existe um ponto-chave: as <strong>cerdas</strong> normalmente são de{" "}
              <strong>nylon</strong> (não biodegradável). Ou seja, ela é uma alternativa que reduz
              plástico, mas <strong>não é 100% biodegradável</strong>.
            </p>
            <p>
              Para o benefício ambiental ser real, a etapa mais importante é o{" "}
              <strong>descarte correto</strong> (com separação das partes).
            </p>

            <h2>Comparação rápida: escova plástica x escova de bambu</h2>
            <div className="not-prose mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-2 pr-4 font-semibold text-slate-900">Critério</th>
                    <th className="py-2 pr-4 font-semibold text-slate-900">Plástico</th>
                    <th className="py-2 font-semibold text-slate-900">Bambu</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-b border-slate-200">
                    <td className="py-2 pr-4">Origem</td>
                    <td className="py-2 pr-4">Derivado de petróleo</td>
                    <td className="py-2">Material renovável</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 pr-4">Cabo</td>
                    <td className="py-2 pr-4">Persistente no ambiente</td>
                    <td className="py-2">Biodegradável (em geral)</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 pr-4">Cerdas</td>
                    <td className="py-2 pr-4">Plástico/nylon</td>
                    <td className="py-2">Geralmente nylon (igual)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Descarte</td>
                    <td className="py-2 pr-4">Raramente reciclada</td>
                    <td className="py-2">Precisa remover cerdas</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Exemplos de materiais biodegradáveis no dia a dia</h2>
            <p>
              Se você quer começar pelo “básico”, priorize itens de uso frequente e descarte
              constante. Exemplos:
            </p>
            <ul>
              <li>Esponja vegetal (bucha) e panos de fibras naturais.</li>
              <li>Canudos e talheres de papel, bambu ou madeira.</li>
              <li>Embalagens de papel reciclado e papelão.</li>
              <li>Produtos de madeira e fibras vegetais (com origem responsável).</li>
              <li>
                Algumas versões de bioplásticos (atenção: podem exigir descarte e certificações
                específicas).
              </li>
            </ul>

            <h2>Biodegradável x compostável: qual a diferença?</h2>
            <p>
              Embora pareçam sinônimos, há diferença prática:
            </p>
            <ul>
              <li>
                <strong>Biodegradável:</strong> pode se decompor naturalmente (o tempo e as
                condições variam).
              </li>
              <li>
                <strong>Compostável:</strong> além de decompor, tende a virar composto orgânico em
                condições adequadas (umidade, oxigênio, temperatura e tempo), sem deixar resíduos
                problemáticos.
              </li>
            </ul>
            <p>
              Para evitar frustração, procure entender <strong>onde</strong> o item deve ser
              descartado: lixo orgânico, compostagem doméstica, compostagem industrial, etc.
            </p>

            <h2>Como descartar corretamente a escova de dente de bambu</h2>
            <ol>
              <li>
                <strong>Remova as cerdas</strong> com um alicate (puxe com cuidado).
              </li>
              <li>
                <strong>Descarte as cerdas</strong> no lixo comum (ou reciclagem específica, se
                existir na sua cidade).
              </li>
              <li>
                <strong>Destine o cabo</strong> para compostagem doméstica, lixo orgânico ou
                reaproveitamento criativo (etiquetas de plantas, pequenos suportes, artesanato).
              </li>
            </ol>

            <h2>Vale a pena trocar?</h2>
            <p>
              Em geral, sim — especialmente quando falamos de produtos de uso diário e descarte
              recorrente. O maior impacto vem de combinar a troca de materiais com{" "}
              <strong>redução de consumo</strong> e <strong>destinação correta</strong>.
            </p>
          </div>

          {/* Links úteis */}
          <div className="mt-10">
            <RecommendedLinks
              items={[
                {
                  href: "/economia-circular",
                  title: "Economia circular",
                  description: "Reduzir, reusar, reparar e só depois reciclar.",
                },
                {
                  href: "/residuos-solidos",
                  title: "Resíduos sólidos",
                  description: "Classificação e boas práticas no dia a dia.",
                },
                {
                  href: "/blog/coleta-seletiva-no-brasil",
                  title: "Coleta seletiva no Brasil",
                  description: "Como separar e o que fazer quando não há coleta.",
                },
                {
                  href: "/blog/lixo-eletronico-descarte",
                  title: "Lixo eletrônico: descarte correto",
                  description: "Quando o “biodegradável” não se aplica: e-lixo no dia a dia.",
                },
              ]}
            />
          </div>

          {/* FAQ */}
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">FAQ rápido</h2>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Biodegradável e compostável são a mesma coisa?
                </h3>
                <p className="mt-2">
                  Não. Biodegradável é o material que pode se decompor por microrganismos.
                  Compostável é um tipo de biodegradável que, em condições adequadas, vira composto
                  orgânico sem deixar resíduos problemáticos.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  A escova de dente de bambu é 100% biodegradável?
                </h3>
                <p className="mt-2">
                  Normalmente, não. O cabo tende a ser biodegradável, mas as cerdas geralmente são
                  de nylon. Por isso, o descarte correto é remover as cerdas antes de destinar o
                  cabo.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Biodegradável é sempre melhor?
                </h3>
                <p className="mt-2">
                  Depende do contexto. Se o produto exige condições específicas para decompor e
                  essas condições não existem na sua cidade (por exemplo, compostagem industrial),
                  o benefício pode ser menor. O ideal é combinar: reduzir, reutilizar e descartar
                  corretamente.
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
              Quer colocar isso em prática? Comece organizando a separação de resíduos em casa e
              entenda o que vai para orgânico, recicláveis e rejeitos.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog/coleta-seletiva-no-brasil"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Ver guia: coleta seletiva
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
