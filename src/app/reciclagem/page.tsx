import type { Metadata } from "next";
import Link from "next/link";

type PageMeta = {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  subtitle: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  sections?: Array<{ title: string; text: string }>;
};

function PillarPage({ meta }: { meta: PageMeta }) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="border-b border-slate-900">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Reciclativa
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-50 sm:text-5xl">
            {meta.h1}
          </h1>

          <p className="mt-4 max-w-3xl text-sm text-slate-300 sm:text-base">
            {meta.subtitle}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/guias"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Ver guias
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-transparent px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-700 hover:bg-slate-900"
            >
              Voltar para a Home
            </Link>
          </div>

          <nav className="mt-8 text-sm text-slate-400">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-slate-600">
                  /
                </span>
                <Link href="/reciclagem" className="hover:underline">
                  Reciclagem
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-50">
              Página pilar: Reciclagem
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Aqui vamos reunir os conceitos essenciais, passos práticos, lista
              do que pode/não pode e links internos para artigos e guias.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm font-semibold text-slate-50">
                  Começando do zero
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  O básico para separar, higienizar e armazenar recicláveis.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm font-semibold text-slate-50">
                  Materiais e símbolos
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Plásticos, papéis, metais, vidros e seus símbolos.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm font-semibold text-slate-50">
                  Erros comuns
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Contaminação, mistura indevida e descarte incorreto.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm font-semibold text-slate-50">
                  Checklist rápido
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Passo a passo para acertar sempre, sem dúvida.
                </p>
              </div>
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <p className="text-sm font-semibold text-slate-50">Links úteis</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>
                <Link
                  href="/simbolos-da-reciclagem"
                  className="font-semibold text-emerald-400 hover:underline"
                >
                  Símbolos da reciclagem
                </Link>
              </li>
              <li>
                <Link
                  href="/coleta-seletiva"
                  className="font-semibold text-emerald-400 hover:underline"
                >
                  Coleta seletiva
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/o-que-pode-ser-reciclado"
                  className="font-semibold text-emerald-400 hover:underline"
                >
                  O que pode ser reciclado
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  const title = "Reciclagem | Reciclativa";
  const description =
    "Guia pilar de reciclagem: como separar, o que pode ou não pode, símbolos e passos práticos para reciclar corretamente.";
  const canonical = "/reciclagem";

  return (
    <PillarPage
      meta={{
        title,
        description,
        canonical,
        h1: "Reciclagem: guia prático para reciclar corretamente",
        subtitle:
          "Aprenda como separar resíduos, evitar contaminação e entender os símbolos da reciclagem para acertar no descarte.",
      }}
    />
  );
}

export const metadata: Metadata = {
  title: "Reciclagem | Reciclativa",
  description:
    "Guia pilar de reciclagem: como separar, o que pode ou não pode, símbolos e passos práticos para reciclar corretamente.",
  alternates: { canonical: "/reciclagem" },
};
