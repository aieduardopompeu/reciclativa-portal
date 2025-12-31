// src/content/reciclagem.ts

export type ReciclagemArticle = {
  slug: string;
  title: string;
  description: string;
  content: string[]; // parÃ¡grafos simples por enquanto
};

export const reciclagemArticles: ReciclagemArticle[] = [
  {
    slug: "o-que-pode-ser-reciclado",
    title: "O Que Pode e o Que NÃ£o Pode Ser Reciclado | Guia Completo",
    description:
      "Veja o que pode e o que nÃ£o pode ser reciclado no Brasil, com listas claras e dicas prÃ¡ticas para separar corretamente.",
    content: [
      "Saber o que pode e o que nÃ£o pode ser reciclado Ã© essencial para evitar contaminaÃ§Ã£o dos materiais e melhorar o aproveitamento na triagem.",
      "Neste guia, vocÃª encontra listas prÃ¡ticas, exemplos comuns e respostas diretas para separar melhor no dia a dia.",
      "ObservaÃ§Ã£o: regras podem variar por cidade e cooperativa. Quando houver dÃºvida, priorize o descarte limpo e seco e confirme a orientaÃ§Ã£o local.",
    ],
  },

  {
    slug: "simbolos-da-reciclagem",
    title: "SÃ­mbolos da Reciclagem: Guia Completo e Atualizado",
    description:
      "Entenda os sÃ­mbolos da reciclagem, o que cada um significa e como usar essa informaÃ§Ã£o para separar corretamente.",
    content: [
      "Os sÃ­mbolos de reciclagem ajudam a identificar o tipo de material e a forma correta de descarte, especialmente em embalagens plÃ¡sticas, papel e metal.",
      "Na prÃ¡tica, os sÃ­mbolos mais comuns aparecem em embalagens e indicam o material (ou a possibilidade de reciclagem), mas isso nÃ£o garante coleta na sua regiÃ£o.",
      "Importante: a reciclabilidade pode variar por cidade e cooperativa. Mesmo com sÃ­mbolo, um item pode nÃ£o ser aceito localmente.",
      "Neste guia, vocÃª vai entender os sÃ­mbolos mais frequentes e como tomar decisÃµes melhores na separaÃ§Ã£o.",
    ],
  },

  {
      {
          "Nem sempre. Depende do tipo de plÃ¡stico, da infraestrutura local e das condiÃ§Ãµes do material. Alguns sÃ£o tecnicamente reciclÃ¡veis, mas nÃ£o sÃ£o aceitos em todas as regiÃµes.",
      },
      {
          "O ideal Ã© remover excesso de alimento e deixar o material o mais limpo possÃ­vel. NÃ£o precisa desperdiÃ§ar Ã¡gua: uma limpeza simples jÃ¡ ajuda a evitar contaminaÃ§Ã£o e mau cheiro.",
      },
      {
          "Em geral, nÃ£o. Papel e papelÃ£o com gordura tendem a contaminar a reciclagem. Partes limpas podem ser separadas quando houver.",
      },
      {
          "VocÃª pode contaminar outros materiais, reduzir o aproveitamento e aumentar o custo de triagem. Separar corretamente melhora a eficiÃªncia e a qualidade do material reciclÃ¡vel.",
      },
    ],
  },
];

export function getReciclagemArticle(slug: string) {
  return reciclagemArticles.find((a) => a.slug === slug) ?? null;
}
