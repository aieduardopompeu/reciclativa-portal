import { sql } from "@vercel/postgres";
import { canPerformAction } from "@/lib/saas/permissions";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import { createMaterialCategoryAction } from "./actions";

export const dynamic = "force-dynamic";

type MaterialCategoryRow = {
  id: string;
  name: string;
  code: string | null;
  is_active: boolean;
};

async function getCategoriesByOrganization(organizationId: string): Promise<MaterialCategoryRow[]> {
  const { rows } = await sql<MaterialCategoryRow>`
    select
      id,
      name,
      code,
      is_active
    from material_categories
    where organization_id = ${organizationId}
    order by name asc
    limit 100
  `;

  return rows;
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-slate-50 px-5 py-8 text-sm text-slate-600">
      Nenhuma categoria encontrada para esta organização. Use o formulário abaixo para criar a primeira categoria.
    </div>
  );
}

export default async function SaaSMaterialCategoriesPage() {
  const user = await getCurrentSaaSUser();
  const canCreate = canPerformAction(user.role, "material_categories", "create");
  const categories = await getCategoriesByOrganization(user.organization.id);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Cadastros
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Categorias de materiais
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Módulo inicial real para organizar materiais por grupos, ligado ao banco com auditoria mínima.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">
            {categories.length} registro(s)
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Nova categoria</h2>
          <p className="mt-1 text-sm text-slate-600">
            Cadastro inicial simples para preparar o núcleo operacional de materiais.
          </p>
        </div>

        <form action={createMaterialCategoryAction} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="block xl:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-700">Nome *</span>
              <input
                name="name"
                required
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Ex.: Plásticos"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Código</span>
              <input
                name="code"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm uppercase outline-none"
                placeholder="Ex.: PLAST"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!canCreate}
              className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Salvar categoria
            </button>

            <p className="text-sm text-slate-500">
              O registro será salvo em <code>material_categories</code> e auditado em <code>audit_logs</code>.
            </p>
          </div>
        </form>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        {categories.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10">
            <table className="min-w-full divide-y divide-black/10">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-600">
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">Código</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 bg-white">
                {categories.map((category) => (
                  <tr key={category.id} className="text-sm text-slate-700">
                    <td className="px-4 py-3">{category.name}</td>
                    <td className="px-4 py-3">{category.code || "—"}</td>
                    <td className="px-4 py-3">{category.is_active ? "Ativa" : "Inativa"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-sm text-slate-500">
          Próximo passo deste módulo: editar, inativar e vincular materiais às categorias.
        </p>
      </section>
    </div>
  );
}
