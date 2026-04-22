import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  unidade?: string;
  local?: string;
  material?: string;
}>;

type StockBalanceRow = {
  id: string;
  unit_name: string;
  location_name: string | null;
  material_name: string;
  material_code: string | null;
  unit_of_measure: string;
  current_quantity: number;
  average_cost: number;
};

type OptionRow = {
  value: string;
  label: string;
};

async function getStockBalancesByOrganization(
  organizationId: string,
  filters: { unidade?: string; local?: string; material?: string },
): Promise<StockBalanceRow[]> {
  const unidade = filters.unidade?.trim() || "";
  const local = filters.local?.trim() || "";
  const material = filters.material?.trim() || "";

  const { rows } = await sql<StockBalanceRow>`
    select
      ib.id,
      ou.name as unit_name,
      il.name as location_name,
      m.name as material_name,
      m.code as material_code,
      m.unit_of_measure,
      ib.current_quantity,
      ib.average_cost
    from inventory_balances ib
    inner join organization_units ou
      on ou.id = ib.unit_id
    left join inventory_locations il
      on il.id = ib.location_id
    inner join materials m
      on m.id = ib.material_id
    where ib.organization_id = ${organizationId}
      and (${unidade} = '' or ou.name = ${unidade})
      and (${local} = '' or coalesce(il.name, '') = ${local})
      and (${material} = '' or m.name = ${material})
    order by ou.name asc, m.name asc, il.name asc nulls first
    limit 300
  `;

  return rows;
}

async function getStockSummary(
  organizationId: string,
  filters: { unidade?: string; local?: string; material?: string },
) {
  const unidade = filters.unidade?.trim() || "";
  const local = filters.local?.trim() || "";
  const material = filters.material?.trim() || "";

  const { rows } = await sql<{ total_items: number; total_quantity: number | null }>`
    select
      count(*)::int as total_items,
      coalesce(sum(ib.current_quantity), 0) as total_quantity
    from inventory_balances ib
    inner join organization_units ou
      on ou.id = ib.unit_id
    left join inventory_locations il
      on il.id = ib.location_id
    inner join materials m
      on m.id = ib.material_id
    where ib.organization_id = ${organizationId}
      and (${unidade} = '' or ou.name = ${unidade})
      and (${local} = '' or coalesce(il.name, '') = ${local})
      and (${material} = '' or m.name = ${material})
  `;

  return rows[0] ?? { total_items: 0, total_quantity: 0 };
}

async function getUnitOptions(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select distinct ou.name as value, ou.name as label
    from inventory_balances ib
    inner join organization_units ou on ou.id = ib.unit_id
    where ib.organization_id = ${organizationId}
    order by ou.name asc
  `;
  return rows;
}

async function getLocationOptions(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select distinct coalesce(il.name, 'Sem local definido') as value, coalesce(il.name, 'Sem local definido') as label
    from inventory_balances ib
    left join inventory_locations il on il.id = ib.location_id
    where ib.organization_id = ${organizationId}
    order by coalesce(il.name, 'Sem local definido') asc
  `;
  return rows;
}

async function getMaterialOptions(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select distinct m.name as value, m.name as label
    from inventory_balances ib
    inner join materials m on m.id = ib.material_id
    where ib.organization_id = ${organizationId}
    order by m.name asc
  `;
  return rows;
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
}

function formatQuantity(value: number): string {
  return Number(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-slate-50 px-5 py-8 text-sm text-slate-600">
      Nenhum saldo encontrado para os filtros aplicados.
    </div>
  );
}

function FiltersForm({
  unidade,
  local,
  material,
  unitOptions,
  locationOptions,
  materialOptions,
}: {
  unidade: string;
  local: string;
  material: string;
  unitOptions: OptionRow[];
  locationOptions: OptionRow[];
  materialOptions: OptionRow[];
}) {
  return (
    <form className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Unidade</span>
          <select
            name="unidade"
            defaultValue={unidade}
            className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
          >
            <option value="">Todas</option>
            {unitOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Local</span>
          <select
            name="local"
            defaultValue={local}
            className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
          >
            <option value="">Todos</option>
            {locationOptions.map((option) => (
              <option key={option.value} value={option.value === "Sem local definido" ? "" : option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Material</span>
          <select
            name="material"
            defaultValue={material}
            className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
          >
            <option value="">Todos</option>
            {materialOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end gap-3">
          <button
            type="submit"
            className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c]"
          >
            Filtrar
          </button>
          <a
            href="/app/operacao/estoque"
            className="rounded-2xl border border-black/10 px-4 py-2.5 text-sm font-semibold text-slate-700"
          >
            Limpar
          </a>
        </div>
      </div>
    </form>
  );
}

export default async function SaaSStockPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getCurrentSaaSUser();
  const params = await searchParams;

  const filters = {
    unidade: params.unidade || "",
    local: params.local || "",
    material: params.material || "",
  };

  const [balances, summary, unitOptions, locationOptions, materialOptions] =
    await Promise.all([
      getStockBalancesByOrganization(user.organization.id, filters),
      getStockSummary(user.organization.id, filters),
      getUnitOptions(user.organization.id),
      getLocationOptions(user.organization.id),
      getMaterialOptions(user.organization.id),
    ]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Operação
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Estoque
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Visão inicial dos saldos de estoque por unidade, local e material com base nas entradas e saídas confirmadas.
        </p>
      </section>

      <FiltersForm
        unidade={filters.unidade}
        local={filters.local}
        material={filters.material}
        unitOptions={unitOptions}
        locationOptions={locationOptions}
        materialOptions={materialOptions}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Registros de saldo</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {summary.total_items}
          </p>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Quantidade total</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {formatQuantity(Number(summary.total_quantity ?? 0))}
          </p>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Próximo passo</p>
          <p className="mt-2 text-xl font-bold tracking-tight text-slate-900">
            Financeiro
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Depois dos filtros, o caminho natural é iniciar contas a pagar e receber.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        {balances.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10">
            <table className="min-w-full divide-y divide-black/10">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-600">
                  <th className="px-4 py-3 font-semibold">Material</th>
                  <th className="px-4 py-3 font-semibold">Unidade</th>
                  <th className="px-4 py-3 font-semibold">Local</th>
                  <th className="px-4 py-3 font-semibold">Quantidade</th>
                  <th className="px-4 py-3 font-semibold">Un.</th>
                  <th className="px-4 py-3 font-semibold">Custo médio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 bg-white">
                {balances.map((balance) => (
                  <tr key={balance.id} className="text-sm text-slate-700">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{balance.material_name}</div>
                      <div className="text-xs text-slate-500">
                        {balance.material_code || "Sem código"}
                      </div>
                    </td>
                    <td className="px-4 py-3">{balance.unit_name}</td>
                    <td className="px-4 py-3">{balance.location_name || "Sem local definido"}</td>
                    <td className="px-4 py-3">{formatQuantity(balance.current_quantity)}</td>
                    <td className="px-4 py-3">{balance.unit_of_measure}</td>
                    <td className="px-4 py-3">{formatMoney(balance.average_cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-sm text-slate-500">
          Próximo passo deste módulo: exportação e visão financeira vinculada aos movimentos.
        </p>
      </section>
    </div>
  );
}
