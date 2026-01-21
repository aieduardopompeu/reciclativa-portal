// src/app/blog/bioplasticos-solucao-ou-greenwashing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

// Domínio canônico final (sempre preferir domínio real)
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.reciclativa.com"
).replace(/\/+$/, "");

const SLUG = "bioplasticos-solucao-ou-greenwashing";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title:
    "Bioplásticos: solução ou greenwashing? Entenda o que são e como descartar | Reciclativa",
  description:
    "Bioplásticos podem ser alternativa real ou apenas marketing. Veja tipos, limitações, sinais de greenwashing e como descartar na prática.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Bioplásticos: solução ou greenwashing?",
    description:
      "Guia prático para entender bioplásticos, compostáveis, oxi-degradáveis e como evitar armadilhas de marketing.",
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
        headline="Bioplásticos: solução ou greenwashing? Entenda o que são e como descartar"
        description="Bioplásticos podem ser alternativa real ou apenas marketing. Veja tipos, limitações, sinais de greenwashing e como descartar na prática."
        datePublished="2026-01-20"
      />

      <div className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">Bioplásticos</span>
      </div>

      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Guia · Atualizado em 20/01/2026
        </p>

        <div className="mt-3 inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
          Sustentabilidade
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Bioplásticos: solução ou greenwashing? Entenda o que são e como descartar
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          “Bioplástico” virou um termo popular em embalagens, talheres e sacolas. Mas, na prática,
          ele pode significar coisas diferentes — e nem sempre representa um ganho ambiental real.
          Neste guia, você vai aprender como identificar os tipos, evitar armadilhas de marketing e
          descartar corretamente quando isso for possível.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/tags/materiais-sustentaveis"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Materiais sustentáveis
          </Link>
          <Link
            href="/economia-circular"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Economia circular
          </Link>
        </div>
      </header>

      <section className="mt-10">
        <article className="mx-auto max-w-3xl">
          <nav className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Neste guia
            </p>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-700">
              <li>
                <a className="underline-offset-2 hover:underline" href="#definicao">
                  O que são bioplásticos?
                </a>
              </li>
              <li>
                <a className="underline-offset-2 hover:underline" href="#tipos">
                  Tipos comuns: bio-based, biodegradável e compostável
                </a>
              </li>
              <li>
                <a className="underline-offset-2 hover:underline" href="#greenwashing">
                  Onde mora o greenwashing (e como identificar)
                </a>
              </li>
              <li>
                <a className="underline-offset-2 hover:underline" href="#oxi">
                  O que significa oxi-degradável (e por que é controverso)
                </a>
              </li>
              <li>
                <a className="underline-offset-2 hover:underline" href="#descarte">
                  Descarte: o que fazer na vida real
                </a>
              </li>
              <li>
                <a className="underline-offset-2 hover:underline" href="#alternativas">
                  Alternativas melhores do que “trocar o plástico”
                </a>
              </li>
              <li>
                <a className="underline-offset-2 hover:underline" href="#faq">
                  Perguntas frequentes
                </a>
              </li>
            </ol>
          </nav>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Em 30 segundos
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                <strong className="text-slate-900">Bioplástico</strong> não é sinônimo de biodegradável.
              </li>
              <li>
                <strong className="text-slate-900">Compostável</strong> costuma exigir condições específicas (muitas vezes industriais).
              </li>
              <li>
                <strong className="text-slate-900">Oxi-degradável</strong> pode fragmentar e virar microplástico.
              </li>
              <li>Sem destino correto, o benefício vira promessa de embalagem.</li>
            </ul>
          </div>

          <div
            className={[
              "mt-10 text-slate-800 leading-relaxed space-y-5",
              "[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-slate-900",
              "[&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900",
              "[&_p]:text-base",
              "[&_strong]:font-semibold [&_strong]:text-slate-900",
              "[&_ul]:list-disc [&_ul]:pl-6",
              "[&_ol]:list-decimal [&_ol]:pl-6",
              "[&_li]:mt-2",
              "[&_a]:underline-offset-2 [&_a]:hover:underline",
            ].join(" ")}
          >
            <section id="definicao">
              <h2>O que são bioplásticos?</h2>
              <p>
                “Bioplástico” é um termo guarda-chuva que pode incluir plásticos feitos de{" "}
                <strong>fontes renováveis</strong> (bio-based) e/ou plásticos com alegação de{" "}
                <strong>biodegradação</strong>. O detalhe é que <strong>origem</strong> (renovável) e{" "}
                <strong>fim de vida</strong> (biodegradar/compostar) são atributos diferentes.
              </p>
              <p>
                Em resumo: um plástico pode ser bio-based e ainda assim se comportar como plástico
                convencional no descarte.
              </p>
            </section>

            <section id="tipos">
              <h2>Tipos comuns: bio-based, biodegradável e compostável</h2>
              <ul>
                <li>
                  <strong>Bio-based</strong>: indica a origem da matéria-prima (biomassa).
                </li>
                <li>
                  <strong>Biodegradável</strong>: fala sobre decomposição por microrganismos — o tempo
                  e as condições variam.
                </li>
                <li>
                  <strong>Compostável</strong>: costuma indicar decomposição em condições adequadas,
                  gerando composto orgânico — frequentemente exige compostagem industrial.
                </li>
              </ul>
              <p>
                Para não cair em confusão, use este mapa mental:
              </p>
              <ul>
                <li>
                  <strong>Bio-based</strong>: fala sobre <strong>origem</strong>. Não garante descarte mais “fácil”.
                </li>
                <li>
                  <strong>Biodegradável</strong>: fala sobre <strong>decomposição</strong>. Pode exigir condições específicas.
                </li>
                <li>
                  <strong>Compostável</strong>: fala sobre <strong>destinação</strong>. Muitas embalagens compostáveis exigem compostagem industrial.
                </li>
              </ul>
              <p>
                Na prática, “compostável” só vira ganho ambiental quando existe{" "}
                <strong>infraestrutura</strong> (coleta orgânica e compostagem).
              </p>
            </section>

            <section id="greenwashing">
              <h2>Onde mora o greenwashing (e como identificar)</h2>
              <p>
                Greenwashing acontece quando a promessa “verde” excede o benefício real. Em bioplásticos,
                isso aparece quando:
              </p>
              <ul>
                <li>
                  O rótulo usa “eco/bio” sem explicar <strong>condições de degradação</strong>.
                </li>
                <li>
                  Não há instrução clara de descarte (orgânico, compostagem industrial etc.).
                </li>
                <li>
                  O produto é vendido como “solução” sem alertar risco de contaminar a reciclagem comum.
                </li>
              </ul>
              <p>
                Sinais positivos: destino explícito, transparência sobre limitações e certificações reconhecidas (quando aplicável).
              </p>
            </section>

            <section id="oxi">
              <h2>O que significa oxi-degradável (e por que é controverso)</h2>
              <p>
                Plásticos oxi-degradáveis (oxo-degradáveis) usam aditivos para acelerar a quebra do material.
                A controvérsia é que isso pode virar <strong>fragmentação (microplásticos)</strong> em vez de biodegradação completa,
                além de dificultar a reciclagem e aumentar dispersão no ambiente.
              </p>
            </section>

            <section id="descarte">
              <h2>Descarte: o que fazer na vida real</h2>
              <p>
                O descarte ideal depende do tipo e da infraestrutura local. Como regra prática:
              </p>
              <ul>
                <li>
                  Se for reciclável comum (PET/PEAD etc.) e estiver limpo: vá de coleta seletiva.
                </li>
                <li>
                  Se for compostável: destine à compostagem adequada (quando existir). Não misture com recicláveis comuns.
                </li>
                <li>
                  Se for biodegradável sem orientação clara: trate com cautela — muitas vezes o destino realista é o lixo comum.
                </li>
              </ul>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Regra de ouro
                </p>
                <p className="mt-3 text-sm text-slate-700">
                  Se não existe destino correto disponível, o melhor “bioplástico” é aquele que você não precisa descartar.
                  Priorize <strong className="text-slate-900">redução</strong> e <strong className="text-slate-900">reuso</strong>.
                </p>
              </div>
            </section>

            <section id="alternativas">
              <h2>Alternativas melhores do que “trocar o plástico”</h2>
              <p>Em muitos cenários, o maior ganho vem de reduzir e reutilizar:</p>
              <ul>
                <li>Garrafa e copo reutilizáveis</li>
                <li>Refil e retornáveis (quando disponíveis)</li>
                <li>Compra a granel (quando possível)</li>
                <li>Evitar descartáveis por conveniência</li>
                <li>
                  Compostáveis fazem mais sentido quando o item inevitavelmente fica sujo e há compostagem disponível
                </li>
              </ul>
            </section>

            <section id="faq">
              <h2>Perguntas frequentes</h2>

              <h3>Bioplástico é sempre biodegradável?</h3>
              <p>Não. “Bioplástico” pode indicar apenas origem renovável (bio-based) e não degradar como esperado no descarte comum.</p>

              <h3>Compostável é sempre melhor?</h3>
              <p>Só quando existe destino correto. Sem compostagem, o benefício pode ficar no rótulo. Nesses casos, reduzir e reutilizar costuma vencer.</p>

              <h3>Oxi-degradável é sustentável?</h3>
              <p>É controverso porque pode acelerar a fragmentação em microplásticos e dificultar a reciclagem. Prefira soluções com destino claro.</p>

              <p className="mt-6">
                Para continuar nessa linha de consumo consciente, veja a tag abaixo:{" "}
                <Link href="/blog/tags/materiais-sustentaveis">Materiais Sustentáveis</Link>.
              </p>

              <p className="mt-2 font-semibold text-slate-900">Transforme resíduos em recursos!</p>
            </section>
          </div>

          <div className="mt-10">
            <RecommendedLinks
              title="Leituras recomendadas"
              items={[
                {
                  href: "/blog/materiais-biodegradaveis-escova-de-dente-de-bambu",
                  title: "Materiais biodegradáveis",
                  description: "O que são, exemplos e o descarte correto na prática.",
                },
                {
                  href: "/blog/coleta-seletiva-no-brasil",
                  title: "Coleta seletiva no Brasil",
                  description: "Como separar e o que fazer quando não há coleta no seu bairro.",
                },
                {
                  href: "/blog/reciclagem-plastico",
                  title: "Reciclagem de plástico",
                  description: "Símbolos, tipos e como separar para não contaminar.",
                },
              ]}
            />
          </div>

          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Próximo passo recomendado
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Continue aprofundando seu consumo consciente e evite armadilhas de marketing verde.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog/tags/materiais-sustentaveis"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Ver materiais sustentáveis
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Voltar ao Blog
              </Link>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Nota editorial: orientações de descarte variam por município e por tipo de material.
              Verifique coleta seletiva e compostagem na sua região.
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}
