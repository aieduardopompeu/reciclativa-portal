import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre | Reciclativa",
  description:
    "Conheça a Reciclativa: propósito, missão e como o portal organiza conteúdos sobre reciclagem e sustentabilidade.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre | Reciclativa",
    description:
      "Propósito, missão e estrutura da Reciclativa — informação prática para transformar resíduos em recursos.",
    url: "/sobre",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO com imagem */}
      <header className="relative overflow-hidden border-b border-slate-200">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.webp')" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white"
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Reciclativa
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Sobre a Reciclativa
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Informação prática, organizada e acessível para transformar resíduos
            em recursos.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voltar para a Home
            </Link>

            <Link
              href="/reciclagem"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Começar por Reciclagem
            </Link>
          </div>

          {/* Breadcrumb */}
          <nav className="mt-8 text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">Sobre</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* Conteúdo */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Coluna principal */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                O que é a Reciclativa
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                A Reciclativa é um portal digital focado em reciclagem,
                sustentabilidade e economia circular. O objetivo é organizar
                informações práticas — sem jargão — para ajudar pessoas,
                escolas, empresas e profissionais a tomar decisões melhores no
                dia a dia.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Aqui você encontra páginas pilar, guias, checklists e conteúdos
                educativos pensados para aplicação real, não apenas leitura
                teórica.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Missão
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Tornar a reciclagem e a sustentabilidade mais simples, práticas
                e acessíveis, ajudando a reduzir desperdício e rejeito por meio
                de informação clara e bem organizada.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Como o portal está organizado
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <strong>Páginas pilar</strong>: Reciclagem, Sustentabilidade,
                  Economia Circular.
                </li>
                <li>
                  <strong>Guias práticos</strong>: checklists e passo a passo.
                </li>
                <li>
                  <strong>Blog</strong>: artigos educativos e conteúdos de apoio.
                </li>
                <li>
                  <strong>Diretório</strong>: profissionais e serviços ligados à
                  área ambiental.
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Navegação rápida
              </h3>

              <div className="mt-4 space-y-3">
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Página pilar: Reciclagem →
                </Link>
                <Link
                  href="/guias"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Guias práticos →
                </Link>
                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver blog →
                </Link>
                <Link
                  href="/diretorio"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Diretório →
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Frase do projeto
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Transforme resíduos em recursos!
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
