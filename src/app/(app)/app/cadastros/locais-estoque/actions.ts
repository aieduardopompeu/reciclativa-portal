"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import { assertCanPerformActionForUser } from "@/lib/saas/permissions";

function sanitizeText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function createInventoryLocationAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "inventory_locations", "create");

  const unitId = sanitizeText(formData.get("unit_id"));
  const name = sanitizeText(formData.get("name"));
  const code = sanitizeText(formData.get("code")).toUpperCase();

  if (!unitId) {
    throw new Error("A unidade é obrigatória.");
  }

  if (!name) {
    throw new Error("O nome do local de estoque é obrigatório.");
  }

  const unitCheck = await sql<{ id: string }>`
    select id
    from organization_units
    where id = ${unitId}
      and organization_id = ${user.organization.id}
      and is_active = true
    limit 1
  `;

  if (!unitCheck.rows[0]) {
    throw new Error("A unidade selecionada não pertence à organização atual.");
  }

  const existing = await sql<{ id: string }>`
    select id
    from inventory_locations
    where organization_id = ${user.organization.id}
      and unit_id = ${unitId}
      and lower(name) = lower(${name})
    limit 1
  `;

  if (existing.rows[0]) {
    throw new Error("Já existe um local de estoque com este nome nesta unidade.");
  }

  await sql`
    insert into inventory_locations (
      organization_id,
      unit_id,
      name,
      code,
      is_active
    ) values (
      ${user.organization.id},
      ${unitId},
      ${name},
      ${code || null},
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
      ${user.organization.id},
      ${user.id},
      'inventory_locations',
      'create',
      'inventory_locations',
      null,
      ${JSON.stringify({
        unit_id: unitId,
        name,
        code: code || null,
      })}::jsonb
    )
  `;

  revalidatePath("/app/cadastros/locais-estoque");
}
