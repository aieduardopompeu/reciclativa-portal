import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "Resíduos Sólidos | Reciclativa",
  description:
    "Resíduos sólidos: classificação, manejo e boas práticas para reduzir impacto e melhorar a destinação.",
  alternates: { canonical: "/residuos-solidos" },
  openGraph: {
    title: "Resíduos Sólidos | Reciclativa",
    description:
      "Classificação, manejo e boas práticas para reduzir impacto e melhorar a destinação de resíduos.",
    url: "/residuos-solidos",
    type: "article",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO com imagem (padrão) */}
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
            Resíduos sólidos: o básico para entender e destinar melhor
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Conceitos, categorias e boas práticas para reduzir rejeito e melhorar
            a gestão no dia a dia.
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
                <span className="font-medium text-slate-700">Resíduos sólidos</span>
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
                O que são resíduos sólidos (em linguagem simples)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Resíduos sólidos são os materiais descartados no dia a dia (em casa,
                comércio e serviços). Entender a diferença entre recicláveis, orgânicos
                e rejeitos ajuda a reduzir contaminação, melhorar a destinação e diminuir
                custos e impacto ambiental.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Classificação</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Recicláveis, orgânicos e rejeitos — e por que isso importa.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Manejo</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Separação e armazenamento para reduzir contaminação.
                  </p>
                </div>
              </div>
            </div>

            {/* Seção base */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Três decisões que melhoram tudo
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  <strong>Separar por categoria:</strong> reciclável (seco), orgânico e rejeito.
                </li>
                <li>
                  <strong>Reduzir umidade:</strong> papel/papelão molhado perde valor e vira rejeito.
                </li>
                <li>
                  <strong>Evitar mistura:</strong> contaminação aumenta o descarte final.
                </li>
              </ul>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/coleta-seletiva"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver coleta seletiva →
                </Link>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver FAQ →
                </Link>
              </div>
            </div>

            {/* Leituras recomendadas */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Leituras recomendadas
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Conecte os conceitos com guias práticos e referências do portal.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Página pilar: Reciclagem →
                </Link>
                <Link
                  href="/simbolos-da-reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Símbolos da reciclagem →
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
                  href="/coleta-seletiva"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Coleta seletiva →
                </Link>
                <Link
                  href="/economia-circular"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Economia circular →
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
                  Reduzir e separar certo geralmente tem mais impacto do que
                  “reciclar depois” um material contaminado.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Próximos passos
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Adicionar seção “Tipos de resíduos e exemplos”</li>
                <li>Incluir checklist “comece hoje”</li>
                <li>Criar FAQ (SEO) com dúvidas comuns</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
