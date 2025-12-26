import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReciclagemArtigoPage({ params }: Props) {
  const { slug } = await params;
  if (!slug) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Artigo de Reciclagem: {slug}</h1>

      <p className="mt-4 text-slate-600">
        Esta é a rota base para artigos de reciclagem. O conteúdo será conectado
        em breve.
      </p>
    </main>
  );
}
