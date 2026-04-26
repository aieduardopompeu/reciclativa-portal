"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import { assertCanPerformActionForUser } from "@/lib/saas/permissions";

function text(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function decimal(value: FormDataEntryValue | null): number | null {
  if (typeof value !== "string") return null;
  const raw = value.trim();
  if (!raw) return null;
  const normalized = raw.replace(/\s+/g, "").replace(/R\$/gi, "").replace(/\.(?=.*[,\.])/g, "").replace(",", ".");
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function toMoneyParam(value: number): string {
  return Number(value || 0).toFixed(2);
}

async function validateOrganizationRefs(params: {
  organizationId: string;
  unitId: string;
  customerId?: string;
  financialAccountId?: string;
}) {
  const { organizationId, unitId, customerId, financialAccountId } = params;

  const unitCheck = await sql<{ id: string }>`
    select id from organization_units
    where id = ${unitId}
      and organization_id = ${organizationId}
      and is_active = true
    limit 1
  `;
  if (!unitCheck.rows[0]) throw new Error("A unidade selecionada não pertence à organização atual.");

  if (customerId) {
    const customerCheck = await sql<{ id: string }>`
      select id from customers
      where id = ${customerId}
        and organization_id = ${organizationId}
        and is_active = true
      limit 1
    `;
    if (!customerCheck.rows[0]) throw new Error("O cliente selecionado não pertence à organização atual.");
  }

  if (financialAccountId) {
    const accountCheck = await sql<{ id: string }>`
      select id from financial_accounts
      where id = ${financialAccountId}
        and organization_id = ${organizationId}
        and is_active = true
      limit 1
    `;
    if (!accountCheck.rows[0]) throw new Error("A conta financeira selecionada não pertence à organização atual.");
  }
}

function revalidateFinance() {
  revalidatePath("/app/financeiro/contas-a-receber");
  revalidatePath("/app/dashboard");
}

export async function createReceivableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "create");
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

  await validateOrganizationRefs({ organizationId: user.organization.id, unitId, customerId: customerId || undefined, financialAccountId: financialAccountId || undefined });

  const insertResult = await sql<{ id: string }>`
    insert into receivables (
      organization_id, unit_id, customer_id, financial_account_id,
      description, document_number, competence_date, due_date,
      amount, received_amount, status, notes, created_by
    ) values (
      ${user.organization.id}, ${unitId}, ${customerId || null}, ${financialAccountId || null},
      ${description}, ${documentNumber || null}, ${competenceDate || null}, ${dueDate},
      ${amount}, 0, 'open', ${notes || null}, ${user.id}
    ) returning id
  `;

  const receivableId = insertResult.rows[0]?.id;
  if (!receivableId) throw new Error("Não foi possível criar a conta a receber.");

  await sql`
    insert into audit_logs (organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data)
    values (
      ${user.organization.id}, ${user.id}, 'receivables', 'create', 'receivables', ${receivableId}, null,
      ${JSON.stringify({ unit_id: unitId, customer_id: customerId || null, financial_account_id: financialAccountId || null, description, document_number: documentNumber || null, competence_date: competenceDate || null, due_date: dueDate, amount, notes: notes || null, status: 'open' })}::jsonb
    )
  `;

  revalidateFinance();
  redirect("/app/financeiro/contas-a-receber?feedback=created");
}

export async function updateReceivableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "update");
  const receivableId = text(formData.get("receivable_id"));
  const unitId = text(formData.get("unit_id"));
  const customerId = text(formData.get("customer_id"));
  const financialAccountId = text(formData.get("financial_account_id"));
  const description = text(formData.get("description"));
  const documentNumber = text(formData.get("document_number"));
  const competenceDate = text(formData.get("competence_date"));
  const dueDate = text(formData.get("due_date"));
  const amount = decimal(formData.get("amount"));
  const notes = text(formData.get("notes"));

  if (!receivableId) throw new Error("Conta inválida.");
  if (!unitId) throw new Error("A unidade é obrigatória.");
  if (!description) throw new Error("A descrição é obrigatória.");
  if (!dueDate) throw new Error("O vencimento é obrigatório.");
  if (amount === null || amount <= 0) throw new Error("O valor deve ser maior que zero.");

  const currentResult = await sql<{
    id: string;
    status: string;
    received_amount: number;
    unit_id: string;
    customer_id: string | null;
    financial_account_id: string | null;
    description: string;
    document_number: string | null;
    competence_date: string | null;
    due_date: string;
    amount: number;
    notes: string | null;
  }>`
    select id, status, received_amount, unit_id::text, customer_id::text, financial_account_id::text,
      description, document_number, competence_date::text, due_date::text, amount, notes
    from receivables
    where id = ${receivableId}
      and organization_id = ${user.organization.id}
    limit 1
  `;

  const current = currentResult.rows[0];
  if (!current) throw new Error("Conta a receber não encontrada para esta organização.");
  if (!["open", "partial"].includes(current.status)) throw new Error("Somente contas em aberto ou parciais podem ser editadas.");
  if (amount <= Number(current.received_amount || 0)) throw new Error("O valor da conta deve ser maior que o valor já recebido.");

  await validateOrganizationRefs({ organizationId: user.organization.id, unitId, customerId: customerId || undefined, financialAccountId: financialAccountId || undefined });

  await sql`
    update receivables
    set
      unit_id = ${unitId},
      customer_id = ${customerId || null},
      financial_account_id = ${financialAccountId || null},
      description = ${description},
      document_number = ${documentNumber || null},
      competence_date = ${competenceDate || null},
      due_date = ${dueDate},
      amount = ${amount},
      notes = ${notes || null},
      updated_at = now()
    where id = ${receivableId}
  `;

  await sql`
    insert into audit_logs (organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data)
    values (
      ${user.organization.id}, ${user.id}, 'receivables', 'update', 'receivables', ${receivableId},
      ${JSON.stringify(current)}::jsonb,
      ${JSON.stringify({ unit_id: unitId, customer_id: customerId || null, financial_account_id: financialAccountId || null, description, document_number: documentNumber || null, competence_date: competenceDate || null, due_date: dueDate, amount, notes: notes || null, status: current.status, received_amount: Number(current.received_amount || 0) })}::jsonb
    )
  `;

  revalidateFinance();
  redirect("/app/financeiro/contas-a-receber?feedback=updated");
}

