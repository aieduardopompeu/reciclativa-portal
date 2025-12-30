// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Reciclativa",
  description:
    "Atualizações, tendências e conteúdos práticos sobre reciclagem, sustentabilidade, coleta seletiva e economia circular.",
};

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

function formatDateBR(iso: string) {
  // evita Intl em edge cases e mantém simples
  const [y, m, d] = iso.split("-").map(Number);
  const dd = String(d).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${dd}/${mm}/${y}`;
}

function categoryBadgeClass(category: Category) {
  switch (category) {
    case "Reciclagem":
      return "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20";
    case "Sustentabilidade":
      return "bg-sky-500/10 text-sky-300 ring-sky-500/20";
    case "Guias":
      return "bg-violet-500/10 text-violet-300 ring-violet-500/20";
    case "Economia circular":
      return "bg-amber-500/10 text-amber-300 ring-amber-500/20";
  }
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.06]">
      <div className="flex items-center gap-2">
        <span
          className={[
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
            categoryBadgeClass(post.category),
          ].join(" ")}
        >
          {post.category}
        </span>
        <span className="text-xs text-slate-400">
          {formatDateBR(post.dateISO)}
          {post.readingTime ? ` • ${post.readingTime}` : ""}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
        <Link className="outline-none focus:ring-2 focus:ring-emerald-400/40" href={`/blog/${post.slug}`}>
          <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
            {post.title}
          </span>
        </Link>
      </h3>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300">
        {post.excerpt}
      </p>

      <div className="mt-4">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
        >
          Ler artigo
          <span aria-hidden className="transition group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

function FeaturedCard({ post }: { post: Post }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={[
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
            categoryBadgeClass(post.category),
          ].join(" ")}
        >
          {post.category}
        </span>
        <span className="text-xs text-slate-400">
          {formatDateBR(post.dateISO)}
          {post.readingTime ? ` • ${post.readingTime}` : ""}
        </span>
      </div>

      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
        <Link className="outline-none focus:ring-2 focus:ring-emerald-400/40" href={`/blog/${post.slug}`}>
          <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
            {post.title}
          </span>
        </Link>
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-slate-300">
        {post.excerpt}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
        >
          Ler agora
        </Link>
        <Link
          href="/guias"
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.06]"
        >
          Ver guias
        </Link>
      </div>
    </article>
  );
}

export default function Page() {
  // escolhas para "Destaques"
  const featuredMain = POSTS[0];
  const featuredSecondary = POSTS.slice(1, 5);

  // "Últimos posts" (ordem por data desc)
  const latest = [...POSTS].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));

  const mostRead = [POSTS[1], POSTS[3], POSTS[5], POSTS[6]].filter(Boolean);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero + Breadcrumb */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 md:p-10">
        <div className="text-sm text-slate-400">
          <Link href="/" className="hover:text-slate-200">
            Home
          </Link>{" "}
          <span className="mx-2">/</span>
          <span className="text-slate-200">Blog</span>
        </div>

        <div className="mt-6">
          <div className="text-xs font-semibold tracking-[0.2em] text-emerald-300/90">
            RECICLATIVA • BLOG
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Blog Reciclativa: reciclagem, sustentabilidade e guias práticos
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            Atualizações, tendências e conteúdos complementares para você separar resíduos com
            segurança, evitar contaminação e entender o que realmente muda o impacto no dia a dia.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/guias"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
            >
              Ver guias
            </Link>
            <Link
              href="/reciclagem"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.06]"
            >
              Página pilar: Reciclagem
            </Link>
          </div>
        </div>
      </div>

      {/* Chips / categorias */}
      <section className="mt-8">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/[0.06]"
              // UI-only por enquanto; você pode transformar em filtro real depois
              aria-label={`Filtrar por ${chip.label}`}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Dica: depois, podemos transformar esses chips em filtro real (sem complicar o código).
        </p>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Coluna principal */}
        <div className="min-w-0">
          {/* Destaques */}
          <section>
            <div className="flex items-end justify-between gap-3">
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Destaques
              </h2>
              <span className="text-sm text-slate-400">{POSTS.length} artigos</span>
            </div>

            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <FeaturedCard post={featuredMain} />

              <div className="grid gap-4 sm:grid-cols-2">
                {featuredSecondary.map((post) => (
                  <article
                    key={post.slug}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
                          categoryBadgeClass(post.category),
                        ].join(" ")}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {formatDateBR(post.dateISO)}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-semibold text-white">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="outline-none focus:ring-2 focus:ring-emerald-400/40"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm text-slate-300">
                      {post.excerpt}
                    </p>

                    <div className="mt-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                      >
                        Ler →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Últimos posts */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Últimos artigos
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Conteúdos novos e atualizações para aprofundar seu entendimento e evitar erros comuns.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Placeholder “Carregar mais” (sem paginação agora) */}
            <div className="mt-6">
              <button
                type="button"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-white hover:bg-white/[0.06]"
                aria-label="Carregar mais artigos (em breve)"
              >
                Carregar mais (em breve)
              </button>
            </div>
          </section>

          {/* Trilhas */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Trilhas recomendadas
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Leituras em sequência para aprender rápido, com clareza e sem ruído.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-base font-semibold text-white">Começando do zero</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link className="text-emerald-300 hover:text-emerald-200" href="/reciclagem">
                      Página pilar: Reciclagem →
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-200 hover:text-white" href="/blog/o-que-e-reciclagem">
                      O que é reciclagem
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-200 hover:text-white" href="/blog/o-que-pode-ser-reciclado">
                      O que pode ser reciclado
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-base font-semibold text-white">Materiais e símbolos</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link className="text-slate-200 hover:text-white" href="/blog/reciclagem-plastico">
                      Reciclagem de plástico
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-200 hover:text-white" href="/blog/tipos-de-reciclagem">
                      Tipos de reciclagem
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-200 hover:text-white" href="/blog/cores-da-coleta-seletiva">
                      Cores da coleta seletiva
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-base font-semibold text-white">Coleta seletiva na prática</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link className="text-slate-200 hover:text-white" href="/blog/coleta-seletiva-no-brasil">
                      Como funciona a coleta seletiva
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-200 hover:text-white" href="/blog/lixo-eletronico-descarte">
                      Lixo eletrônico: descarte correto
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-200 hover:text-white" href="/blog/reduzir-lixo-na-rotina">
                      Reduzir lixo na rotina
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Dúvidas rápidas
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-base font-semibold text-white">
                  Precisa lavar embalagens para reciclar?
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Na maioria dos casos, basta remover excesso de alimento e reduzir odores/contaminação.
                  Isso aumenta a chance de aproveitamento do material.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-base font-semibold text-white">
                  Papel engordurado é reciclável?
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Geralmente não. Gordura contamina fibras e dificulta o processo. Prefira descarte
                  orgânico quando aplicável (ou rejeito, dependendo do caso).
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-base font-semibold text-white">
                  Posso misturar vidro e metal na mesma sacola?
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  O ideal é separar. Vidro quebrado pode ferir quem faz a triagem e contaminar outros
                  materiais. Embale com segurança.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-base font-semibold text-white">
                  Quando não existe coleta seletiva, o que fazer?
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Busque ecopontos, cooperativas ou pontos de entrega voluntária (PEVs). Em muitos
                  bairros, mercados e shoppings recebem itens específicos.
                </p>
              </div>
            </div>
          </section>

          {/* CTA final */}
          <section className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Quer aprender reciclagem do jeito certo?
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              Comece pela página pilar e depois avance pelos guias. É o caminho mais rápido para
              separar corretamente e evitar contaminação.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/reciclagem"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
              >
                Página pilar: Reciclagem
              </Link>
              <Link
                href="/guias"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.06]"
              >
                Ver todos os guias
              </Link>
            </div>
          </section>
        </div>

        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-semibold text-white">Links úteis</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link className="text-emerald-300 hover:text-emerald-200" href="/reciclagem">
                    Página pilar: Reciclagem →
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-200 hover:text-white" href="/guias">
                    Guias práticos
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-200 hover:text-white" href="/sustentabilidade">
                    Sustentabilidade
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-semibold text-white">Mais lidos</h3>
              <ul className="mt-3 space-y-3 text-sm">
                {mostRead.map((p) => (
                  <li key={p.slug} className="flex flex-col">
                    <Link className="text-slate-200 hover:text-white" href={`/blog/${p.slug}`}>
                      {p.title}
                    </Link>
                    <span className="mt-1 text-xs text-slate-400">
                      {p.category} • {formatDateBR(p.dateISO)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-semibold text-white">Categorias</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {CATEGORY_CHIPS.filter((c) => c.value !== "all").map((c) => (
                  <span
                    key={c.label}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs font-semibold text-slate-200"
                  >
                    {c.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
