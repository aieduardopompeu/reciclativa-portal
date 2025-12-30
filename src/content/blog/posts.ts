// src/content/blog/posts.ts

export type BlogCategory =
  | "Reciclagem"
  | "Sustentabilidade"
  | "Guias"
  | "Economia circular";

export type BlogBlock =
  | {
      type: "section";
      title: string;
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
      title: string;
      items: Array<{ q: string; a: string }>;
    };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: BlogCategory;
  dateISO: string;
  readMin?: number;
  updatedISO?: string;
  ogImage?: string;
  blocks: BlogBlock[];
};

export const BLOG_OG_DEFAULT = "/og/blog-default.webp";

const PLACEHOLDER_BLOCKS = (topic: string): BlogBlock[] => [
  {
    type: "section",
    title: "Resumo prático",
    body: [
      {
        type: "p",
        text: `Este artigo (${topic}) está no novo formato do blog. O conteúdo completo será expandido em breve.`,
      },
      {
        type: "p",
        text: "Por enquanto, você já pode navegar sem 404 e o SEO base (title/description/canonical/OG) fica consistente.",
      },
    ],
  },
  {
    type: "faq",
    title: "Perguntas frequentes",
    items: [
      {
        q: `O que vou encontrar neste artigo sobre ${topic}?`,
        a: "Um guia direto e prático, com etapas, exemplos e checklist. Em breve entra a versão completa.",
      },
      {
        q: "Por que este artigo ainda está curto?",
        a: "Porque a migração foi feita para padronizar o blog em um único template e evitar divergência entre páginas. O conteúdo será completado por etapas, sem derrubar links.",
      },
    ],
  },
];

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
            text: "Reciclagem é transformar um resíduo em matéria-prima para fabricar um novo produto. Isso depende de separação correta e de cadeia local de triagem/indústria.",
          },
          { type: "h3", text: "Etapas comuns" },
          {
            type: "list",
            items: [
              "Separação na origem",
              "Coleta / PEV",
              "Triagem",
              "Processamento",
              "Indústria",
            ],
          },
        ],
      },
      {
        type: "faq",
        title: "Perguntas frequentes",
        items: [
          {
            q: "Precisa lavar embalagem?",
            a: "Não precisa “lavar perfeito”. Remova o excesso e mantenha seco sempre que possível.",
          },
          {
            q: "Tudo que vai no reciclável é reciclado?",
            a: "Não. Se estiver contaminado ou fora do que a cadeia local aceita, pode virar rejeito.",
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
      "Um mapa simples por material e o que costuma dar errado na separação.",
    category: "Guias",
    dateISO: "2025-12-02",
    readMin: 8,
    blocks: [
      {
        type: "section",
        title: "Regra de ouro",
        body: [
          {
            type: "p",
            text: "Quanto mais limpo, seco e separado, maior a chance real de reciclagem.",
          },
        ],
      },
      {
        type: "faq",
        title: "Perguntas frequentes",
        items: [
          {
            q: "Caixa de pizza recicla?",
            a: "A parte engordurada geralmente não. Separe a parte limpa quando possível.",
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
      "Circularidade na prática: o que já funciona, onde falha e como aplicar.",
    category: "Economia circular",
    dateISO: "2025-12-10",
    readMin: 8,
    blocks: [
      {
        type: "section",
        title: "Em linguagem simples",
        body: [
          {
            type: "p",
            text: "Economia circular prioriza reduzir, reusar, reparar e redesenhar sistemas antes de depender só de reciclagem.",
          },
        ],
      },
      {
        type: "faq",
        title: "Perguntas frequentes",
        items: [
          {
            q: "Economia circular é só reciclagem?",
            a: "Não. Reciclagem é parte do sistema, mas circularidade começa na redução e no reuso.",
          },
        ],
      },
    ],
  },

  // ---- Placeholders para evitar 404 (slugs que existiam como rotas estáticas) ----
  {
    slug: "coleta-seletiva-no-brasil",
    title: "Coleta seletiva no Brasil: como funciona e como participar",
    description:
      "Como funciona a coleta seletiva no Brasil e como participar mesmo quando não há serviço no bairro.",
    excerpt:
      "Separação correta, ecopontos, cooperativas e alternativas quando não há coleta no seu bairro.",
    category: "Guias",
    dateISO: "2025-12-04",
    readMin: 8,
    blocks: PLACEHOLDER_BLOCKS("coleta seletiva no Brasil"),
  },
  {
    slug: "cores-da-coleta-seletiva",
    title: "Cores da coleta seletiva: padrão, variações e como não errar",
    description:
      "Entenda as cores da coleta seletiva, o que vai em cada uma e as variações por cidade.",
    excerpt:
      "Guia direto das cores e o que vai em cada categoria para você não errar na separação.",
    category: "Guias",
    dateISO: "2025-12-05",
    readMin: 6,
    blocks: PLACEHOLDER_BLOCKS("cores da coleta seletiva"),
  },
  {
    slug: "economia-circular-e-linear",
    title: "Economia circular vs. economia linear: diferenças e exemplos",
    description:
      "Diferenças entre economia circular e linear, com exemplos e impactos na prática.",
    excerpt:
      "O que muda entre linear e circular e como isso aparece no consumo e no descarte.",
    category: "Economia circular",
    dateISO: "2025-12-06",
    readMin: 8,
    blocks: PLACEHOLDER_BLOCKS("economia circular vs linear"),
  },
  {
    slug: "lixo-eletronico-descarte",
    title: "Lixo eletrônico: como descartar corretamente sem poluir",
    description:
      "Guia prático de descarte de lixo eletrônico: pilhas, baterias, celulares, cabos e eletrodomésticos.",
    excerpt:
      "Onde descartar e-lixo e como evitar contaminação por metais pesados e componentes perigosos.",
    category: "Sustentabilidade",
    dateISO: "2025-12-07",
    readMin: 7,
    blocks: PLACEHOLDER_BLOCKS("lixo eletrônico (e-lixo)"),
  },
  {
    slug: "reciclagem-plastico",
    title: "Reciclagem de plástico: tipos, símbolos e como separar corretamente",
    description:
      "Entenda os tipos de plástico, símbolos e como separar corretamente para aumentar a reciclagem real.",
    excerpt:
      "PET, PEAD, PP e outros: o que costuma ser aceito e o que dá problema na triagem.",
    category: "Reciclagem",
    dateISO: "2025-12-08",
    readMin: 9,
    blocks: PLACEHOLDER_BLOCKS("reciclagem de plástico"),
  },
  {
    slug: "reduzir-lixo-na-rotina",
    title: "Como reduzir lixo na rotina: 12 hábitos simples que funcionam",
    description:
      "Hábitos simples para reduzir lixo e desperdício sem radicalismo, com um plano prático.",
    excerpt:
      "Um plano realista para reduzir rejeito: compras, reuso, separação e hábitos do dia a dia.",
    category: "Sustentabilidade",
    dateISO: "2025-12-09",
    readMin: 7,
    blocks: PLACEHOLDER_BLOCKS("redução de lixo na rotina"),
  },
  {
    slug: "tipos-de-reciclagem",
    title: "Tipos de reciclagem: mecânica, química, energética e orgânica",
    description:
      "Conheça os principais tipos de reciclagem e quando cada um é usado na prática.",
    excerpt:
      "Mecânica, química, energética e orgânica: diferenças e exemplos práticos.",
    category: "Reciclagem",
    dateISO: "2025-12-03",
    readMin: 7,
    blocks: PLACEHOLDER_BLOCKS("tipos de reciclagem"),
  },
];
