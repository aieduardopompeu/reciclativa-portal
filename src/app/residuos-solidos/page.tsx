import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resíduos Sólidos | Reciclativa",
  description: "Resíduos sólidos: tipos, descarte correto, redução e boas práticas para evitar contaminação.",
  alternates: { canonical: "/residuos-solidos" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="border-b border-slate-900">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Reciclativa
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-50 sm:text-5xl">
            Resíduos Sólidos: tipos e descarte correto
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-300 sm:text-base">
            Guia para entender resíduos e descartar com responsabilidade, sem contaminar recicláveis.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-transparent px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-700 hover:bg-slate-900"
            >
              Voltar para a Home
            </Link>
            <Link
              href="/guias"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Ver guias
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="text-xl font-bold text-slate-50">Conteúdo em construção</h2>
          <p className="mt-2 text-sm text-slate-300">
            Esta rota foi criada para remover 404 e servir de base para uma página pilar/guia.
          </p>
          <p className="mt-4 text-sm text-slate-300">
            Próximo passo: adicionar seções, FAQ, links internos e artigos relacionados.
          </p>
        </div>
      </div>
    </main>
  );
}
