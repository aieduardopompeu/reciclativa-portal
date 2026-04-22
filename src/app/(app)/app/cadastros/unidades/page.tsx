import { sql } from "@vercel/postgres";
import { canPerformAction } from "@/lib/saas/permissions";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import { createUnitAction } from "./actions";

export const dynamic = "force-dynamic";

type UnitRow = {
  id: string;
  name: string;
  code: string | null;
  city: string | null;
  state: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  is_headquarters: boolean;
  is_active: boolean;
};

async function getUnitsByOrganization(organizationId: string): Promise<UnitRow[]> {
  const { rows } = await sql<UnitRow>`
    select
      id,
      name,
      code,
      city,
      state,
      email,
      phone,
      whatsapp,
      is_headquarters,
      is_active
    from organization_units
    where organization_id = ${organizationId}
    order by is_headquarters desc, name asc
    limit 100
  `;

  return rows;
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-slate-50 px-5 py-8 text-sm text-slate-600">
      Nenhuma unidade encontrada para esta organização. Use o formulário abaixo para criar a primeira unidade.
    </div>
  );
}

export default async function SaaSUnitsPage() {
  const user = await getCurrentSaaSUser();
  const canCreate = canPerformAction(user.role, "units", "create");
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
              Unidades
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Módulo inicial para gerenciar filiais, pátios e unidades operacionais da empresa.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">
            {units.length} registro(s)
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Nova unidade</h2>
          <p className="mt-1 text-sm text-slate-600">
            Cadastro inicial real ligado em <code>organization_units</code>.
          </p>
        </div>

        <form action={createUnitAction} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Nome *</span>
              <input
                name="name"
                required
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Ex.: Matriz"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Código</span>
              <input
                name="code"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Ex.: MATRIZ"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">E-mail</span>
              <input
                name="email"
                type="email"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="unidade@empresa.com"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Telefone</span>
              <input
                name="phone"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="(00) 0000-0000"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">WhatsApp</span>
              <input
                name="whatsapp"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="(00) 00000-0000"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">CEP</span>
              <input
                name="zip_code"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="00000-000"
              />
            </label>

            <label className="block md:col-span-2 xl:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-700">Endereço</span>
              <input
                name="address"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Rua / Avenida"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Número</span>
              <input
                name="number"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Número"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Complemento</span>
              <input
                name="complement"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Complemento"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Bairro</span>
              <input
                name="neighborhood"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Bairro"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Cidade</span>
              <input
                name="city"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Cidade"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">UF</span>
              <input
                name="state"
                maxLength={2}
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm uppercase outline-none"
                placeholder="RJ"
              />
            </label>
          </div>

          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input type="checkbox" name="is_headquarters" className="h-4 w-4 rounded border-black/20" />
            Marcar como matriz
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!canCreate}
              className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Salvar unidade
            </button>

            <p className="text-sm text-slate-500">
              O registro será salvo em <code>organization_units</code> e auditado em <code>audit_logs</code>.
            </p>
          </div>
        </form>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        {units.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10">
            <table className="min-w-full divide-y divide-black/10">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-600">
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">Código</th>
                  <th className="px-4 py-3 font-semibold">Cidade</th>
                  <th className="px-4 py-3 font-semibold">UF</th>
                  <th className="px-4 py-3 font-semibold">Contato</th>
                  <th className="px-4 py-3 font-semibold">Tipo</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 bg-white">
                {units.map((unit) => (
                  <tr key={unit.id} className="text-sm text-slate-700">
                    <td className="px-4 py-3">{unit.name}</td>
                    <td className="px-4 py-3">{unit.code || "—"}</td>
                    <td className="px-4 py-3">{unit.city || "—"}</td>
                    <td className="px-4 py-3">{unit.state || "—"}</td>
                    <td className="px-4 py-3">
                      {unit.whatsapp || unit.phone || unit.email || "—"}
                    </td>
                    <td className="px-4 py-3">{unit.is_headquarters ? "Matriz" : "Unidade"}</td>
                    <td className="px-4 py-3">{unit.is_active ? "Ativa" : "Inativa"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-sm text-slate-500">
          Próximo passo deste módulo: editar, inativar e definir unidade padrão por usuário.
        </p>
      </section>
    </div>
  );
}
