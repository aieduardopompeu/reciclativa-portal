// src/content/profissionais.ts

export type Profissional = {
  id: string;
  name: string;
  service: string; // ex.: "Coleta de recicláveis", "Consultoria ambiental"
  description: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  uf: string; // "RJ", "SP"...
  city: string; // "Rio de Janeiro"
  address?: string;
  tags?: string[];
};

export const profissionais: Profissional[] = [
  // MVP com exemplos (troque depois pelos reais)
  {
    id: "rj-rio-eco-001",
    name: "EcoColeta RJ",
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
