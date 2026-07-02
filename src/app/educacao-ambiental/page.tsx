import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "Educação Ambiental | Reciclativa",
  description:
    "Educação ambiental: conceito, práticas e ideias de ação para escola, condomínio e empresa, com foco em hábitos que se sustentam.",
  alternates: { canonical: "/educacao-ambiental" },
  openGraph: {
    title: "Educação Ambiental | Reciclativa",
    description:
      "Conceitos, práticas e ações para formar hábitos sustentáveis e reduzir impacto no dia a dia.",
    url: "/educacao-ambiental",
    type: "article",
    images: [{ url: "/opengraph-image" }],
  },
};

export default function Page() {
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
            Reciclativa
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Educação ambiental: formar hábitos que viram impacto
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Conceitos, práticas e ações simples para reduzir desperdício, melhorar
            a separação e criar cultura de sustentabilidade.
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
                  Educação ambiental
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                Educação ambiental: informação que vira hábito
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Educação ambiental é o processo de formar consciência sobre o impacto das nossas
                escolhas no meio ambiente — e traduzir essa consciência em ações concretas. No
                Brasil, o tema tem inclusive respaldo legal: a Política Nacional de Educação
                Ambiental (Lei nº 9.795/1999) reconhece a educação ambiental como um componente
                essencial da educação, a ser trabalhado em todos os níveis de ensino. Mas o
                conceito vai além da escola: o objetivo é criar hábitos sustentáveis que se
                mantêm no dia a dia, em casa, no trabalho e na comunidade.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Esta página reúne conceitos, práticas e recursos para quem quer entender o tema
                ou aplicar iniciativas de educação ambiental em comunidades, escolas e empresas.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Hábitos e cultura
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Como transformar “consciência” em rotina: separar, reduzir e
                    reusar com consistência.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Ações e projetos
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Ideias para escola, condomínio e empresa: campanhas, metas e
                    boas práticas replicáveis.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Como aplicar em cada ambiente
              </h2>

              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Na escola</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Projetos com resultado visível funcionam melhor do que aula teórica isolada:
                    horta escolar, composteira no pátio, gincana de separação de resíduos e
                    mutirões de coleta de recicláveis criam experiência prática, não só conteúdo.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">No condomínio</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Comunicação visual clara nas lixeiras (cores e exemplos do que entra em cada
                    uma), um canal para dúvidas e parceria com cooperativas locais reduzem o erro
                    de separação mais do que regras escritas sem reforço visual.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Na empresa</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Treinamentos curtos e recorrentes, metas simples de redução de resíduos e
                    pontos de coleta seletiva visíveis no escritório costumam gerar mais adesão do
                    que uma única palestra de lançamento.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Leituras recomendadas
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/reciclagem"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Página pilar: Reciclagem →
                </Link>
                <Link
                  href="/guias/coleta-seletiva"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Coleta seletiva →
                </Link>
                <Link
                  href="/sustentabilidade"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Sustentabilidade →
                </Link>
                <Link
                  href="/blog"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver blog →
                </Link>
              </div>
            </div>

            <ProfissionaisCta />
            <AdCtaCard />
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                FAQ rápido
              </h3>
              <div className="mt-4 space-y-4 text-sm text-slate-700">
                <div>
                  <p className="font-semibold text-slate-900">
                    Educação ambiental é obrigatória nas escolas?
                  </p>
                  <p className="mt-1">
                    A Lei nº 9.795/1999 trata a educação ambiental como componente essencial da
                    educação nacional, a ser trabalhado de forma integrada em todos os níveis de
                    ensino.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    O que funciona melhor: campanha pontual ou rotina?
                  </p>
                  <p className="mt-1">
                    Rotina. Campanhas isoladas geram pico de atenção, mas hábito se forma com
                    repetição, reforço visual e metas simples de acompanhar.
                  </p>
                </div>
              </div>
            </div>

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
                  href="/guias/coleta-seletiva"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Coleta seletiva →
                </Link>
                <Link
                  href="/sustentabilidade"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Sustentabilidade →
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
                  Educação ambiental vira resultado quando tem rotina simples,
                  reforço visual e metas fáceis de acompanhar.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
