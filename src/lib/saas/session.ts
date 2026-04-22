import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";
import type { SaaSRole, SaaSSessionUser } from "@/types/saas";

type SaaSUserRow = {
  user_id: string;
  user_name: string;
  user_email: string;
  user_role: SaaSRole;
  organization_id: string;
  organization_legal_name: string;
  organization_trade_name: string | null;
  unit_id: string | null;
  unit_name: string | null;
};

const allowedRoles: SaaSRole[] = [
  "super_admin",
  "org_admin",
  "manager_operational",
  "manager_financial",
  "manager_commercial",
  "operator",
  "viewer",
];

function normalizeRole(value: unknown): SaaSRole {
  return allowedRoles.includes(value as SaaSRole)
    ? (value as SaaSRole)
    : "org_admin";
}

async function findSaaSUserByEmail(email: string): Promise<SaaSSessionUser | null> {
  const normalizedEmail = (email || "").trim().toLowerCase();
  if (!normalizedEmail) return null;

  const { rows } = await sql<SaaSUserRow>`
    select
      su.id as user_id,
      su.name as user_name,
      su.email as user_email,
      su.role as user_role,
      o.id as organization_id,
      o.legal_name as organization_legal_name,
      o.trade_name as organization_trade_name,
      ou.id as unit_id,
      ou.name as unit_name
    from saas_users su
    inner join organizations o
      on o.id = su.organization_id
    left join organization_units ou
      on ou.id = su.unit_id
    where lower(su.email) = ${normalizedEmail}
      and su.is_active = true
    limit 1
  `;

  const row = rows[0];
  if (!row) return null;

  return {
    id: row.user_id,
    name: row.user_name,
    email: row.user_email,
    role: normalizeRole(row.user_role),
    organization: {
      id: row.organization_id,
      legalName: row.organization_legal_name,
      tradeName: row.organization_trade_name,
    },
    unit: row.unit_id
      ? {
          id: row.unit_id,
          name: row.unit_name || "Unidade",
        }
      : null,
  };
}

async function findFirstActiveSaaSUser(): Promise<SaaSSessionUser | null> {
  const { rows } = await sql<SaaSUserRow>`
    select
      su.id as user_id,
      su.name as user_name,
      su.email as user_email,
      su.role as user_role,
      o.id as organization_id,
      o.legal_name as organization_legal_name,
      o.trade_name as organization_trade_name,
      ou.id as unit_id,
      ou.name as unit_name
    from saas_users su
    inner join organizations o
      on o.id = su.organization_id
    left join organization_units ou
      on ou.id = su.unit_id
    where su.is_active = true
    order by su.created_at asc
    limit 1
  `;

  const row = rows[0];
  if (!row) return null;

  return {
    id: row.user_id,
    name: row.user_name,
    email: row.user_email,
    role: normalizeRole(row.user_role),
    organization: {
      id: row.organization_id,
      legalName: row.organization_legal_name,
      tradeName: row.organization_trade_name,
    },
    unit: row.unit_id
      ? {
          id: row.unit_id,
          name: row.unit_name || "Unidade",
        }
      : null,
  };
}

/**
 * Sessão SaaS ligada ao banco real.
 *
 * Estratégia atual:
 * 1. tenta cookie "saas-user-email"
 * 2. tenta env SAAS_SEED_EMAIL
 * 3. tenta o seed padrão admin@reciclativa-teste.local
 * 4. faz fallback para o primeiro usuário ativo
 *
 * Isso permite avançar na Sprint 1 sem mexer no /admin atual.
 */
export async function getCurrentSaaSUser(): Promise<SaaSSessionUser> {
  const cookieStore = await cookies();

  const emailCandidates = [
    cookieStore.get("saas-user-email")?.value,
    process.env.SAAS_SEED_EMAIL,
    "admin@reciclativa-teste.local",
  ]
    .map((value) => (value || "").trim().toLowerCase())
    .filter(Boolean);

  for (const email of emailCandidates) {
    const found = await findSaaSUserByEmail(email);
    if (found) return found;
  }

  const fallback = await findFirstActiveSaaSUser();
  if (fallback) return fallback;

  throw new Error(
    "Nenhum usuário SaaS ativo foi encontrado. Verifique migrations, seeds e a tabela saas_users.",
  );
}
