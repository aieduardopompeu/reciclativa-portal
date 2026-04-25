import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

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
    <main className="min-h-screen bg-[#f6faf7] text-slate-900">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.webp')" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/84 to-[#f6faf7]"
          aria-hidden
        />
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-emerald-200/20 blur-3xl" />
          <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-slate-200/35 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 shadow-sm backdrop-blur sm:px-5">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Reciclativa" width={124} height={32} priority />
              <div className="hidden h-8 w-px bg-slate-200 sm:block" />
              <div className="hidden sm:block">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Reciclativa Gestão
                </p>
                <p className="text-sm text-slate-600">Ambiente da plataforma</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="https://www.reciclativa.com/gestao"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Conhecer a solução
              </Link>
              <Link
                href="https://www.reciclativa.com/gestao/contato?tipo=demo"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Solicitar demonstração
              </Link>
              <Link
                href="/app/cadastre-se"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-700 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
              >
                Cadastre-se
              </Link>
              <Link
                href="/login?next=/app/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Login
              </Link>
            </div>
          </header>

          <div className="grid min-h-[calc(100vh-132px)] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                app.reciclativa.com
              </p>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Reciclativa Gestão
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-700">
                Uma base digital para apoiar empresas de reciclagem e gestão de resíduos com mais
                organização operacional, clareza financeira e relacionamento comercial.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="https://www.reciclativa.com/gestao/contato?tipo=demo"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  Solicitar demonstração
                </Link>
                <Link
                  href="/app/cadastre-se"
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-700 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
                >
                  Cadastre-se
                </Link>
                <Link
                  href="/login?next=/app/dashboard"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="https://www.reciclativa.com/gestao/contato?tipo=comercial"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Falar com a equipe
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4">
                  <p className="text-sm font-semibold text-slate-900">Operação</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Apoio à rotina e organização dos processos do dia a dia.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4">
                  <p className="text-sm font-semibold text-slate-900">Financeiro</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Mais visibilidade sobre movimentações e acompanhamento da empresa.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4">
                  <p className="text-sm font-semibold text-slate-900">Relacionamento</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Estrutura para organizar acessos e apoiar o relacionamento comercial.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[32px] border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur">
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                      Painel inicial
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Estrutura inicial da plataforma Reciclativa Gestão.
                    </p>
                  </div>

                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    SaaS
                  </div>
                </div>

                <div className="mt-5 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">Empresa</p>
                      <p className="mt-2 text-sm text-slate-600">
                        Organização principal, dados da operação e visão geral da conta.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">Usuários</p>
                      <p className="mt-2 text-sm text-slate-600">
                        Controle de acessos por empresa, unidade e área de atuação.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">Cadastros</p>
                      <p className="mt-2 text-sm text-slate-600">
                        Clientes, fornecedores, materiais e estrutura inicial da empresa.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">Operação</p>
                      <p className="mt-2 text-sm text-slate-600">
                        Entradas, saídas, estoque e movimentos conectados ao banco real.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">Financeiro</p>
                      <p className="mt-2 text-sm text-slate-600">
                        Contas a pagar, contas a receber e acompanhamento inicial do painel.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      Fluxo já preparado para:
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      <li>• Cadastro de empresa</li>
                      <li>• Aprovação interna</li>
                      <li>• Envio do acesso inicial</li>
                      <li>• Primeiro acesso com troca de senha</li>
                      <li>• MFA com recovery codes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
