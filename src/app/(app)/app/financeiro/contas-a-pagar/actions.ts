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
  supplierId?: string;
  financialAccountId?: string;
}) {
  const { organizationId, unitId, supplierId, financialAccountId } = params;

  const unitCheck = await sql<{ id: string }>`
    select id from organization_units
    where id = ${unitId}
      and organization_id = ${organizationId}
      and is_active = true
    limit 1
  `;
  if (!unitCheck.rows[0]) throw new Error("A unidade selecionada não pertence à organização atual.");

  if (supplierId) {
    const supplierCheck = await sql<{ id: string }>`
      select id from suppliers
      where id = ${supplierId}
        and organization_id = ${organizationId}
        and is_active = true
      limit 1
    `;
    if (!supplierCheck.rows[0]) throw new Error("O fornecedor selecionado não pertence à organização atual.");
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
  revalidatePath("/app/financeiro/contas-a-pagar");
  revalidatePath("/app/dashboard");
}

export async function createPayableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "create");
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

  await validateOrganizationRefs({
    organizationId: user.organization.id,
    unitId,
    supplierId: supplierId || undefined,
    financialAccountId: financialAccountId || undefined,
  });

  const insertResult = await sql<{ id: string }>`
    insert into payables (
      organization_id, unit_id, supplier_id, financial_account_id,
      description, document_number, competence_date, due_date,
      amount, paid_amount, status, notes, created_by
    ) values (
      ${user.organization.id}, ${unitId}, ${supplierId || null}, ${financialAccountId || null},
      ${description}, ${documentNumber || null}, ${competenceDate || null}, ${dueDate},
      ${amount}, 0, 'open', ${notes || null}, ${user.id}
    ) returning id
  `;

  const payableId = insertResult.rows[0]?.id;
  if (!payableId) throw new Error("Não foi possível criar a conta a pagar.");

  await sql`insert into audit_logs (
      organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data
    ) values (
      ${user.organization.id}, ${user.id}, 'payables', 'create', 'payables', ${payableId}, null,
      ${JSON.stringify({
        unit_id: unitId,
        supplier_id: supplierId || null,
        financial_account_id: financialAccountId || null,
        description,
        document_number: documentNumber || null,
        competence_date: competenceDate || null,
        due_date: dueDate,
        amount,
        notes: notes || null,
        status: "open",
      })}::jsonb
    )`;

  revalidateFinance();
  redirect("/app/financeiro/contas-a-pagar?feedback=created");
}

export async function updatePayableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "update");
  const payableId = text(formData.get("payable_id"));
  const unitId = text(formData.get("unit_id"));
  const supplierId = text(formData.get("supplier_id"));
  const financialAccountId = text(formData.get("financial_account_id"));
  const description = text(formData.get("description"));
  const documentNumber = text(formData.get("document_number"));
  const competenceDate = text(formData.get("competence_date"));
  const dueDate = text(formData.get("due_date"));
  const amount = decimal(formData.get("amount"));
  const notes = text(formData.get("notes"));

  if (!payableId) throw new Error("Conta inválida.");
  if (!unitId) throw new Error("A unidade é obrigatória.");
  if (!description) throw new Error("A descrição é obrigatória.");
  if (!dueDate) throw new Error("O vencimento é obrigatório.");
  if (amount === null || amount <= 0) throw new Error("O valor deve ser maior que zero.");

  const currentResult = await sql<{
    id: string;
    status: string;
    paid_amount: number;
    unit_id: string;
    supplier_id: string | null;
    financial_account_id: string | null;
    description: string;
    document_number: string | null;
    competence_date: string | null;
    due_date: string;
    amount: number;
    notes: string | null;
  }>`
    select
      id,
      status,
      paid_amount,
      unit_id::text,
      supplier_id::text,
      financial_account_id::text,
      description,
      document_number,
      competence_date::text,
      due_date::text,
      amount,
      notes
    from payables
    where id = ${payableId}
      and organization_id = ${user.organization.id}
    limit 1
  `;
  const current = currentResult.rows[0];
  if (!current) throw new Error("Conta a pagar não encontrada para esta organização.");
  if (!["open", "partial"].includes(current.status)) {
    throw new Error("Somente contas em aberto ou parciais podem ser editadas.");
  }
  if (amount <= Number(current.paid_amount || 0)) {
    throw new Error("O valor da conta deve ser maior que o valor já pago.");
  }

  await validateOrganizationRefs({
    organizationId: user.organization.id,
    unitId,
    supplierId: supplierId || undefined,
    financialAccountId: financialAccountId || undefined,
  });

  await sql`
    update payables
    set
      unit_id = ${unitId},
      supplier_id = ${supplierId || null},
      financial_account_id = ${financialAccountId || null},
      description = ${description},
      document_number = ${documentNumber || null},
      competence_date = ${competenceDate || null},
      due_date = ${dueDate},
      amount = ${amount},
      notes = ${notes || null},
      updated_at = now()
    where id = ${payableId}
  `;

  await sql`insert into audit_logs (
      organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data
    ) values (
      ${user.organization.id}, ${user.id}, 'payables', 'update', 'payables', ${payableId},
      ${JSON.stringify(current)}::jsonb,
      ${JSON.stringify({
        unit_id: unitId,
        supplier_id: supplierId || null,
        financial_account_id: financialAccountId || null,
        description,
        document_number: documentNumber || null,
        competence_date: competenceDate || null,
        due_date: dueDate,
        amount,
        notes: notes || null,
        status: current.status,
        paid_amount: Number(current.paid_amount || 0),
      })}::jsonb
    )`;

  revalidateFinance();
  redirect("/app/financeiro/contas-a-pagar?feedback=updated");
}

