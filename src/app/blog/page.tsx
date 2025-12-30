// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

type Category = "Reciclagem" | "Sustentabilidade" | "Guias" | "Economia circular";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  dateISO: string; // YYYY-MM-DD
  readingTime?: string; // ex: "6 min"
};

const POSTS: Post[] = [
  {
    slug: "o-que-e-reciclagem",
    title: "O que é reciclagem: conceito, etapas e por que isso muda tudo",
    excerpt:
      "Entenda como a reciclagem funciona na prática, o que realmente é reciclável e como evitar erros comuns no descarte.",
    category: "Reciclagem",
    dateISO: "2025-12-01",
    readingTime: "6 min",
  },
  {
    slug: "o-que-pode-ser-reciclado",
    title: "O que pode ser reciclado: guia rápido para acertar no descarte",
    excerpt:
      "Uma visão prática do que entra (ou não) na reciclagem e como preparar corretamente cada tipo de resíduo.",
    category: "Guias",
    dateISO: "2025-12-02",
    readingTime: "7 min",
  },
  {
    slug: "tipos-de-reciclagem",
    title: "Tipos de reciclagem: mecânica, química, energética e orgânica",
    excerpt:
      "Conheça os principais tipos de reciclagem e entenda quando cada processo faz mais sentido para diferentes materiais.",
    category: "Reciclagem",
    dateISO: "2025-12-03",
    readingTime: "8 min",
  },
  {
    slug: "coleta-seletiva-no-brasil",
    title: "Coleta seletiva no Brasil: como funciona e como participar",
    excerpt:
      "Do básico ao prático: como separar em casa, o que fazer quando não há coleta na sua rua e como encontrar alternativas.",
    category: "Guias",
    dateISO: "2025-12-04",
    readingTime: "7 min",
  },
  {
    slug: "cores-da-coleta-seletiva",
    title: "Cores da coleta seletiva: padrão, variações e como não errar",
    excerpt:
      "Um mapa mental simples das cores mais usadas e o que fazer quando sua cidade usa um padrão diferente.",
    category: "Guias",
    dateISO: "2025-12-05",
    readingTime: "5 min",
  },
  {
    slug: "economia-circular-e-linear",
    title: "Economia circular vs. economia linear: diferenças e exemplos",
    excerpt:
      "Entenda a lógica do ciclo (reduzir, reutilizar, reciclar) e como isso impacta consumo, empresas e políticas públicas.",
    category: "Economia circular",
    dateISO: "2025-12-06",
    readingTime: "6 min",
  },
  {
    slug: "lixo-eletronico-descarte",
    title: "Lixo eletrônico: como descartar corretamente sem poluir",
    excerpt:
      "O que é e-lixo, riscos ambientais, como separar e onde descartar de forma segura e responsável.",
    category: "Sustentabilidade",
    dateISO: "2025-12-07",
    readingTime: "7 min",
  },
  {
    slug: "reciclagem-plastico",
    title: "Reciclagem de plástico: quais são os tipos e o que muda no processo",
    excerpt:
      "Do PET ao PP: como identificar plásticos, o que facilita a reciclagem e como reduzir contaminação na separação.",
    category: "Reciclagem",
    dateISO: "2025-12-08",
    readingTime: "8 min",
  },
  {
    slug: "reduzir-lixo-na-rotina",
    title: "Como reduzir lixo na rotina: hábitos simples com grande impacto",
    excerpt:
      "Checklist prático para reduzir resíduos no dia a dia — sem radicalismo — e melhorar sua pegada ambiental.",
    category: "Sustentabilidade",
    dateISO: "2025-12-09",
    readingTime: "6 min",
  },
];

const CATEGORY_CHIPS: Array<{ label: string; value: "all" | Category }> = [
  { label: "Todos", value: "all" },
  { label: "Reciclagem", value: "Reciclagem" },
  { label: "Sustentabilidade", value: "Sustentabilidade" },
  { label: "Guias", value: "Guias" },
  { label: "Economia circular", value: "Economia circular" },
];

