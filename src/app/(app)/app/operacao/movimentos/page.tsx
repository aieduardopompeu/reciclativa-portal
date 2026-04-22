import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  tipo?: string;
  unidade?: string;
  local?: string;
  material?: string;
  dataInicial?: string;
  dataFinal?: string;
}>;

type MovementRow = {
  id: string;
  movement_type: string;
  quantity_in: number;
  quantity_out: number;
  unit_cost: number | null;
  total_cost: number | null;
  occurred_at: string;
  notes: string | null;
  unit_name: string;
  location_name: string | null;
  material_name: string;
  material_code: string | null;
};

type OptionRow = {
  value: string;
  label: string;
};

async function getInventoryMovementsByOrganization(
  organizationId: string,
  filters: {
    tipo?: string;
    unidade?: string;
    local?: string;
    material?: string;
    dataInicial?: string;
    dataFinal?: string;
  },
): Promise<MovementRow[]> {
  const tipo = filters.tipo?.trim() || "";
  const unidade = filters.unidade?.trim() || "";
  const local = filters.local?.trim() || "";
  const material = filters.material?.trim() || "";
  const dataInicial = filters.dataInicial?.trim() || "";
  const dataFinal = filters.dataFinal?.trim() || "";

  const dataInicialDate = dataInicial || null;
  const dataFinalDate = dataFinal || null;

  const { rows } = await sql<MovementRow>`
    select
      im.id,
      im.movement_type,
      im.quantity_in,
      im.quantity_out,
      im.unit_cost,
      im.total_cost,
      to_char(im.occurred_at at time zone 'America/Sao_Paulo', 'YYYY-MM-DD HH24:MI') as occurred_at,
      im.notes,
      ou.name as unit_name,
      il.name as location_name,
      m.name as material_name,
      m.code as material_code
    from inventory_movements im
    inner join organization_units ou
      on ou.id = im.unit_id
    left join inventory_locations il
      on il.id = im.location_id
    inner join materials m
      on m.id = im.material_id
    where im.organization_id = ${organizationId}
      and (${tipo} = '' or im.movement_type = ${tipo})
      and (${unidade} = '' or ou.name = ${unidade})
      and (${local} = '' or coalesce(il.name, '') = ${local})
      and (${material} = '' or m.name = ${material})
      and (${dataInicialDate}::date is null or (im.occurred_at at time zone 'America/Sao_Paulo')::date >= ${dataInicialDate}::date)
      and (${dataFinalDate}::date is null or (im.occurred_at at time zone 'America/Sao_Paulo')::date <= ${dataFinalDate}::date)
    order by im.occurred_at desc, im.created_at desc
    limit 300
  `;
  return rows;
}

async function getMovementSummary(
  organizationId: string,
  filters: {
    tipo?: string;
    unidade?: string;
    local?: string;
    material?: string;
    dataInicial?: string;
    dataFinal?: string;
  },
) {
  const tipo = filters.tipo?.trim() || "";
  const unidade = filters.unidade?.trim() || "";
  const local = filters.local?.trim() || "";
  const material = filters.material?.trim() || "";
  const dataInicial = filters.dataInicial?.trim() || "";
  const dataFinal = filters.dataFinal?.trim() || "";

  const dataInicialDate = dataInicial || null;
  const dataFinalDate = dataFinal || null;

  const { rows } = await sql<{
    total_movements: number;
    total_in: number | null;
    total_out: number | null;
  }>`
    select
      count(*)::int as total_movements,
      coalesce(sum(im.quantity_in), 0) as total_in,
      coalesce(sum(im.quantity_out), 0) as total_out
    from inventory_movements im
    inner join organization_units ou on ou.id = im.unit_id
    left join inventory_locations il on il.id = im.location_id
    inner join materials m on m.id = im.material_id
    where im.organization_id = ${organizationId}
      and (${tipo} = '' or im.movement_type = ${tipo})
      and (${unidade} = '' or ou.name = ${unidade})
      and (${local} = '' or coalesce(il.name, '') = ${local})
      and (${material} = '' or m.name = ${material})
      and (${dataInicialDate}::date is null or (im.occurred_at at time zone 'America/Sao_Paulo')::date >= ${dataInicialDate}::date)
      and (${dataFinalDate}::date is null or (im.occurred_at at time zone 'America/Sao_Paulo')::date <= ${dataFinalDate}::date)
  `;

  return rows[0] ?? { total_movements: 0, total_in: 0, total_out: 0 };
}

async function getTypeOptions(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select distinct im.movement_type as value, im.movement_type as label
    from inventory_movements im
    where im.organization_id = ${organizationId}
    order by im.movement_type asc
  `;
  return rows;
}

async function getUnitOptions(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select distinct ou.name as value, ou.name as label
    from inventory_movements im
    inner join organization_units ou on ou.id = im.unit_id
    where im.organization_id = ${organizationId}
    order by ou.name asc
  `;
  return rows;
}

async function getLocationOptions(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select distinct coalesce(il.name, 'Sem local definido') as value, coalesce(il.name, 'Sem local definido') as label
    from inventory_movements im
    left join inventory_locations il on il.id = im.location_id
    where im.organization_id = ${organizationId}
    order by coalesce(il.name, 'Sem local definido') asc
  `;
  return rows;
}

async function getMaterialOptions(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select distinct m.name as value, m.name as label
    from inventory_movements im
    inner join materials m on m.id = im.material_id
    where im.organization_id = ${organizationId}
    order by m.name asc
  `;
  return rows;
}

