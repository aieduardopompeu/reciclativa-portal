"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import { assertCanPerformActionForUser } from "@/lib/saas/permissions";

function sanitizeText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function createCustomerAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "customers", "create");

  const name = sanitizeText(formData.get("name"));
  const document = sanitizeText(formData.get("document"));
  const email = sanitizeText(formData.get("email")).toLowerCase();
  const phone = sanitizeText(formData.get("phone"));
  const whatsapp = sanitizeText(formData.get("whatsapp"));
  const contactName = sanitizeText(formData.get("contact_name"));
  const city = sanitizeText(formData.get("city"));
  const state = sanitizeText(formData.get("state")).toUpperCase();
  const notes = sanitizeText(formData.get("notes"));

  if (!name) {
    throw new Error("O nome do cliente é obrigatório.");
  }

  if (state && state.length !== 2) {
    throw new Error("A UF deve ter 2 caracteres.");
  }

  await sql`
    insert into customers (
      organization_id,
      name,
      document,
      email,
      phone,
      whatsapp,
      contact_name,
      city,
      state,
      notes,
      is_active
    ) values (
      ${user.organization.id},
      ${name},
      ${document || null},
      ${email || null},
      ${phone || null},
      ${whatsapp || null},
      ${contactName || null},
      ${city || null},
      ${state || null},
      ${notes || null},
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
      'customers',
      'create',
      'customers',
      null,
      ${JSON.stringify({
        name,
        document: document || null,
        email: email || null,
        phone: phone || null,
        whatsapp: whatsapp || null,
        contact_name: contactName || null,
        city: city || null,
        state: state || null,
      })}::jsonb
    )
  `;

  revalidatePath("/app/cadastros/clientes");
}
