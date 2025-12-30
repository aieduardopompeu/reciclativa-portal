// src/lib/blogPosts.ts
export type Category = "Reciclagem" | "Sustentabilidade" | "Guias" | "Economia circular";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  dateISO: string; // YYYY-MM-DD
  readingTime?: string;
  // opcional (se você quiser evoluir depois):
  // image?: string; // ex: "/images/blog/slug.webp"
};

export const POSTS: Post[] = [
  {
    slug: "o-que-e-reciclagem",
    title: "O que é reciclagem: conceito, etapas e por que isso muda tudo",
    excerpt:
      "Entenda como a reciclagem funciona na prática, o que realmente é reciclável e como evitar erros comuns no descarte.",
    category: "Reciclagem",
    dateISO: "2025-12-01",
    readingTime: "6 min",
  },
  {
    slug: "o-que-pode-ser-reciclado",
    title: "O que pode ser reciclado: guia rápido para acertar no descarte",
    excerpt:
      "Uma visão prática do que entra (ou não) na reciclagem e como preparar corretamente cada tipo de resíduo.",
    category: "Guias",
    dateISO: "2025-12-02",
    readingTime: "7 min",
  },
  {
    slug: "tipos-de-reciclagem",
    title: "Tipos de reciclagem: mecânica, química, energética e orgânica",
    excerpt:
      "Conheça os principais tipos de reciclagem e entenda quando cada processo faz mais sentido para diferentes materiais.",
    category: "Reciclagem",
    dateISO: "2025-12-03",
    readingTime: "8 min",
  },
  {
    slug: "coleta-seletiva-no-brasil",
    title: "Coleta seletiva no Brasil: como funciona e como participar",
    excerpt:
      "Do básico ao prático: como separar em casa, o que fazer quando não há coleta na sua rua e como encontrar alternativas.",
    category: "Guias",
    dateISO: "2025-12-04",
    readingTime: "7 min",
  },
  {
    slug: "cores-da-coleta-seletiva",
    title: "Cores da coleta seletiva: padrão, variações e como não errar",
    excerpt:
      "Um mapa mental simples das cores mais usadas e o que fazer quando sua cidade usa um padrão diferente.",
    category: "Guias",
    dateISO: "2025-12-05",
    readingTime: "5 min",
  },
  {
    slug: "economia-circular-e-linear",
    title: "Economia circular vs. economia linear: diferenças e exemplos",
    excerpt:
      "Entenda a lógica do ciclo (reduzir, reutilizar, reciclar) e como isso impacta consumo, empresas e políticas públicas.",
    category: "Economia circular",
    dateISO: "2025-12-06",
    readingTime: "6 min",
  },
  {
    slug: "lixo-eletronico-descarte",
    title: "Lixo eletrônico: como descartar corretamente sem poluir",
    excerpt:
      "O que é e-lixo, riscos ambientais, como separar e onde descartar de forma segura e responsável.",
    category: "Sustentabilidade",
    dateISO: "2025-12-07",
    readingTime: "7 min",
  },
  {
    slug: "reciclagem-plastico",
    title: "Reciclagem de plástico: quais são os tipos e o que muda no processo",
    excerpt:
      "Do PET ao PP: como identificar plásticos, o que facilita a reciclagem e como reduzir contaminação na separação.",
    category: "Reciclagem",
    dateISO: "2025-12-08",
    readingTime: "8 min",
  },
  {
    slug: "reduzir-lixo-na-rotina",
    title: "Como reduzir lixo na rotina: hábitos simples com grande impacto",
    excerpt:
      "Checklist prático para reduzir resíduos no dia a dia — sem radicalismo — e melhorar sua pegada ambiental.",
    category: "Sustentabilidade",
    dateISO: "2025-12-09",
    readingTime: "6 min",
  },
];

export function getPostBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
