import { sql } from "@vercel/postgres";
import { canPerformAction } from "@/lib/saas/permissions";
import { getCurrentSaaSUser } from "@/lib/saas/session";
import { createMaterialAction } from "./actions";

export const dynamic = "force-dynamic";

type MaterialRow = {
  id: string;
  code: string | null;
  name: string;
  unit_of_measure: string;
  residue_classification: string | null;
  default_purchase_price: number | null;
  default_sale_price: number | null;
  is_active: boolean;
  category_name: string | null;
};

type CategoryOption = {
  id: string;
  name: string;
};

async function getMaterialsByOrganization(organizationId: string): Promise<MaterialRow[]> {
  const { rows } = await sql<MaterialRow>`
    select
      m.id,
      m.code,
      m.name,
      m.unit_of_measure,
      m.residue_classification,
      m.default_purchase_price,
      m.default_sale_price,
      m.is_active,
      mc.name as category_name
    from materials m
    left join material_categories mc
      on mc.id = m.category_id
    where m.organization_id = ${organizationId}
    order by m.name asc
    limit 100
  `;

  return rows;
}

async function getCategoriesByOrganization(organizationId: string): Promise<CategoryOption[]> {
  const { rows } = await sql<CategoryOption>`
    select id, name
    from material_categories
    where organization_id = ${organizationId}
      and is_active = true
    order by name asc
  `;

  return rows;
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-slate-50 px-5 py-8 text-sm text-slate-600">
      Nenhum material encontrado para esta organização. Use o formulário abaixo para criar o primeiro material.
    </div>
  );
}

function formatMoney(value: number | null): string {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
}

export default async function SaaSMaterialsPage() {
  const user = await getCurrentSaaSUser();
  const canCreate = canPerformAction(user.role, "materials", "create");
  const materials = await getMaterialsByOrganization(user.organization.id);
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
              Materiais
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Módulo inicial real para cadastrar materiais e resíduos, ligado ao banco com auditoria mínima.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">
            {materials.length} registro(s)
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Novo material</h2>
          <p className="mt-1 text-sm text-slate-600">
            Cadastro inicial simples para fechar o núcleo de cadastros operacionais.
          </p>
        </div>

        <form action={createMaterialAction} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Categoria</span>
              <select
                name="category_id"
                defaultValue=""
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
              >
                <option value="">Sem categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Código</span>
              <input
                name="code"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm uppercase outline-none"
                placeholder="Ex.: PET-PRENSADO"
              />
            </label>

            <label className="block xl:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-700">Nome *</span>
              <input
                name="name"
                required
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Nome do material"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Unidade de medida *</span>
              <input
                name="unit_of_measure"
                required
                defaultValue="kg"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm lowercase outline-none"
                placeholder="kg"
              />
            </label>

            <label className="block xl:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-700">Classificação / resíduo</span>
              <input
                name="residue_classification"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="Ex.: Classe II A"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Preço compra padrão</span>
              <input
                name="default_purchase_price"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="0,00"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Preço venda padrão</span>
              <input
                name="default_sale_price"
                className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"
                placeholder="0,00"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!canCreate}
              className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Salvar material
            </button>

            <p className="text-sm text-slate-500">
              O registro será salvo em <code>materials</code> e auditado em <code>audit_logs</code>.
            </p>
          </div>
        </form>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        {materials.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-black/10">
            <table className="min-w-full divide-y divide-black/10">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-600">
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">Categoria</th>
                  <th className="px-4 py-3 font-semibold">Un.</th>
                  <th className="px-4 py-3 font-semibold">Compra</th>
                  <th className="px-4 py-3 font-semibold">Venda</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 bg-white">
                {materials.map((material) => (
                  <tr key={material.id} className="text-sm text-slate-700">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{material.name}</div>
                      <div className="text-xs text-slate-500">{material.code || "Sem código"}</div>
                    </td>
                    <td className="px-4 py-3">{material.category_name || "—"}</td>
                    <td className="px-4 py-3">{material.unit_of_measure}</td>
                    <td className="px-4 py-3">{formatMoney(material.default_purchase_price)}</td>
                    <td className="px-4 py-3">{formatMoney(material.default_sale_price)}</td>
                    <td className="px-4 py-3">{material.is_active ? "Ativo" : "Inativo"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-sm text-slate-500">
          Próximo passo deste módulo: editar, inativar, filtrar e preparar vínculo com entradas e saídas.
        </p>
      </section>
    </div>
  );
}
