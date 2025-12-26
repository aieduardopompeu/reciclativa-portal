import Link from "next/link";
import { reciclademArticles } from "@/content/reciclagem";

export default function ReciclagemIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Reciclagem</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Conteúdos práticos sobre separação, descarte correto e logística reversa.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {reciclademArticles.map((a) => (
          <Link
            key={a.slug}
            href={`/reciclagem/${a.slug}`}
            className="rounded-xl border border-slate-200 p-5 hover:bg-slate-50"
          >
            <div className="text-sm font-semibold text-slate-900">
              {a.title}
            </div>
            <p className="mt-2 text-sm text-slate-600">{a.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
