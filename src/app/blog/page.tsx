// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Reciclativa",
  description:
    "Conteúdos práticos sobre reciclagem, sustentabilidade e economia circular. Guias diretos para separar resíduos, evitar contaminação e aumentar o impacto no dia a dia.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Reciclativa",
    description:
      "Conteúdos práticos sobre reciclagem, sustentabilidade e economia circular.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/og/blog-default.webp",
        width: 1200,
        height: 630,
        alt: "Reciclativa — Blog",
      },
    ],
  },
};

type CategoryUI = "Reciclagem" | "Sustentabilidade" | "Guias" | "Economia circular";

type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategoryUI;
  dateISO: string; // YYYY-MM-DD
  readMin: number;
};

const POSTS: PostCard[] = [
  {
    slug: "o-que-e-reciclagem",
    title: "O que é reciclagem: conceito, etapas e por que isso muda tudo",
    excerpt:
      "Reciclagem não é “jogar no reciclável”. Veja o que acontece depois da coleta e como separar sem contaminar.",
    category: "Reciclagem",
    dateISO: "2025-12-01",
    readMin: 7,
  },
  {
    slug: "o-que-pode-ser-reciclado",
    title: "O que pode ser reciclado: guia rápido para acertar no descarte",
    excerpt:
      "Um mapa simples por material e o que costuma dar errado na separação.",
    category: "Guias",
    dateISO: "2025-12-02",
    readMin: 8,
  },
  {
    slug: "tipos-de-reciclagem",
    title: "Tipos de reciclagem: mecânica, química, energética e orgânica",
    excerpt:
      "Mecânica, química, energética e orgânica: diferenças e exemplos práticos.",
    category: "Reciclagem",
    dateISO: "2025-12-03",
    readMin: 7,
  },
  {
    slug: "coleta-seletiva-no-brasil",
    title: "Coleta seletiva no Brasil: como funciona e como participar",
    excerpt:
      "Separação correta, ecopontos, cooperativas e alternativas quando não há coleta no seu bairro.",
    category: "Guias",
    dateISO: "2025-12-04",
    readMin: 8,
  },
  {
    slug: "cores-da-coleta-seletiva",
    title: "Cores da coleta seletiva: padrão, variações e como não errar",
    excerpt:
      "Guia direto das cores e o que vai em cada categoria para você não errar na separação.",
    category: "Guias",
    dateISO: "2025-12-05",
    readMin: 6,
  },
  {
    slug: "economia-circular-e-linear",
    title: "Economia circular vs. economia linear: diferenças e exemplos",
    excerpt:
      "O que muda entre linear e circular e como isso aparece no consumo e no descarte.",
    category: "Economia circular",
    dateISO: "2025-12-06",
    readMin: 8,
  },
  {
    slug: "lixo-eletronico-descarte",
    title: "Lixo eletrônico: como descartar corretamente sem poluir",
    excerpt:
      "Onde descartar e-lixo e como evitar contaminação por metais pesados e componentes perigosos.",
    category: "Sustentabilidade",
    dateISO: "2025-12-07",
    readMin: 7,
  },
  {
    slug: "reciclagem-plastico",
    title: "Reciclagem de plástico: tipos, símbolos e como separar…",
    excerpt:
      "PET, PEAD, PP e outros: o que costuma ser aceito e o que dá problema na triagem.",
    category: "Reciclagem",
    dateISO: "2025-12-08",
    readMin: 9,
  },
  {
    slug: "reduzir-lixo-na-rotina",
    title: "Como reduzir lixo na rotina: 12 hábitos simples que funcionam",
    excerpt:
      "Um plano realista para reduzir rejeito: compras, reuso, separação e hábitos do dia a dia.",
    category: "Sustentabilidade",
    dateISO: "2025-12-09",
    readMin: 7,
  },
  {
    slug: "economia-circular-exemplos",
    title: "Economia circular no Brasil: exemplos práticos e como aplicar",
    excerpt:
      "Circularidade na prática: o que já funciona, onde falha e como aplicar.",
    category: "Economia circular",
    dateISO: "2025-12-10",
    readMin: 8,
  },
];

const CATEGORY_ORDER: CategoryUI[] = [
  "Economia circular",
  "Guias",
  "Reciclagem",
  "Sustentabilidade",
];

