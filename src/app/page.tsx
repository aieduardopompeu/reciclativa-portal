import Link from "next/link";
import Image from "next/image";

type Pillar = {
  title: string;
  desc: string;
  href: string;
  badge: string;
};

type Guide = {
  title: string;
  desc: string;
  href: string;
  tag: string;
};

type Post = {
  title: string;
  desc: string;
  href: string;
  meta: string;
};

const PILLARS: Pillar[] = [
  {
    title: "Reciclagem",
    desc: "Aprenda o que pode reciclar, como separar e onde descartar corretamente.",
    href: "/reciclagem",
    badge: "Pilar",
  },
  {
    title: "Sustentabilidade",
    desc: "Hábitos simples para reduzir impacto, consumo consciente e reuso no dia a dia.",
    href: "/sustentabilidade",
    badge: "Pilar",
  },
  {
    title: "Guias práticos",
    desc: "Checklists, passo a passo e respostas rápidas para agir hoje.",
    href: "/guias",
    badge: "Comece aqui",
  },
  {
    title: "Blog",
    desc: "Notícias, tendências e artigos para aprofundar seu conhecimento.",
    href: "/blog",
    badge: "Conteúdo",
  },
];

const GUIDES: Guide[] = [
  {
    title: "Coleta seletiva: como começar",
    desc: "Organize em casa, entenda as categorias e evite erros comuns de separação.",
    href: "/guias/coleta-seletiva",
    tag: "Guia",
  },
  {
    title: "Símbolos da reciclagem (o que significam)",
    desc: "Decodifique os símbolos nas embalagens e descarte com segurança.",
    href: "/simbolos-da-reciclagem",
    tag: "Essencial",
  },
  {
    title: "O que vai (e não vai) na reciclagem",
    desc: "Uma lista prática para reduzir contaminação e aumentar reaproveitamento.",
    href: "/guias/o-que-pode-reciclar",
    tag: "Checklist",
  },
];

const POSTS: Post[] = [
  {
    title: "Como reduzir lixo na rotina (sem radicalizar)",
    desc: "Estratégias simples para diminuir resíduos e economizar ao mesmo tempo.",
    href: "/blog/reduzir-lixo-na-rotina",
    meta: "Leitura: 6 min",
  },
  {
    title: "Economia circular: conceito e exemplos no Brasil",
    desc: "Entenda o modelo e como empresas e cidades estão aplicando na prática.",
    href: "/blog/economia-circular-exemplos",
    meta: "Leitura: 7 min",
  },
  {
    title: "Reciclagem de plástico: erros que atrapalham tudo",
    desc: "Os principais motivos de rejeição e como melhorar a triagem doméstica.",
    href: "/blog/reciclagem-plastico-erros",
    meta: "Leitura: 5 min",
  },
];

