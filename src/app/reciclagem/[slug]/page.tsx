// src/app/reciclagem/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getReciclagemArticle } from "@/content/reciclagem";

type PageProps = {
  params: { slug: string };
};

// ✅ Blindagem total: não depende de generateStaticParams para o slug existir em produção
export const dynamic = "force-dynamic";

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

        {article.faq?.length ? (
          <section className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold">Perguntas frequentes</h2>

            <div className="space-y-6">
              {article.faq.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
