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
                    Apoio comercial para acompanhar contatos, propostas e oportunidades.
                  </p>
                </div>
              </div>

              <p className="mt-8 max-w-2xl text-sm leading-relaxed text-slate-600">
                Este endereço já pode ser usado como ponto de entrada da plataforma. Enquanto a
                aplicação completa evolui, ele funciona como uma porta oficial da Reciclativa Gestão.
              </p>
            </div>

            <div className="lg:justify-self-end">
              <div className="rounded-[28px] border border-slate-200 bg-[#07122b] p-4 shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:p-5">
                <div className="mx-auto max-w-[420px] rounded-[24px] border border-white/10 bg-[#091733] p-5 text-white">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                        Plataforma
                      </p>
                      <h2 className="mt-2 text-2xl font-bold">Reciclativa Gestão</h2>
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                      Em evolução
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                        Financeiro
                      </p>
                      <p className="mt-3 text-3xl font-extrabold">R$ 184 mil</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        Visão consolidada da operação e das movimentações principais.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                        CRM
                      </p>
                      <p className="mt-3 text-3xl font-extrabold">27</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        Contatos e oportunidades em acompanhamento comercial.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                          Operação
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-300">
                          Entradas e saídas em um ambiente mais claro para acompanhamento da rotina.
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                        Organização
                      </span>
                    </div>

                    <div className="mt-4 flex items-end gap-2">
                      <span className="h-4 w-9 rounded-md bg-emerald-400" />
                      <span className="h-7 w-9 rounded-md bg-emerald-500" />
                      <span className="h-5 w-9 rounded-md bg-emerald-400" />
                      <span className="h-8 w-9 rounded-md bg-emerald-500" />
                      <span className="h-6 w-9 rounded-md bg-emerald-400" />
                      <span className="h-9 w-9 rounded-md bg-emerald-500" />
                      <span className="h-7 w-9 rounded-md bg-emerald-400" />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm font-semibold">Usuários e acessos</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        Acesso organizado por perfil, função e responsabilidade.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-sm font-semibold">Relatórios</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        Mais visibilidade para acompanhar a evolução da empresa.
                      </p>
                    </div>
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

