import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LGPD | Reciclativa",
  description:
    "Entenda como a Reciclativa trata dados pessoais segundo a LGPD: bases legais, direitos do titular, cookies, publicidade e como solicitar informações.",
  alternates: { canonical: "/lgpd" },
  openGraph: {
    title: "LGPD | Reciclativa",
    description:
      "Como tratamos dados pessoais segundo a LGPD: direitos, cookies, publicidade e solicitações.",
    url: "/lgpd",
    type: "website",
  },
};

const CONTACT_EMAIL = "contato@reciclativa.com";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Institucional
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            LGPD (Lei Geral de Proteção de Dados)
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Esta página resume como a Reciclativa trata dados pessoais e quais
            são seus direitos como titular, em conformidade com a LGPD (Lei nº
            13.709/2018). Para detalhes operacionais sobre cookies e publicidade,
            consulte as páginas dedicadas.
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
                <span className="font-medium text-slate-700">LGPD</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <article className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">
                1) Controlador e contato
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                A Reciclativa atua como <strong>controladora</strong> dos dados
                pessoais tratados no contexto do portal, quando aplicável.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Canal de contato para solicitações LGPD:{" "}
                <a
                  className="font-semibold text-emerald-800 hover:underline"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">
                2) O que pode ser considerado dado pessoal aqui
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <strong>Dados de contato</strong> (ex.: e-mail e mensagem) quando
                  você envia um formulário/contato.
                </li>
                <li>
                  <strong>Dados de navegação</strong> (ex.: páginas visitadas,
                  eventos, tipo de dispositivo e navegador) usados para melhorar o site
                  e mensurar desempenho.
                </li>
                <li>
                  <strong>Identificadores via cookies</strong> (quando aplicável),
                  para preferências e medição.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">
                3) Finalidades do tratamento
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Entregar e manter o funcionamento do portal.</li>
                <li>Melhorar conteúdo, estrutura e experiência de navegação.</li>
                <li>Mensurar performance (métricas agregadas e relatórios).</li>
                <li>Responder solicitações e mensagens enviadas por você.</li>
                <li>
                  Exibir publicidade (quando aplicável) para apoiar a manutenção do portal.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">
                4) Bases legais (visão geral)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                A LGPD prevê diferentes bases legais para tratamento de dados.
                Na Reciclativa, as bases mais comuns podem incluir:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <strong>Execução de procedimentos preliminares/atendimento</strong>{" "}
                  (ex.: responder contato enviado por você).
                </li>
                <li>
                  <strong>Legítimo interesse</strong> (ex.: melhorar o portal e
                  entender uso de forma agregada, respeitando direitos e expectativas).
                </li>
                <li>
                  <strong>Consentimento</strong> (quando aplicável, sobretudo para
                  certas categorias de cookies e preferências).
                </li>
                <li>
                  <strong>Cumprimento de obrigação legal/regulatória</strong> quando necessário.
                </li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Detalhes práticos sobre cookies e preferências estão em{" "}
                <Link
                  href="/politica-de-cookies"
                  className="font-semibold text-emerald-800 hover:underline"
                >
                  /politica-de-cookies
                </Link>{" "}
                e sobre privacidade geral em{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="font-semibold text-emerald-800 hover:underline"
                >
                  /politica-de-privacidade
                </Link>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">
                5) Compartilhamento com terceiros
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Podemos utilizar serviços de terceiros para métricas e publicidade
                (quando aplicável). Esses provedores podem empregar cookies/identificadores
                para medição e entrega de anúncios.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Para entender e ajustar preferências:{" "}
                <Link
                  href="/politica-de-cookies"
                  className="font-semibold text-emerald-800 hover:underline"
                >
                  /politica-de-cookies
                </Link>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">
                6) Seus direitos como titular
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Você pode solicitar, quando aplicável:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Confirmação da existência de tratamento.</li>
                <li>Acesso aos dados.</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
                <li>Anonimização, bloqueio ou eliminação (quando cabível).</li>
                <li>Portabilidade (quando aplicável).</li>
                <li>Informação sobre compartilhamentos.</li>
                <li>Revogação de consentimento (quando a base for consentimento).</li>
              </ul>
              <p className="mt-3 text-sm text-slate-700">
                Para solicitar:{" "}
                <a
                  className="font-semibold text-emerald-800 hover:underline"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">
                7) Retenção e segurança (visão geral)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Adotamos medidas razoáveis de segurança para proteger informações.
                Mantemos dados pelo tempo necessário para cumprir finalidades,
                obrigações legais e suporte operacional, quando aplicável.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Importante: dados de navegação/métricas são, em geral, analisados
                de forma agregada para melhoria do portal.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold text-slate-900">
                Atualizações desta página
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Podemos atualizar este conteúdo para refletir melhorias do site e
                requisitos de conformidade. Recomendamos revisá-lo periodicamente.
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
                  href="/politica-de-cookies"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Política de Cookies →
                </Link>
                <Link
                  href="/termos-de-uso"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Termos de uso →
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
