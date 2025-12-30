// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockRenderer } from "../../../components/blog/BlockRenderer";
import {
  BLOG_POSTS,
  BLOG_OG_DEFAULT,
  type BlogPost,
  type BlogBlock,
} from "../../../content/blog/posts";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

type PageProps = {
  params: { slug: string };
};

function toBRDate(iso: string) {
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  const dd = String(d).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${dd}/${mm}/${y}`;
}

function getPostBySlug(slug: string): BlogPost | null {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

/**
 * Ajuda o Next a pré-gerar as páginas do blog e estabiliza build/deploy.
 */
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  const canonical = `/blog/${params.slug}`;

  if (!post) {
    return {
      metadataBase: new URL(SITE_URL),
      title: "Post não encontrado | Reciclativa",
      description: "Este conteúdo não está disponível.",
      alternates: { canonical },
      robots: { index: false, follow: false },
      openGraph: {
        title: "Post não encontrado | Reciclativa",
        description: "Este conteúdo não está disponível.",
        url: canonical,
        type: "article",
        images: [
          {
            url: BLOG_OG_DEFAULT,
            width: 1200,
            height: 630,
            alt: "Reciclativa – Blog",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Post não encontrado | Reciclativa",
        description: "Este conteúdo não está disponível.",
        images: [BLOG_OG_DEFAULT],
      },
    };
  }

  const ogImage = post.ogImage || BLOG_OG_DEFAULT;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${post.title} | Reciclativa`,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) notFound();

  const canonicalAbs = `${SITE_URL}/blog/${post.slug}`;
  const publishedTime = `${post.dateISO}T00:00:00.000Z`;
  const modifiedTime = `${(post.updatedISO || post.dateISO)}T00:00:00.000Z`;

  // JSON-LD Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    mainEntityOfPage: canonicalAbs,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      "@type": "Organization",
      name: "Reciclativa",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Reciclativa",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
    image: [post.ogImage ? `${SITE_URL}${post.ogImage}` : `${SITE_URL}${BLOG_OG_DEFAULT}`],
  };

  // JSON-LD FAQ (SEO) — pega o primeiro bloco "faq"
  const faqBlock = post.blocks.find((b: BlogBlock) => b.type === "faq");
  const faqJsonLd =
    faqBlock && faqBlock.type === "faq"
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqBlock.items.map((qa: { q: string; a: string }) => ({
            "@type": "Question",
            name: qa.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: qa.a,
            },
          })),
        }
      : null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      {/* Breadcrumb */}
      <nav className="text-sm text-slate-600">
        <Link href="/" className="hover:underline">
          Início
        </Link>{" "}
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
      </nav>

      {/* Header */}
      <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            {post.category}
          </span>
          <span className="text-xs text-slate-500">
            {toBRDate(post.dateISO)}
            {post.readMin ? ` • ${post.readMin} min` : ""}
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          {post.title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-slate-700">
          {post.excerpt}
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
      </header>

      {/* Conteúdo */}
      <article className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <BlockRenderer blocks={post.blocks} />
      </article>

      {/* CTA final */}
      <section className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-7">
        <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
          Quer acertar no descarte sem dúvida?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Comece pelo guia prático do que pode ser reciclado — é o atalho para reduzir contaminação
          e aumentar reaproveitamento.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/blog/o-que-pode-ser-reciclado"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver: o que pode ser reciclado
          </Link>
          <Link
            href="/blog/economia-circular-exemplos"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Ver: economia circular
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Voltar ao blog
          </Link>
        </div>
      </section>
    </main>
  );
}
