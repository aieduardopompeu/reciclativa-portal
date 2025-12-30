import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "O que pode (e não pode) reciclar",
  description:
    "Checklist prático para evitar contaminação e melhorar a triagem: o que vai e o que não vai para reciclagem.",
  alternates: { canonical: "/guias/o-que-pode-reciclar" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-emerald-50/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Checklist
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            O que pode (e não pode) reciclar
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-700 sm:text-base">
            Uma lista prática para reduzir rejeição na triagem e fazer o descarte
            do jeito certo.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/guias"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Ver todos os guias
            </Link>
            <Link
              href="/reciclagem"
              className="rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Pilar de Reciclagem
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-950">Em construção</h2>
            <p className="mt-2 text-sm text-slate-700">
              Página-base criada para evitar 404. Próximo passo: lista por
              material + observações e exemplos.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Geralmente pode</p>
                <p className="mt-2 text-sm text-slate-700">
                  Papelão limpo, metais, vidro e plásticos comuns (quando limpos).
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Geralmente não pode</p>
                <p className="mt-2 text-sm text-slate-700">
                  Itens sujos/engordurados, papéis higiênicos, fraldas e rejeitos.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Depende da cidade</p>
                <p className="mt-2 text-sm text-slate-700">
                  Isopor, cápsulas, laminados e itens difíceis variam por coleta.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Dica prática</p>
                <p className="mt-2 text-sm text-slate-700">
                  Esvazie e retire o excesso. Sem cheiro já ajuda muito.
                </p>
              </div>
            </div>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Atalhos</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <Link className="hover:text-emerald-700" href="/guias/coleta-seletiva">
                  Coleta seletiva: como começar
                </Link>
              </li>
              <li>
                <Link className="hover:text-emerald-700" href="/simbolos-da-reciclagem">
                  Símbolos da reciclagem
                </Link>
              </li>
              <li>
                <Link className="hover:text-emerald-700" href="/diretorio">
                  Diretório de soluções
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}