function Card({
  title,
  desc,
  href,
  badge,
}: {
  title: string;
  desc: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm transition hover:bg-white hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-950 group-hover:text-emerald-900">
            {title}
          </h3>
          {badge ? (
            <p className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              {badge}
            </p>
          ) : null}
        </div>

        <span className="text-slate-300 transition group-hover:text-emerald-400">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="currentColor"
              d="M10 6l6 6-6 6-1.4-1.4L13.2 12 8.6 7.4 10 6Z"
            />
          </svg>
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-700">{desc}</p>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200">
        {/* background image */}
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/hero.webp"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Reciclativa
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Reciclagem e sustentabilidade, sem complicação.
          </h1>

          <p className="mt-4 max-w-2xl text-base text-slate-700 sm:text-lg">
            Guias práticos, checklists e conteúdo confiável para reduzir impacto,
            reaproveitar recursos e tomar decisões mais conscientes.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/guias"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Ver guias
            </Link>

            <Link
              href="/sustentabilidade"
              className="rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Começar por Sustentabilidade
            </Link>

            <Link
              href="/reciclagem"
              className="rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Começar por Reciclagem
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-4">
              <p className="text-sm font-semibold text-slate-950">
                Objetivo prático
              </p>
              <p className="mt-1 text-sm text-slate-700">
                Menos “teoria” e mais ação: passo a passo para fazer certo.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-4">
              <p className="text-sm font-semibold text-slate-950">
                Foco em SEO e utilidade
              </p>
              <p className="mt-1 text-sm text-slate-700">
                Conteúdo estruturado, links internos e FAQs para rankear.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-4">
              <p className="text-sm font-semibold text-slate-950">
                Diretório e monetização
              </p>
              <p className="mt-1 text-sm text-slate-700">
                Conectar pessoas e empresas com soluções ambientais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Comece pelos pilares
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Estrutura pensada para guiar o usuário e fortalecer a arquitetura
              do site.
            </p>
          </div>

          <Link
            href="/guias"
            className="hidden rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 sm:inline-flex"
          >
            Explorar guias
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <Card
              key={p.href}
              title={p.title}
              desc={p.desc}
              href={p.href}
              badge={p.badge}
            />
          ))}
        </div>
      </section>

      {/* GUIAS EM DESTAQUE */}
      <section className="border-y border-slate-200 bg-emerald-50/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Guias em destaque
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Páginas pilar para rankear e resolver dúvidas recorrentes.
              </p>
            </div>

            <Link
              href="/guias"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Ver todos
            </Link>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {GUIDES.map((g) => (
              <Card
                key={g.href}
                title={g.title}
                desc={g.desc}
                href={g.href}
                badge={g.tag}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ÚLTIMOS ARTIGOS */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">Últimos artigos</h2>
            <p className="mt-2 text-sm text-slate-700">
              Conteúdo recente para manter o site vivo e aumentar alcance.
            </p>
          </div>

          <Link
            href="/blog"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Ir para o Blog
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {POSTS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm transition hover:bg-white hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-semibold text-slate-950 group-hover:text-emerald-900">
                  {p.title}
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {p.meta}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-700">{p.desc}</p>
              <p className="mt-4 text-sm font-semibold text-emerald-700">
                Ler artigo →
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-4 text-xs text-slate-500">
          (Placeholder) Depois plugamos com MDX/CMS sem mudar o layout.
        </p>
      </section>

      {/* DIRETÓRIO + ANUNCIE (Monetização) */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-emerald-50/50 p-7">
              <h2 className="text-xl font-bold text-slate-950">
                Diretório de soluções ambientais
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Encontre (e divulgue) empresas, cooperativas, serviços e
                iniciativas por tema e região.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/diretorio"
                  className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  Acessar diretório
                </Link>
                <Link
                  href="/diretorio/cadastrar"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Cadastrar empresa
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/70 p-7">
              <h2 className="text-xl font-bold text-slate-950">
                Anuncie na Reciclativa
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Espaços para marcas e projetos alinhados com reciclagem,
                sustentabilidade e impacto positivo.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• Banners em guias e artigos (alto intent)</li>
                <li>• Publieditorial (com transparência)</li>
                <li>• Destaque no diretório</li>
              </ul>
              <div className="mt-5">
                <Link
                  href="/anuncie"
                  className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Ver mídia kit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ curto (SEO) */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-950">
          Perguntas frequentes
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          Respostas rápidas para dúvidas comuns (ótimo para SEO).
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6">
            <h3 className="text-base font-semibold text-slate-950">
              O que não pode ir para a reciclagem?
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              Itens sujos, contaminados ou misturados podem inviabilizar a
              triagem. Use nossos checklists para evitar erro.
            </p>
            <Link
              href="/guias/o-que-pode-reciclar"
              className="mt-4 inline-block text-sm font-semibold text-emerald-700"
            >
              Ver checklist →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6">
            <h3 className="text-base font-semibold text-slate-950">
              Precisa lavar embalagens?
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              O ideal é remover excesso de resíduos para reduzir mau cheiro e
              contaminação (não precisa “brilhar”).
            </p>
            <Link
              href="/guias/coleta-seletiva"
              className="mt-4 inline-block text-sm font-semibold text-emerald-700"
            >
              Como separar →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6">
            <h3 className="text-base font-semibold text-slate-950">
              Como entender símbolos da reciclagem?
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              Símbolos indicam tipo de material e orientação de descarte. A
              Reciclativa explica de forma prática.
            </p>
            <Link
              href="/simbolos-da-reciclagem"
              className="mt-4 inline-block text-sm font-semibold text-emerald-700"
            >
              Ver símbolos →
            </Link>
          </div>
        </div>
      </section>

      {/* Rodapé de links internos */}
      <section className="border-t border-slate-200 bg-emerald-50/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Atalhos:</span>
            <Link href="/reciclagem" className="hover:text-emerald-700">
              Reciclagem
            </Link>
            <Link href="/sustentabilidade" className="hover:text-emerald-700">
              Sustentabilidade
            </Link>
            <Link href="/guias" className="hover:text-emerald-700">
              Guias
            </Link>
            <Link href="/blog" className="hover:text-emerald-700">
              Blog
            </Link>
            <Link href="/diretorio" className="hover:text-emerald-700">
              Diretório
            </Link>
            <Link href="/anuncie" className="hover:text-emerald-700">
              Anuncie
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
