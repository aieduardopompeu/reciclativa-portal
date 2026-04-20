import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.reciclativa.com").replace(/\/+$/, "");

type SearchParamsValue = string | string[] | undefined;

type SearchParams = {
  tipo?: SearchParamsValue;
  ok?: SearchParamsValue;
  error?: SearchParamsValue;
};

function firstValue(value: SearchParamsValue) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function normalizeTipo(tipo: string) {
  const v = (tipo || "").toLowerCase();
  if (v === "comercial") return "comercial";
  if (v === "duvidas") return "duvidas";
  return "demo";
}

function getSelectValue(tipo: string) {
  if (tipo === "comercial") return "Contato comercial";
  if (tipo === "duvidas") return "Dúvidas sobre a plataforma";
  return "Solicitar demonstração";
}

function getTipoOrigem(tipo: string) {
  if (tipo === "comercial") return "comercial";
  if (tipo === "duvidas") return "gestao";
  return "demo";
}

function getMensagemInicial(tipo: string) {
  if (tipo === "comercial") {
    return "Olá, gostaria de falar com a equipe comercial sobre a Reciclativa Gestão.";
  }
  if (tipo === "duvidas") {
    return "Olá, gostaria de tirar algumas dúvidas sobre a plataforma Reciclativa Gestão.";
  }
  return "Olá, gostaria de conhecer melhor a Reciclativa Gestão e solicitar uma demonstração da plataforma.";
}

export const metadata: Metadata = {
  title: "Contato | Reciclativa Gestão",
  description:
    "Solicite uma demonstração, tire dúvidas sobre a plataforma ou fale com a equipe comercial da Reciclativa Gestão.",
  alternates: {
    canonical: `${SITE_URL}/gestao/contato`,
  },
};

export default async function GestaoContatoPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const tipo = normalizeTipo(firstValue(params.tipo));
  const ok = firstValue(params.ok) === "1";
  const error = decodeURIComponent(firstValue(params.error) || "");

  const selectValue = getSelectValue(tipo);
  const tipoOrigem = getTipoOrigem(tipo);
  const mensagemInicial = getMensagemInicial(tipo);

  return (
    <main className="min-h-screen bg-white text-slate-900">
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
            Reciclativa Gestão
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Contato
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Solicite uma demonstração, tire dúvidas sobre a plataforma ou fale com a equipe comercial.
          </p>

          <div className="mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur">
            <p className="text-sm font-semibold text-slate-900">Quer conhecer a Reciclativa Gestão?</p>
            <p className="mt-2 text-sm text-slate-700">
              Preencha o formulário abaixo para iniciar um contato mais direto com a equipe da
              solução.
            </p>
          </div>

          {ok && (
            <div className="mt-6 max-w-3xl rounded-2xl border border-emerald-300 bg-emerald-50 p-5 shadow-sm">
              <p className="text-lg font-bold text-emerald-950">Contato enviado com sucesso.</p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                Recebemos sua mensagem e a equipe deve retornar em breve pelo e-mail informado.
              </p>
            </div>
          )}

          {!ok && error && (
            <div className="mt-6 max-w-3xl rounded-2xl border border-red-300 bg-red-50 p-5 shadow-sm">
              <p className="text-lg font-bold text-red-900">Não foi possível enviar seu contato.</p>
              <p className="mt-2 text-sm leading-relaxed text-red-800">{error}</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/gestao"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voltar para Gestão
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voltar para a Home
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Fale com a equipe da Gestão
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Preencha os dados abaixo para solicitar demonstração, tirar dúvidas sobre a plataforma
              ou iniciar um contato comercial sobre a Reciclativa Gestão.
            </p>
          </div>

          <form action="/api/gestao-contato" method="POST" className="mt-8 space-y-8">
            <input type="hidden" name="tipoOrigem" value={tipoOrigem} />
            <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" />

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-900">
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="company" className="mb-2 block text-sm font-semibold text-slate-900">
                  Empresa
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-900">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  placeholder="voce@empresa.com"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-slate-900">
                  WhatsApp
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="text"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  placeholder="DDD + número"
                />
              </div>

              <div>
                <label htmlFor="city" className="mb-2 block text-sm font-semibold text-slate-900">
                  Cidade
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  placeholder="Sua cidade"
                />
              </div>

              <div>
                <label htmlFor="uf" className="mb-2 block text-sm font-semibold text-slate-900">
                  UF
                </label>
                <input
                  id="uf"
                  name="uf"
                  type="text"
                  maxLength={2}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 uppercase text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  placeholder="RJ"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contactType" className="mb-2 block text-sm font-semibold text-slate-900">
                Tipo de contato
              </label>
              <select
                id="contactType"
                name="contactType"
                defaultValue={selectValue}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              >
                <option>Solicitar demonstração</option>
                <option>Dúvidas sobre a plataforma</option>
                <option>Contato comercial</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-900">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                defaultValue={mensagemInicial}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                placeholder="Conte um pouco sobre o que você gostaria de organizar no sistema."
              />
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm font-bold text-emerald-950">Para agilizar o atendimento</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-emerald-950/90">
                <li>Empresa e segmento de atuação</li>
                <li>Objetivo do contato: demonstração, dúvidas ou comercial</li>
                <li>Momento da operação e o que deseja organizar no sistema</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Enviar contato
              </button>
              <Link
                href="/gestao"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Voltar para Gestão
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
