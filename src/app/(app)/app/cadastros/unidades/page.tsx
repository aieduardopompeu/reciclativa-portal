import { sql } from "@vercel/postgres";
import SaaSAccessDenied from "@/components/saas/access-denied";
import { canPerformActionForUser, formatSaaSRole, canAccessModuleForUser } from "@/lib/saas/permissions";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import type { SaaSRole } from "@/types/saas";
import {
  createSaaSUserAction,
  resetSaaSUserPasswordAction,
  toggleSaaSUserStatusAction,
  updateSaaSUserRoleAction,
} from "./actions";

export const dynamic = "force-dynamic";

type SearchParamsShape = {
  created?: string;
  email?: string;
  temp_password?: string;
  reset?: string;
  reset_email?: string;
  reset_temp_password?: string;
};

type SaaSUserRow = {
  id: string;
  name: string;
  email: string;
  role: SaaSRole;
  is_active: boolean;
  must_change_password: boolean;
  mfa_enabled: boolean;
  unit_name: string | null;
  is_admin_master: boolean;
};

type UnitOption = {
  id: string;
  name: string;
};

async function resolveSearchParams(
  value?: SearchParamsShape | Promise<SearchParamsShape>
): Promise<SearchParamsShape> {
  if (!value) return {};
  if (typeof (value as Promise<SearchParamsShape>).then === "function") {
    return (await value) ?? {};
  }
  return value;
}

