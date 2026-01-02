// src/content/profissionais.ts

export const PROFESSIONAL_ROLES = [
  "Engenheiro Ambiental",
  "Gestor Ambiental",
  "Técnico em Meio Ambiente",
  "Consultor em Sustentabilidade",
  "Coletor / Transportador de Recicláveis",
  "Cooperativa / Associação",
  "Educador Ambiental",
  "Especialista em Resíduos (PGRS)",
  "Auditor Ambiental / ESG",
] as const;

export type ProfessionalRole = (typeof PROFESSIONAL_ROLES)[number];

export type Profissional = {
  id: string;
  name: string;
  role: ProfessionalRole;
  service: string;
  description: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  uf: string;
  city: string;
  address?: string;
  tags?: string[];
};

export const profissionais: Profissional[] = [
  {
    id: "rj-rio-eco-001",
    name: "EcoColeta RJ",
    role: "Coletor / Transportador de Recicláveis",
    service: "Coleta de recicláveis e descarte correto",
    description:
      "Atendimento para residências e pequenos comércios. Agendamento e orientação de separação.",
    whatsapp: "5521999999999",
    uf: "RJ",
    city: "Rio de Janeiro",
    tags: ["coleta", "recicláveis", "agendamento"],
  },
  {
    id: "sp-sp-consult-001",
    name: "Verde Consultoria",
    role: "Consultor em Sustentabilidade",
    service: "Consultoria ambiental e plano de resíduos",
    description:
      "Implantação de coleta seletiva, treinamento e rotinas para empresas e condomínios.",
    email: "contato@verdeconsultoria.com",
    uf: "SP",
    city: "São Paulo",
    tags: ["consultoria", "empresas", "coleta seletiva"],
  },
];

export function normalizeUF(uf: string) {
  return (uf || "").trim().toUpperCase();
}

export function normalizeCity(city: string) {
  return (city || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function uniqueUFs() {
  const set = new Set(profissionais.map((p) => normalizeUF(p.uf)));
  return Array.from(set).sort();
}

// ✅ ESTA FUNÇÃO É O QUE ESTÁ FALTANDO NO SEU BUILD
export function uniqueRoles() {
  const set = new Set(
    profissionais
      .map((p) => (p.role || "").trim())
      .filter(Boolean)
  );
  return Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function citiesByUF(uf: string) {
  const U = normalizeUF(uf);
  const set = new Set(
    profissionais
      .filter((p) => normalizeUF(p.uf) === U)
      .map((p) => p.city.trim())
  );
  return Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function getByUF(uf: string) {
  const U = normalizeUF(uf);
  return profissionais.filter((p) => normalizeUF(p.uf) === U);
}

export function getByUFCity(uf: string, citySlug: string) {
  const U = normalizeUF(uf);
  const c = (citySlug || "").trim().toLowerCase();
  return profissionais.filter(
    (p) => normalizeUF(p.uf) === U && normalizeCity(p.city) === c
  );
}