function isCategory(value: string): value is Category {
  return (
    value === "Reciclagem" ||
    value === "Sustentabilidade" ||
    value === "Guias" ||
    value === "Economia circular"
  );
}

function getActiveCategory(searchParams?: { [key: string]: string | string[] | undefined }) {
  const raw = searchParams?.cat;
  const cat = Array.isArray(raw) ? raw[0] : raw;
  const active: "all" | Category = cat && isCategory(cat) ? cat : "all";
  return active;
}

function categoryMeta(category: "all" | Category) {
  if (category === "all") {
    return {
      title: "Blog | Reciclativa",
      description:
        "Artigos e guias práticos sobre reciclagem, sustentabilidade, coleta seletiva e economia circular.",
      canonicalPath: "/blog",
    };
  }

  const byCat: Record<Category, { title: string; description: string }> = {
    Reciclagem: {
      title: "Blog de Reciclagem | Reciclativa",
      description:
        "Conteúdos práticos sobre reciclagem: o que pode ser reciclado, como separar resíduos e evitar contaminação no descarte.",
    },
    Sustentabilidade: {
      title: "Blog de Sustentabilidade | Reciclativa",
      description:
        "Dicas e conceitos de sustentabilidade para reduzir resíduos, melhorar hábitos e entender impactos ambientais no dia a dia.",
    },
    Guias: {
      title: "Guias Práticos | Blog Reciclativa",
      description:
        "Guias passo a passo sobre reciclagem e descarte correto: coleta seletiva, preparo de materiais e erros comuns.",
    },
    "Economia circular": {
      title: "Economia Circular | Blog Reciclativa",
      description:
        "Artigos sobre economia circular: diferenças para o modelo linear, exemplos e como aplicar reduzir, reutilizar e reciclar.",
    },
  };

  return {
    title: byCat[category].title,
    description: byCat[category].description,
    canonicalPath: `/blog?cat=${encodeURIComponent(category)}`,
  };
}

/**
 * Metadata dinâmica por categoria + canonical dinâmico.
 * Observação: assume que o layout raiz já define metadataBase (URL do site).
 */
export function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}): Metadata {
  const activeCategory = getActiveCategory(searchParams);
  const meta = categoryMeta(activeCategory);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonicalPath,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonicalPath,
      type: "website",
    },
  };
}

function formatDateBR(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

function badgeClass(category: Category) {
  switch (category) {
    case "Reciclagem":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    case "Sustentabilidade":
      return "bg-sky-50 text-sky-700 ring-sky-200";
    case "Guias":
      return "bg-violet-50 text-violet-700 ring-violet-200";
    case "Economia circular":
      return "bg-amber-50 text-amber-800 ring-amber-200";
  }
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {children}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={[
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
            badgeClass(post.category),
          ].join(" ")}
        >
          {post.category}
        </span>
        <span className="text-xs text-slate-500">
          {formatDateBR(post.dateISO)}
          {post.readingTime ? ` • ${post.readingTime}` : ""}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">
        <Link
          className="outline-none hover:underline focus:ring-2 focus:ring-emerald-300"
          href={`/blog/${post.slug}`}
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
        {post.excerpt}
      </p>

      <div className="mt-4">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          Ler artigo <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </article>
  );
}

