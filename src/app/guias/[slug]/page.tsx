import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function GuiaPage({ params }: Props) {
  const { slug } = await params;

  // Se algum slug cair aqui, é porque NÃO existe uma página real em /guias/<slug>.
  // Para não exibir conteúdo "em breve" (ruim para AdSense/SEO), retornamos 404.
  if (!slug) return notFound();
  return notFound();
}