export async function receiveReceivableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "update");
  const receivableId = text(formData.get("receivable_id"));
  if (!receivableId) throw new Error("Conta inválida.");

  const result = await sql<{ id: string; amount: number; received_amount: number; status: string }>`
    select id, amount, received_amount, status
    from receivables
    where id = ${receivableId} and organization_id = ${user.organization.id}
    limit 1
  `;
  const receivable = result.rows[0];
  if (!receivable) throw new Error("Conta a receber não encontrada para esta organização.");
  if (receivable.status === "received") {
    revalidateFinance();
    redirect("/app/financeiro/contas-a-receber?feedback=already_received");
  }
  if (receivable.status === "canceled") throw new Error("Conta cancelada não pode ser baixada.");

  await sql`update receivables set receipt_date = current_date, received_amount = ${receivable.amount}, status = 'received' where id = ${receivableId}`;
  await sql`insert into audit_logs (organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data)
    values (${user.organization.id}, ${user.id}, 'receivables', 'receive', 'receivables', ${receivableId}, null, ${JSON.stringify({ receivable_id: receivableId, status: 'received', received_amount: Number(receivable.amount) })}::jsonb)`;

  revalidateFinance();
  redirect(`/app/financeiro/contas-a-receber?feedback=received_total&amount=${encodeURIComponent(toMoneyParam(Number(receivable.amount)))}`);
}

export async function receivePartialReceivableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "update");
  const receivableId = text(formData.get("receivable_id"));
  const partialAmount = decimal(formData.get("partial_amount"));
  if (!receivableId) throw new Error("Conta inválida.");
  if (partialAmount === null || partialAmount <= 0) throw new Error("Informe um valor de recebimento parcial maior que zero.");

  const result = await sql<{ id: string; amount: number; received_amount: number; status: string }>`
    select id, amount, received_amount, status
    from receivables
    where id = ${receivableId} and organization_id = ${user.organization.id}
    limit 1
  `;
  const receivable = result.rows[0];
  if (!receivable) throw new Error("Conta a receber não encontrada para esta organização.");
  if (receivable.status === "received") {
    revalidateFinance();
    redirect("/app/financeiro/contas-a-receber?feedback=already_received");
  }
  if (receivable.status === "canceled") throw new Error("Conta cancelada não pode ser baixada.");

  const amount = Number(receivable.amount ?? 0);
  const receivedAmount = Number(receivable.received_amount ?? 0);
  const remaining = Number((amount - receivedAmount).toFixed(2));
  if (remaining <= 0) {
    revalidateFinance();
    redirect("/app/financeiro/contas-a-receber?feedback=no_remaining_balance");
  }
  if (partialAmount > remaining) throw new Error(`O valor parcial não pode ser maior que o saldo restante de ${remaining.toFixed(2)}.`);

  const newReceivedAmount = Number((receivedAmount + partialAmount).toFixed(2));
  const newRemaining = Number((amount - newReceivedAmount).toFixed(2));
  const newStatus = newRemaining <= 0 ? "received" : "partial";

  await sql`update receivables set receipt_date = current_date, received_amount = ${newReceivedAmount}, status = ${newStatus} where id = ${receivableId}`;
  await sql`insert into audit_logs (organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data)
    values (${user.organization.id}, ${user.id}, 'receivables', 'receive_partial', 'receivables', ${receivableId},
      ${JSON.stringify({ amount, received_amount: receivedAmount, remaining, status: receivable.status })}::jsonb,
      ${JSON.stringify({ partial_amount: partialAmount, received_amount: newReceivedAmount, remaining: newRemaining, status: newStatus })}::jsonb)`;

  revalidateFinance();
  redirect(`/app/financeiro/contas-a-receber?feedback=received_partial&amount=${encodeURIComponent(toMoneyParam(partialAmount))}`);
}

