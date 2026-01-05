import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso | Reciclativa",
  description:
    "Regras de uso do site Reciclativa: responsabilidades, conteúdo, links externos e condições gerais.",
  alternates: { canonical: "/termos" },
  openGraph: {
    title: "Termos de Uso | Reciclativa",
    description:
      "Regras de uso do site Reciclativa: responsabilidades, conteúdo, links externos e condições gerais.",
    url: "/termos",
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
            Termos de Uso
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Ao acessar a Reciclativa, você concorda com estes termos. Eles
            existem para proteger usuários, o portal e a integridade do conteúdo.
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
                <span className="font-medium text-slate-700">Termos</span>
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
                1) Uso do conteúdo
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                O conteúdo da Reciclativa é educativo e informativo. Você pode
                compartilhar links e trechos curtos com atribuição, sem copiar
                integralmente páginas, nem republicar como se fosse seu.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">
                2) Responsabilidade e precisão
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Trabalhamos para manter informações corretas e atualizadas, mas
                reciclagem pode variar por cidade, coleta local, regras de
                condomínio e operadores de resíduos. Sempre valide com fontes e
                serviços da sua região quando necessário.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">
                3) Links externos
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Podemos indicar sites e serviços de terceiros. Não controlamos
                conteúdo, políticas e disponibilidade desses sites.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight">
                4) Comentários e contato
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Ao nos enviar mensagens, você concorda em não compartilhar dados
                sensíveis desnecessários. Podemos responder e, se aplicável,
                usar sua sugestão para melhorar páginas.
              </p>
              <p className="mt-3 text-sm text-slate-700">
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
              <h2 className="text-lg font-extrabold tracking-tight">
                5) Publicidade e sustentabilidade do projeto
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Para ajudar a manter o portal, podemos exibir publicidade (ex.:
                AdSense) e futuramente oferecer planos de divulgação. Isso não
                altera nossa intenção editorial de informar com clareza.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Saiba mais em{" "}
                <Link
                  href="/privacidade"
                  className="font-semibold text-emerald-800 hover:underline"
                >
                  Privacidade
                </Link>{" "}
                e{" "}
                <Link
                  href="/cookies"
                  className="font-semibold text-emerald-800 hover:underline"
                >
                  Cookies
                </Link>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold text-slate-900">
                Atualizações dos termos
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Podemos revisar estes termos conforme evoluções do site e
                exigências de conformidade.
              </p>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight">Atalhos</h3>
              <div className="mt-4 space-y-3">
                <Link
                  href="/privacidade"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Privacidade →
                </Link>
                <Link
                  href="/cookies"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Cookies →
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
