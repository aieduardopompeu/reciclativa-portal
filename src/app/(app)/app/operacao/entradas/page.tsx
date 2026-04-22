import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import { confirmReceiptAction, createReceiptAction } from "./actions";

export const dynamic = "force-dynamic";

type ReceiptRow = {
  id: string;
  receipt_number: string | null;
  receipt_date: string;
  total_amount: number;
  status: string;
  supplier_name: string;
  unit_name: string;
  items_count: number;
};

type OptionRow = {
  id: string;
  name: string;
};

async function getReceiptsByOrganization(organizationId: string): Promise<ReceiptRow[]> {
  const { rows } = await sql<ReceiptRow>`
    select
      r.id,
      r.receipt_number,
      to_char(r.receipt_date, 'YYYY-MM-DD') as receipt_date,
      r.total_amount,
      r.status,
      s.name as supplier_name,
      ou.name as unit_name,
      count(ri.id)::int as items_count
    from receipts r
    inner join suppliers s on s.id = r.supplier_id
    inner join organization_units ou on ou.id = r.unit_id
    left join receipt_items ri on ri.receipt_id = r.id
    where r.organization_id = ${organizationId}
    group by r.id, s.name, ou.name
    order by r.receipt_date desc, r.created_at desc
    limit 100
  `;
  return rows;
}

async function getUnits(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select id, name
    from organization_units
    where organization_id = ${organizationId}
      and is_active = true
    order by is_headquarters desc, name asc
  `;
  return rows;
}

async function getSuppliers(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select id, name
    from suppliers
    where organization_id = ${organizationId}
      and is_active = true
    order by name asc
  `;
  return rows;
}

async function getCarriers(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select id, name
    from carriers
    where organization_id = ${organizationId}
      and is_active = true
    order by name asc
  `;
  return rows;
}

async function getMaterials(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select id, name
    from materials
    where organization_id = ${organizationId}
      and is_active = true
    order by name asc
  `;
  return rows;
}

async function getLocations(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select id, name
    from inventory_locations
    where organization_id = ${organizationId}
      and is_active = true
    order by name asc
  `;
  return rows;
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-slate-50 px-5 py-8 text-sm text-slate-600">
      Nenhuma entrada encontrada para esta organização. Use o formulário abaixo para criar a primeira entrada.
    </div>
  );
}

function ItemRow({
  index,
  materials,
  locations,
}: {
  index: number;
  materials: OptionRow[];
  locations: OptionRow[];
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-slate-50 p-4">
      <p className="mb-3 text-sm font-semibold text-slate-800">Item {index + 1}</p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="block xl:col-span-2">
          <span className="mb-1 block text-sm font-medium text-slate-700">Material</span>
          <select
            name="item_material_id"
            defaultValue=""
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none"
          >
            <option value="">Selecione</option>
            {materials.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Quantidade</span>
          <input
            name="item_quantity"
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none"
            placeholder="0,000"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Valor unitário</span>
          <input
            name="item_unit_price"
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none"
            placeholder="0,00"
          />
        </label>

        <label className="block xl:col-span-2">
          <span className="mb-1 block text-sm font-medium text-slate-700">Local de estoque</span>
          <select
            name="item_location_id"
            defaultValue=""
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none"
          >
            <option value="">Sem local definido</option>
            {locations.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const label =
    status === 'confirmed' ? 'Confirmada' :
    status === 'canceled' ? 'Cancelada' :
    status === 'imported_xml' ? 'XML importado' : 'Rascunho';

  const className =
    status === 'confirmed'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : status === 'canceled'
      ? 'bg-red-50 text-red-700 border-red-200'
      : 'bg-amber-50 text-amber-700 border-amber-200';

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}

export default async function SaaSReceiptsPage() {
  const user = await getCurrentSaaSUser();
  const [receipts, units, suppliers, carriers, materials, locations] = await Promise.all([
    getReceiptsByOrganization(user.organization.id),
    getUnits(user.organization.id),
    getSuppliers(user.organization.id),
    getCarriers(user.organization.id),
    getMaterials(user.organization.id),
    getLocations(user.organization.id),
  ]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Operação
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Entradas</h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Agora a entrada já pode ser confirmada e gerar movimento automático de estoque.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">
            {receipts.length} registro(s)
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Nova entrada</h2>
          <p className="mt-1 text-sm text-slate-600">
            Lançamento manual inicial com até 3 itens por entrada.
          </p>
        </div>

        <form action={createReceiptAction} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Unidade *</span>
              <select name="unit_id" required defaultValue="" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none">
                <option value="">Selecione</option>
                {units.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Fornecedor *</span>
              <select name="supplier_id" required defaultValue="" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none">
                <option value="">Selecione</option>
                {suppliers.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Transportador</span>
              <select name="carrier_id" defaultValue="" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none">
                <option value="">Sem transportador</option>
                {carriers.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Número da entrada</span>
              <input name="receipt_number" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" placeholder="Ex.: REC-0001" />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Data *</span>
              <input name="receipt_date" type="date" required className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Peso bruto</span>
              <input name="gross_weight" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" placeholder="0,000" />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Peso líquido</span>
              <input name="net_weight" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" placeholder="0,000" />
            </label>
          </div>

          <div className="space-y-4">
            <ItemRow index={0} materials={materials} locations={locations} />
            <ItemRow index={1} materials={materials} locations={locations} />
            <ItemRow index={2} materials={materials} locations={locations} />
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Observações</span>
            <textarea name="notes" rows={3} className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-3 text-sm outline-none" placeholder="Observações da entrada" />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c]">
              Salvar entrada
            </button>

            <p className="text-sm text-slate-500">
              O registro será salvo em <code>receipts</code>, <code>receipt_items</code> e auditado em <code>audit_logs</code>.
            </p>
          </div>
        </form>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        {receipts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10">
            <table className="min-w-full divide-y divide-black/10">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-600">
                  <th className="px-4 py-3 font-semibold">Data</th>
                  <th className="px-4 py-3 font-semibold">Número</th>
                  <th className="px-4 py-3 font-semibold">Fornecedor</th>
                  <th className="px-4 py-3 font-semibold">Unidade</th>
                  <th className="px-4 py-3 font-semibold">Itens</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 bg-white">
                {receipts.map((receipt) => (
                  <tr key={receipt.id} className="text-sm text-slate-700">
                    <td className="px-4 py-3">{receipt.receipt_date}</td>
                    <td className="px-4 py-3">{receipt.receipt_number || "—"}</td>
                    <td className="px-4 py-3">{receipt.supplier_name}</td>
                    <td className="px-4 py-3">{receipt.unit_name}</td>
                    <td className="px-4 py-3">{receipt.items_count}</td>
                    <td className="px-4 py-3">{formatMoney(receipt.total_amount)}</td>
                    <td className="px-4 py-3"><StatusBadge status={receipt.status} /></td>
                    <td className="px-4 py-3">
                      {receipt.status === 'confirmed' ? (
                        <span className="text-xs font-semibold text-emerald-700">Estoque lançado</span>
                      ) : (
                        <form action={confirmReceiptAction}>
                          <input type="hidden" name="receipt_id" value={receipt.id} />
                          <button
                            type="submit"
                            className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                          >
                            Confirmar
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-sm text-slate-500">
          Próximo passo deste módulo: visão de saldo por material/local e depois saídas.
        </p>
      </section>
    </div>
  );
}
