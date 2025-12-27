import Link from "next/link";
import { reciclademArticles } from "@/content/reciclagem";
import { CardLink } from "@/components/ui/CardLink";

export default function ReciclagemIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Reciclagem</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Conteúdos práticos sobre separação, descarte correto e logística reversa.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {reciclademArticles.map((a) => (
          <CardLink
            href={`/reciclagem/${a.slug}`}
            title={a.title}
            description={a.description}
          />
        ))}
      </section>
    </main>
  );
}
