import type { Metadata } from "next";
import Link from "next/link";
import AdCtaCard from "@/components/AdCtaCard";
import ProfissionaisCta from "@/components/ctas/ProfissionaisCta";

export const metadata: Metadata = {
  title: "Compostagem: guia prático para começar | Reciclativa",
  description:
    "Aprenda compostagem do zero: o que pode e não pode, passo a passo, métodos (composteira, minhocário, leira), e soluções para cheiro, mosquitos e umidade.",
  alternates: { canonical: "/guias/compostagem" },
  openGraph: {
    title: "Compostagem: guia prático para começar | Reciclativa",
    description:
      "Guia completo de compostagem: materiais permitidos, métodos, passo a passo e como evitar erros comuns.",
    url: "/guias/compostagem",
    type: "article",
  },
};

const DO_PODE = [
  "Cascas e restos de frutas e legumes (sem excesso de líquido)",
  "Borra e filtro de café, saquinhos de chá (sem grampos/metal)",
  "Cascas de ovo (lavadas e trituradas, em pequenas quantidades)",
  "Folhas secas, grama seca, serragem/cepilho de madeira não tratada",
  "Guardanapo/papel-toalha sem gordura em excesso (pequenas quantidades)",
  "Papelão e papel sem tinta pesada (picado, como “marrom”)",
];

const NAO_PODE = [
  "Carne, peixe, ossos e gordura (atraem pragas e geram odor)",
  "Laticínios (cheiro e vetores)",
  "Comida cozida muito temperada/oleosa (aumenta risco de pragas)",
  "Fezes de animais, areia de gato e fraldas (risco sanitário)",
  "Madeira tratada, carvão, cinzas em excesso (alteram pH/contaminam)",
  "Plásticos, metais, vidro e qualquer material “reciclável seco”",
];