function toBRDate(iso: string) {
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

function uniqueCategories(posts: PostCard[]) {
  const set = new Set<CategoryUI>();
  posts.forEach((p) => set.add(p.category));
  return CATEGORY_ORDER.filter((c) => set.has(c));
}

type SearchParams = Record<string, string | string[] | undefined>;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const rawTag = sp?.tag;
  const tagValue = Array.isArray(rawTag) ? rawTag[0] : rawTag;
  const tagParam = (tagValue ?? "").toString().trim();

  // ✅ estava faltando no seu arquivo
  const categories = uniqueCategories(POSTS);

  const activeTag = categories.includes(tagParam as CategoryUI)
    ? (tagParam as CategoryUI)
    : null;

  const filtered = activeTag ? POSTS.filter((p) => p.category === activeTag) : POSTS;

  const postsSorted = [...filtered].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));

  // "Comece aqui" (3 cards)
  const startCards = [
    POSTS.find((p) => p.slug === "o-que-e-reciclagem"),
    POSTS.find((p) => p.slug === "o-que-pode-ser-reciclado"),
    POSTS.find((p) => p.slug === "economia-circular-exemplos"),
  ].filter(Boolean) as PostCard[];

  // "Mais lidos" (você pode ajustar depois)
  const mostRead = [
    POSTS.find((p) => p.slug === "o-que-pode-ser-reciclado"),
    POSTS.find((p) => p.slug === "o-que-e-reciclagem"),
    POSTS.find((p) => p.slug === "economia-circular-exemplos"),
  ].filter(Boolean) as PostCard[];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <header className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="text-xs font-extrabold tracking-wide text-emerald-700">
          RECICLATIVA • BLOG
        </div>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
          Blog da Reciclativa
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
          Conteúdos práticos sobre reciclagem, sustentabilidade e economia
          circular. Guias diretos para separar resíduos, evitar contaminação e
          aumentar o impacto no dia a dia.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/guias"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver guias
          </Link>
          <Link
            href="/reciclagem"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Página pilar: Reciclagem
          </Link>
        </div>

        {/* CHIPS */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Link
            href="/blog"
            className={`rounded-full px-3 py-1 text-sm font-semibold ring-1 ${
              !activeTag
                ? "bg-emerald-600 text-white ring-emerald-600"
                : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            Todos
          </Link>

          {categories.map((c: CategoryUI) => (
            <Link
              key={c}
              href={`/blog?tag=${encodeURIComponent(c)}`}
              className={`rounded-full px-3 py-1 text-sm font-semibold ring-1 ${
                activeTag === c
                  ? "bg-emerald-600 text-white ring-emerald-600"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {c}
            </Link>
          ))}

          <div className="ml-auto text-sm text-slate-500">
            {postsSorted.length} artigos
          </div>
        </div>
      </header>

      {/* 2 COLUNAS (conteúdo + sidebar) */}
      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* COLUNA PRINCIPAL */}
        <div className="lg:col-span-2 space-y-6">
          {/* COMEÇE AQUI */}
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                  Comece aqui
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Uma trilha curta para entender o básico e separar corretamente.
                </p>
              </div>
              <Link
                href="/blog"
                className="text-sm font-semibold text-emerald-700 hover:underline"
              >
                Começar →
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              {startCards.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="rounded-2xl border border-slate-200 p-4 hover:bg-slate-50"
                >
                  <div className="text-xs font-semibold text-emerald-700">
                    {p.category}
                  </div>
                  <div className="mt-2 line-clamp-2 text-base font-extrabold tracking-tight text-slate-900">
                    {p.title}
                  </div>
                  <div className="mt-2 line-clamp-3 text-sm text-slate-700">
                    {p.excerpt}
                  </div>
                  <div className="mt-4 text-xs text-slate-500">
                    {toBRDate(p.dateISO)} • {p.readMin} min
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ÚLTIMOS ARTIGOS */}
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                  Últimos artigos
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Conteúdos objetivos, organizados para virar hábito.
                </p>
              </div>
              <div className="text-sm text-slate-500">
                {postsSorted.length} artigos
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {postsSorted.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="rounded-2xl border border-slate-200 p-5 hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      {p.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {toBRDate(p.dateISO)} • {p.readMin} min
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-extrabold tracking-tight text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>

            {/* CTA inferior */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-extrabold text-slate-900">
                Quer acertar no descarte sem dúvida?
              </h3>
              <p className="mt-1 text-sm text-slate-700">
                Comece pelo guia prático do que pode ser reciclado — é o atalho
                para reduzir contaminação.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/blog/o-que-pode-ser-reciclado"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Ver: o que pode ser reciclado
                </Link>
                <Link
                  href="/blog/o-que-e-reciclagem"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Ver: o que é reciclagem
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          {/* PILARES E ATALHOS */}
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
              Pilares e atalhos
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Navegação rápida para reforçar SEO interno e facilitar a jornada.
            </p>

            <div className="mt-5 space-y-3">
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
              <div className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-500">
                Diretório (em breve) →
              </div>
            </div>

            <p className="mt-5 text-xs text-slate-500">
              Dica editorial: cada post deve linkar 3–6 conteúdos relacionados e
              1 página pilar.
            </p>
          </section>

          {/* MAIS LIDOS */}
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
              Mais lidos
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Os conteúdos que resolvem as dúvidas mais comuns.
            </p>

            <div className="mt-5 space-y-3">
              {mostRead.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 hover:bg-slate-50"
                >
                  <div className="text-xs font-semibold text-emerald-700">
                    {p.category}
                  </div>
                  <div className="mt-2 text-sm font-extrabold text-slate-900">
                    {p.title}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* QUER ANUNCIAR */}
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
              Quer anunciar?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Soluções sustentáveis, coleta, reciclagem, educação ambiental e
              produtos eco.
            </p>
            <Link
              href="/anuncie"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Ver mídia kit →
            </Link>
          </section>
        </aside>
      </section>
    </main>
  );
}
