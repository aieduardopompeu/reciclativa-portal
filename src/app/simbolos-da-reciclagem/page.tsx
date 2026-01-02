import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "Símbolos da Reciclagem | Reciclativa",
  description:
    "Guia dos símbolos da reciclagem: o que significam nas embalagens, códigos do plástico e como descartar com mais segurança.",
  alternates: { canonical: "/simbolos-da-reciclagem" },
  openGraph: {
    title: "Símbolos da Reciclagem | Reciclativa",
    description:
      "Entenda os símbolos nas embalagens, os códigos do plástico e como separar corretamente.",
    url: "/simbolos-da-reciclagem",
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
            Símbolos da reciclagem: o que significam de verdade
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Entenda os símbolos nas embalagens, códigos do plástico e como separar
            melhor para reduzir rejeito por contaminação.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voltar para a Home
            </Link>

            <Link
              href="/coleta-seletiva"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Ver coleta seletiva
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
                <span className="font-medium text-slate-700">
                  Símbolos da reciclagem
                </span>
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
            {/* Conteúdo base */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                Antes de tudo: símbolo não é garantia de coleta
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Muitos símbolos indicam material, composição ou orientação de
                descarte — mas isso não significa que a sua cidade/cooperativa
                aceite aquele item. Por isso, a regra é: separar certo, manter
                seco/sem resto de comida e seguir a coleta local.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    1) Triângulo de setas (Möbius)
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Pode indicar reciclável/reciclado, mas varia conforme texto e
                    contexto da embalagem.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    2) Código do plástico (1–7)
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Identifica o tipo de resina (PET, PEAD, PP etc.). Ajuda na
                    triagem, mas não garante aceitação local.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    3) Papel, vidro e metal
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Ícones por material normalmente orientam separação, mas itens
                    sujos/contaminados viram rejeito.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    4) Descarte correto
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Alguns símbolos orientam descarte específico (ex.: logística
                    reversa e pontos de coleta).
                  </p>
                </div>
              </div>
            </div>

            {/* Códigos do plástico */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Códigos do plástico (1 a 7) — guia rápido
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Use como orientação de material. O que entra na coleta depende da
                triagem local e da condição (limpo, seco, sem contaminação).
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">1 — PET</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Garrafas de bebidas e algumas embalagens. Geralmente aceito.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    2 — PEAD (HDPE)
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Frascos rígidos (produtos de limpeza, alguns shampoos).
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    3 — PVC
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Tubos e alguns filmes. Pode ter aceitação mais restrita.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    4 — PEBD (LDPE)
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Sacolas e plásticos flexíveis. Depende bastante da triagem.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">5 — PP</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Potes e tampas. Em muitos locais é aceito quando limpo.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">6 — PS</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Isopor e copos descartáveis. Pode ter aceitação limitada.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                  <p className="text-sm font-semibold text-slate-900">
                    7 — Outros (misturas/compostos)
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Plásticos mistos. Geralmente o mais difícil de reciclar.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Regra de ouro (vale mais que qualquer símbolo)
                </h3>
                <p className="mt-2 text-sm text-slate-700">
                  Se estiver com resto de comida, molhado ou engordurado, o
                  material vira rejeito na triagem. Separe, esvazie e mantenha seco.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/blog/o-que-pode-ser-reciclado"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                  >
                    Ver: o que pode ser reciclado
                  </Link>
                  <Link
                    href="/coleta-seletiva"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Ver: coleta seletiva
                  </Link>
                </div>
              </div>
            </div>

            {/* CTA Profissionais + Anuncie */}
            <ProfissionaisCta />
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
                  Guias práticos →
                </Link>
                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Blog →
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica rápida
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Símbolo ajuda, mas quem decide é a triagem local. Se você
                  quer acertar sempre: seco, sem resto de comida e bem separado.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Próximos passos
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Adicionar FAQ (SEO) com dúvidas comuns sobre símbolos</li>
                <li>Incluir imagens/ícones dos códigos 1–7 (quando quiser)</li>
                <li>Criar links internos para posts por material (plástico, papel, vidro)</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
