import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reciclativa Gestão | Plataforma",
  description:
    "Ambiente da Reciclativa Gestão para empresas de reciclagem e gestão de resíduos.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppHomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.webp')" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white"
          aria-hidden
        />
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-24 top-12 h-56 w-56 rounded-full bg-emerald-200/25 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-slate-200/40 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              app.reciclativa.com
            </p>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Reciclativa Gestão
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
              Um ambiente online para apoiar a gestão de empresas de reciclagem e gestão de
              resíduos com mais controle operacional, financeiro e comercial.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Operação</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Organização de processos e rotina do dia a dia.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Financeiro</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Mais clareza sobre movimentações e acompanhamento da empresa.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Relacionamento</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Apoio comercial para acompanhar contatos e oportunidades.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="https://www.reciclativa.com/gestao"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Conhecer a solução
              </Link>

              <Link
                href="https://www.reciclativa.com/gestao/contato?tipo=demo"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Solicitar demonstração
              </Link>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              Este endereço já está ativo e pode ser usado como entrada da plataforma. Enquanto a
              aplicação completa evolui, você pode conhecer a proposta comercial ou falar com a
              equipe da Reciclativa Gestão.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
