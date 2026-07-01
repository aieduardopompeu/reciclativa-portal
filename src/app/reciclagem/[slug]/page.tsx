// src/app/reciclagem/[slug]/page.tsx
import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Os dois conteúdos que já existiram aqui têm versões completas e canônicas em
// outro lugar do site: evita duas páginas concorrendo pelo mesmo tema.
const REDIRECTS: Record<string, string> = {
  "simbolos-da-reciclagem": "/simbolos-da-reciclagem",
  "o-que-pode-ser-reciclado": "/blog/o-que-pode-ser-reciclado",
};

export default async function ReciclagemArticleRedirect({ params }: PageProps) {
  const { slug } = await params;

  if (REDIRECTS[slug]) redirect(REDIRECTS[slug]);

  return notFound();
}
