// src/app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reciclativa | Reciclagem, Sustentabilidade e Meio Ambiente no Brasil",
  description:
    "Conteúdos confiáveis sobre reciclagem, descarte correto de resíduos, coleta seletiva e práticas sustentáveis para pessoas, escolas e empresas.",
  keywords: [
    "reciclagem",
    "sustentabilidade",
    "meio ambiente",
    "coleta seletiva",
    "economia circular",
    "resíduos sólidos",
    "educação ambiental",
    "símbolos da reciclagem",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Reciclativa | Reciclagem e Sustentabilidade no Brasil",
    description:
      "Aprenda a reciclar corretamente, entenda os símbolos da reciclagem e descubra boas práticas ambientais para o dia a dia.",
    url: "/",
    siteName: "Reciclativa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reciclativa | Reciclagem e Sustentabilidade",
    description:
      "Conteúdos confiáveis sobre reciclagem, descarte correto e sustentabilidade.",
  },
};

type Card = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

const CATEGORIES: Card[] = [
  {
    title: "Reciclagem",
    description: "Aprenda como separar e reciclar corretamente.",
    href: "/reciclagem",
    icon: "♻️",
  },
  {
    title: "Sustentabilidade",
    description: "Hábitos práticos e consumo consciente no dia a dia.",
    href: "/sustentabilidade",
    icon: "🌱",
  },
  {
    title: "Meio Ambiente",
    description: "Impactos, soluções e educação ambiental acessível.",
    href: "/meio-ambiente",
    icon: "🌎",
  },
  {
    title: "Economia Circular",
    description: "Reuso, reparo, reciclagem e modelos circulares.",
    href: "/economia-circular",
    icon: "🔁",
  },
  {
    title: "Resíduos Sólidos",
    description: "Tipos de resíduos e descarte correto, sem achismos.",
    href: "/residuos-solidos",
    icon: "🧰",
  },
  {
    title: "Educação Ambiental",
    description: "Conteúdo para escolas, famílias e projetos.",
    href: "/educacao-ambiental",
    icon: "📚",
  },
];

const FEATURED: Array<Omit<Card, "icon"> & { tag?: string }> = [
  {
    title: "O que é reciclagem e por que ela é importante",
    description:
      "Entenda o conceito, benefícios e como começar de forma simples.",
    href: "/blog/o-que-e-reciclagem",
    tag: "Pilar",
  },
  {
    title: "Símbolos da reciclagem: guia completo",
    description:
      "O que significam (de verdade) os símbolos nas embalagens e materiais.",
    href: "/simbolos-da-reciclagem",
    tag: "Guia",
  },
  {
    title: "O que pode e o que não pode ser reciclado",
    description:
      "Lista prática por material, com dicas para evitar contaminação.",
    href: "/blog/o-que-pode-ser-reciclado",
    tag: "Essencial",
  },
  {
    title: "Como funciona a coleta seletiva no Brasil",
    description:
      "Cores, fluxos, logística e como colaborar com eficiência.",
    href: "/blog/coleta-seletiva-no-brasil",
    tag: "Pilar",
  },
];

