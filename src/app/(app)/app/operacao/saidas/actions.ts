"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import { assertCanPerformActionForUser } from "@/lib/saas/permissions";

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

type ReceiptItemInput = {
  materialId: string;
  locationId: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

async function upsertBalanceFromMovements(params: {
  organizationId: string;
  unitId: string;
  materialId: string;
  locationId: string | null;
}) {
  const { organizationId, unitId, materialId, locationId } = params;

  let aggregateResult;
  if (locationId) {
    aggregateResult = await sql<{
      current_quantity: number;
      average_cost: number;
    }>`
      select
        coalesce(sum(quantity_in - quantity_out), 0) as current_quantity,
        case
          when coalesce(sum(quantity_in), 0) > 0
            then round(sum(coalesce(total_cost, 0)) / nullif(sum(quantity_in), 0), 2)
          else 0
        end as average_cost
      from inventory_movements
      where organization_id = ${organizationId}
        and unit_id = ${unitId}
        and material_id = ${materialId}
        and location_id = ${locationId}
    `;
  } else {
    aggregateResult = await sql<{
      current_quantity: number;
      average_cost: number;
    }>`
      select
        coalesce(sum(quantity_in - quantity_out), 0) as current_quantity,
        case
          when coalesce(sum(quantity_in), 0) > 0
            then round(sum(coalesce(total_cost, 0)) / nullif(sum(quantity_in), 0), 2)
          else 0
        end as average_cost
      from inventory_movements
      where organization_id = ${organizationId}
        and unit_id = ${unitId}
        and material_id = ${materialId}
        and location_id is null
    `;
  }

  const currentQuantity = Number(aggregateResult.rows[0]?.current_quantity ?? 0);
  const averageCost = Number(aggregateResult.rows[0]?.average_cost ?? 0);

  let balanceResult;
  if (locationId) {
    balanceResult = await sql<{ id: string }>`
      select id
      from inventory_balances
      where organization_id = ${organizationId}
        and unit_id = ${unitId}
        and material_id = ${materialId}
        and location_id = ${locationId}
      limit 1
    `;
  } else {
    balanceResult = await sql<{ id: string }>`
      select id
      from inventory_balances
      where organization_id = ${organizationId}
        and unit_id = ${unitId}
        and material_id = ${materialId}
        and location_id is null
      limit 1
    `;
  }

  const existingBalance = balanceResult.rows[0];

  if (existingBalance) {
    await sql`
      update inventory_balances
      set
        current_quantity = ${currentQuantity},
        average_cost = ${averageCost}
      where id = ${existingBalance.id}
    `;
    return;
  }

  if (currentQuantity !== 0) {
    await sql`
      insert into inventory_balances (
        organization_id,
        unit_id,
        location_id,
        material_id,
        current_quantity,
        average_cost
      ) values (
        ${organizationId},
        ${unitId},
        ${locationId},
        ${materialId},
        ${currentQuantity},
        ${averageCost}
      )
    `;
  }
}

export async function createReceiptAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "operation", "create");

  const unitId = sanitizeText(formData.get("unit_id"));
  const supplierId = sanitizeText(formData.get("supplier_id"));
  const carrierId = sanitizeText(formData.get("carrier_id"));
  const receiptNumber = sanitizeText(formData.get("receipt_number"));
  const receiptDate = sanitizeText(formData.get("receipt_date"));
  const grossWeight = sanitizeDecimal(formData.get("gross_weight"));
  const netWeight = sanitizeDecimal(formData.get("net_weight"));
  const notes = sanitizeText(formData.get("notes"));

  if (!unitId) throw new Error("A unidade é obrigatória.");
  if (!supplierId) throw new Error("O fornecedor é obrigatório.");
  if (!receiptDate) throw new Error("A data da entrada é obrigatória.");

  const materialIds = formData.getAll("item_material_id").map((v) => sanitizeText(v));
  const locationIds = formData.getAll("item_location_id").map((v) => sanitizeText(v));
  const quantities = formData.getAll("item_quantity").map((v) => sanitizeDecimal(v));
  const unitPrices = formData.getAll("item_unit_price").map((v) => sanitizeDecimal(v) ?? 0);

  const items: ReceiptItemInput[] = [];

  for (let i = 0; i < materialIds.length; i += 1) {
    const materialId = materialIds[i] || "";
    const quantity = quantities[i];
    const unitPrice = unitPrices[i] ?? 0;
    const locationId = locationIds[i] || null;

    const hasAnyValue = Boolean(materialId || quantity !== null || unitPrice > 0 || locationId);
    if (!hasAnyValue) continue;

    if (!materialId) throw new Error(`O material do item ${i + 1} é obrigatório.`);
    if (quantity === null || quantity <= 0) {
      throw new Error(`A quantidade do item ${i + 1} deve ser maior que zero.`);
    }

    items.push({
      materialId,
      locationId,
      quantity,
      unitPrice,
      totalPrice: Number((quantity * unitPrice).toFixed(2)),
    });
  }

  if (items.length === 0) {
    throw new Error("Adicione pelo menos 1 item à entrada.");
  }

  const totalAmount = Number(
    items.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2),
  );

  const unitCheck = await sql<{ id: string }>`
    select id
    from organization_units
    where id = ${unitId}
      and organization_id = ${user.organization.id}
      and is_active = true
    limit 1
  `;
  if (!unitCheck.rows[0]) throw new Error("A unidade selecionada não pertence à organização atual.");

  const supplierCheck = await sql<{ id: string }>`
    select id
    from suppliers
    where id = ${supplierId}
      and organization_id = ${user.organization.id}
      and is_active = true
    limit 1
  `;
  if (!supplierCheck.rows[0]) throw new Error("O fornecedor selecionado não pertence à organização atual.");

  if (carrierId) {
    const carrierCheck = await sql<{ id: string }>`
      select id
      from carriers
      where id = ${carrierId}
        and organization_id = ${user.organization.id}
        and is_active = true
      limit 1
    `;
    if (!carrierCheck.rows[0]) {
      throw new Error("O transportador selecionado não pertence à organização atual.");
    }
  }

  for (const item of items) {
    const materialCheck = await sql<{ id: string }>`
      select id
      from materials
      where id = ${item.materialId}
        and organization_id = ${user.organization.id}
        and is_active = true
      limit 1
    `;
    if (!materialCheck.rows[0]) throw new Error("Um dos materiais não pertence à organização atual.");

    if (item.locationId) {
      const locationCheck = await sql<{ id: string }>`
        select id
        from inventory_locations
        where id = ${item.locationId}
          and organization_id = ${user.organization.id}
          and is_active = true
        limit 1
      `;
      if (!locationCheck.rows[0]) {
        throw new Error("Um dos locais de estoque não pertence à organização atual.");
      }
    }
  }

  const receiptInsert = await sql<{ id: string }>`
    insert into receipts (
      organization_id,
      unit_id,
      supplier_id,
      carrier_id,
      receipt_number,
      receipt_date,
      gross_weight,
      net_weight,
      total_amount,
      status,
      notes,
      created_by
    ) values (
      ${user.organization.id},
      ${unitId},
      ${supplierId},
      ${carrierId || null},
      ${receiptNumber || null},
      ${receiptDate},
      ${grossWeight},
      ${netWeight},
      ${totalAmount},
      'draft',
      ${notes || null},
      ${user.id}
    )
    returning id
  `;

  const receiptId = receiptInsert.rows[0]?.id;
  if (!receiptId) throw new Error("Não foi possível criar a entrada.");

  for (const item of items) {
    await sql`
      insert into receipt_items (
        receipt_id,
        material_id,
        quantity,
        unit_price,
        total_price,
        location_id,
        notes
      ) values (
        ${receiptId},
        ${item.materialId},
        ${item.quantity},
        ${item.unitPrice},
        ${item.totalPrice},
        ${item.locationId},
        ${notes || null}
      )
    `;
  }

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
      'receipts',
      'create',
      'receipts',
      ${receiptId},
      null,
      ${JSON.stringify({
        unit_id: unitId,
        supplier_id: supplierId,
        carrier_id: carrierId || null,
        receipt_number: receiptNumber || null,
        receipt_date: receiptDate,
        items_count: items.length,
        total_amount: totalAmount,
        status: 'draft',
      })}::jsonb
    )
  `;

  revalidatePath("/app/operacao/entradas");
}

export async function confirmReceiptAction(formData: FormData) {
  const user = await getCurrentSaaSUser();
  assertCanPerformActionForUser(user, "operation", "update");
  const receiptId = sanitizeText(formData.get("receipt_id"));

  if (!receiptId) {
    throw new Error("Entrada inválida.");
  }

  const receiptResult = await sql<{
    id: string;
    organization_id: string;
    unit_id: string;
    status: string;
    receipt_number: string | null;
  }>`
    select id, organization_id, unit_id, status, receipt_number
    from receipts
    where id = ${receiptId}
      and organization_id = ${user.organization.id}
    limit 1
  `;

  const receipt = receiptResult.rows[0];
  if (!receipt) {
    throw new Error("Entrada não encontrada para esta organização.");
  }

  if (receipt.status === 'canceled') {
    throw new Error("Entradas canceladas não podem ser confirmadas.");
  }

  const itemsResult = await sql<{
    id: string;
    material_id: string;
    location_id: string | null;
    quantity: number;
    unit_price: number | null;
    total_price: number | null;
  }>`
    select id, material_id, location_id, quantity, unit_price, total_price
    from receipt_items
    where receipt_id = ${receiptId}
    order by id asc
  `;

  const items = itemsResult.rows;
  if (items.length === 0) {
    throw new Error("A entrada não possui itens para confirmação.");
  }

  const movementCheck = await sql<{ id: string }>`
    select id
    from inventory_movements
    where receipt_id = ${receiptId}
      and organization_id = ${user.organization.id}
    limit 1
  `;

  if (!movementCheck.rows[0]) {
    for (const item of items) {
      await sql`
        insert into inventory_movements (
          organization_id,
          unit_id,
          location_id,
          material_id,
          receipt_id,
          movement_type,
          quantity_in,
          quantity_out,
          unit_cost,
          total_cost,
          occurred_at,
          notes,
          created_by
        ) values (
          ${user.organization.id},
          ${receipt.unit_id},
          ${item.location_id},
          ${item.material_id},
          ${receiptId},
          'receipt_confirmation',
          ${item.quantity},
          0,
          ${item.unit_price ?? 0},
          ${item.total_price ?? 0},
          now(),
          ${receipt.receipt_number ? `Confirmação da entrada ${receipt.receipt_number}` : 'Confirmação de entrada'},
          ${user.id}
        )
      `;
    }
  }

  for (const item of items) {
    await upsertBalanceFromMovements({
      organizationId: user.organization.id,
      unitId: receipt.unit_id,
      materialId: item.material_id,
      locationId: item.location_id,
    });
  }

  if (receipt.status !== 'confirmed') {
    await sql`
      update receipts
      set status = 'confirmed'
      where id = ${receiptId}
    `;
  }

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
      'receipts',
      'confirm',
      'receipts',
      ${receiptId},
      null,
      ${JSON.stringify({
        receipt_id: receiptId,
        status: 'confirmed',
        stock_balance_synced: true,
      })}::jsonb
    )
  `;

  revalidatePath("/app/operacao/entradas");
  revalidatePath("/app/operacao/estoque");
  revalidatePath("/app/operacao/movimentos");
}
export {
  createReceiptAction as createShipmentAction,
  confirmReceiptAction as confirmShipmentAction,
};