const SOLUCOES_RAPIDAS = [
  {
    title: "Tá com cheiro forte",
    text: "Normalmente é excesso de “úmido” (verdes) e pouca aeração. Adicione material seco (folhas, papelão picado), misture e garanta ventilação.",
  },
  {
    title: "Apareceram mosquitinhos",
    text: "Cubra os resíduos frescos com uma camada de “marrom” (folhas secas/papelão), evite fruta exposta e mantenha a tampa/tecido bem ajustados.",
  },
  {
    title: "Tá muito molhado (chorume)",
    text: "Aumente o “marrom”, reduza restos muito aguados e melhore drenagem. Se for composteira com torneira, use o líquido diluído (quando aplicável) e com cautela.",
  },
  {
    title: "Tá seco e não decompõe",
    text: "Falta umidade e “verdes”. Adicione restos vegetais, borrifando um pouco de água (textura de “esponja úmida”) e misture.",
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
            Guias Reciclativa
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Compostagem: guia prático para começar em casa
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Aprenda o básico do jeito certo: o que pode e não pode, métodos (composteira,
            minhocário e leira), passo a passo e soluções para os problemas mais comuns.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/guias"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Ver guias
            </Link>
            <Link
              href="/sustentabilidade"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Sustentabilidade →
            </Link>
            <Link
              href="/residuos-solidos"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Tipos de resíduos →
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
                <Link href="/guias" className="hover:underline">
                  Guias
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-700">Compostagem</span>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Conteúdo principal */}
          <article className="space-y-6 lg:col-span-2">
            {/* Visão rápida */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Guia</Badge>
                <Badge>Orgânicos</Badge>
                <Badge>Passo a passo</Badge>
              </div>

              <h2 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900">
                O que é compostagem (e por que vale a pena)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Compostagem é o processo de transformar resíduos orgânicos (restos de alimentos e
                materiais naturais) em um composto rico, útil para plantas e jardinagem. Na prática,
                ela reduz a quantidade de lixo enviado a aterros, diminui mau cheiro na lixeira e
                fecha um ciclo simples: o que vem da natureza volta para a natureza.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Menos lixo</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Reduz volume de orgânicos no dia a dia.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Menos odor</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Lixeira com menos “molhado” e fermentação.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Mais recurso</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Gera composto para vasos, horta e jardim.
                  </p>
                </div>
              </div>
            </div>

            {/* O que pode / não pode */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                O que pode e o que não pode
              </h2>
              <p className="mt-3 text-sm text-slate-700">
                A regra de ouro é equilibrar <strong>“verdes”</strong> (úmidos, ricos em nitrogênio)
                com <strong>“marrons”</strong> (secos, ricos em carbono). Isso evita cheiro e pragas.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
                  <p className="text-sm font-semibold text-emerald-950">Pode</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-emerald-950/90">
                    {DO_PODE.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5">
                  <p className="text-sm font-semibold text-rose-950">Não pode</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-rose-950/90">
                    {NAO_PODE.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">Dica rápida</p>
                <p className="mt-2 text-sm text-slate-700">
                  Para cada porção de resíduos “verdes”, cubra com uma camada de “marrom”
                  (folhas secas/papelão picado). Isso reduz mosquitos e cheiro.
                </p>
              </div>
            </div>

            {/* Métodos */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Métodos comuns (qual escolher)
              </h2>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">
                    1) Composteira doméstica (baldes/caixas)
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Boa para apartamentos e casas pequenas. Controle fácil de camadas “verdes” e “marrons”.
                    Exige atenção a umidade e ventilação.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">2) Minhocário</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Ideal para quem quer aceleração do processo com minhocas. Requer cuidados com temperatura,
                    alimentação e evitar itens proibidos.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">3) Leira/compostagem no solo</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Melhor para quintal e maior volume. Mais simples, mas precisa proteger contra chuva excessiva
                    e animais.
                  </p>
                </div>
              </div>
            </div>

            {/* Passo a passo */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Comece em 30 minutos (passo a passo)
              </h2>

              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>
                  Separe um recipiente com ventilação (ou composteira) e um espaço para guardar “marrons”
                  (folhas secas/papelão).
                </li>
                <li>
                  Faça uma base de “marrom” (2–5 cm) para absorver umidade e evitar cheiro.
                </li>
                <li>
                  Adicione resíduos orgânicos (“verdes”) em camada fina.
                </li>
                <li>
                  Cubra totalmente com “marrom” (regra de ouro).
                </li>
                <li>
                  Repita camadas e misture levemente 1–2x por semana (ou conforme método).
                </li>
                <li>
                  Mantenha a umidade de “esponja úmida”: nem encharcado, nem seco.
                </li>
              </ol>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/sustentabilidade"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Voltar para Sustentabilidade →
                </Link>
                <Link
                  href="/residuos-solidos"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Entender resíduos sólidos →
                </Link>
              </div>
            </div>

            {/* Soluções rápidas */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Problemas comuns e soluções rápidas
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SOLUCOES_RAPIDAS.map((s) => (
                  <div key={s.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                    <p className="mt-2 text-sm text-slate-700">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Composto pronto */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Quando o composto está pronto (e como usar)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Em geral, o composto pronto tem cheiro de terra, aparência escura e textura homogênea
                (sem muitos pedaços reconhecíveis). Você pode usar em vasos e canteiros misturando ao solo.
                Se tiver dúvidas, use aos poucos e observe as plantas.
              </p>
            </div>

            {/* FAQ */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Perguntas frequentes
              </h2>

              <div className="mt-4 space-y-4 text-sm text-slate-700">
                <div>
                  <p className="font-semibold text-slate-900">Compostagem atrai ratos?</p>
                  <p className="mt-1">
                    O risco aumenta quando entram itens proibidos (carne, gordura, laticínios) ou quando
                    resíduos ficam expostos. Cobrir com “marrom” e usar recipiente bem fechado reduz muito o problema.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">Precisa “lavar” os restos?</p>
                  <p className="mt-1">
                    Não. Basta evitar excesso de líquido e cobrir com material seco. Para evitar odor, o equilíbrio
                    e a cobertura são mais importantes do que lavar.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">Quanto tempo demora?</p>
                  <p className="mt-1">
                    Depende do método, mistura e clima. Com controle de camadas e aeração, pode levar semanas a poucos meses.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">Casca de ovo pode?</p>
                  <p className="mt-1">
                    Pode, em pouca quantidade e preferencialmente triturada. Evite excesso para não alterar demais o equilíbrio.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900">E o que é “rejeito” nesse contexto?</p>
                  <p className="mt-1">
                    Tudo o que não pode ser compostado nem reciclado (ou está contaminado). Veja também{" "}
                    <Link href="/residuos-solidos" className="font-semibold text-emerald-800 hover:underline">
                      Resíduos Sólidos
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <ProfissionaisCta />
            <AdCtaCard />
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-emerald-50/50 p-6">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Checklist rápido
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Tenha um “estoque” de marrons (folhas secas/papelão) sempre pronto.</li>
                <li>Cubra restos frescos com marrons para evitar mosquitos.</li>
                <li>Se cheirar, é quase sempre falta de marrom/aeração.</li>
                <li>Umidade ideal: textura de esponja úmida.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                Links úteis
              </h3>
              <div className="mt-4 space-y-3">
                <Link
                  href="/sustentabilidade"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Sustentabilidade →
                </Link>
                <Link
                  href="/residuos-solidos"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Resíduos sólidos →
                </Link>
                <Link
                  href="/guias/coleta-seletiva"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Coleta seletiva →
                </Link>
                <Link
                  href="/diretorio"
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Diretório →
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Dica editorial
                </p>
                <p className="mt-2 text-sm text-slate-800">
                  Compostagem é “orgânicos”. Reciclagem é “secos”. Misturar os dois aumenta rejeito.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
