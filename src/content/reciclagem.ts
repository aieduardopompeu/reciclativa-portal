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
  {
    slug: "simbolos-da-reciclagem",
    title: "Símbolos da Reciclagem: Guia Completo e Atualizado",
    description:
      "Entenda os símbolos da reciclagem, o que cada um significa e como usar isso para separar corretamente os materiais.",
    content: [
      "Os símbolos de reciclagem ajudam a identificar o tipo de material e a forma correta de descarte. Eles também reduzem erros na separação e aumentam as chances de reaproveitamento.",
      "Na prática, os símbolos mais comuns aparecem em embalagens plásticas, papel, metal e vidro. Em plásticos, alguns códigos indicam o tipo de resina (o que pode influenciar a reciclabilidade).",
      "Importante: a reciclabilidade pode variar por cidade e cooperativa. Mesmo quando há símbolo, a coleta local pode não aceitar determinados materiais.",
      "Neste guia, você vai entender os símbolos mais frequentes e como tomar decisões simples: manter limpo e seco, separar por categoria e seguir as regras da coleta seletiva local.",
    ],
  },
];

export function getReciclagemArticle(slug: string) {
  return reciclademArticles.find((a) => a.slug === slug) ?? null;
}
