import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function GuiaPage({ params }: Props) {
  const { slug } = await params;
  if (!slug) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Guia: {slug}</h1>

      <p className="mt-4 text-slate-600">
        Esta é a rota base para guias evergreen. O conteúdo será conectado em
        breve.
      </p>
    </main>
  );
}
