import type { Metadata } from "next";
import Link from "next/link";

import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";
export const metadata: Metadata = {
  title: "Economia circular: conceito e exemplos no Brasil",
  description:
    "Entenda economia circular e veja exemplos prÃ¡ticos de aplicaÃ§Ã£o no Brasil, com benefÃ­cios e desafios.",
  alternates: { canonical: "/blog/economia-circular-exemplos" },
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
            Economia circular: conceito e exemplos no Brasil
          </h1>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Artigo-base criado para evitar 404. Em seguida, vamos enriquecer com
            dados, cases e links internos.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Ver blog
            </Link>
            <Link
              href="/sustentabilidade"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Pilar: Sustentabilidade
            </Link>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="prose prose-slate max-w-none">
          <h2>Em construÃ§Ã£o</h2>
          <p>
            ConteÃºdo serÃ¡ publicado em breve. Estrutura planejada: definiÃ§Ã£o,
            princÃ­pios, benefÃ­cios, exemplos e como aplicar no dia a dia.
          </p>
          <ul>
            <li>
              <Link href="/reciclagem">Pilar de Reciclagem</Link>
            </li>
            <li>
              <Link href="/guias">Guias prÃ¡ticos</Link>
            </li>
            <li>
              <Link href="/diretorio">DiretÃ³rio de soluÃ§Ãµes</Link>
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
}


