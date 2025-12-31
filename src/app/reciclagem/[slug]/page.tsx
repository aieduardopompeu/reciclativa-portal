// src/app/reciclagem/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getReciclagemArticle } from "@/content/reciclagem";

type PageProps = {
  params: { slug: string };
};

export default function ReciclagemArticlePage({ params }: PageProps) {
  const { slug } = params;

  const article = getReciclagemArticle(slug);
  if (!article) return notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {article.title}
        </h1>
        <p className="text-base text-muted-foreground">{article.description}</p>
      </header>

      <article className="mt-8 space-y-5">
        {article.content.map((p, idx) => (
          <p key={idx} className="leading-relaxed">
            {p}
          </p>
        ))}
      </article>
    </main>
  );
}
