import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "Coleta Seletiva | Reciclativa",
  description:
    "Coleta seletiva: como separar, cores, fluxo e boas práticas para reduzir contaminação.",
  alternates: { canonical: "/coleta-seletiva" },
  openGraph: {
    title: "Coleta Seletiva | Reciclativa",
    description:
      "Cores, dicas e organização para tornar a separação eficiente e correta.",
    url: "/coleta-seletiva",
    type: "article",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO com imagem (padrão do site) */}
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
            Coleta seletiva: como separar sem erro
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Cores, dicas e organização para tornar a separação eficiente e correta.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voltar para a Home
            </Link>

            <Link
              href="/guias"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Ver guias
            </Link>
          </div>

          {/* Breadcrumb simples */}
          <nav className="mt-8 text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">Coleta seletiva</span>
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
            {/* Bloco de abertura (prioridade 1) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                O que você vai aprender aqui
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                A coleta seletiva funciona melhor quando a separação é simples e consistente:
                manter recicláveis secos, evitar contaminação e seguir as regras locais (que
                podem variar por cidade/operador). Este guia organiza o básico para você
                separar com segurança e reduzir rejeito.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Separação</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Seco x orgânico x rejeito, sem complicar.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Cores</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Padrão por material e variações locais.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Boas práticas</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Como evitar contaminação na triagem.
                  </p>
                </div>
              </div>
            </div>

            {/* Seção base (mantendo estrutura do site) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Comece pelo essencial (rápido)
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <strong>Seco e sem resto de comida:</strong> reciclável contaminado tende a virar rejeito.
                </li>
                <li>
                  <strong>Não precisa lavar perfeito:</strong> remover excesso e manter seco já ajuda muito.
                </li>
                <li>
                  <strong>Regra local manda:</strong> aceitação de materiais pode variar por cidade/cooperativa.
                </li>
              </ul>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/simbolos-da-reciclagem"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver símbolos da reciclagem →
                </Link>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver FAQ →
                </Link>
              </div>
            </div>

            {/* Leituras recomendadas (prioridade 2) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Leituras recomendadas
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Para aprofundar com segurança, comece por estes atalhos internos.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Página pilar: Reciclagem →
                </Link>
                <Link
                  href="/residuos-solidos"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Resíduos sólidos (classificação) →
                </Link>
                <Link
                  href="/economia-circular"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Economia circular →
                </Link>
                <Link
                  href="/guias"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Guias práticos →
                </Link>
              </div>
            </div>

            {/* CTA Profissionais */}
            <ProfissionaisCta />

            {/* CTA Anuncie */}
            <AdCtaCard />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Links úteis
              </h3>
              <div className="mt-4 space-y-3">
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Página pilar: Reciclagem →
                </Link>
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

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica rápida
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Separe seco, sem resto de comida, e mantenha categorias claras
                  para reduzir rejeito.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Próximos passos
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Adicionar seção “Cores da coleta seletiva”</li>
                <li>Adicionar checklist “comece hoje”</li>
                <li>Criar FAQ (SEO) para dúvidas comuns</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
