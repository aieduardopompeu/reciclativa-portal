import type { Metadata } from "next";
import Link from "next/link";
import AdCtaProfissionaisCard from "@/components/AdCtaProfissionaisCard";

export const metadata: Metadata = {
  title: "Diretório | Reciclativa",
  description:
    "Diretório da Reciclativa: atalhos, páginas-base e acesso rápido a profissionais por estado.",
  alternates: { canonical: "/diretorio" },
  openGraph: {
    title: "Diretório | Reciclativa",
    description:
      "Atalhos, páginas-base e acesso rápido a profissionais e serviços por estado.",
    url: "/diretorio",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO com imagem (padrão) */}
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
            Diretório da Reciclativa
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            MVP: esta área será expandida. Por enquanto, foco em conteúdo prático
            e navegação útil.
          </p>

          <p className="mt-4 text-sm font-semibold text-slate-900">
            Transforme resíduos em recursos!
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/profissionais"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Ver profissionais por estado
            </Link>

            <Link
              href="/anuncie"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Anunciar no site
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
                <span className="font-medium text-slate-700">Diretório</span>
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
                Acesso rápido
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Use estes atalhos para começar pela base e navegar sem 404.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    Página pilar: Reciclagem
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Guia principal para reciclar corretamente e evitar rejeito.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-emerald-800">
                    Abrir →
                  </p>
                </Link>

                <Link
                  href="/guias"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    Guias práticos
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Checklists e passo a passo para fazer certo.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-emerald-800">
                    Abrir →
                  </p>
                </Link>

                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    Blog da Reciclativa
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Conteúdos práticos sobre reciclagem e sustentabilidade.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-emerald-800">
                    Abrir →
                  </p>
                </Link>

                <Link
                  href="/profissionais"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    Profissionais por estado
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Encontre serviços e contatos por UF e cidade.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-emerald-800">
                    Abrir →
                  </p>
                </Link>
              </div>
            </div>

            {/* ✅ Bloco B2B (alto CTR) — mantido */}
            <AdCtaProfissionaisCard signupHref="/anuncie" />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Próximos passos
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Adicionar listagem por cidade (quando tiver base)</li>
                <li>Incluir categorias e filtros (MVP+)</li>
                <li>Reforçar links internos em posts e guias</li>
              </ul>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica rápida
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Para SEO local, cada estado/cidade deve linkar para a página
                  pilar e para 2–3 guias relacionados.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
