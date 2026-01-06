import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies | Reciclativa",
  description:
    "Entenda o uso de cookies na Reciclativa e como gerenciar preferências de privacidade, medição e publicidade.",
  alternates: { canonical: "/politica-de-cookies" },
  openGraph: {
    title: "Política de Cookies | Reciclativa",
    description:
      "Como usamos cookies e como você pode gerenciar preferências de privacidade, medição e publicidade.",
    url: "/politica-de-cookies",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Institucional
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Política de Cookies
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Esta página explica o uso de cookies e como você pode gerenciar preferências
            de privacidade no navegador e/ou no banner de consentimento (quando disponível).
          </p>

          <nav className="mt-6 text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">Política de Cookies</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <article className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">1) O que são cookies</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Cookies são pequenos arquivos salvos no seu navegador para lembrar preferências
                e apoiar funcionalidades, medições de uso e, quando aplicável, publicidade.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">
                2) Tipos de cookies que podem ser utilizados
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <strong>Essenciais</strong>: necessários para funcionamento do site.
                </li>
                <li>
                  <strong>Preferências</strong>: lembram escolhas do usuário (quando aplicável).
                </li>
                <li>
                  <strong>Medição/Analytics</strong>: ajudam a entender uso do site (métricas agregadas).
                </li>
                <li>
                  <strong>Publicidade</strong>: podem ser usados por provedores de anúncios para medir e exibir publicidade.
                </li>
              </ul>
              <p className="mt-3 text-sm text-slate-700">
                Para contexto geral de privacidade, consulte{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="font-semibold text-emerald-800 hover:underline"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-extrabold tracking-tight">3) Como gerenciar preferências</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Você pode controlar cookies nas configurações do seu navegador (bloquear, permitir, remover).
                Ao desativar cookies, algumas funcionalidades podem não operar como esperado.
              </p>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">Preferências de cookies</p>
                <p className="mt-2 text-sm text-slate-700">
                  Se o site exibir um banner de consentimento, você pode ajustar preferências por lá
                  (quando disponível) e também revisar esta política para transparência.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">4) LGPD</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Para uma visão geral de direitos do titular e bases legais, consulte{" "}
                <Link href="/lgpd" className="font-semibold text-emerald-800 hover:underline">
                  LGPD
                </Link>
                .
              </p>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight">Atalhos</h3>
              <div className="mt-4 space-y-3">
                <Link
                  href="/politica-de-privacidade"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Política de Privacidade →
                </Link>
                <Link
                  href="/termos-de-uso"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Termos de Uso →
                </Link>
                <Link
                  href="/lgpd"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  LGPD →
                </Link>
                <Link
                  href="/contato"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Contato →
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="text-sm font-semibold text-emerald-950">
                Transforme resíduos em recursos!
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
