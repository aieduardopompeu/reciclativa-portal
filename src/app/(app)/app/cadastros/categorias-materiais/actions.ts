"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";

function sanitizeText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function createMaterialCategoryAction(formData: FormData) {
  const user = await getCurrentSaaSUser();

  const name = sanitizeText(formData.get("name"));
  const code = sanitizeText(formData.get("code")).toUpperCase();

  if (!name) {
    throw new Error("O nome da categoria é obrigatório.");
  }

  const existing = await sql<{ id: string }>`
    select id
    from material_categories
    where organization_id = ${user.organization.id}
      and lower(name) = lower(${name})
    limit 1
  `;

  if (existing.rows[0]) {
    throw new Error("Já existe uma categoria com este nome nesta organização.");
  }

  await sql`
    insert into material_categories (
      organization_id,
      name,
      code,
      is_active
    ) values (
      ${user.organization.id},
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
      'material_categories',
      'create',
      'material_categories',
      null,
      ${JSON.stringify({
        name,
        code: code || null,
      })}::jsonb
    )
  `;

  revalidatePath("/app/cadastros/categorias-materiais");
}