const QUICK_LEARN: Array<Omit<Card, "description"> & { description: string }> = [
  {
    title: "Tipos de reciclagem",
    description: "Mecânica, química e energética — quando cada uma acontece.",
    href: "/blog/tipos-de-reciclagem",
    icon: "🧪",
  },
  {
    title: "Coleta seletiva: cores e significados",
    description: "Guia rápido das cores e como separar sem erro.",
    href: "/blog/cores-da-coleta-seletiva",
    icon: "🟡",
  },
  {
    title: "Lixo eletrônico: como descartar",
    description: "O que fazer com pilhas, baterias, celulares e cabos.",
    href: "/blog/lixo-eletronico-descarte",
    icon: "🔋",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Section({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-6 space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

function CardLink({
  title,
  description,
  href,
  icon,
  tag,
}: {
  title: string;
  description: string;
  href: string;
  icon?: string;
  tag?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block rounded-2xl border border-slate-800 bg-slate-900/50 p-5",
        "transition hover:border-slate-700 hover:bg-slate-900"
      )}
    >
      <div className="flex items-start gap-3">
        {icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-lg">
            <span aria-hidden>{icon}</span>
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-slate-50 group-hover:text-white">
              {title}
            </h3>
            {tag ? (
              <span className="hidden rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-[11px] font-semibold text-slate-300 sm:inline">
                {tag}
              </span>
            ) : null}
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-slate-300">
            {description}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <span>Ver</span>
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <div className="border-b border-slate-900">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Portal Reciclativa
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-50 sm:text-5xl">
            Reciclagem, Sustentabilidade e Meio Ambiente no Brasil
          </h1>

          <p className="mt-4 max-w-3xl text-sm text-slate-300 sm:text-base">
            Conteúdos confiáveis sobre reciclagem, descarte correto de resíduos e
            práticas sustentáveis para pessoas, escolas e empresas.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/reciclagem"
              className={cn(
                "inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3",
                "text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              )}
            >
              Aprender a Reciclar
            </Link>

            <Link
              href="/simbolos-da-reciclagem"
              className={cn(
                "inline-flex items-center justify-center rounded-xl border border-slate-800 bg-transparent px-5 py-3",
                "text-sm font-semibold text-slate-100 transition hover:border-slate-700 hover:bg-slate-900"
              )}
            >
              Símbolos da Reciclagem
            </Link>
          </div>

          {/* micro KPIs / credibilidade leve (sem prometer coisas) */}
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-900 bg-slate-950 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Foco
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Conteúdo prático, direto ao ponto, sem “textão”.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-900 bg-slate-950 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Objetivo
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Ajudar você a separar, descartar e reciclar do jeito certo.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-900 bg-slate-950 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Navegação
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Páginas pilares e guias para encontrar rápido o que precisa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIAS */}
      <Section
        eyebrow="Comece por aqui"
        title="Categorias principais"
        subtitle="Estrutura pensada para SEO e para você chegar no conteúdo certo com poucos cliques."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <CardLink
              key={c.href}
              title={c.title}
              description={c.description}
              href={c.href}
              icon={c.icon}
            />
          ))}
        </div>
      </Section>

      {/* DESTAQUES */}
      <Section
        eyebrow="Conteúdo essencial"
        title="Destaques editoriais"
        subtitle="Artigos pilares (evergreen) para ranquear bem e ensinar de forma clara."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {FEATURED.map((p) => (
            <CardLink
              key={p.href}
              title={p.title}
              description={p.description}
              href={p.href}
              tag={p.tag}
            />
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-50">
                Quer um caminho rápido?
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Vá direto para os guias e aprenda a separar resíduos sem erro.
              </p>
            </div>
            <Link
              href="/guias"
              className={cn(
                "inline-flex items-center justify-center rounded-xl border border-slate-800 bg-transparent px-5 py-3",
                "text-sm font-semibold text-slate-100 transition hover:border-slate-700 hover:bg-slate-900"
              )}
            >
              Ver guias completos
            </Link>
          </div>
        </div>
      </Section>

      {/* POR QUE */}
      <Section
        eyebrow="Sobre"
        title="Por que a Reciclativa existe"
        subtitle="Autoridade se constrói com clareza, consistência e boa arquitetura de conteúdo."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 lg:col-span-2">
            <p className="text-sm leading-relaxed text-slate-200">
              A Reciclativa é um portal independente dedicado à educação
              ambiental, reciclagem e sustentabilidade. Nosso compromisso é
              organizar informação prática, reduzir dúvidas comuns (como “isso
              recicla?”) e orientar o descarte correto, com foco em boas práticas
              e linguagem acessível.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Clareza
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  Guias práticos e exemplos do dia a dia.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Organização
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  Páginas pilares e links internos consistentes.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Utilidade
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  Respostas rápidas para dúvidas frequentes.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <p className="text-sm font-semibold text-slate-50">
              Páginas que viram referência
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>
                <Link
                  href="/simbolos-da-reciclagem"
                  className="font-semibold text-emerald-400 hover:underline"
                >
                  Símbolos da reciclagem
                </Link>
              </li>
              <li>
                <Link
                  href="/reciclagem"
                  className="font-semibold text-emerald-400 hover:underline"
                >
                  Reciclagem
                </Link>
              </li>
              <li>
                <Link
                  href="/coleta-seletiva"
                  className="font-semibold text-emerald-400 hover:underline"
                >
                  Coleta seletiva
                </Link>
              </li>
              <li>
                <Link
                  href="/residuos-solidos"
                  className="font-semibold text-emerald-400 hover:underline"
                >
                  Resíduos sólidos
                </Link>
              </li>
              <li>
                <Link
                  href="/economia-circular"
                  className="font-semibold text-emerald-400 hover:underline"
                >
                  Economia circular
                </Link>
              </li>
            </ul>

            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Dica
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Separe recicláveis limpos e secos para reduzir contaminação.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* BLOCO EDUCATIVO RÁPIDO */}
      <Section
        eyebrow="Aprenda em minutos"
        title="Atalhos educativos"
        subtitle="Três temas que aumentam engajamento e resolvem dúvidas recorrentes."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {QUICK_LEARN.map((q) => (
            <CardLink
              key={q.href}
              title={q.title}
              description={q.description}
              href={q.href}
              icon={q.icon}
            />
          ))}
        </div>
      </Section>

      {/* CTA FINAL */}
      <div className="border-t border-slate-900">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-bold text-slate-50">
                  Quer aprender a reciclar corretamente no dia a dia?
                </p>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">
                  Acesse os guias e conteúdos essenciais para separar resíduos,
                  entender símbolos e descartar com responsabilidade.
                </p>
              </div>
              <Link
                href="/guias"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3",
                  "text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                )}
              >
                Ver guias completos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: já está OK no seu projeto (não mexi aqui). */}
    </main>
  );
}
