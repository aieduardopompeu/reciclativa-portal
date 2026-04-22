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

export async function createReceivableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();

  const unitId = text(formData.get("unit_id"));
  const customerId = text(formData.get("customer_id"));
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

  if (customerId) {
    const customerCheck = await sql<{ id: string }>`
      select id
      from customers
      where id = ${customerId}
        and organization_id = ${user.organization.id}
        and is_active = true
      limit 1
    `;
    if (!customerCheck.rows[0]) throw new Error("O cliente selecionado não pertence à organização atual.");
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
    insert into receivables (
      organization_id,
      unit_id,
      customer_id,
      financial_account_id,
      description,
      document_number,
      competence_date,
      due_date,
      amount,
      received_amount,
      status,
      notes,
      created_by
    ) values (
      ${user.organization.id},
      ${unitId},
      ${customerId || null},
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

  const receivableId = insertResult.rows[0]?.id;
  if (!receivableId) throw new Error("Não foi possível criar a conta a receber.");

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
      'receivables',
      'create',
      'receivables',
      ${receivableId},
      null,
      ${JSON.stringify({
        unit_id: unitId,
        customer_id: customerId || null,
        description,
        due_date: dueDate,
        amount,
        status: 'open',
      })}::jsonb
    )
  `;

  revalidatePath("/app/financeiro/contas-a-receber");
}

export async function receiveReceivableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  const receivableId = text(formData.get("receivable_id"));

  if (!receivableId) throw new Error("Conta inválida.");

  const result = await sql<{
    id: string;
    amount: number;
    status: string;
  }>`
    select id, amount, status
    from receivables
    where id = ${receivableId}
      and organization_id = ${user.organization.id}
    limit 1
  `;

  const receivable = result.rows[0];
  if (!receivable) throw new Error("Conta a receber não encontrada para esta organização.");
  if (receivable.status === 'received') {
    revalidatePath("/app/financeiro/contas-a-receber");
    return;
  }
  if (receivable.status === 'canceled') throw new Error("Conta cancelada não pode ser baixada.");

  await sql`
    update receivables
    set
      receipt_date = current_date,
      received_amount = ${receivable.amount},
      status = 'received'
    where id = ${receivableId}
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
      'receivables',
      'receive',
      'receivables',
      ${receivableId},
      null,
      ${JSON.stringify({
        receivable_id: receivableId,
        status: 'received',
        received_amount: Number(receivable.amount),
      })}::jsonb
    )
  `;

  revalidatePath("/app/financeiro/contas-a-receber");
}