export async function cancelReceivableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "update");
  const receivableId = text(formData.get("receivable_id"));
  const cancelReason = text(formData.get("cancel_reason"));
  if (!receivableId) throw new Error("Conta inválida.");
  if (!cancelReason) throw new Error("Informe o motivo do cancelamento.");

  const result = await sql<{ id: string; status: string; notes: string | null }>`
    select id, status, notes from receivables where id = ${receivableId} and organization_id = ${user.organization.id} limit 1
  `;
  const receivable = result.rows[0];
  if (!receivable) throw new Error("Conta a receber não encontrada para esta organização.");
  if (receivable.status === "received") throw new Error("Conta recebida não pode ser cancelada.");
  if (receivable.status === "canceled") {
    revalidateFinance();
    redirect("/app/financeiro/contas-a-receber?feedback=already_canceled");
  }

  const nextNotes = receivable.notes?.trim() ? `${receivable.notes.trim()}\n\n[Cancelamento] ${cancelReason}` : `[Cancelamento] ${cancelReason}`;
  await sql`update receivables set status = 'canceled', notes = ${nextNotes} where id = ${receivableId}`;
  await sql`insert into audit_logs (organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data)
    values (${user.organization.id}, ${user.id}, 'receivables', 'cancel', 'receivables', ${receivableId},
      ${JSON.stringify({ status: receivable.status, notes: receivable.notes || null })}::jsonb,
      ${JSON.stringify({ status: 'canceled', cancel_reason: cancelReason, notes: nextNotes })}::jsonb)`;

  revalidateFinance();
  redirect("/app/financeiro/contas-a-receber?feedback=canceled");
}

export async function reverseReceivableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "update");
  const receivableId = text(formData.get("receivable_id"));
  const reverseReason = text(formData.get("reverse_reason"));
  if (!receivableId) throw new Error("Conta inválida.");
  if (!reverseReason) throw new Error("Informe o motivo do estorno.");

  const result = await sql<{ id: string; status: string; received_amount: number; receipt_date: string | null; notes: string | null }>`
    select id, status, received_amount, receipt_date::text, notes from receivables where id = ${receivableId} and organization_id = ${user.organization.id} limit 1
  `;
  const receivable = result.rows[0];
  if (!receivable) throw new Error("Conta a receber não encontrada para esta organização.");
  if (receivable.status === "canceled") throw new Error("Conta cancelada não pode ser estornada.");
  if (receivable.status !== "received") throw new Error("Somente contas recebidas podem ser estornadas.");

  const nextNotes = receivable.notes?.trim() ? `${receivable.notes.trim()}\n\n[Estorno] ${reverseReason}` : `[Estorno] ${reverseReason}`;
  await sql`update receivables set received_amount = 0, receipt_date = null, status = 'open', notes = ${nextNotes} where id = ${receivableId}`;
  await sql`insert into audit_logs (organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data)
    values (${user.organization.id}, ${user.id}, 'receivables', 'reverse', 'receivables', ${receivableId},
      ${JSON.stringify({ status: receivable.status, received_amount: Number(receivable.received_amount || 0), receipt_date: receivable.receipt_date, notes: receivable.notes || null })}::jsonb,
      ${JSON.stringify({ status: 'open', received_amount: 0, receipt_date: null, reverse_reason: reverseReason, notes: nextNotes })}::jsonb)`;

  revalidateFinance();
  redirect("/app/financeiro/contas-a-receber?feedback=reversed");
}

export async function receiveSelectedReceivablesAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "update");
  const receivableIds = formData.getAll("receivable_ids").map((value) => text(value)).filter(Boolean);
  if (receivableIds.length === 0) throw new Error("Selecione ao menos uma conta para receber em lote.");

  const uniqueIds = Array.from(new Set(receivableIds));
  if (uniqueIds.length === 0) {
    revalidateFinance();
    redirect("/app/financeiro/contas-a-receber?feedback=received_bulk&count=0");
  }

  const idsCsv = uniqueIds.join(",");

  const result = await sql<{ id: string; amount: number; received_amount: number; status: string }>`
    select id, amount, received_amount, status
    from receivables
    where organization_id = ${user.organization.id}
      and id = any(string_to_array(${idsCsv}, ',')::uuid[])
  `;

  const eligible = result.rows.filter((item) => item.status !== "received" && item.status !== "canceled");
  for (const receivable of eligible) {
    await sql`update receivables set receipt_date = current_date, received_amount = ${receivable.amount}, status = 'received' where id = ${receivable.id}`;
    await sql`insert into audit_logs (organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data)
      values (${user.organization.id}, ${user.id}, 'receivables', 'receive_batch', 'receivables', ${receivable.id},
        ${JSON.stringify({ status: receivable.status, received_amount: Number(receivable.received_amount || 0), amount: Number(receivable.amount || 0) })}::jsonb,
        ${JSON.stringify({ status: 'received', received_amount: Number(receivable.amount || 0), source: 'bulk_action' })}::jsonb)`;
  }

  revalidateFinance();
  redirect(`/app/financeiro/contas-a-receber?feedback=received_bulk&count=${eligible.length}`);
}
