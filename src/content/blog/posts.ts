// src/content/blog/posts.ts

export type BlogCategory =
  | "Reciclagem"
  | "Sustentabilidade"
  | "Guias"
  | "Economia circular";

export type BlogBlock =
  | {
      type: "section";
      title: string; // H2
      body: Array<
        | { type: "p"; text: string }
        | { type: "h3"; text: string }
        | { type: "list"; items: string[] }
      >;
    }
  | {
      type: "callout";
      variant: "tip" | "warning" | "checklist";
      title: string;
      text: string;
      items?: string[];
    }
  | {
      type: "faq";
      title: string; // H2
      items: Array<{ q: string; a: string }>;
    };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: BlogCategory;
  dateISO: string; // YYYY-MM-DD
  readMin?: number;
  updatedISO?: string;
  ogImage?: string;
  blocks: BlogBlock[];
};

export const BLOG_OG_DEFAULT = "/og/blog-default.webp";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "o-que-e-reciclagem",
    title: "O que é reciclagem: conceito, etapas e por que isso muda tudo",
    description:
      "Entenda o que é reciclagem, as etapas do processo e como separar resíduos do jeito certo para aumentar o reaproveitamento.",
    excerpt:
      "Reciclagem não é “jogar no reciclável”. Veja o que acontece depois da coleta e como separar sem contaminar.",
    category: "Reciclagem",
    dateISO: "2025-12-01",
    readMin: 7,
    blocks: [
      {
        type: "section",
        title: "O que é reciclagem, na prática",
        body: [
          {
            type: "p",
            text: "Reciclagem é transformar um resíduo em matéria-prima para fabricar um novo produto. Na prática, isso só acontece quando o material chega limpo, separado e compatível com a cadeia de triagem e indústria.",
          },
          {
            type: "p",
            text: "Quando o resíduo chega contaminado (orgânicos, gordura, mistura de materiais), ele vira rejeito e pode ir para aterro — mesmo se estava na lixeira “reciclável”.",
          },
          { type: "h3", text: "As etapas mais comuns" },
          {
            type: "list",
            items: [
              "Separação na origem (em casa/empresa)",
              "Coleta (seletiva, PEV/ecoponto, cooperativas)",
              "Triagem (separação por tipo e qualidade)",
              "Processamento (trituração, lavagem, enfardamento)",
              "Indústria (reprocessa e fabrica novos itens)",
            ],
          },
        ],
      },
      {
        type: "callout",
        variant: "checklist",
        title: "Checklist do descarte que funciona",
        text: "Se você fizer só isso, sua taxa de acerto sobe muito:",
        items: [
          "Esvazie e remova excesso de resíduos (sem precisar “lavar perfeito”)",
          "Seque/escorra para evitar odor e mofo",
          "Não misture orgânicos com recicláveis",
          "Amasse volume (quando fizer sentido) para facilitar logística",
          "Em dúvida: consulte o guia por material",
        ],
      },
      {
        type: "faq",
        title: "Perguntas frequentes",
        items: [
          {
            q: "Precisa lavar embalagem para reciclar?",
            a: "Não precisa “lavar perfeito”. O objetivo é tirar excesso de comida/óleo. Escorrer e remover o grosso já reduz contaminação e odor.",
          },
          {
            q: "Tudo que vai na lixeira reciclável é reciclado?",
            a: "Não. Se estiver contaminado, misturado ou fora do que a cadeia local aceita, pode virar rejeito.",
          },
        ],
      },
    ],
  },
  {
    slug: "o-que-pode-ser-reciclado",
    title: "O que pode ser reciclado: guia rápido para acertar no descarte",
    description:
      "Guia prático do que pode ser reciclado por material, com dicas para reduzir contaminação e evitar rejeito.",
    excerpt:
      "Um mapa simples por material (papel, plástico, metal, vidro) e o que costuma dar errado na separação.",
    category: "Guias",
    dateISO: "2025-12-02",
    readMin: 8,
    blocks: [
      {
        type: "section",
        title: "Regra de ouro: material limpo e separado",
        body: [
          {
            type: "p",
            text: "A lista do “pode” depende da sua cidade, mas existe uma regra que vale quase sempre: quanto mais limpo, seco e separado, maior a chance de reciclar.",
          },
        ],
      },
      {
        type: "faq",
        title: "Perguntas frequentes",
        items: [
          {
            q: "Caixa de pizza recicla?",
            a: "A parte engordurada geralmente não. Se houver uma parte limpa, separe: parte limpa no reciclável; parte engordurada no orgânico/rejeito.",
          },
        ],
      },
    ],
  },
  {
    slug: "economia-circular-exemplos",
    title: "Economia circular no Brasil: exemplos práticos e como aplicar",
    description:
      "Exemplos reais de economia circular: retornáveis, reuso, logística reversa, cooperativas e um roteiro prático para aplicar no dia a dia.",
    excerpt:
      "Circularidade na prática: o que já funciona, onde falha e como aplicar em casa e em pequenos negócios.",
    category: "Economia circular",
    dateISO: "2025-12-10",
    readMin: 8,
    blocks: [
      {
        type: "section",
        title: "Economia circular em linguagem simples",
        body: [
          {
            type: "p",
            text: "Economia circular é desenhar produtos e processos para reduzir extração de recursos e manter materiais em uso por mais tempo (reuso, reparo, remanufatura e reciclagem).",
          },
        ],
      },
      {
        type: "faq",
        title: "Perguntas frequentes",
        items: [
          {
            q: "Economia circular é só reciclagem?",
            a: "Não. Circularidade prioriza reduzir, reusar, reparar e redesenhar sistemas para evitar lixo antes de existir.",
          },
        ],
      },
    ],
  },
];