export async function payPayableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "update");
  const payableId = text(formData.get("payable_id"));
  if (!payableId) throw new Error("Conta inválida.");

  const result = await sql<{ id: string; amount: number; paid_amount: number; status: string }>`
    select id, amount, paid_amount, status
    from payables
    where id = ${payableId}
      and organization_id = ${user.organization.id}
    limit 1
  `;
  const payable = result.rows[0];
  if (!payable) throw new Error("Conta a pagar não encontrada para esta organização.");
  if (payable.status === "paid") {
    revalidateFinance();
    redirect("/app/financeiro/contas-a-pagar?feedback=already_paid");
  }
  if (payable.status === "canceled") throw new Error("Conta cancelada não pode ser baixada.");

  await sql`
    update payables
    set payment_date = current_date, paid_amount = ${payable.amount}, status = 'paid'
    where id = ${payableId}
  `;
  await sql`insert into audit_logs (
      organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data
    ) values (
      ${user.organization.id}, ${user.id}, 'payables', 'pay', 'payables', ${payableId}, null,
      ${JSON.stringify({
        payable_id: payableId,
        status: "paid",
        paid_amount: Number(payable.amount),
      })}::jsonb
    )`;

  revalidateFinance();
  redirect(`/app/financeiro/contas-a-pagar?feedback=paid_total&amount=${encodeURIComponent(toMoneyParam(Number(payable.amount)))}`);
}

export async function payPartialPayableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "update");
  const payableId = text(formData.get("payable_id"));
  const partialAmount = decimal(formData.get("partial_amount"));
  if (!payableId) throw new Error("Conta inválida.");
  if (partialAmount === null || partialAmount <= 0) {
    throw new Error("Informe um valor de baixa parcial maior que zero.");
  }

  const result = await sql<{ id: string; amount: number; paid_amount: number; status: string }>`
    select id, amount, paid_amount, status
    from payables
    where id = ${payableId}
      and organization_id = ${user.organization.id}
    limit 1
  `;
  const payable = result.rows[0];
  if (!payable) throw new Error("Conta a pagar não encontrada para esta organização.");
  if (payable.status === "paid") {
    revalidateFinance();
    redirect("/app/financeiro/contas-a-pagar?feedback=already_paid");
  }
  if (payable.status === "canceled") throw new Error("Conta cancelada não pode ser baixada.");

  const amount = Number(payable.amount ?? 0);
  const paidAmount = Number(payable.paid_amount ?? 0);
  const remaining = Number((amount - paidAmount).toFixed(2));
  if (remaining <= 0) {
    revalidateFinance();
    redirect("/app/financeiro/contas-a-pagar?feedback=no_remaining_balance");
  }
  if (partialAmount > remaining) {
    throw new Error(`O valor parcial não pode ser maior que o saldo restante de ${remaining.toFixed(2)}.`);
  }

  const newPaidAmount = Number((paidAmount + partialAmount).toFixed(2));
  const newRemaining = Number((amount - newPaidAmount).toFixed(2));
  const newStatus = newRemaining <= 0 ? "paid" : "partial";

  await sql`
    update payables
    set payment_date = current_date, paid_amount = ${newPaidAmount}, status = ${newStatus}
    where id = ${payableId}
  `;
  await sql`insert into audit_logs (
      organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data
    ) values (
      ${user.organization.id}, ${user.id}, 'payables', 'pay_partial', 'payables', ${payableId},
      ${JSON.stringify({
        amount,
        paid_amount: paidAmount,
        remaining,
        status: payable.status,
      })}::jsonb,
      ${JSON.stringify({
        partial_amount: partialAmount,
        paid_amount: newPaidAmount,
        remaining: newRemaining,
        status: newStatus,
      })}::jsonb
    )`;

  revalidateFinance();
  redirect(`/app/financeiro/contas-a-pagar?feedback=paid_partial&amount=${encodeURIComponent(toMoneyParam(partialAmount))}`);
}

