import { sql } from "@vercel/postgres";

export type Profissional = {
  id?: string;
  name: string;
  uf: string; // "sp"
  city: string; // "São Paulo"
  category?: string;
  service?: string;
  description?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
};

/**
 * Seed fixo (produção): pode ficar vazio.
 * Se você quiser manter registros permanentes no site (mesmo sem DB),
 * coloque aqui. Caso contrário, deixe vazio.
 */
export const profissionais: Profissional[] = [];

/**
 * Seed apenas para DESENVOLVIMENTO:
 * - Ajuda o /profissionais a não ficar “vazio” localmente
 * - Não impacta produção (NODE_ENV !== "development")
 */
const DEV_SEED: Profissional[] = [
  {
    name: "EcoColeta (exemplo)",
    uf: "sp",
    city: "São Paulo",
    category: "Coletor / Transportador de Recicláveis",
    service: "Coleta e transporte de recicláveis",
    website: "https://example.com",
  },
  {
    name: "Verde Consultoria (exemplo)",
    uf: "rj",
    city: "Niterói",
    category: "Consultor em Sustentabilidade",
    service: "Consultoria ambiental e ESG",
    website: "https://example.com",
  },
  {
    name: "Educação Ambiental (exemplo)",
    uf: "mg",
    city: "Belo Horizonte",
    category: "Educador Ambiental",
    service: "Palestras, treinamentos e projetos",
    website: "https://example.com",
  },
];

function getSeed(): Profissional[] {
  const base = profissionais ?? [];
  const isDev = process.env.NODE_ENV === "development";
  return isDev ? [...base, ...DEV_SEED] : base;
}

export function normalizeUF(uf: string) {
  return (uf || "")
    .trim()
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 2)
    .toLowerCase();
}

// mantém label “bonita” para exibição
export function normalizeCityLabel(city: string) {
  return (city || "").trim().replace(/\s+/g, " ");
}

// slug para URL
export function normalizeCity(city: string) {
  return (city || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function getApprovedFromDB(): Promise<Profissional[]> {
  try {
    const { rows } = await sql<{
      id: number;
      name: string;
      uf: string;
      city: string;
      category: string | null;
      service: string | null;
      description: string | null;
      whatsapp: string | null;
      email: string | null;
      website: string | null;
    }>`
      select id, name, uf, city, category, service, description, whatsapp, email, website
      from profissionais
      where status = 'approved'
      order by created_at desc
      limit 5000
    `;

    return rows.map((r) => ({
      id: String(r.id),
      name: r.name,
      uf: normalizeUF(r.uf),
      city: normalizeCityLabel(r.city),
      category: r.category ?? undefined,
      service: r.service ?? undefined,
      description: r.description ?? undefined,
      whatsapp: r.whatsapp ?? undefined,
      email: r.email ?? undefined,
      website: r.website ?? undefined,
    }));
  } catch {
    // se DB não estiver disponível localmente, cai no seed (via getAllProfissionais)
    return [];
  }
}

export async function getAllProfissionais(): Promise<Profissional[]> {
  const seed = getSeed().map((p) => ({
    ...p,
    uf: normalizeUF(p.uf),
    city: normalizeCityLabel(p.city),
  }));

  const db = await getApprovedFromDB();

  // ✅ Normalização de vazio:
  // - se não vier nada do DB, pelo menos o DEV_SEED mantém o local utilizável
  return [...db, ...seed];
}

export async function getByUF(uf: string): Promise<Profissional[]> {
  const u = normalizeUF(uf);
  const all = await getAllProfissionais();
  return all.filter((p) => normalizeUF(p.uf) === u);
}

export async function getByUFCity(
  uf: string,
  cidadeSlug: string
): Promise<Profissional[]> {
  const u = normalizeUF(uf);
  const c = (cidadeSlug || "").toString().trim().toLowerCase();
  const all = await getAllProfissionais();

  return all.filter((p) => normalizeUF(p.uf) === u && normalizeCity(p.city) === c);
}

export async function citiesByUF(uf: string): Promise<string[]> {
  const list = await getByUF(uf);
  const seen = new Map<string, string>();

  for (const p of list) {
    const label = normalizeCityLabel(p.city);
    if (!label) continue;
    const slug = normalizeCity(label);
    if (!seen.has(slug)) seen.set(slug, label);
  }

  return Array.from(seen.values()).sort((a, b) =>
    a.localeCompare(b, "pt-BR", { sensitivity: "base" })
  );
}

export async function uniqueRolesByUF(uf: string): Promise<string[]> {
  const list = await getByUF(uf);
  const set = new Set<string>();

  for (const p of list) {
    const role = (p.category ?? "").trim();
    if (role) set.add(role);
  }

  return Array.from(set).sort((a, b) =>
    a.localeCompare(b, "pt-BR", { sensitivity: "base" })
  );
}

export async function uniqueRoles(uf?: string): Promise<string[]> {
  if (uf && uf.trim()) return uniqueRolesByUF(uf);

  const all = await getAllProfissionais();
  const set = new Set<string>();

  for (const p of all) {
    const role = (p.category ?? "").trim();
    if (role) set.add(role);
  }

  return Array.from(set).sort((a, b) =>
    a.localeCompare(b, "pt-BR", { sensitivity: "base" })
  );
}

export async function uniqueUFs(): Promise<string[]> {
  const all = await getAllProfissionais();
  const set = new Set<string>();

  for (const p of all) {
    const uf = normalizeUF(p.uf);
    if (uf.length === 2) set.add(uf);
  }

  return Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
}
