import type { Metadata } from "next";
import Link from "next/link";
import AdCtaProfissionaisCard from "@/components/AdCtaProfissionaisCard";
import ProfissionaisStatePicker from "@/components/profissionais/ProfissionaisStatePicker";
import { uniqueUFs, uniqueRoles } from "@/content/profissionais";

export const metadata: Metadata = {
  title: "Profissionais | Reciclativa",
  description:
    "Diretório de profissionais e serviços ligados à reciclagem e sustentabilidade por estado e cidade.",
  alternates: { canonical: "/profissionais" },
  openGraph: {
    title: "Profissionais | Reciclativa",
    description:
      "Encontre coleta, consultoria, educação ambiental e serviços ligados à reciclagem e sustentabilidade. Comece escolhendo o estado.",
    url: "/profissionais",
    type: "website",
  },
};

export default function ProfissionaisHubPage() {
  const ufs = uniqueUFs();
  const roles = uniqueRoles();

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
            Profissionais e serviços por estado e cidade
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Encontre coleta, consultoria, educação ambiental e serviços ligados à
            reciclagem e sustentabilidade. Comece escolhendo o estado.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voltar para a Home
            </Link>

            <Link
              href="/anuncie"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Cadastrar meu serviço
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
                <span className="font-medium text-slate-700">Profissionais</span>
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
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Escolha o estado
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Ao selecionar o estado, você verá serviços por cidade e
                    categorias disponíveis.
                  </p>
                </div>
              </div>

              {/* MAPA + fallback de UFs */}
              <ProfissionaisStatePicker ufs={ufs} />

              {ufs.length === 0 ? (
                <p className="mt-6 text-sm text-slate-700">
                  Ainda não há profissionais cadastrados. Você pode adicionar
                  itens em <code>src/content/profissionais.ts</code>.
                </p>
              ) : null}
            </div>

            {/* Tipos de profissionais (taxonomia inicial) */}
            {roles.length ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                  Tipos de profissionais
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Exemplos comuns no segmento. Vamos ampliando com o tempo.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {roles.map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Card “Quer anunciar?” abaixo do hub (mantido) */}
            <AdCtaProfissionaisCard signupHref="/anuncie" />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Atalhos
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
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica rápida
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Se você presta serviços na área, cadastre seu estado e cidade
                  para aparecer nas buscas locais.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
