import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.reciclativa.com").replace(/\/+$/, "");

const audience = [
  {
    title: "Empresas de reciclagem",
    desc: "Para operações que precisam de mais clareza administrativa, financeira e operacional.",
  },
  {
    title: "Centrais de triagem",
    desc: "Para rotinas com fluxo intenso de materiais, processos e necessidade de acompanhamento.",
  },
  {
    title: "Empresas de coleta",
    desc: "Para organizar melhor a operação e sustentar a gestão com uma base digital mais consistente.",
  },
  {
    title: "Operadores ambientais",
    desc: "Para negócios que precisam integrar rotina operacional, cadastros, usuários e visão gerencial.",
  },
  {
    title: "Gestores de resíduos",
    desc: "Para empresas que precisam sair de controles dispersos e ganhar mais estrutura no dia a dia.",
  },
  {
    title: "Empresas em crescimento",
    desc: "Para operações que querem evoluir com mais organização, rastreabilidade e base para decisões.",
  },
];

const resources = [
  {
    title: "Financeiro e conciliação",
    desc: "Acompanhe recebimentos, pagamentos, movimentações e ganhe mais clareza sobre a rotina financeira.",
  },
  {
    title: "Emissão de NFe e NFS-e",
    desc: "Organize processos fiscais em um fluxo mais estruturado e conectado à rotina da empresa.",
  },
  {
    title: "Clientes e fornecedores",
    desc: "Centralize cadastros importantes com mais padronização, histórico e menos retrabalho.",
  },
  {
    title: "Relacionamento comercial (CRM)",
    desc: "Centralize contatos, histórico, oportunidades, propostas e empresas atendidas em um fluxo mais organizado de acompanhamento.",
  },
  {
    title: "Controle operacional",
    desc: "Tenha apoio para organizar entradas, saídas, materiais e processos que exigem acompanhamento constante.",
  },
  {
    title: "Usuários e permissões",
    desc: "Defina acessos conforme a função de cada usuário e aumente a segurança na gestão da operação.",
  },
  {
    title: "Relatórios e indicadores",
    desc: "Visualize informações relevantes da empresa e acompanhe a operação com mais base para decidir.",
  },
];

const benefits = [
  "Centralização das informações",
  "Redução de retrabalho",
  "Mais visibilidade financeira",
  "Melhor acompanhamento da operação",
  "Mais controle por usuário e permissões",
  "Base mais estruturada para crescer",
];

const pains = [
  "informações dispersas",
  "processos pouco integrados",
  "retrabalho no administrativo",
  "baixa visibilidade financeira",
  "dificuldade de acompanhamento gerencial",
];

const pillars = [
  {
    title: "Operação",
    desc: "Mais organização dos processos do dia a dia.",
  },
  {
    title: "Financeiro",
    desc: "Mais controle sobre movimentações e rotina administrativa.",
  },
  {
    title: "Gestão",
    desc: "Mais visibilidade para acompanhar e decidir melhor.",
  },
];

export const metadata: Metadata = {
  title: "Reciclativa Gestão",
  description:
    "Sistema para empresas de reciclagem e gestão de resíduos. Centralize operação, financeiro, emissão fiscal e processos em uma plataforma online.",
  alternates: {
    canonical: `${SITE_URL}/gestao`,
  },
};

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {desc ? <p className="mt-4 text-base text-slate-700 sm:text-lg">{desc}</p> : null}
    </div>
  );
}

