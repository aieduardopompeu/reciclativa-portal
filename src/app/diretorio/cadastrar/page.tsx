import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cadastrar empresa no Diretório",
  description:
    "Cadastre sua empresa, cooperativa ou serviço no Diretório da Reciclativa e ganhe visibilidade.",
  alternates: { canonical: "/diretorio/cadastrar" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-emerald-50/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Diretório
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Cadastrar empresa no Diretório
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-700 sm:text-base">
            Página-base criada para evitar 404. Próximo passo: formulário e fluxo
            de submissão.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/diretorio"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Voltar ao diretório
            </Link>
            <Link
              href="/anuncie"
              className="rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Ver mídia kit
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-950">Próximo passo</h2>
            <p className="mt-2 text-sm text-slate-700">
              Vamos implementar um formulário com campos básicos:
              nome, categoria, cidade/UF, contato, site/instagram e descrição.
            </p>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Para já não ficar vazio
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Se preferir, por enquanto podemos coletar cadastros via WhatsApp
                ou Google Forms e migrar para formulário próprio depois.
              </p>
            </div>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Atalhos</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <Link className="hover:text-emerald-700" href="/anuncie">
                  Anuncie na Reciclativa
                </Link>
              </li>
              <li>
                <Link className="hover:text-emerald-700" href="/guias">
                  Guias práticos
                </Link>
              </li>
              <li>
                <Link className="hover:text-emerald-700" href="/blog">
                  Blog
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
