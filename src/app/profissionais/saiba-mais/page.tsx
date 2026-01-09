import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saiba mais — Benefícios do cadastro | Reciclativa",
  description:
    "Entenda os benefícios de cadastrar sua empresa/serviço na Reciclativa: gratuito, exposição orgânica no Google (SEO local), página dedicada e público qualificado.",
  robots: { index: true, follow: true },
};

export default function SaibaMaisPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Diretório de Profissionais
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Por que cadastrar seu serviço na Reciclativa?
        </h1>

        <p className="mt-4 text-slate-700">
          A Reciclativa é um portal focado em sustentabilidade, reciclagem e economia circular.
          Nosso diretório existe para conectar <strong>quem oferece soluções reais</strong> a{" "}
          <strong>quem já está procurando</strong> por elas na sua cidade e estado.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-slate-50 p-5">
            <h2 className="text-base font-bold text-slate-900">
              Cadastro 100% gratuito (sem mensalidade)
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Você não paga para divulgar seu serviço. É simples: se você atua com soluções
              sustentáveis, seu cadastro pode ganhar visibilidade dentro de um ambiente editorial
              qualificado.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-slate-50 p-5">
            <h2 className="text-base font-bold text-slate-900">
              Exposição no Google com SEO local
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Seu serviço pode ser encontrado em buscas por cidade e estado, como{" "}
              <span className="font-semibold">
                “coleta seletiva em [cidade]”, “consultoria ambiental em [estado]”
              </span>
              . Isso aumenta sua presença digital sem depender de anúncios pagos.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-slate-50 p-5">
            <h2 className="text-base font-bold text-slate-900">Página dedicada para seu serviço</h2>
            <p className="mt-2 text-sm text-slate-700">
              Seu cadastro pode ter uma página com nome, descrição, contatos e serviços — facilitando
              a decisão de quem está buscando e melhorando a credibilidade do seu negócio.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-slate-50 p-5">
            <h2 className="text-base font-bold text-slate-900">Público qualificado e alinhado</h2>
            <p className="mt-2 text-sm text-slate-700">
              A audiência da Reciclativa já tem interesse em sustentabilidade e soluções ambientais.
              Menos curiosos. Mais chance de contato qualificado.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="text-lg font-bold text-emerald-900">
            Em resumo: visibilidade + credibilidade, sem custo
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-emerald-900/90">
            <li className="flex gap-2">
              <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-700" />
              Cadastro gratuito e sem contrato
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-700" />
              Exposição orgânica no Google (SEO local)
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-700" />
              Presença por estado e cidade
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-700" />
              Página dedicada e público alinhado ao tema
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Como funciona a aprovação</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Etapa 1
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">Envio do cadastro</p>
              <p className="mt-2 text-sm text-slate-700">
                Você preenche o formulário com dados do serviço, cidade/UF e contatos.
              </p>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Etapa 2
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">Análise rápida</p>
              <p className="mt-2 text-sm text-slate-700">
                Verificamos consistência e adequação ao diretório (anti-fake e qualidade).
              </p>
            </div>

            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Etapa 3
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">Publicação</p>
              <p className="mt-2 text-sm text-slate-700">
                Aprovado, seu serviço pode aparecer no diretório e páginas regionais.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Perguntas frequentes</h2>

          <div className="mt-4 space-y-3">
            <details className="rounded-2xl border border-black/5 bg-white p-5">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                Tem algum custo agora ou depois?
              </summary>
              <p className="mt-3 text-sm text-slate-700">
                O cadastro é gratuito. Caso futuramente existam recursos opcionais (ex.: destaque),
                isso seria informado com transparência e nunca como requisito para permanecer no diretório.
              </p>
            </details>

            <details className="rounded-2xl border border-black/5 bg-white p-5">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                O que aumenta a chance de aprovação e destaque?
              </summary>
              <p className="mt-3 text-sm text-slate-700">
                Cadastro completo, descrição objetiva do serviço, dados reais de contato e seleção correta
                de cidade/UF e serviços. Quanto mais claro, melhor para o usuário e para SEO.
              </p>
            </details>

            <details className="rounded-2xl border border-black/5 bg-white p-5">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                Posso cadastrar mais de uma cidade/UF?
              </summary>
              <p className="mt-3 text-sm text-slate-700">
                Para manter qualidade e organização, o ideal é cadastrar por base principal. Se você atende
                várias regiões, descreva isso na descrição (ex.: atendimento regional/estadual).
              </p>
            </details>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/anuncie"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            Cadastrar meu serviço gratuitamente
          </Link>

          <Link
            href="/profissionais"
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Ver diretório de profissionais
          </Link>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Gratuito • Análise rápida • Sem compromisso
        </p>
      </section>
    </main>
  );
}
