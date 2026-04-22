import { sql } from "@vercel/postgres";
import { canPerformAction } from "@/lib/saas/permissions";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import type { SaaSRole } from "@/types/saas";
import { createSaaSUserAction } from "./actions";

export const dynamic = "force-dynamic";

type SaaSUserRow = {
  id: string;
  name: string;
  email: string;
  role: SaaSRole;
  is_active: boolean;
  unit_name: string | null;
};

type UnitOption = {
  id: string;
  name: string;
};

const roleOptions: Array<{ value: SaaSRole; label: string }> = [
  { value: "org_admin", label: "Admin da organização" },
  { value: "manager_operational", label: "Gestor operacional" },
  { value: "manager_financial", label: "Gestor financeiro" },
  { value: "manager_commercial", label: "Gestor comercial" },
  { value: "operator", label: "Operador" },
  { value: "viewer", label: "Leitura" },
];

async function getUsersByOrganization(organizationId: string): Promise<SaaSUserRow[]> {
  const { rows } = await sql<SaaSUserRow>`
    select
      su.id,
      su.name,
      su.email,
      su.role,
      su.is_active,
      ou.name as unit_name
    from saas_users su
    left join organization_units ou
      on ou.id = su.unit_id
    where su.organization_id = ${organizationId}
    order by su.name asc
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
      Nenhum usuário SaaS encontrado para esta organização. Use o formulário abaixo para criar o primeiro usuário.
    </div>
  );
}

function formatRole(role: SaaSRole): string {
  switch (role) {
    case "org_admin":
      return "Admin da organização";
    case "manager_operational":
      return "Gestor operacional";
    case "manager_financial":
      return "Gestor financeiro";
    case "manager_commercial":
      return "Gestor comercial";
    case "operator":
      return "Operador";
    case "viewer":
      return "Leitura";
    case "super_admin":
      return "Super admin";
    default:
      return role;
  }
}

export default async function SaaSUsersPage() {
  const currentUser = await getCurrentSaaSUser();
  const canCreate = canPerformAction(currentUser.role, "users", "create");
  const users = await getUsersByOrganization(currentUser.organization.id);
  const units = await getUnitsByOrganization(currentUser.organization.id);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Cadastros
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Usuários SaaS
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Módulo inicial para gerenciar os acessos da organização dentro da plataforma.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">
            {users.length} registro(s)
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Novo usuário</h2>
          <p className="mt-1 text-sm text-slate-600">
            Cadastro inicial real ligado em <code>saas_users</code>.
          </p>
        </div>

        <form action={createSaaSUserAction} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="block xl:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-700">Nome *</span>
              <input
                name="name"
                required
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Nome completo"
              />
            </label>

            <label className="block xl:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-700">E-mail *</span>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="usuario@empresa.com"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Role *</span>
              <select
                name="role"
                required
                defaultValue="operator"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block xl:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-700">Unidade</span>
              <select
                name="unit_id"
                defaultValue=""
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
              >
                <option value="">Sem unidade definida</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!canCreate}
              className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Salvar usuário
            </button>

            <p className="text-sm text-slate-500">
              O registro será salvo em <code>saas_users</code> e auditado em <code>audit_logs</code>.
            </p>
          </div>
        </form>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        {users.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10">
            <table className="min-w-full divide-y divide-black/10">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-600">
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">E-mail</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Unidade</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 bg-white">
                {users.map((user) => (
                  <tr key={user.id} className="text-sm text-slate-700">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{formatRole(user.role)}</td>
                    <td className="px-4 py-3">{user.unit_name || "—"}</td>
                    <td className="px-4 py-3">{user.is_active ? "Ativo" : "Inativo"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-sm text-slate-500">
          Próximo passo deste módulo: edição de role, inativação e vínculo com login real.
        </p>
      </section>
    </div>
  );
}
