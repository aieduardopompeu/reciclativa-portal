// src/content/reciclagem.ts

export type ReciclagemArticle = {
  slug: string;
  title: string;
  description: string;
  content: string[]; // parágrafos simples por enquanto
  faq?: { question: string; answer: string }[]; // ✅ FAQ conservador (opcional)
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

  // ✅ Artigo real com FAQ aplicado (conservador, sem mexer em rotas)
  {
    slug: "o-que-e-reciclagem",
    title: "O que é reciclagem? Entenda de forma simples e prática",
    description:
      "Aprenda o que é reciclagem, como funciona na prática, quais materiais costumam ser aceitos e como separar corretamente no dia a dia.",
    content: [
      "Reciclagem é o processo de transformar resíduos em novos produtos ou matéria-prima, reduzindo a extração de recursos naturais e o volume de lixo destinado a aterros.",
      "Na prática, a reciclagem depende de etapas como separação na origem, coleta, triagem e processamento. Quando a separação é bem feita, a triagem fica mais eficiente e mais material é reaproveitado.",
      "Os benefícios são diretos: menos resíduos, menor impacto ambiental, economia de recursos e fortalecimento da cadeia de trabalho e renda ligada à reciclagem.",
      "Para aumentar a chance de reciclagem real, o mais importante é separar corretamente e evitar contaminação (restos de comida e líquidos), mantendo os materiais o mais limpos e secos possível.",
    ],
    faq: [
      {
        question: "Reciclagem e reutilização são a mesma coisa?",
        answer:
          "Não. Reutilização é usar o mesmo item novamente (ou com outra função) sem transformação industrial. Reciclagem envolve processamento para virar matéria-prima ou um novo produto.",
      },
      {
        question: "Todo plástico é reciclável?",
        answer:
          "Nem sempre. Depende do tipo de plástico, da infraestrutura local e das condições do material. Alguns são tecnicamente recicláveis, mas não são aceitos em todas as regiões.",
      },
      {
        question: "Preciso lavar embalagens antes de reciclar?",
        answer:
          "O ideal é remover excesso de alimento e deixar o material o mais limpo possível. Não precisa desperdiçar água: uma limpeza simples já ajuda a evitar contaminação e mau cheiro.",
      },
      {
        question: "Papel engordurado pode ir para reciclagem?",
        answer:
          "Em geral, não. Papel e papelão com gordura tendem a contaminar a reciclagem. Partes limpas podem ser separadas quando houver.",
      },
      {
        question: "O que acontece se eu separar errado?",
        answer:
          "Você pode contaminar outros materiais, reduzir o aproveitamento e aumentar o custo de triagem. Separar corretamente melhora a eficiência e a qualidade do material reciclável.",
      },
    ],
  },
];

export function getReciclagemArticle(slug: string) {
  return reciclademArticles.find((a) => a.slug === slug) ?? null;
}
