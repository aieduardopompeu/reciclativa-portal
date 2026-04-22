import { sql } from "@vercel/postgres";
import { canPerformAction } from "@/lib/saas/permissions";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import { createInventoryLocationAction } from "./actions";

export const dynamic = "force-dynamic";

type InventoryLocationRow = {
  id: string;
  name: string;
  code: string | null;
  is_active: boolean;
  unit_name: string;
};

type UnitOption = {
  id: string;
  name: string;
};

async function getInventoryLocationsByOrganization(
  organizationId: string,
): Promise<InventoryLocationRow[]> {
  const { rows } = await sql<InventoryLocationRow>`
    select
      il.id,
      il.name,
      il.code,
      il.is_active,
      ou.name as unit_name
    from inventory_locations il
    inner join organization_units ou
      on ou.id = il.unit_id
    where il.organization_id = ${organizationId}
    order by ou.name asc, il.name asc
    limit 100
  `;

  return rows;
}

async function getUnitsByOrganization(organizationId: string): Promise<UnitOption[]> {
  const { rows } = await sql<UnitOption>`
    select id, name
    from organization_units
    where organization_id = ${organizationId}
      and is_active = true
    order by is_headquarters desc, name asc
  `;

  return rows;
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-slate-50 px-5 py-8 text-sm text-slate-600">
      Nenhum local de estoque encontrado para esta organização. Use o formulário abaixo para criar o primeiro local.
    </div>
  );
}

export default async function SaaSInventoryLocationsPage() {
  const user = await getCurrentSaaSUser();
  const canCreate = canPerformAction(user.role, "inventory_locations", "create");
  const locations = await getInventoryLocationsByOrganization(user.organization.id);
  const units = await getUnitsByOrganization(user.organization.id);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Cadastros
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Locais de estoque
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Módulo inicial real para cadastrar pátios, boxes e áreas de armazenamento por unidade.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">
            {locations.length} registro(s)
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Novo local de estoque</h2>
          <p className="mt-1 text-sm text-slate-600">
            Cadastro inicial simples para preparar o núcleo operacional de estoque.
          </p>
        </div>

        <form action={createInventoryLocationAction} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Unidade *</span>
              <select
                name="unit_id"
                required
                defaultValue=""
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
              >
                <option value="">Selecione a unidade</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block xl:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-700">Nome *</span>
              <input
                name="name"
                required
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Ex.: Pátio principal"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Código</span>
              <input
                name="code"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm uppercase outline-none"
                placeholder="Ex.: PATIO-01"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!canCreate}
              className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Salvar local
            </button>

            <p className="text-sm text-slate-500">
              O registro será salvo em <code>inventory_locations</code> e auditado em <code>audit_logs</code>.
            </p>
          </div>
        </form>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        {locations.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10">
            <table className="min-w-full divide-y divide-black/10">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-600">
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">Código</th>
                  <th className="px-4 py-3 font-semibold">Unidade</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 bg-white">
                {locations.map((location) => (
                  <tr key={location.id} className="text-sm text-slate-700">
                    <td className="px-4 py-3">{location.name}</td>
                    <td className="px-4 py-3">{location.code || "—"}</td>
                    <td className="px-4 py-3">{location.unit_name}</td>
                    <td className="px-4 py-3">{location.is_active ? "Ativo" : "Inativo"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-sm text-slate-500">
          Próximo passo deste módulo: editar, inativar e usar esses locais nas entradas e saídas.
        </p>
      </section>
    </div>
  );
}
