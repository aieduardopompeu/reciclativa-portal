import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reciclagem de plástico: erros que atrapalham tudo",
  description:
    "Principais erros no descarte de plástico que aumentam rejeição na triagem  e como evitar.",
  alternates: { canonical: "/blog/reciclagem-plastico-erros" },
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
            Reciclagem de plástico: erros que atrapalham tudo
          </h1>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Artigo-base criado para evitar 404. Em seguida, vira um post pilar
            com exemplos, imagens e FAQ.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Ver blog
            </Link>
            <Link
              href="/guias/o-que-pode-reciclar"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Checklist: o que pode reciclar
            </Link>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="prose prose-slate max-w-none">
          <h2>Em construção</h2>
          <p>
            Conteúdo será publicado em breve. Estrutura planejada: itens sujos,
            mistura de materiais, rótulos/adesivos, plásticos difíceis, e como
            melhorar a separação em casa.
          </p>
          <ul>
            <li>
              <Link href="/guias/coleta-seletiva">Coleta seletiva</Link>
            </li>
            <li>
              <Link href="/simbolos-da-reciclagem">Símbolos da reciclagem</Link>
            </li>
            <li>
              <Link href="/reciclagem">Pilar de Reciclagem</Link>
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
}