function FeaturedMain({ post }: { post: Post }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/20">
          {post.category}
        </span>
        <span className="text-xs text-white/70">
          {formatDateBR(post.dateISO)}
          {post.readingTime ? ` • ${post.readingTime}` : ""}
        </span>
      </div>

      <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
        <Link
          href={`/blog/${post.slug}`}
          className="outline-none hover:underline focus:ring-2 focus:ring-emerald-300/40"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-white/80">{post.excerpt}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
        >
          Ler agora
        </Link>
        <Link
          href="/guias"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
        >
          Ver guias
        </Link>
      </div>
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const activeCategory = getActiveCategory(searchParams);

  const baseList =
    activeCategory === "all" ? POSTS : POSTS.filter((p) => p.category === activeCategory);

  const latest = [...baseList].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
  const featuredMain = latest[0] ?? POSTS[0];
  const featuredSecondary = latest.slice(1, 5);

  const mostRead =
    activeCategory === "all"
      ? [POSTS[1], POSTS[3], POSTS[5], POSTS[6]].filter(Boolean)
      : latest.slice(0, 4);

  const chipHref = (value: "all" | Category) =>
    value === "all" ? "/blog" : `/blog?cat=${encodeURIComponent(value)}`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* HERO */}
      <section className="overflow-hidden rounded-3xl bg-slate-950">
        <div className="px-6 py-10 md:px-10 md:py-12">
          <div className="text-sm text-white/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/90">Blog</span>
          </div>

          <div className="mt-6">
            <div className="text-xs font-semibold tracking-[0.22em] text-emerald-300/90">
              RECICLATIVA • BLOG
            </div>

            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Blog Reciclativa: reciclagem, sustentabilidade e guias práticos
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
              Atualizações, tendências e conteúdos complementares para separar resíduos com segurança,
              evitar contaminação e entender o que realmente muda o impacto no dia a dia.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/guias"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
              >
                Ver guias
              </Link>
              <Link
                href="/reciclagem"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Página pilar: Reciclagem
              </Link>
            </div>
          </div>
        </div>

        {/* Destaques */}
        <div className="border-t border-white/10 px-6 py-6 md:px-10">
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-lg font-bold tracking-tight text-white">
              Destaques{activeCategory !== "all" ? `: ${activeCategory}` : ""}
            </h2>
            <span className="text-sm text-white/70">{baseList.length} artigos</span>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <FeaturedMain post={featuredMain} />

            <div className="grid gap-4 sm:grid-cols-2">
              {featuredSecondary.length > 0 ? (
                featuredSecondary.map((post) => (
                  <article
                    key={post.slug}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/10">
                        {post.category}
                      </span>
                      <span className="text-xs text-white/70">{formatDateBR(post.dateISO)}</span>
                    </div>

                    <h3 className="mt-3 text-sm font-semibold text-white">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="outline-none hover:underline focus:ring-2 focus:ring-emerald-300/40"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm text-white/75">{post.excerpt}</p>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/75">
                  Ainda não há artigos suficientes nesta categoria para preencher os destaques.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Chips SSR */}
      <section className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_CHIPS.map((chip) => {
            const isActive = chip.value === activeCategory;
            return (
              <Link
                key={chip.label}
                href={chipHref(chip.value)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition",
                  isActive
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {chip.label}
              </Link>
            );
          })}
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Coluna principal */}
        <div className="min-w-0">
          <section>
            <div className="flex items-end justify-between gap-3">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Últimos artigos{activeCategory !== "all" ? `: ${activeCategory}` : ""}
              </h2>
              <span className="text-sm text-slate-500">{baseList.length} artigos</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Conteúdos novos e atualizações para aprofundar seu entendimento e evitar erros comuns.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                aria-label="Carregar mais artigos (em breve)"
              >
                Carregar mais (em breve)
              </button>
            </div>
          </section>

          {/* Trilhas */}
          <section className="mt-10">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Trilhas recomendadas
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Leituras em sequência para aprender rápido, com clareza e sem ruído.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Card>
                <h3 className="text-base font-semibold text-slate-900">Começando do zero</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link className="text-emerald-700 hover:underline" href="/reciclagem">
                      Página pilar: Reciclagem →
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-700 hover:underline" href="/blog/o-que-e-reciclagem">
                      O que é reciclagem
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-slate-700 hover:underline"
                      href="/blog/o-que-pode-ser-reciclado"
                    >
                      O que pode ser reciclado
                    </Link>
                  </li>
                </ul>
              </Card>

              <Card>
                <h3 className="text-base font-semibold text-slate-900">Materiais e símbolos</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link className="text-slate-700 hover:underline" href="/blog/reciclagem-plastico">
                      Reciclagem de plástico
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-700 hover:underline" href="/blog/tipos-de-reciclagem">
                      Tipos de reciclagem
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-slate-700 hover:underline"
                      href="/blog/cores-da-coleta-seletiva"
                    >
                      Cores da coleta seletiva
                    </Link>
                  </li>
                </ul>
              </Card>

              <Card>
                <h3 className="text-base font-semibold text-slate-900">Coleta seletiva na prática</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link
                      className="text-slate-700 hover:underline"
                      href="/blog/coleta-seletiva-no-brasil"
                    >
                      Como funciona a coleta seletiva
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-slate-700 hover:underline"
                      href="/blog/lixo-eletronico-descarte"
                    >
                      Lixo eletrônico: descarte correto
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-slate-700 hover:underline"
                      href="/blog/reduzir-lixo-na-rotina"
                    >
                      Reduzir lixo na rotina
                    </Link>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-10">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Dúvidas rápidas</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Card>
                <h3 className="text-base font-semibold text-slate-900">
                  Precisa lavar embalagens para reciclar?
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Na maioria dos casos, basta remover excesso de alimento e reduzir contaminação.
                  Isso aumenta a chance de aproveitamento do material.
                </p>
              </Card>

              <Card>
                <h3 className="text-base font-semibold text-slate-900">
                  Papel engordurado é reciclável?
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Geralmente não. Gordura contamina fibras e dificulta o processo. Prefira descarte
                  orgânico quando aplicável (ou rejeito, dependendo do caso).
                </p>
              </Card>

              <Card>
                <h3 className="text-base font-semibold text-slate-900">
                  Posso misturar vidro e metal na mesma sacola?
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  O ideal é separar. Vidro quebrado pode ferir quem faz a triagem e contaminar outros
                  materiais. Embale com segurança.
                </p>
              </Card>

              <Card>
                <h3 className="text-base font-semibold text-slate-900">
                  Quando não existe coleta seletiva, o que fazer?
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Busque ecopontos, cooperativas ou PEVs. Em muitos bairros, mercados e shoppings
                  recebem itens específicos.
                </p>
              </Card>
            </div>
          </section>

          {/* CTA final */}
          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Quer aprender reciclagem do jeito certo?
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Comece pela página pilar e depois avance pelos guias. É o caminho mais rápido para
              separar corretamente e evitar contaminação.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/reciclagem"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Página pilar: Reciclagem
              </Link>
              <Link
                href="/guias"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Ver todos os guias
              </Link>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-4">
            <Card>
              <h2 className="text-sm font-semibold text-slate-900">Links úteis</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link className="text-emerald-700 hover:underline" href="/reciclagem">
                    Página pilar: Reciclagem →
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-700 hover:underline" href="/guias">
                    Guias práticos
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-700 hover:underline" href="/sustentabilidade">
                    Sustentabilidade
                  </Link>
                </li>
              </ul>
            </Card>

            <Card>
              <h2 className="text-sm font-semibold text-slate-900">
                Mais lidos{activeCategory !== "all" ? `: ${activeCategory}` : ""}
              </h2>
              <ul className="mt-3 space-y-3 text-sm">
                {mostRead.length > 0 ? (
                  mostRead.map((p) => (
                    <li key={p.slug} className="flex flex-col">
                      <Link className="text-slate-800 hover:underline" href={`/blog/${p.slug}`}>
                        {p.title}
                      </Link>
                      <span className="mt-1 text-xs text-slate-500">
                        {p.category} • {formatDateBR(p.dateISO)}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-slate-600">Sem artigos nesta categoria.</li>
                )}
              </ul>
            </Card>

            <Card>
              <h2 className="text-sm font-semibold text-slate-900">Categorias</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {CATEGORY_CHIPS.filter((c) => c.value !== "all").map((c) => (
                  <Link
                    key={c.label}
                    href={chipHref(c.value as Category)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </aside>
      </div>
    </main>
  );
}
