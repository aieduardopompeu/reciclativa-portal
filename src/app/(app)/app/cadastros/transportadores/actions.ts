"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import { assertCanPerformActionForUser } from "@/lib/saas/permissions";

function sanitizeText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function createCarrierAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "carriers", "create");

  const name = sanitizeText(formData.get("name"));
  const document = sanitizeText(formData.get("document"));
  const email = sanitizeText(formData.get("email")).toLowerCase();
  const phone = sanitizeText(formData.get("phone"));
  const whatsapp = sanitizeText(formData.get("whatsapp"));
  const vehicleInfo = sanitizeText(formData.get("vehicle_info"));

  if (!name) {
    throw new Error("O nome do transportador é obrigatório.");
  }

  await sql`
    insert into carriers (
      organization_id,
      name,
      document,
      email,
      phone,
      whatsapp,
      vehicle_info,
      is_active
    ) values (
      ${user.organization.id},
      ${name},
      ${document || null},
      ${email || null},
      ${phone || null},
      ${whatsapp || null},
      ${vehicleInfo || null},
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
      'carriers',
      'create',
      'carriers',
      null,
      ${JSON.stringify({
        name,
        document: document || null,
        email: email || null,
        phone: phone || null,
        whatsapp: whatsapp || null,
        vehicle_info: vehicleInfo || null,
      })}::jsonb
    )
  `;

  revalidatePath("/app/cadastros/transportadores");
}
