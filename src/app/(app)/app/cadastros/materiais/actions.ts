"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";

function sanitizeText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeDecimal(value: FormDataEntryValue | null): number | null {
  if (typeof value !== "string") return null;
  const normalized = value.replace(",", ".").trim();
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function createMaterialAction(formData: FormData) {
  const user = await getCurrentSaaSUser();

  const categoryId = sanitizeText(formData.get("category_id"));
  const code = sanitizeText(formData.get("code")).toUpperCase();
  const name = sanitizeText(formData.get("name"));
  const unitOfMeasure = sanitizeText(formData.get("unit_of_measure")).toLowerCase();
  const residueClassification = sanitizeText(formData.get("residue_classification"));
  const defaultPurchasePrice = sanitizeDecimal(formData.get("default_purchase_price"));
  const defaultSalePrice = sanitizeDecimal(formData.get("default_sale_price"));

  if (!name) {
    throw new Error("O nome do material é obrigatório.");
  }

  if (!unitOfMeasure) {
    throw new Error("A unidade de medida é obrigatória.");
  }

  const existing = await sql<{ id: string }>`
    select id
    from materials
    where organization_id = ${user.organization.id}
      and lower(name) = lower(${name})
    limit 1
  `;

  if (existing.rows[0]) {
    throw new Error("Já existe um material com este nome nesta organização.");
  }

  await sql`
    insert into materials (
      organization_id,
      category_id,
      code,
      name,
      unit_of_measure,
      residue_classification,
      default_purchase_price,
      default_sale_price,
      is_active
    ) values (
      ${user.organization.id},
      ${categoryId || null},
      ${code || null},
      ${name},
      ${unitOfMeasure},
      ${residueClassification || null},
      ${defaultPurchasePrice},
      ${defaultSalePrice},
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
      'materials',
      'create',
      'materials',
      null,
      ${JSON.stringify({
        category_id: categoryId || null,
        code: code || null,
        name,
        unit_of_measure: unitOfMeasure,
        residue_classification: residueClassification || null,
        default_purchase_price: defaultPurchasePrice,
        default_sale_price: defaultSalePrice,
      })}::jsonb
    )
  `;

  revalidatePath("/app/cadastros/materiais");
}