function formatMoney(value: number | null): string {
  if (value === null || value === undefined) return "—";
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

function formatMovementType(type: string): string {
  switch (type) {
    case "receipt_confirmation":
      return "Confirmação de entrada";
    case "shipment_confirmation":
      return "Confirmação de saída";
    case "manual_adjustment":
      return "Ajuste manual";
    default:
      return type;
  }
}

function MovementBadge({ type }: { type: string }) {
  const isInbound = type === "receipt_confirmation";
  const className = isInbound
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : type === "shipment_confirmation"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}>
      {formatMovementType(type)}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-slate-50 px-5 py-8 text-sm text-slate-600">
      Nenhum movimento encontrado para os filtros aplicados.
    </div>
  );
}

function FiltersForm({
  tipo,
  unidade,
  local,
  material,
  dataInicial,
  dataFinal,
  typeOptions,
  unitOptions,
  locationOptions,
  materialOptions,
}: {
  tipo: string;
  unidade: string;
  local: string;
  material: string;
  dataInicial: string;
  dataFinal: string;
  typeOptions: OptionRow[];
  unitOptions: OptionRow[];
  locationOptions: OptionRow[];
  materialOptions: OptionRow[];
}) {
  return (
    <form className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-6">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Tipo</span>
          <select
            name="tipo"
            defaultValue={tipo}
            className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
          >
            <option value="">Todos</option>
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {formatMovementType(option.label)}
              </option>
            ))}
          </select>
        </label>

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

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Data inicial</span>
          <input
            type="date"
            name="dataInicial"
            defaultValue={dataInicial}
            className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Data final</span>
          <input
            type="date"
            name="dataFinal"
            defaultValue={dataFinal}
            className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
          />
        </label>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c]"
        >
          Filtrar
        </button>
        <a
          href="/app/operacao/movimentos"
          className="rounded-2xl border border-black/10 px-4 py-2.5 text-sm font-semibold text-slate-700"
        >
          Limpar
        </a>
      </div>
    </form>
  );
}

export default async function SaaSMovementsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getCurrentSaaSUser();
  const params = await searchParams;

  const filters = {
    tipo: params.tipo || "",
    unidade: params.unidade || "",
    local: params.local || "",
    material: params.material || "",
    dataInicial: params.dataInicial || "",
    dataFinal: params.dataFinal || "",
  };

  const [movements, summary, typeOptions, unitOptions, locationOptions, materialOptions] =
    await Promise.all([
      getInventoryMovementsByOrganization(user.organization.id, filters),
      getMovementSummary(user.organization.id, filters),
      getTypeOptions(user.organization.id),
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
          Movimentos de estoque
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Histórico operacional de entradas e saídas já confirmadas, com visão consolidada por material, unidade e local.
        </p>
      </section>

      <FiltersForm
        tipo={filters.tipo}
        unidade={filters.unidade}
        local={filters.local}
        material={filters.material}
        dataInicial={filters.dataInicial}
        dataFinal={filters.dataFinal}
        typeOptions={typeOptions}
        unitOptions={unitOptions}
        locationOptions={locationOptions}
        materialOptions={materialOptions}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Movimentos</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {summary.total_movements}
          </p>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Entradas acumuladas</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {formatQuantity(Number(summary.total_in ?? 0))}
          </p>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Saídas acumuladas</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {formatQuantity(Number(summary.total_out ?? 0))}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        {movements.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10">
            <table className="min-w-full divide-y divide-black/10">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-600">
                  <th className="px-4 py-3 font-semibold">Data</th>
                  <th className="px-4 py-3 font-semibold">Tipo</th>
                  <th className="px-4 py-3 font-semibold">Material</th>
                  <th className="px-4 py-3 font-semibold">Unidade</th>
                  <th className="px-4 py-3 font-semibold">Local</th>
                  <th className="px-4 py-3 font-semibold">Entrada</th>
                  <th className="px-4 py-3 font-semibold">Saída</th>
                  <th className="px-4 py-3 font-semibold">Custo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 bg-white">
                {movements.map((movement) => (
                  <tr key={movement.id} className="text-sm text-slate-700 align-top">
                    <td className="px-4 py-3 whitespace-nowrap">{movement.occurred_at}</td>
                    <td className="px-4 py-3">
                      <MovementBadge type={movement.movement_type} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{movement.material_name}</div>
                      <div className="text-xs text-slate-500">
                        {movement.material_code || "Sem código"}
                      </div>
                    </td>
                    <td className="px-4 py-3">{movement.unit_name}</td>
                    <td className="px-4 py-3">{movement.location_name || "Sem local definido"}</td>
                    <td className="px-4 py-3">
                      {movement.quantity_in > 0 ? formatQuantity(movement.quantity_in) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {movement.quantity_out > 0 ? formatQuantity(movement.quantity_out) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div>{formatMoney(movement.unit_cost)}</div>
                      <div className="text-xs text-slate-500">
                        Total: {formatMoney(movement.total_cost)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-sm text-slate-500">
          Próximo passo deste módulo: exportação e filtros por período já aplicados.
        </p>
      </section>
    </div>
  );
}
