import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade | Reciclativa",
  description:
    "Entenda como a Reciclativa trata dados, cookies, publicidade e métricas de uso. Transparência e respeito à privacidade.",
  alternates: { canonical: "/politica-de-privacidade" },
  openGraph: {
    title: "Política de Privacidade | Reciclativa",
    description:
      "Como tratamos dados, cookies, publicidade e métricas de uso na Reciclativa.",
    url: "/politica-de-privacidade",
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
            Política de Privacidade
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Esta página explica como a Reciclativa lida com informações, cookies,
            métricas de uso e publicidade. Nosso compromisso é informar com
            clareza e respeitar a privacidade.
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
                <span className="font-medium text-slate-700">Política de Privacidade</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <article className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">1) Quem somos</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                A Reciclativa é um portal educativo e informativo sobre reciclagem,
                sustentabilidade e economia circular.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Contato:{" "}
                <a
                  className="font-semibold text-emerald-800 hover:underline"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">2) Quais dados coletamos</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <strong>Dados de navegação</strong> (ex.: páginas visitadas, tempo de
                  permanência, tipo de dispositivo e navegador), usados para melhorar o site.
                </li>
                <li>
                  <strong>Dados fornecidos por você</strong> (ex.: e-mail e mensagem enviados no contato),
                  apenas quando você decide enviar.
                </li>
                <li>
                  <strong>Cookies</strong> (ver seção específica abaixo).
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">3) Como usamos as informações</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Melhorar conteúdo, estrutura e experiência de navegação.</li>
                <li>Mensurar desempenho do site (métricas agregadas).</li>
                <li>Responder contatos e solicitações enviadas por você.</li>
                <li>Exibir publicidade (quando aplicável) para apoiar a manutenção do portal.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">4) Cookies e tecnologias semelhantes</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Cookies são pequenos arquivos armazenados no seu navegador. Eles ajudam a lembrar
                preferências e entender como o site é utilizado.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Você pode gerenciar cookies a qualquer momento em{" "}
                <Link
                  href="/politica-de-cookies"
                  className="font-semibold text-emerald-800 hover:underline"
                >
                  Política de Cookies
                </Link>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">5) Publicidade (ex.: Google AdSense)</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Podemos exibir anúncios para ajudar a manter o portal. Alguns provedores de publicidade
                podem utilizar cookies/identificadores para exibir anúncios e medir resultados.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Para entender e ajustar preferências, consulte{" "}
                <Link
                  href="/politica-de-cookies"
                  className="font-semibold text-emerald-800 hover:underline"
                >
                  Política de Cookies
                </Link>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">6) Seus direitos e escolhas</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Você pode solicitar informações sobre seu contato enviado.</li>
                <li>Você pode pedir correção/remoção de dados que tenha fornecido.</li>
                <li>Você pode ajustar cookies e preferências de privacidade no navegador.</li>
              </ul>
              <p className="mt-3 text-sm text-slate-700">
                Para solicitações:{" "}
                <a
                  className="font-semibold text-emerald-800 hover:underline"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Para informações completas sobre a LGPD, consulte{" "}
                <Link href="/lgpd" className="font-semibold text-emerald-800 hover:underline">
                  LGPD
                </Link>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold text-slate-900">Atualizações desta política</p>
              <p className="mt-2 text-sm text-slate-700">
                Podemos atualizar este texto para refletir melhorias do site e requisitos de conformidade.
                Recomendamos revisá-lo periodicamente.
              </p>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight">Atalhos</h3>
              <div className="mt-4 space-y-3">
                <Link
                  href="/termos-de-uso"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Termos de Uso →
                </Link>
                <Link
                  href="/politica-de-cookies"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Política de Cookies →
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
