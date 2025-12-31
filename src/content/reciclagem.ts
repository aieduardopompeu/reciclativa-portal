// src/content/reciclagem.ts

export type ReciclagemArticle = {
  slug: string;
  title: string;
  description: string;
  content: string[]; // parágrafos simples por enquanto
};

export const reciclagemArticles: ReciclagemArticle[] = [
  {
    slug: "o-que-pode-ser-reciclado",
    title: "O Que Pode e o Que Não Pode Ser Reciclado | Guia Completo",
    description:
      "Veja o que pode e o que não pode ser reciclado no Brasil, com listas claras e dicas práticas para separar corretamente.",
    content: [
      "Saber o que pode e o que não pode ser reciclado é essencial para evitar contaminação dos materiais e melhorar o aproveitamento na triagem.",
      "Neste guia, você encontra listas práticas, exemplos comuns e respostas diretas para separar melhor no dia a dia.",
      "Observação: regras podem variar por cidade e cooperativa. Quando houver dúvida, priorize o descarte limpo e seco e confirme a orientação local.",
    ],
  },

  {
    slug: "simbolos-da-reciclagem",
    title: "Símbolos da Reciclagem: Guia Completo e Atualizado",
    description:
      "Entenda os símbolos da reciclagem, o que cada um significa e como usar essa informação para separar corretamente.",
    content: [
      "Os símbolos de reciclagem ajudam a identificar o tipo de material e a forma correta de descarte, especialmente em embalagens plásticas, papel e metal.",
      "Na prática, os símbolos mais comuns aparecem em embalagens e indicam o material (ou a possibilidade de reciclagem), mas isso não garante coleta na sua região.",
      "Importante: a reciclabilidade pode variar por cidade e cooperativa. Mesmo com símbolo, um item pode não ser aceito localmente.",
      "Neste guia, você vai entender os símbolos mais frequentes e como tomar decisões melhores na separação.",
    ],
  },
];

export function getReciclagemArticle(slug: string) {
  return reciclagemArticles.find((a) => a.slug === slug) ?? null;
}
