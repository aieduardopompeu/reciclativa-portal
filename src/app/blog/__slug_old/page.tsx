import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { SITE } from "@/lib/site";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog";

// Se você usa MDX Remote / next-mdx-remote / contentlayer etc,
// depois plugamos aqui. Por ora, o foco é SEO e indexação.
function renderFallbackContent(raw: string) {
  // remove frontmatter do display de fallback
  const cleaned = raw.replace(/^---[\s\S]*?---\s*/m, "").trim();
  // fallback simples: quebra em parágrafos
  return cleaned
    .split(/\n{2,}/g)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 60); // evita página gigantesca se tiver markup
}

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  const url = `${SITE.domain}/blog/${post.slug}`;
  const title = post.frontMatter.title || "Blog";
  const description = post.frontMatter.description || "";

  const ogImage = post.frontMatter.coverImage
    ? post.frontMatter.coverImage.startsWith("http")
      ? post.frontMatter.coverImage
      : `${SITE.domain}${post.frontMatter.coverImage}`
    : `${SITE.domain}/og/blog-default.webp`; // ajuste se existir

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: SITE.name,
      locale: SITE.language,
      images: [{ url: ogImage }],
    },
    // se quiser bloquear indexação de algum post específico, depois colocamos flag no frontmatter
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const url = `${SITE.domain}/blog/${post.slug}`;
  const publishedTime = post.frontMatter.date ? new Date(post.frontMatter.date).toISOString() : undefined;
  const modifiedTime = post.frontMatter.updatedAt
    ? new Date(post.frontMatter.updatedAt).toISOString()
    : publishedTime;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontMatter.title,
    description: post.frontMatter.description,
    mainEntityOfPage: url,
    inLanguage: SITE.language,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.domain}${SITE.logo}`,
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
  };

  const paragraphs = renderFallbackContent(post.contentRaw);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <Script id="jsonld-article" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <article className="prose prose-zinc max-w-none">
        <header className="mb-8">
          <h1>{post.frontMatter.title}</h1>
          {post.frontMatter.description ? (
            <p className="lead">{post.frontMatter.description}</p>
          ) : null}
        </header>

        {/* Conteúdo (fallback). Se você já renderiza MDX, substitua este bloco pelo seu render atual */}
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}

        {/* Bloco de interlinking mínimo (importante para indexação) */}
        <hr />
        <section>
          <h2>Leia também</h2>
          <ul>
            {getAllBlogSlugs()
              .filter((s) => s !== post.slug)
              .slice(0, 6)
              .map((s) => (
                <li key={s}>
                  <a href={`/blog/${s}`}>{s.replace(/-/g, " ")}</a>
                </li>
              ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