async function getUsersByOrganization(organizationId: string): Promise<SaaSUserRow[]> {
  const { rows } = await sql<SaaSUserRow>`
    select
      su.id,
      su.name,
      su.email,
      su.role,
      su.is_active,
      coalesce(su.must_change_password, false) as must_change_password,
      coalesce(su.mfa_enabled, false) as mfa_enabled,
      ou.name as unit_name,
      exists(
        select 1
        from admin_master_users amu
        where lower(amu.email) = lower(su.email)
          and amu.is_active = true
      ) as is_admin_master
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
  return formatSaaSRole(role);
}

function getRoleOptionsForCreator(role: SaaSRole): Array<{ value: SaaSRole; label: string }> {
  if (role === "org_admin") {
    return [
      { value: "org_admin_full", label: "Admin full" },
      { value: "manager_operational", label: "Gestor operacional" },
      { value: "manager_financial", label: "Gestor financeiro" },
      { value: "manager_commercial", label: "Gestor comercial" },
      { value: "operator", label: "Operador" },
      { value: "viewer", label: "Somente leitura" },
      { value: "custom", label: "Personalizado" },
    ];
  }

  return [
    { value: "manager_operational", label: "Gestor operacional" },
    { value: "manager_financial", label: "Gestor financeiro" },
    { value: "manager_commercial", label: "Gestor comercial" },
    { value: "operator", label: "Operador" },
    { value: "viewer", label: "Somente leitura" },
      { value: "custom", label: "Personalizado" },
  ];
}

function getEditableRoleOptionsForCreator(role: SaaSRole): Array<{ value: SaaSRole; label: string }> {
  return getRoleOptionsForCreator(role);
}

export default async function SaaSUsersPage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  const currentUser = await getCurrentSaaSUser();
  if (!canAccessModuleForUser(currentUser, "units")) {
    return <SaaSAccessDenied moduleLabel="unidades" />;
  }

  const sp = await resolveSearchParams(searchParams);
  const canCreate = canPerformActionForUser(currentUser, "users", "create");
  const canArchive = canPerformActionForUser(currentUser, "users", "archive");
  const canUpdate = canPerformActionForUser(currentUser, "users", "update");
  const users = await getUsersByOrganization(currentUser.organization.id);
  const units = await getUnitsByOrganization(currentUser.organization.id);
  const roleOptions = getRoleOptionsForCreator(currentUser.role);
  const editableRoleOptions = getEditableRoleOptionsForCreator(currentUser.role);

  return (
    <div className="space-y-6">
      {sp.created === "ok" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900">
          <p className="font-semibold">Usuário criado com sucesso.</p>
          <p className="mt-1">Login: {sp.email || "—"}</p>
          <p className="mt-1">Senha provisória: {sp.temp_password || "—"}</p>
          <p className="mt-2 text-emerald-800">
            No primeiro acesso, o usuário deverá trocar a senha e ativar o MFA.
          </p>
        </div>
      ) : null}

      {sp.reset === "ok" ? (
        <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-4 text-sm text-sky-900">
          <p className="font-semibold">Senha redefinida com sucesso.</p>
          <p className="mt-1">Login: {sp.reset_email || "—"}</p>
          <p className="mt-1">Nova senha provisória: {sp.reset_temp_password || "—"}</p>
          <p className="mt-2 text-sky-800">
            O usuário deverá trocar a senha novamente no próximo acesso.
          </p>
        </div>
      ) : null}

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
              Gerencie os acessos da organização, perfis padrão e a base para permissões personalizadas.
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
            O sistema gera senha provisória, marca troca obrigatória de senha e deixa o MFA pendente para o primeiro acesso.
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
              <span className="mb-1 block text-sm font-medium text-slate-700">Perfil *</span>
              <select
                name="role"
                required
                defaultValue={roleOptions[0]?.value || "operator"}
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
                  <th className="px-4 py-3 font-semibold">Perfil</th>
                  <th className="px-4 py-3 font-semibold">Unidade</th>
                  <th className="px-4 py-3 font-semibold">MFA</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 bg-white">
                {users.map((user) => {
                  const isSelf = user.id === currentUser.id;
                  const isSuperAdmin = user.role === "org_admin";
                  const isAdminFull = user.role === "org_admin_full";
                  const isProtected = isSelf || isSuperAdmin || user.is_admin_master;
                  const canEditRole =
                    canUpdate &&
                    !isSelf &&
                    !isSuperAdmin &&
                    !(currentUser.role !== "org_admin" && isAdminFull);

                  const canResetPassword =
                    canUpdate &&
                    !isSelf &&
                    !isSuperAdmin &&
                    !(currentUser.role !== "org_admin" && isAdminFull);

                  const canToggleStatus =
                    canArchive &&
                    !isProtected &&
                    !(currentUser.role !== "org_admin" && isAdminFull);

                  return (
                    <tr key={user.id} className="text-sm text-slate-700">
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">
                        <div>{user.email}</div>
                        {(isSuperAdmin || user.is_admin_master) ? (
                          <span className="mt-1 inline-flex rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-800">
                            Super admin protegido
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3">
                        {canEditRole ? (
                          <form action={updateSaaSUserRoleAction} className="flex items-center gap-2">
                            <input type="hidden" name="user_id" value={user.id} />
                            <select
                              name="role"
                              defaultValue={user.role}
                              className="rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900"
                            >
                              {editableRoleOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <button
                              type="submit"
                              className="rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                            >
                              Alterar perfil
                            </button>
                          </form>
                        ) : (
                          <div>{formatRole(user.role)}</div>
                        )}
                      </td>
                      <td className="px-4 py-3">{user.unit_name || "—"}</td>
                      <td className="px-4 py-3">
                        {user.mfa_enabled ? "Ativo" : "Pendente"}
                      </td>
                      <td className="px-4 py-3">
                        {user.is_active ? "Ativo" : "Inativo"}
                        {user.must_change_password ? (
                          <span className="ml-2 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800">
                            Troca de senha pendente
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <form action={resetSaaSUserPasswordAction}>
                            <input type="hidden" name="user_id" value={user.id} />
                            <button
                              type="submit"
                              disabled={!canResetPassword}
                              className="rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Resetar senha
                            </button>
                          </form>

                          <form action={toggleSaaSUserStatusAction}>
                            <input type="hidden" name="user_id" value={user.id} />
                            <input
                              type="hidden"
                              name="next_status"
                              value={user.is_active ? "inactive" : "active"}
                            />
                            <button
                              type="submit"
                              disabled={!canToggleStatus}
                              className="rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {user.is_active ? "Inativar" : "Reativar"}
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-sm text-slate-500">
          Próximo passo deste módulo: editor de permissões personalizadas por usuário.
        </p>
      </section>
    </div>
  );
}
