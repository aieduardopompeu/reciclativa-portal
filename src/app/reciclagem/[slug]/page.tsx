import { notFound } from "next/navigation";
import { getReciclagemArticle } from "@/content/reciclagem";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReciclagemArtigoPage({ params }: Props) {
  const { slug } = await params;
  const article = getReciclagemArticle(slug);

  if (!article) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <p className="mt-2 text-slate-600">{article.description}</p>

      <article className="mt-8 space-y-4 text-slate-800">
        {article.content.map((p, idx) => (
          <p key={idx} className="leading-relaxed">
            {p}
          </p>
        ))}
      </article>
    </main>
  );
}