export async function cancelPayableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "update");
  const payableId = text(formData.get("payable_id"));
  const cancelReason = text(formData.get("cancel_reason"));
  if (!payableId) throw new Error("Conta inválida.");
  if (!cancelReason) throw new Error("Informe o motivo do cancelamento.");

  const result = await sql<{ id: string; status: string; notes: string | null }>`
    select id, status, notes
    from payables
    where id = ${payableId}
      and organization_id = ${user.organization.id}
    limit 1
  `;
  const payable = result.rows[0];
  if (!payable) throw new Error("Conta a pagar não encontrada para esta organização.");
  if (payable.status === "paid") throw new Error("Conta paga não pode ser cancelada.");
  if (payable.status === "canceled") {
    revalidateFinance();
    redirect("/app/financeiro/contas-a-pagar?feedback=already_canceled");
  }

  const nextNotes = payable.notes?.trim()
    ? `${payable.notes.trim()}\n\n[Cancelamento] ${cancelReason}`
    : `[Cancelamento] ${cancelReason}`;

  await sql`
    update payables
    set status = 'canceled', notes = ${nextNotes}
    where id = ${payableId}
  `;
  await sql`insert into audit_logs (
      organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data
    ) values (
      ${user.organization.id}, ${user.id}, 'payables', 'cancel', 'payables', ${payableId},
      ${JSON.stringify({ status: payable.status, notes: payable.notes || null })}::jsonb,
      ${JSON.stringify({ status: "canceled", cancel_reason: cancelReason, notes: nextNotes })}::jsonb
    )`;

  revalidateFinance();
  redirect("/app/financeiro/contas-a-pagar?feedback=canceled");
}

export async function reversePayableAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "update");
  const payableId = text(formData.get("payable_id"));
  const reverseReason = text(formData.get("reverse_reason"));
  if (!payableId) throw new Error("Conta inválida.");
  if (!reverseReason) throw new Error("Informe o motivo do estorno.");

  const result = await sql<{ id: string; status: string; paid_amount: number; payment_date: string | null; notes: string | null }>`
    select id, status, paid_amount, payment_date::text, notes
    from payables
    where id = ${payableId}
      and organization_id = ${user.organization.id}
    limit 1
  `;
  const payable = result.rows[0];
  if (!payable) throw new Error("Conta a pagar não encontrada para esta organização.");
  if (payable.status === "canceled") throw new Error("Conta cancelada não pode ser estornada.");
  if (payable.status !== "paid") throw new Error("Somente contas pagas podem ser estornadas.");

  const nextNotes = payable.notes?.trim()
    ? `${payable.notes.trim()}\n\n[Estorno] ${reverseReason}`
    : `[Estorno] ${reverseReason}`;

  await sql`
    update payables
    set paid_amount = 0, payment_date = null, status = 'open', notes = ${nextNotes}, updated_at = now()
    where id = ${payableId}
  `;
  await sql`insert into audit_logs (
      organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data
    ) values (
      ${user.organization.id}, ${user.id}, 'payables', 'reverse', 'payables', ${payableId},
      ${JSON.stringify({
        status: payable.status,
        paid_amount: Number(payable.paid_amount || 0),
        payment_date: payable.payment_date,
        notes: payable.notes || null,
      })}::jsonb,
      ${JSON.stringify({
        status: "open",
        paid_amount: 0,
        payment_date: null,
        reverse_reason: reverseReason,
        notes: nextNotes,
      })}::jsonb
    )`;

  revalidateFinance();
  redirect("/app/financeiro/contas-a-pagar?feedback=reversed");
}

export async function paySelectedPayablesAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "finance", "update");
  const payableIds = formData
    .getAll("payable_ids")
    .map((value) => text(value))
    .filter(Boolean);

  if (payableIds.length === 0) {
    throw new Error("Selecione ao menos uma conta para quitar em lote.");
  }

  const uniqueIds = Array.from(new Set(payableIds));
  if (uniqueIds.length === 0) {
    throw new Error("Selecione ao menos uma conta para quitar em lote.");
  }

  const idsCsv = uniqueIds.join(",");

  const result = await sql<{ id: string; amount: number; paid_amount: number; status: string }>`
    select id, amount, paid_amount, status
    from payables
    where organization_id = ${user.organization.id}
      and id = any(string_to_array(${idsCsv}, ',')::uuid[])
  `;

  const eligible = result.rows.filter((item) => item.status !== "paid" && item.status !== "canceled");

  for (const payable of eligible) {
    await sql`
      update payables
      set payment_date = current_date, paid_amount = ${payable.amount}, status = 'paid'
      where id = ${payable.id}
    `;
    await sql`insert into audit_logs (
        organization_id, user_id, module, action, entity_type, entity_id, previous_data, new_data
      ) values (
        ${user.organization.id}, ${user.id}, 'payables', 'pay_batch', 'payables', ${payable.id},
        ${JSON.stringify({
          status: payable.status,
          paid_amount: Number(payable.paid_amount || 0),
          amount: Number(payable.amount || 0),
        })}::jsonb,
        ${JSON.stringify({
          status: "paid",
          paid_amount: Number(payable.amount || 0),
          source: "bulk_action",
        })}::jsonb
      )`;
  }

  revalidateFinance();
  redirect(`/app/financeiro/contas-a-pagar?feedback=paid_bulk&count=${eligible.length}`);
}
