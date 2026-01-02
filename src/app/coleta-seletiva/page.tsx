import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "Coleta Seletiva | Reciclativa",
  description:
    "Coleta seletiva: como separar, cores, fluxo e boas práticas para reduzir contaminação.",
  alternates: { canonical: "/coleta-seletiva" },
  openGraph: {
    title: "Coleta Seletiva | Reciclativa",
    description:
      "Cores, dicas e organização para tornar a separação eficiente e correta.",
    url: "/coleta-seletiva",
    type: "article",
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
            Coleta seletiva: como separar sem erro
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Cores, dicas e organização para tornar a separação eficiente e correta.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voltar para a Home
            </Link>

            <Link
              href="/guias"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Ver guias
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
                <span className="font-medium text-slate-700">
                  Coleta seletiva
                </span>
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
                Conteúdo em construção
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Esta rota foi criada para remover 404 e servir de base para uma
                página pilar/guia.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                Próximo passo: adicionar seções práticas, FAQ, links internos e
                artigos relacionados.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Cores</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Padrão por material e variações por cidade/operador.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Boas práticas
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Como reduzir contaminação e evitar rejeito na triagem.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Profissionais */}
            <ProfissionaisCta />

            {/* CTA Anuncie */}
            <AdCtaCard />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Links úteis
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
                  Ver guias →
                </Link>
                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver blog →
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica rápida
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Separe seco, sem resto de comida, e mantenha categorias claras
                  para reduzir rejeito.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Próximos passos
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Adicionar seção “Cores da coleta seletiva”</li>
                <li>Adicionar checklist “comece hoje”</li>
                <li>Criar FAQ (SEO) para dúvidas comuns</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
