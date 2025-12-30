// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockRenderer } from "../../../components/blog/BlockRenderer";
import { BLOG_POSTS, BLOG_OG_DEFAULT } from "../../../content/blog/posts";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://reciclativa-portal.vercel.app";

type PageProps = {
  params: { slug: string };
};

function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

function toBRDate(iso: string) {
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  const dd = String(d).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${dd}/${mm}/${y}`;
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

  const og = post.ogImage ?? BLOG_OG_DEFAULT;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${post.title} | Reciclativa`,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: `${post.title} | Reciclativa`,
      description: post.description,
      url: canonical,
      type: "article",
      images: [
        {
          url: og,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Reciclativa`,
      description: post.description,
      images: [og],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const og = post.ogImage ?? BLOG_OG_DEFAULT;

  // JSON-LD Article (SEO)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.dateISO,
    dateModified: post.updatedISO ?? post.dateISO,
    mainEntityOfPage: canonicalUrl,
    image: [`${SITE_URL}${og}`],
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
  };

  // JSON-LD FAQ (SEO)
  const faqBlock = post.blocks.find((b) => b.type === "faq");
  const faqJsonLd =
    faqBlock && faqBlock.type === "faq"
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqBlock.items.map((qa) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      {/* Top nav */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link href="/blog" className="text-sm font-semibold text-emerald-700 hover:underline">
          ← Voltar ao blog
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-xs font-semibold tracking-widest text-emerald-700">
          {post.category.toUpperCase()}
        </span>
      </div>

      {/* Header */}
      <header className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          {post.title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-slate-700">{post.excerpt}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700 ring-1 ring-emerald-200">
            {post.category}
          </span>
          <span>Publicado em {toBRDate(post.dateISO)}</span>
          {post.readMin ? <span>• {post.readMin} min</span> : null}
          {post.updatedISO ? <span>• Atualizado em {toBRDate(post.updatedISO)}</span> : null}
        </div>
      </header>

      {/* Body */}
      <article className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <BlockRenderer blocks={post.blocks} />
      </article>

      {/* Bottom CTA */}
      <section className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-7">
        <div className="text-sm font-extrabold tracking-tight text-slate-900">
          Quer acertar no descarte sem dúvida?
        </div>
        <div className="mt-2 text-sm leading-relaxed text-slate-700">
          Comece pelo guia prático do que pode ser reciclado — é o atalho para reduzir contaminação.
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/blog/o-que-pode-ser-reciclado"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver guia: o que pode ser reciclado
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Voltar ao blog
          </Link>
        </div>
      </section>
    </main>
  );
}
