import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "O que pode (e não pode) reciclar | Reciclativa",
  description:
    "Checklist prático por material — papel, plástico, metal, vidro e eletrônicos — para reduzir contaminação e melhorar a triagem no dia a dia.",
  alternates: { canonical: "/guias/o-que-pode-reciclar" },
  openGraph: {
    title: "O que pode (e não pode) reciclar | Reciclativa",
    description:
      "Checklist prático por material para reduzir rejeição na triagem e fazer o descarte do jeito certo.",
    url: "/guias/o-que-pode-reciclar",
    type: "article",
  },
};

const MATERIAIS = [
  {
    title: "Papel e papelão",
    pode: [
      "Caixas, embalagens e jornais limpos e secos",
      "Cadernos, folhas avulsas e envelopes (sem plástico laminado)",
      "Papelão desmontado e achatado (facilita o transporte)",
    ],
    naoPode: [
      "Papel engordurado (caixa de pizza suja, guardanapo usado)",
      "Papel higiênico, fraldas e absorventes",
      "Papel plastificado, metalizado ou com cera",
    ],
  },
  {
    title: "Plástico",
    pode: [
      "Garrafas PET, embalagens de produtos de limpeza e potes rígidos",
      "Sacolas e sacos plásticos limpos (em muitas cidades, à parte)",
      "Tampas e rótulos (idealmente separados do corpo da embalagem)",
    ],
    naoPode: [
      "Plástico sujo de óleo, comida ou produtos químicos",
      "Isopor contaminado ou muito fragmentado (varia por cidade)",
      "Embalagens de agrotóxico sem passar pela logística reversa específica",
    ],
  },
  {
    title: "Metal",
    pode: [
      "Latas de alumínio e aço (bebidas, alimentos)",
      "Tampas metálicas, potes e embalagens de metal limpos",
      "Papel alumínio limpo, amassado em bola",
    ],
    naoPode: [
      "Latas com resto de tinta, óleo ou produtos químicos",
      "Aerossóis pressurizados sem esvaziar completamente",
      "Metal misturado a outros materiais não separáveis (ex: brinquedos complexos)",
    ],
  },
  {
    title: "Vidro",
    pode: [
      "Garrafas, potes e frascos de vidro limpos",
      "Vidros de conserva e embalagens de bebida",
    ],
    naoPode: [
      "Espelhos, vidros de janela e para-brisas (composição diferente)",
      "Lâmpadas e vidro temperado/pirex (exigem descarte específico)",
      "Vidro quebrado sem proteção — embale antes de descartar por segurança",
    ],
  },
  {
    title: "Eletrônicos e pilhas",
    pode: [
      "Celulares, computadores e periféricos em ecopontos ou pontos de coleta",
      "Pilhas e baterias em pontos de coleta específicos (nunca no lixo comum)",
      "Cabos e carregadores em pontos de coleta de e-lixo",
    ],
    naoPode: [
      "Descarte no lixo comum ou na coleta seletiva de secos — eletrônicos têm rota própria",
      "Aparelhos com bateria intacta jogados diretamente no lixo (risco de incêndio)",
    ],
  },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
      {children}
    </span>
  );
}

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
            Guias Reciclativa
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            O que pode (e não pode) reciclar
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Um checklist prático por material para reduzir rejeição na triagem e fazer o
            descarte do jeito certo, sem contaminar o que já foi separado corretamente.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/guias"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Ver todos os guias
            </Link>
            <Link
              href="/reciclagem"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Pilar de Reciclagem →
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
                <Link href="/guias" className="hover:underline">
                  Guias
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">O que pode reciclar</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <article className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Checklist</Badge>
                <Badge>Por material</Badge>
              </div>

              <h2 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900">
                Por que separar certo importa mais do que separar muito
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                A maior causa de rejeição na triagem não é a falta de coleta seletiva — é a
                contaminação: um material reciclável sujo de comida, óleo ou outro resíduo
                acaba inutilizando um lote inteiro. Antes de perguntar &ldquo;isso é reciclável?&rdquo;,
                vale perguntar &ldquo;isso está limpo e seco?&rdquo;. A regra prática é: esvazie, quando
                possível enxágue rapidamente, e deixe secar antes de descartar.
              </p>
            </div>

            {MATERIAIS.map((material) => (
              <div
                key={material.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                  {material.title}
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
                    <p className="text-sm font-semibold text-emerald-950">Geralmente pode</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-emerald-950/90">
                      {material.pode.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5">
                    <p className="text-sm font-semibold text-rose-950">Geralmente não pode</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-rose-950/90">
                      {material.naoPode.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Regras variam por cidade — como confirmar
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Materiais como isopor, laminados e cápsulas de café variam bastante de
                aceitação entre cooperativas e sistemas de coleta municipais. Quando tiver
                dúvida sobre um item específico, confira o site da prefeitura ou da
                cooperativa responsável pela sua região antes de descartar — isso evita que um
                material bem-intencionado contamine o restante da separação.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/guias/coleta-seletiva"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver: Coleta seletiva →
                </Link>
                <Link
                  href="/simbolos-da-reciclagem"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Ver: Símbolos da reciclagem →
                </Link>
              </div>
            </div>

            <ProfissionaisCta />
            <AdCtaCard />
          </article>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-emerald-50/50 p-6">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Dica prática
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Esvazie, retire o excesso e deixe secar. Sem cheiro e sem líquido já resolve a
                maior parte dos problemas de contaminação.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Atalhos</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>
                  <Link className="hover:text-emerald-700" href="/guias/coleta-seletiva">
                    Coleta seletiva: como começar
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-emerald-700" href="/guias/compostagem">
                    Compostagem: guia prático
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-emerald-700" href="/simbolos-da-reciclagem">
                    Símbolos da reciclagem
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-emerald-700" href="/diretorio">
                    Diretório de soluções
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
