import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contato | Reciclativa",
  description:
    "Fale com a Reciclativa: dúvidas, sugestões, correções, parcerias e contato comercial.",
  alternates: { canonical: "/contato" },
  openGraph: {
    title: "Contato | Reciclativa",
    description: "Dúvidas, sugestões, correções, parcerias e contato comercial.",
    url: "/contato",
    type: "website",
  },
};

const CONTACT_EMAIL = "contato@reciclativa.com";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO com imagem */}
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
            Reciclativa
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Contato
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Sugestões, correções, dúvidas, parcerias e contato comercial.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voltar para a Home
            </Link>

            <Link
              href="/anuncie"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Anunciar no site
            </Link>
          </div>

          {/* Breadcrumb */}
          <nav className="mt-8 text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">Contato</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* Conteúdo */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Coluna principal */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                Como falar com a gente
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                O Reciclativa está aberto ao diálogo, sugestões e parcerias. Para
                agilizar o retorno, centralize o contato pelo canal abaixo.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">E-mail</p>
                  <p className="mt-2 text-sm text-slate-700">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-semibold text-emerald-800 hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                  <p className="mt-3 text-xs text-slate-500">
                    Evite enviar dados sensíveis (documentos, informações
                    bancárias ou dados pessoais desnecessários).
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Comercial / Parcerias
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Para mídia kit, anuncie e parcerias, use a página “Anuncie”.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-emerald-800">
                    <Link href="/anuncie" className="hover:underline">
                      Abrir Anuncie →
                    </Link>
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">Importante</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
                  <li>
                    O Reciclativa não presta suporte técnico a serviços de
                    terceiros.
                  </li>
                  <li>
                    Para informações sobre uso de dados, consulte a{" "}
                    <Link href="/privacidade" className="font-semibold text-emerald-800 hover:underline">
                      Política de Privacidade
                    </Link>
                    .
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Sugestões e correções (ajudam muito)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Se você tiver uma sugestão de tema (ex.: descarte de e-lixo,
                coleta seletiva, reciclagem por material) ou encontrou algo para
                corrigir, envie o assunto com o máximo de contexto: cidade/UF,
                dúvidas e o que você já tentou fazer.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/guias"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver guias →
                </Link>
                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver blog →
                </Link>
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-950">
                  Sugestão rápida
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-emerald-950/90">
                  <li>
                    <strong>[Correção]</strong> + URL da página
                  </li>
                  <li>
                    <strong>[Sugestão]</strong> + tema
                  </li>
                  <li>
                    <strong>[Parceria]</strong> + seu contato
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Atalhos úteis
              </h3>

              <div className="mt-4 space-y-3">
                <Link
                  href="/profissionais"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Profissionais →
                </Link>
                <Link
                  href="/diretorio"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Diretório →
                </Link>
                <Link
                  href="/sobre"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Sobre →
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Frase do projeto
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Transforme resíduos em recursos!
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Políticas
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href="/privacidade"
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Privacidade
                  </Link>
                  <Link
                    href="/termos"
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Termos
                  </Link>
                  <Link
                    href="/cookies"
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cookies
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
