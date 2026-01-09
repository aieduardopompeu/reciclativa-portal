import type { Metadata } from "next";
import Link from "next/link";
import AdCtaProfissionaisCard from "@/components/AdCtaProfissionaisCard";

export const metadata: Metadata = {
  title: "Diretório | Reciclativa",
  description:
    "Atalhos úteis para navegar pelos principais conteúdos da Reciclativa e acessar o Diretório de Profissionais por região.",
  alternates: { canonical: "/diretorio" },
  openGraph: {
    title: "Diretório | Reciclativa",
    description:
      "Acesso rápido a páginas-base, guias práticos e ao Diretório de Profissionais por UF e cidade.",
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

          {/* ✅ Texto editorial (AdSense-safe) */}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Use esta página para acessar rapidamente os principais conteúdos da Reciclativa e o
            <strong> Diretório de Profissionais</strong>. Você encontra guias práticos, páginas-base
            e caminhos diretos para tirar dúvidas comuns sobre reciclagem, descarte correto e
            soluções sustentáveis.
          </p>

          <p className="mt-4 text-sm font-semibold text-slate-900">
            Transforme resíduos em recursos!
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/profissionais"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Ver diretório de profissionais
            </Link>

            <Link
              href="/anuncie"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cadastrar meu serviço
            </Link>

            <Link
              href="/profissionais/saiba-mais"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Saiba mais (benefícios)
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
                Atalhos úteis para começar pelo essencial e navegar com clareza.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    Página-base: Reciclagem
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Entenda o básico para reciclar corretamente e reduzir rejeito.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-emerald-800">
                    Abrir →
                  </p>
                </Link>

                <Link
                  href="/guias"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <p className="text-sm font-semibold text-slate-900">Guias práticos</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Checklists e passo a passo para fazer certo no dia a dia.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-emerald-800">
                    Abrir →
                  </p>
                </Link>

                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <p className="text-sm font-semibold text-slate-900">Blog da Reciclativa</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Conteúdos práticos sobre reciclagem, descarte e sustentabilidade.
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
                    Diretório de profissionais
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

            {/* ✅ Mantido (alto CTR / conversão) */}
            <AdCtaProfissionaisCard signupHref="/anuncie" />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* ✅ Substitui “Próximos passos” por conteúdo útil */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Como usar esta página
              </h3>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  Comece por <strong>Reciclagem</strong> para entender os fundamentos e evitar erros
                  de descarte.
                </li>
                <li>
                  Use <strong>Guias</strong> para checklists e passo a passo prático.
                </li>
                <li>
                  Acesse <strong>Diretório de profissionais</strong> para encontrar serviços na sua
                  região.
                </li>
                <li>
                  Consulte o <strong>Blog</strong> para aprofundar temas específicos.
                </li>
              </ul>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Critérios do diretório
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Para manter qualidade e reduzir spam, os cadastros passam por análise.
                  Se você oferece serviços ligados a sustentabilidade e reciclagem, pode cadastrar
                  gratuitamente.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/profissionais"
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                  >
                    Ver diretório
                  </Link>
                  <Link
                    href="/anuncie"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cadastrar serviço
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
