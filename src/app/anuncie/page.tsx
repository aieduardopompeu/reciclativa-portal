import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Anuncie | Reciclativa",
  description:
    "Anuncie na Reciclativa: mídia kit, formatos e contato comercial para marcas e serviços ligados à reciclagem e sustentabilidade.",
  alternates: { canonical: "/anuncie" },
  openGraph: {
    title: "Anuncie | Reciclativa",
    description:
      "Mídia kit, formatos e contato comercial para anunciar na Reciclativa.",
    url: "/anuncie",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO com imagem (padrão do site) */}
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
            Anuncie na Reciclativa
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Em breve: opções de mídia, formatos e contato comercial.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voltar para a Home
            </Link>

            <Link
              href="/profissionais"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Ver profissionais
            </Link>
          </div>

          {/* Breadcrumb simples */}
          <nav className="mt-8 text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">Anuncie</span>
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
                Mídia kit (em breve)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Esta página será a central comercial da Reciclativa. Vamos publicar
                aqui formatos, posicionamentos e um fluxo simples de contato.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Formatos de anúncio
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Display, cards, áreas de destaque e páginas estratégicas.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Público e conteúdo
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Reciclagem, sustentabilidade, guias e diretório de serviços.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Onde seu anúncio aparece
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Páginas com alto valor (pilares e hubs) para reforçar intenção e CTR.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Página pilar: Reciclagem →
                </Link>
                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Blog →
                </Link>
                <Link
                  href="/guias"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Guias →
                </Link>
                <Link
                  href="/profissionais"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Profissionais →
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Próximos passos
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Publicar mídia kit com formatos e exemplos</li>
                <li>Adicionar canal de contato comercial</li>
                <li>Definir páginas/posições prioritárias</li>
              </ul>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica rápida
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Quando o mídia kit estiver pronto, este link vira o CTA padrão
                  do site inteiro.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
