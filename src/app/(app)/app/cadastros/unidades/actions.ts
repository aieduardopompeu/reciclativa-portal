"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";

function sanitizeText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function createUnitAction(formData: FormData) {
  const user = await getCurrentSaaSUser();

  const name = sanitizeText(formData.get("name"));
  const code = sanitizeText(formData.get("code"));
  const phone = sanitizeText(formData.get("phone"));
  const whatsapp = sanitizeText(formData.get("whatsapp"));
  const email = sanitizeText(formData.get("email")).toLowerCase();
  const zipCode = sanitizeText(formData.get("zip_code"));
  const address = sanitizeText(formData.get("address"));
  const number = sanitizeText(formData.get("number"));
  const complement = sanitizeText(formData.get("complement"));
  const neighborhood = sanitizeText(formData.get("neighborhood"));
  const city = sanitizeText(formData.get("city"));
  const state = sanitizeText(formData.get("state")).toUpperCase();
  const isHeadquarters = formData.get("is_headquarters") === "on";

  if (!name) {
    throw new Error("O nome da unidade é obrigatório.");
  }

  if (state && state.length !== 2) {
    throw new Error("A UF deve ter 2 caracteres.");
  }

  await sql`
    insert into organization_units (
      organization_id,
      name,
      code,
      phone,
      whatsapp,
      email,
      zip_code,
      address,
      number,
      complement,
      neighborhood,
      city,
      state,
      is_headquarters,
      is_active
    ) values (
      ${user.organization.id},
      ${name},
      ${code || null},
      ${phone || null},
      ${whatsapp || null},
      ${email || null},
      ${zipCode || null},
      ${address || null},
      ${number || null},
      ${complement || null},
      ${neighborhood || null},
      ${city || null},
      ${state || null},
      ${isHeadquarters},
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
      'units',
      'create',
      'organization_units',
      null,
      ${JSON.stringify({
        name,
        code: code || null,
        city: city || null,
        state: state || null,
        is_headquarters: isHeadquarters,
      })}::jsonb
    )
  `;

  revalidatePath("/app/cadastros/unidades");
}
