// src/app/blog/coleta-seletiva-no-brasil/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import RecommendedLinks from "@/components/RecommendedLinks";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

const SLUG = "coleta-seletiva-no-brasil";
const URL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Coleta seletiva no Brasil: como funciona e como participar | Reciclativa",
  description:
    "Entenda como funciona a coleta seletiva no Brasil, como separar resíduos em casa, o que fazer quando não existe coleta no bairro e onde descartar corretamente.",
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: "Coleta seletiva no Brasil: como funciona e como participar",
    description:
      "Guia prático para participar da coleta seletiva: separação correta, erros comuns, alternativas quando não há serviço e como encontrar ecopontos/PEVs.",
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
        headline="Coleta seletiva no Brasil: como funciona e como participar"
        description="Guia prático sobre coleta seletiva no Brasil: como separar resíduos, evitar contaminação, o que fazer quando não há coleta e onde levar recicláveis com segurança."
        datePublished="2025-12-04"
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
        <span className="text-slate-700">Coleta seletiva no Brasil</span>
      </div>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <div className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 ring-1 ring-violet-200">
          Guias
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Coleta seletiva no Brasil: como funciona e como participar
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          A coleta seletiva varia muito de cidade para cidade, mas a lógica é sempre a mesma:
          separar corretamente para evitar contaminação e facilitar triagem. Aqui você vai entender
          como funciona, como fazer em casa e o que fazer quando não existe coleta no seu bairro.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog/o-que-pode-ser-reciclado"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Guia: o que pode ser reciclado
          </Link>
          <Link
            href="/blog/cores-da-coleta-seletiva"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver: cores da coleta seletiva
          </Link>
        </div>
      </header>

      {/* Corpo editorial — PADRÃO ITAD */}
      <section className="mt-10">
        <article className="mx-auto max-w-3xl">
          {/* Box editorial (mesmo padrão do ITAD) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Em 30 segundos
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                Comece separando <strong className="text-slate-900">recicláveis secos</strong> do{" "}
                <strong className="text-slate-900">orgânico/rejeito</strong>.
              </li>
              <li>
                O maior inimigo é <strong className="text-slate-900">contaminação</strong> (comida,
                gordura e líquidos).
              </li>
              <li>
                Sem coleta no bairro, use <strong className="text-slate-900">PEVs/ecopontos</strong>{" "}
                e cooperativas quando houver.
              </li>
            </ul>
          </div>

          {/* Texto com tipografia editorial (sem prose) */}
          <div
            className={[
              "mt-10 text-slate-800 leading-relaxed space-y-5",
              "[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-slate-900",
              "[&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-slate-900",
              "[&_p]:text-base [&_p]:leading-relaxed",
              "[&_strong]:font-semibold [&_strong]:text-slate-900",
              "[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6",
              "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6",
              "[&_li]:mt-2",
              "[&_a]:font-semibold [&_a]:text-emerald-700 hover:[&_a]:underline",
            ].join(" ")}
          >
            <h2>O que é coleta seletiva</h2>
            <p>
              Coleta seletiva é o sistema de coleta e destinação de resíduos separados por tipo (em
              geral, recicláveis e orgânicos/rejeitos). O objetivo é reduzir o que vai para aterros,
              recuperar materiais e facilitar o trabalho de triagem (muitas vezes feito por cooperativas).
            </p>

            <h2>Como funciona na prática (o fluxo básico)</h2>
            <ol>
              <li>
                <strong>Separação em casa:</strong> você separa recicláveis (secos) do orgânico/rejeito.
              </li>
              <li>
                <strong>Coleta:</strong> caminhão ou ponto de entrega voluntária (PEV/ecoponto).
              </li>
              <li>
                <strong>Triagem:</strong> separação por material (papel, plástico, vidro, metal).
              </li>
              <li>
                <strong>Reciclagem/beneficiamento:</strong> material segue para indústrias.
              </li>
              <li>
                <strong>Rejeito:</strong> o que não tem reciclagem local ou está contaminado vai para destinação final.
              </li>
            </ol>

            <h2>O passo mais importante: evitar contaminação</h2>
            <p>
              O maior motivo de perda de recicláveis é a <strong>contaminação</strong> (comida, líquidos,
              gordura, resíduos misturados). Por isso:
            </p>
            <ul>
              <li>
                Mantenha recicláveis <strong>secos</strong>.
              </li>
              <li>Retire excesso de alimento e líquidos (não precisa lavar “perfeito”).</li>
              <li>Embalagens engorduradas costumam virar rejeito.</li>
            </ul>

            <h2>Como separar em casa (modelo simples que funciona)</h2>
            <p>Se você quer começar sem complicar:</p>
            <ul>
              <li>
                <strong>Lixeira 1 — Recicláveis (secos):</strong> plástico, papel, metal e vidro (quando sua coleta aceita vidro).
              </li>
              <li>
                <strong>Lixeira 2 — Orgânico/Rejeito:</strong> restos de comida, guardanapos sujos, papel engordurado, itens sem reciclagem.
              </li>
            </ul>

            <p>
              Quando estiver confortável, você pode separar mais (papel vs plástico, vidro separado, etc.).
              Mas o essencial é manter recicláveis secos e não contaminados.
            </p>

            <h2>Onde descartar quando NÃO existe coleta no bairro</h2>
            <p>Essa é a situação mais comum. As alternativas práticas:</p>
            <ol>
              <li>
                <strong>Ecopontos/PEVs:</strong> pontos de entrega voluntária (prefeituras, bairros, centros).
              </li>
              <li>
                <strong>Cooperativas:</strong> algumas recebem diretamente (varia por cidade).
              </li>
              <li>
                <strong>Campanhas temporárias:</strong> escolas, universidades, ONGs e empresas fazem mutirões.
              </li>
              <li>
                <strong>Logística reversa:</strong> itens como pilhas/baterias e e-lixo podem ter coleta em lojas.
              </li>
            </ol>

            <p>
              Para itens específicos, veja também:{" "}
              <Link href="/blog/lixo-eletronico-descarte">lixo eletrônico: descarte correto</Link>.
            </p>

            <h2>Cores da coleta seletiva (atalho para não errar)</h2>
            <p>
              Memorize as quatro principais: azul (papel), vermelho (plástico), verde (vidro) e amarelo (metal).
              Mas lembre: pode variar por local. Guia completo:{" "}
              <Link href="/blog/cores-da-coleta-seletiva">cores da coleta seletiva</Link>.
            </p>

            <h2>Erros comuns que atrapalham (e como evitar)</h2>
            <ul>
              <li>
                <strong>Reciclável com comida:</strong> retire excesso e deixe escorrer.
              </li>
              <li>
                <strong>Misturar vidro quebrado:</strong> embale e identifique para segurança.
              </li>
              <li>
                <strong>Colocar tudo no mesmo saco:</strong> separação mínima em casa aumenta muito a eficiência.
              </li>
              <li>
                <strong>“Achar que tudo recicla”:</strong> depende do material e da infraestrutura local.
              </li>
            </ul>

            <h2>O que normalmente entra na coleta seletiva</h2>
            <p>
              Em geral, materiais mais aceitos: papel/papelão secos, garrafas PET e frascos rígidos,
              latas e vidros. Para visão completa com exemplos:{" "}
              <Link href="/blog/o-que-pode-ser-reciclado">o que pode ser reciclado</Link>.
            </p>

            <h2>Como aumentar o impacto (além de separar)</h2>
            <ul>
              <li>
                <strong>Reduzir</strong> embalagens e descartáveis.
              </li>
              <li>
                <strong>Reutilizar</strong> potes, frascos e materiais.
              </li>
              <li>
                <strong>Comprar melhor</strong> (durabilidade, refil, retornável quando existir).
              </li>
            </ul>

            <p>
              Complemento: <Link href="/blog/reduzir-lixo-na-rotina">reduzir lixo na rotina</Link>.
            </p>

            <h2>FAQ: dúvidas comuns sobre coleta seletiva</h2>

            <h3>Preciso lavar embalagens para reciclar?</h3>
            <p>
              Normalmente não. Retire excesso de alimento e líquidos e mantenha seco. Evitar contaminação
              é o que mais importa para a triagem.
            </p>

            <h3>Se eu misturar recicláveis com orgânico, o que acontece?</h3>
            <p>
              A contaminação pode inviabilizar materiais recicláveis. Muitas vezes, o saco inteiro vira rejeito.
            </p>

            <h3>Vidro vai sempre na coleta seletiva?</h3>
            <p>
              Depende da cidade e do sistema local. Quando aceito, separe com cuidado. Se quebrado, embale e identifique.
            </p>

            <h3>O que faço com lixo eletrônico e baterias?</h3>
            <p>
              Use pontos de coleta específicos (logística reversa, ecopontos, campanhas). Veja:{" "}
              <Link href="/blog/lixo-eletronico-descarte">lixo eletrônico: descarte correto</Link>.
            </p>
          </div>

          {/* Links úteis (card) — padrão ITAD */}
          <div className="mt-10">
            <RecommendedLinks
              links={[
                {
                  href: "/blog/o-que-pode-ser-reciclado",
                  title: "O que pode ser reciclado →",
                  description: "Lista prática para acertar no descarte.",
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
                  href: "/blog/economia-circular-e-linear",
                  title: "Economia circular vs. linear →",
                  description: "Entenda o conceito e por que importa.",
                },
              ]}
            />
          </div>

          {/* FAQ rápido — em card (padrão ITAD) */}
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">FAQ rápido</h2>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Preciso lavar embalagens para reciclar?
                </h3>
                <p className="mt-2">
                  Normalmente não. Retire excesso de alimento e líquidos e mantenha seco. Evitar contaminação
                  é o que mais importa para a triagem.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Se eu misturar recicláveis com orgânico, o que acontece?
                </h3>
                <p className="mt-2">
                  A contaminação pode inviabilizar materiais recicláveis. Muitas vezes, o saco inteiro vira rejeito.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Vidro vai sempre na coleta seletiva?
                </h3>
                <p className="mt-2">
                  Depende da cidade e do sistema local. Quando aceito, separe com cuidado. Se quebrado, embale e identifique.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  O que faço com lixo eletrônico e baterias?
                </h3>
                <p className="mt-2">
                  Use pontos de coleta específicos (logística reversa, ecopontos, campanhas). Veja{" "}
                  <Link href="/blog/lixo-eletronico-descarte">lixo eletrônico: descarte correto</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* CTA final — dentro do max-w-3xl (padrão ITAD) */}
          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Próximo passo recomendado
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Para não errar no descarte, revise a lista do que pode ser reciclado com exemplos práticos e
              casos comuns de contaminação.
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
