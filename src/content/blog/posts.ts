// src/content/blog/posts.ts

export type CategoryUI =
  | "Reciclagem"
  | "Sustentabilidade"
  | "Guias"
  | "Economia circular";

export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategoryUI;
  dateISO: string;
  readMin: number;
  tags?: string[];
};

/**
 * Alias para compatibilidade com componentes antigos (ex: BlogCard.tsx)
 * que ainda importam `BlogPost`.
 */
export type BlogPost = PostCard;

export const POSTS: PostCard[] = [
  {
    slug: "o-que-e-reciclagem",
    title: "O que é reciclagem: conceito, etapas e por que isso muda tudo",
    excerpt:
      "Reciclagem não é “jogar no reciclável”. Veja o que acontece depois da coleta e como separar sem contaminar.",
    category: "Reciclagem",
    dateISO: "2025-12-01",
    readMin: 7,
    tags: ["reciclagem", "guia-iniciante"],
  },
  {
    slug: "o-que-pode-ser-reciclado",
    title: "O que pode ser reciclado: guia rápido para acertar no descarte",
    excerpt: "Um mapa simples por material e o que costuma dar errado na separação.",
    category: "Guias",
    dateISO: "2025-12-02",
    readMin: 8,
    tags: ["guias", "separacao", "guia-iniciante"],
  },
  {
    slug: "tipos-de-reciclagem",
    title: "Tipos de reciclagem: mecânica, química, energética e orgânica",
    excerpt:
      "Mecânica, química, energética e orgânica: diferenças e exemplos práticos.",
    category: "Reciclagem",
    dateISO: "2025-12-03",
    readMin: 7,
    tags: ["reciclagem"],
  },
  {
    slug: "coleta-seletiva-no-brasil",
    title: "Coleta seletiva no Brasil: como funciona e como participar",
    excerpt:
      "Separação correta, ecopontos, cooperativas e alternativas quando não há coleta no seu bairro.",
    category: "Guias",
    dateISO: "2025-12-04",
    readMin: 8,
    tags: ["coleta-seletiva", "guias", "separacao"],
  },
  {
    slug: "cores-da-coleta-seletiva",
    title: "Cores da coleta seletiva: padrão, variações e como não errar",
    excerpt:
      "Guia direto das cores e o que vai em cada categoria para você não errar na separação.",
    category: "Guias",
    dateISO: "2025-12-05",
    readMin: 6,
    tags: ["coleta-seletiva", "guias", "separacao"],
  },
  {
    slug: "economia-circular-e-linear",
    title: "Economia circular vs. economia linear: diferenças e exemplos",
    excerpt:
      "O que muda entre linear e circular e como isso aparece no consumo e no descarte.",
    category: "Economia circular",
    dateISO: "2025-12-06",
    readMin: 8,
    tags: ["economia-circular"],
  },
  {
    slug: "lixo-eletronico-descarte",
    title: "Lixo eletrônico: como descartar corretamente sem poluir",
    excerpt:
      "Onde descartar e-lixo e como evitar contaminação por metais pesados e componentes perigosos.",
    category: "Sustentabilidade",
    dateISO: "2025-12-07",
    readMin: 7,
    tags: ["sustentabilidade", "lixo-eletronico"],
  },
  {
    slug: "reciclagem-plastico",
    title: "Reciclagem de plástico: tipos, símbolos e como separar…",
    excerpt:
      "PET, PEAD, PP e outros: o que costuma ser aceito e o que dá problema na triagem.",
    category: "Reciclagem",
    dateISO: "2025-12-08",
    readMin: 9,
    tags: ["reciclagem", "plastico"],
  },
  {
    slug: "reduzir-lixo-na-rotina",
    title: "Como reduzir lixo na rotina: 12 hábitos simples que funcionam",
    excerpt:
      "Um plano realista para reduzir rejeito: compras, reuso, separação e hábitos do dia a dia.",
    category: "Sustentabilidade",
    dateISO: "2025-12-09",
    readMin: 7,
    tags: ["sustentabilidade", "habitos"],
  },
  {
    slug: "economia-circular-exemplos",
    title: "Economia circular no Brasil: exemplos práticos e como aplicar",
    excerpt: "Circularidade na prática: o que já funciona, onde falha e como aplicar.",
    category: "Economia circular",
    dateISO: "2025-12-10",
    readMin: 8,
    tags: ["economia-circular"],
  },
  {
    slug: "materiais-biodegradaveis-escova-de-dente-de-bambu",
    title:
      "Materiais biodegradáveis: o que são, exemplos e por que a escova de bambu faz diferença",
    excerpt:
      "Entenda o que são materiais biodegradáveis, veja exemplos práticos do dia a dia e aprenda o descarte correto da escova de dente de bambu.",
    category: "Sustentabilidade",
    dateISO: "2026-01-20",
    readMin: 7,
    tags: ["materiais-sustentaveis", "biodegradaveis"],
  },
  {
    slug: "bioplasticos-solucao-ou-greenwashing",
    title: "Bioplásticos: solução ou greenwashing? Entenda o que são e como descartar",
    excerpt:
      "Bioplásticos podem ser alternativa real ou apenas marketing. Veja tipos, limitações, sinais de greenwashing e como descartar na prática.",
    category: "Sustentabilidade",
    dateISO: "2026-01-20",
    readMin: 8,
    tags: ["materiais-sustentaveis", "bioplasticos"],
  },
];

/** Helpers */
export function toSlug(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPostsByTag(tag: string) {
  return POSTS.filter((p) => (p.tags ?? []).includes(tag));
}

export function getAllTags() {
  const set = new Set<string>();
  for (const p of POSTS) for (const t of p.tags ?? []) set.add(t);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getAllCategories(): CategoryUI[] {
  return ["Reciclagem", "Sustentabilidade", "Guias", "Economia circular"];
}

export function getCategoryBySlug(slug: string): CategoryUI | null {
  const all = getAllCategories();
  const found = all.find((c) => toSlug(c) === slug);
  return found ?? null;
}

export function getPostsByCategorySlug(slug: string) {
  const cat = getCategoryBySlug(slug);
  if (cat) return POSTS.filter((p) => p.category === cat);
  return POSTS.filter((p) => toSlug(p.category) === slug);
}
