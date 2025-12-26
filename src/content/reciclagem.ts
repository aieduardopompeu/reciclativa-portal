export type ReciclagemArticle = {
  slug: string;
  title: string;
  description: string;
  content: string[]; // parágrafos simples por enquanto
};

export const reciclademArticles: ReciclagemArticle[] = [
  {
    slug: "o-que-pode-ser-reciclado",
    title: "O Que Pode e o Que Não Pode Ser Reciclado | Guia Completo",
    description:
      "Veja o que pode e o que não pode ser reciclado no Brasil, com listas claras, exemplos práticos e dúvidas comuns respondidas.",
    content: [
      "Saber o que pode e o que não pode ser reciclado é essencial para evitar a contaminação dos materiais e aumentar as chances de reaproveitamento.",
      "Neste guia, você encontra listas práticas, exemplos comuns e respostas diretas para dúvidas frequentes sobre reciclagem no Brasil.",
      "Observação: regras podem variar por cidade e cooperativa. Quando houver dúvida, priorize manter o material limpo e seco e consultar a coleta seletiva local.",
    ],
  },
];

export function getReciclagemArticle(slug: string) {
  return reciclademArticles.find((a) => a.slug === slug) ?? null;
}
