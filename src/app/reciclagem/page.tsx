import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "Reciclagem | Reciclativa",
  description:
    "Guia prático para reciclar corretamente: como separar resíduos, evitar contaminação e entender símbolos da reciclagem para acertar no descarte.",
  alternates: { canonical: "/reciclagem" },
  openGraph: {
    title: "Reciclagem | Reciclativa",
    description:
      "Aprenda a separar recicláveis, reduzir rejeito e entender os símbolos da reciclagem para acertar no descarte.",
    url: "/reciclagem",
    type: "article",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO com imagem (mesmo padrão da Sustentabilidade) */}
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
            Reciclagem: guia prático para reciclar corretamente
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Aprenda como separar resíduos, evitar contaminação e entender os
            símbolos da reciclagem para acertar no descarte.
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

          {/* Breadcrumb simples (mesmo padrão) */}
          <nav className="mt-8 text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">Reciclagem</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* Conteúdo (mesmo grid do padrão Sustentabilidade) */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Coluna principal */}
          <div className="space-y-6 lg:col-span-2">
            {/* Começando do zero (reaproveita conteúdo e links) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                Começando do zero
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                O básico para separar, higienizar e armazenar recicláveis sem
                gerar rejeito por contaminação.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/blog/o-que-pode-ser-reciclado"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Checklist
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    O que pode (e não pode) ser reciclado
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Lista prática por material + regra de ouro para reduzir
                    contaminação.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-emerald-800">
                    Ler guia →
                  </p>
                </Link>

                <Link
                  href="/coleta-seletiva"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Guia base
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    Coleta seletiva: como separar sem erro
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Cores, organização e dicas simples para separar com
                    consistência.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-emerald-800">
                    Ver página →
                  </p>
                </Link>

                <Link
                  href="/simbolos-da-reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100 sm:col-span-2"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Essencial
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    Símbolos da reciclagem
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Entenda os símbolos nas embalagens e o que eles realmente
                    significam.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-emerald-800">
                    Ver símbolos →
                  </p>
                </Link>
              </div>
            </div>

            {/* CTA Profissionais (mesmo lugar do padrão Sustentabilidade) */}
            <ProfissionaisCta />

            {/* CTA Anuncie */}
            <AdCtaCard />

            {/* Blocos inferiores (mantidos, só no padrão visual) */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                  Erros comuns que atrapalham tudo
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                  <li>Mixar recicláveis com orgânicos (contaminação).</li>
                  <li>Enviar embalagens com excesso de líquido ou comida.</li>
                  <li>Colocar papel engordurado junto do papel limpo.</li>
                  <li>Achar que “símbolo” garante coleta na sua cidade.</li>
                </ul>

                <div className="mt-6">
                  <Link
                    href="/blog/o-que-pode-ser-reciclado"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Ver a regra de ouro →
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                  Checklist rápido (30 segundos)
                </h2>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                  <li>Separe recicláveis do orgânico.</li>
                  <li>Retire excesso de comida e líquidos.</li>
                  <li>Mantenha seco (não precisa lavar “perfeito”).</li>
                  <li>Reduza volume quando fizer sentido (ex.: garrafa PET).</li>
                  <li>Em dúvida, consulte o guia e a regra local.</li>
                </ol>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/guias"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                  >
                    Explorar guias
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Ir para o Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (mesmo padrão: cards + dica) */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Atalhos da Reciclagem
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Navegação rápida para reforçar SEO interno e facilitar a jornada.
              </p>

              <div className="mt-4 space-y-3">
                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Blog da Reciclativa →
                </Link>

                <Link
                  href="/guias"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Guias práticos →
                </Link>

                <Link
                  href="/coleta-seletiva"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Coleta seletiva →
                </Link>

                <Link
                  href="/simbolos-da-reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Símbolos da reciclagem →
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica editorial
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Em cada post, linke 3–6 conteúdos relacionados e 1 página
                  pilar.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
