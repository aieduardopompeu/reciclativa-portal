import { sql } from "@vercel/postgres";
import { canPerformAction } from "@/lib/saas/permissions";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import { createCarrierAction } from "./actions";

export const dynamic = "force-dynamic";

type CarrierRow = {
  id: string;
  name: string;
  document: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  vehicle_info: string | null;
  is_active: boolean;
};

async function getCarriersByOrganization(organizationId: string): Promise<CarrierRow[]> {
  const { rows } = await sql<CarrierRow>`
    select
      id,
      name,
      document,
      email,
      phone,
      whatsapp,
      vehicle_info,
      is_active
    from carriers
    where organization_id = ${organizationId}
    order by name asc
    limit 100
  `;

  return rows;
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-slate-50 px-5 py-8 text-sm text-slate-600">
      Nenhum transportador encontrado para esta organização. Use o formulário abaixo para criar o primeiro registro.
    </div>
  );
}

export default async function SaaSCarriersPage() {
  const user = await getCurrentSaaSUser();
  const canCreate = canPerformAction(user.role, "carriers", "create");
  const carriers = await getCarriersByOrganization(user.organization.id);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Cadastros
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Transportadores
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Módulo inicial real de transportadores, ligado ao banco com auditoria mínima.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">
            {carriers.length} registro(s)
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Novo transportador</h2>
          <p className="mt-1 text-sm text-slate-600">
            Cadastro inicial simples para validar o fluxo real do módulo.
          </p>
        </div>

        <form action={createCarrierAction} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Nome *</span>
              <input
                name="name"
                required
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Nome do transportador"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Documento</span>
              <input
                name="document"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="CPF/CNPJ"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">E-mail</span>
              <input
                name="email"
                type="email"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="email@transportador.com"
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

            <label className="block xl:col-span-3">
              <span className="mb-1 block text-sm font-medium text-slate-700">Veículo / observação operacional</span>
              <input
                name="vehicle_info"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Ex.: Caminhão baú / placa / observação"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!canCreate}
              className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Salvar transportador
            </button>

            <p className="text-sm text-slate-500">
              O registro será salvo em <code>carriers</code> e auditado em <code>audit_logs</code>.
            </p>
          </div>
        </form>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        {carriers.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10">
            <table className="min-w-full divide-y divide-black/10">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-600">
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">Documento</th>
                  <th className="px-4 py-3 font-semibold">Contato</th>
                  <th className="px-4 py-3 font-semibold">Veículo</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 bg-white">
                {carriers.map((carrier) => (
                  <tr key={carrier.id} className="text-sm text-slate-700">
                    <td className="px-4 py-3">{carrier.name}</td>
                    <td className="px-4 py-3">{carrier.document || "—"}</td>
                    <td className="px-4 py-3">
                      {carrier.whatsapp || carrier.phone || carrier.email || "—"}
                    </td>
                    <td className="px-4 py-3">{carrier.vehicle_info || "—"}</td>
                    <td className="px-4 py-3">{carrier.is_active ? "Ativo" : "Inativo"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-sm text-slate-500">
          Próximo passo deste módulo: editar, inativar, filtrar e paginar.
        </p>
      </section>
    </div>
  );
}
