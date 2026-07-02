// src/components/seo/ArticleJsonLd.tsx
import { JsonLd } from "./JsonLd";

type ArticleJsonLdProps = {
  siteUrl: string;
  url: string; // absoluto
  headline: string;
  description: string;
  datePublished: string; // ISO (YYYY-MM-DD)
  dateModified?: string; // ISO
  authorName?: string; // default: Eduardo Pompeu (responsável pelo site)
  authorType?: "Person" | "Organization"; // default: Person
  publisherName?: string; // default: Reciclativa
  imageUrl?: string; // absoluto
};

export function ArticleJsonLd({
  siteUrl,
  url,
  headline,
  description,
  datePublished,
  dateModified,
  authorName = "Eduardo Pompeu",
  authorType = "Person",
  publisherName = "Reciclativa",
  imageUrl,
}: ArticleJsonLdProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline,
    description,
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    author: {
      "@type": authorType,
      name: authorName,
      ...(authorType === "Organization" ? { url: siteUrl } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      url: siteUrl,
      // logo opcional (se você tiver um arquivo estável)
      // logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    ...(imageUrl ? { image: [imageUrl] } : {}),
  };

  return <JsonLd id="jsonld-article" data={data} />;
}
