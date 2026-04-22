"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";

function text(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function decimal(value: FormDataEntryValue | null): number | null {
  if (typeof value !== "string") return null;
  const normalized = value.replace(",", ".").trim();
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function createPayableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();

  const unitId = text(formData.get("unit_id"));
  const supplierId = text(formData.get("supplier_id"));
  const financialAccountId = text(formData.get("financial_account_id"));
  const description = text(formData.get("description"));
  const documentNumber = text(formData.get("document_number"));
  const competenceDate = text(formData.get("competence_date"));
  const dueDate = text(formData.get("due_date"));
  const amount = decimal(formData.get("amount"));
  const notes = text(formData.get("notes"));

  if (!unitId) throw new Error("A unidade é obrigatória.");
  if (!description) throw new Error("A descrição é obrigatória.");
  if (!dueDate) throw new Error("O vencimento é obrigatório.");
  if (amount === null || amount <= 0) throw new Error("O valor deve ser maior que zero.");

  const unitCheck = await sql<{ id: string }>`
    select id
    from organization_units
    where id = ${unitId}
      and organization_id = ${user.organization.id}
      and is_active = true
    limit 1
  `;
  if (!unitCheck.rows[0]) throw new Error("A unidade selecionada não pertence à organização atual.");

  if (supplierId) {
    const supplierCheck = await sql<{ id: string }>`
      select id
      from suppliers
      where id = ${supplierId}
        and organization_id = ${user.organization.id}
        and is_active = true
      limit 1
    `;
    if (!supplierCheck.rows[0]) throw new Error("O fornecedor selecionado não pertence à organização atual.");
  }

  if (financialAccountId) {
    const accountCheck = await sql<{ id: string }>`
      select id
      from financial_accounts
      where id = ${financialAccountId}
        and organization_id = ${user.organization.id}
        and is_active = true
      limit 1
    `;
    if (!accountCheck.rows[0]) throw new Error("A conta financeira selecionada não pertence à organização atual.");
  }

  const insertResult = await sql<{ id: string }>`
    insert into payables (
      organization_id,
      unit_id,
      supplier_id,
      financial_account_id,
      description,
      document_number,
      competence_date,
      due_date,
      amount,
      paid_amount,
      status,
      notes,
      created_by
    ) values (
      ${user.organization.id},
      ${unitId},
      ${supplierId || null},
      ${financialAccountId || null},
      ${description},
      ${documentNumber || null},
      ${competenceDate || null},
      ${dueDate},
      ${amount},
      0,
      'open',
      ${notes || null},
      ${user.id}
    )
    returning id
  `;

  const payableId = insertResult.rows[0]?.id;
  if (!payableId) throw new Error("Não foi possível criar a conta a pagar.");

  await sql`
    insert into audit_logs (
      organization_id,
      user_id,
      module,
      action,
      entity_type,
      entity_id,
      previous_data,
      new_data
    ) values (
      ${user.organization.id},
      ${user.id},
      'payables',
      'create',
      'payables',
      ${payableId},
      null,
      ${JSON.stringify({
        unit_id: unitId,
        supplier_id: supplierId || null,
        description,
        due_date: dueDate,
        amount,
        status: 'open',
      })}::jsonb
    )
  `;

  revalidatePath("/app/financeiro/contas-a-pagar");
}

export async function payPayableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  const payableId = text(formData.get("payable_id"));

  if (!payableId) throw new Error("Conta inválida.");

  const result = await sql<{
    id: string;
    amount: number;
    status: string;
  }>`
    select id, amount, status
    from payables
    where id = ${payableId}
      and organization_id = ${user.organization.id}
    limit 1
  `;

  const payable = result.rows[0];
  if (!payable) throw new Error("Conta a pagar não encontrada para esta organização.");
  if (payable.status === 'paid') {
    revalidatePath("/app/financeiro/contas-a-pagar");
    return;
  }
  if (payable.status === 'canceled') throw new Error("Conta cancelada não pode ser baixada.");

  await sql`
    update payables
    set
      payment_date = current_date,
      paid_amount = ${payable.amount},
      status = 'paid'
    where id = ${payableId}
  `;

  await sql`
    insert into audit_logs (
      organization_id,
      user_id,
      module,
      action,
      entity_type,
      entity_id,
      previous_data,
      new_data
    ) values (
      ${user.organization.id},
      ${user.id},
      'payables',
      'pay',
      'payables',
      ${payableId},
      null,
      ${JSON.stringify({
        payable_id: payableId,
        status: 'paid',
        paid_amount: Number(payable.amount),
      })}::jsonb
    )
  `;

  revalidatePath("/app/financeiro/contas-a-pagar");
}