export default function GestaoPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.webp')" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white"
          aria-hidden
        />
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent" />
          <div className="absolute -left-24 top-14 h-56 w-56 rounded-full bg-emerald-200/25 blur-3xl" />
          <div className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-slate-200/40 blur-3xl" />
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Reciclativa Gestão
            </p>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Sistema para empresas de reciclagem e gestão de resíduos
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              Centralize operação, financeiro, emissão fiscal e processos em uma plataforma
              online pensada para a rotina do setor.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/gestao/contato?tipo=demo"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Solicitar demonstração
              </Link>
              <Link
                href="#recursos"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                Conhecer recursos
              </Link>
            </div>

            <p className="mt-5 text-sm text-slate-600">
              Mais organização para o dia a dia. Mais clareza para a gestão.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 hidden h-24 w-24 rounded-full bg-emerald-200/40 blur-2xl lg:block" />
            <div className="absolute -right-4 bottom-8 hidden h-24 w-24 rounded-full bg-slate-200/60 blur-2xl lg:block" />

            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 p-4 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur">
              <div className="rounded-[22px] border border-slate-200 bg-slate-950 p-4 text-white">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                      Dashboard
                    </p>
                    <p className="mt-2 text-lg font-semibold">Reciclativa Gestão</p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                    Ambiente online
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                      Financeiro
                    </p>
                    <p className="mt-2 text-2xl font-bold">R$ 184 mil</p>
                    <p className="mt-1 text-sm text-slate-300">Visão consolidada da operação</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                      Emissão fiscal
                    </p>
                    <p className="mt-2 text-2xl font-bold">124 docs</p>
                    <p className="mt-1 text-sm text-slate-300">Fluxo organizado por rotina</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 sm:col-span-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                        CRM
                      </p>
                      <span className="rounded-full bg-emerald-300/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-100">
                        Comercial
                      </span>
                    </div>
                    <p className="mt-2 text-2xl font-bold">28 leads</p>
                    <p className="mt-1 text-sm text-slate-200">Pipeline ativo com propostas e follow-ups</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">Entradas e saídas</p>
                        <p className="mt-1 text-sm text-slate-300">
                          Acompanhamento mais claro da operação e dos movimentos do dia.
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                        Operação
                      </span>
                    </div>
                    <div className="mt-4 h-24 rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-3">
                      <div className="flex h-full items-end gap-2">
                        {[38, 62, 44, 76, 58, 88, 67].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t-lg bg-gradient-to-t from-emerald-500 to-emerald-300"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold">Relacionamento comercial</p>
                      <p className="mt-1 text-sm text-slate-300">
                        Histórico de contatos, propostas e oportunidades em andamento.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold">Usuários e permissões</p>
                      <p className="mt-1 text-sm text-slate-300">
                        Acesso organizado por perfil, função e responsabilidade.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold">Relatórios</p>
                      <p className="mt-1 text-sm text-slate-300">
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

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-sm sm:p-8">
          <SectionTitle
            title="Uma plataforma para apoiar a gestão de operações que não podem perder controle"
            desc="Empresas que atuam com reciclagem e resíduos lidam com rotinas operacionais, administrativas e financeiras que exigem organização, consistência e visibilidade. A Reciclativa Gestão nasce para apoiar esse cenário com uma base digital mais clara, integrada e preparada para o dia a dia da operação."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-5"
              >
                <p className="text-sm font-semibold text-slate-950">{pillar.title}</p>
                <p className="mt-2 text-sm text-slate-700">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-emerald-50/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Para quem é"
            title="Feita para empresas que precisam operar e gerir ao mesmo tempo"
            desc="A Reciclativa Gestão foi pensada para negócios que precisam sair de controles dispersos e estruturar melhor a rotina com apoio de uma plataforma online."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {audience.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Cenário atual
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Quando a operação cresce, planilhas soltas deixam de ser suficientes
            </h2>
          </div>

          <div>
            <p className="text-base leading-7 text-slate-300 sm:text-lg">
              Informações espalhadas, retrabalho administrativo, dificuldade de acompanhar
              movimentações, rotina financeira descentralizada e pouca visão gerencial costumam
              limitar a eficiência da empresa e dificultar decisões.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {pains.map((pain) => (
                <span
                  key={pain}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                >
                  {pain}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Solução"
          title="Mais controle em um só ambiente"
          desc="A proposta da plataforma é centralizar processos importantes do dia a dia, reduzir dispersão operacional e dar mais base para decisões com informações mais acessíveis e estruturadas."
        />
      </section>

      <section id="recursos" className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Recursos"
            title="Recursos para apoiar a rotina da sua empresa"
            desc="Uma estrutura pensada para apoiar operação, administração e gestão com mais consistência."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {resources.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Módulo
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionTitle
            eyebrow="Benefícios"
            title="Menos dispersão. Mais clareza. Mais gestão."
            desc="A Reciclativa Gestão ajuda sua empresa a organizar melhor informações importantes, reduzir controles paralelos e acompanhar a operação com mais consistência."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-900"
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-emerald-50/30">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-[28px] border border-slate-200 bg-white/90 p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Diferencial
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Uma solução alinhada à realidade do setor
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              A rotina de empresas que atuam com reciclagem e gestão de resíduos tem
              características próprias. Por isso, a Reciclativa Gestão parte de uma proposta
              objetiva: oferecer uma plataforma online com foco em organização, controle e apoio à
              evolução da gestão, sem perder de vista a realidade operacional do segmento.
            </p>
            <p className="mt-5 text-sm font-semibold text-emerald-700">
              Mais do que digitalizar processos, a proposta é estruturar melhor a operação.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-7 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Experiência do produto
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Uma experiência de uso clara, moderna e orientada à gestão
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              A plataforma foi pensada para oferecer uma experiência mais simples, visualmente
              organizada e adequada ao uso diário de equipes que precisam acessar informações,
              acompanhar processos e manter a rotina sob controle.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "interface online",
                "acesso organizado por usuários",
                "visão mais clara das rotinas",
                "base preparada para evolução",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,#052e16_0%,#0f172a_100%)] p-8 text-white shadow-[0_20px_80px_-30px_rgba(5,46,22,0.75)] sm:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Reciclativa Gestão
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Leve mais organização para sua operação
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-200 sm:text-lg">
              Conheça a Reciclativa Gestão e veja como a plataforma pode apoiar sua empresa com
              mais controle, segurança e eficiência no dia a dia.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/gestao/contato?tipo=demo"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Solicitar demonstração
            </Link>
            <Link
              href="/gestao/contato?tipo=comercial"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Falar com a equipe
            </Link>
          </div>

          <p className="mt-5 text-sm text-slate-300">
            Ambiente online, organizado para apoiar empresas de reciclagem e gestão de resíduos.
          </p>
        </div>
      </section>
    </main>
  );
}
