import type { Metadata } from "next";
import Link from "next/link";

import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";
export const metadata: Metadata = {
  title: "Como reduzir lixo na rotina (sem radicalizar)",
  description:
    "EstratÃ©gias simples para diminuir resÃ­duos em casa e no trabalho, com foco em hÃ¡bitos sustentÃ¡veis.",
  alternates: { canonical: "/blog/reduzir-lixo-na-rotina" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
<header className="border-b border-slate-200 bg-emerald-50/40">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Blog
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Como reduzir lixo na rotina (sem radicalizar)
          </h1>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Artigo-base criado para evitar 404. Em seguida, vamos evoluir com
            estrutura editorial, tÃ³picos e FAQ.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Ver blog
            </Link>
            <Link
              href="/guias"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Ver guias prÃ¡ticos
            </Link>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="prose prose-slate max-w-none">
          <h2>Em construÃ§Ã£o</h2>
          <p>
            ConteÃºdo serÃ¡ publicado em breve. Estrutura planejada: hÃ¡bitos de compra,
            reuso, organizaÃ§Ã£o domÃ©stica, compostagem simples e descarte correto.
          </p>
          <p>Enquanto isso, comece pelos guias:</p>
          <ul>
            <li>
              <Link href="/guias/coleta-seletiva">Coleta seletiva: como comeÃ§ar</Link>
            </li>
            <li>
              <Link href="/guias/o-que-pode-reciclar">O que pode reciclar</Link>
            </li>
            <li>
              <Link href="/simbolos-da-reciclagem">SÃ­mbolos da reciclagem</Link>
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
}


