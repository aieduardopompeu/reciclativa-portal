"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import type { SaaSRole } from "@/types/saas";

function sanitizeText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

const allowedRoles: SaaSRole[] = [
  "super_admin",
  "org_admin",
  "manager_operational",
  "manager_financial",
  "manager_commercial",
  "operator",
  "viewer",
];

export async function createSaaSUserAction(formData: FormData) {
  const currentUser = await getCurrentSaaSUser();

  const name = sanitizeText(formData.get("name"));
  const email = sanitizeText(formData.get("email")).toLowerCase();
  const role = sanitizeText(formData.get("role")) as SaaSRole;
  const unitId = sanitizeText(formData.get("unit_id"));

  if (!name) {
    throw new Error("O nome do usuário é obrigatório.");
  }

  if (!email) {
    throw new Error("O e-mail do usuário é obrigatório.");
  }

  if (!allowedRoles.includes(role)) {
    throw new Error("Role inválida.");
  }

  const existing = await sql<{ id: string }>`
    select id
    from saas_users
    where organization_id = ${currentUser.organization.id}
      and lower(email) = ${email}
    limit 1
  `;

  if (existing.rows[0]) {
    throw new Error("Já existe um usuário com este e-mail nesta organização.");
  }

  const validUnitId = unitId || null;

  await sql`
    insert into saas_users (
      organization_id,
      unit_id,
      name,
      email,
      role,
      is_active
    ) values (
      ${currentUser.organization.id},
      ${validUnitId},
      ${name},
      ${email},
      ${role},
      true
    )
  `;

  await sql`
    insert into audit_logs (
      organization_id,
      user_id,
      module,
      action,
      entity_type,
      previous_data,
      new_data
    ) values (
      ${currentUser.organization.id},
      ${currentUser.id},
      'users',
      'create',
      'saas_users',
      null,
      ${JSON.stringify({
        name,
        email,
        role,
        unit_id: validUnitId,
      })}::jsonb
    )
  `;

  revalidatePath("/app/cadastros/usuarios");
}
