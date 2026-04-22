import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";

export const dynamic = "force-dynamic";

type OrganizationRow = {
  id: string;
  legal_name: string;
  trade_name: string | null;
  cnpj: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  plan_code: string | null;
  status: string;
};

async function getOrganizationById(organizationId: string): Promise<OrganizationRow | null> {
  const { rows } = await sql<OrganizationRow>`
    select
      id,
      legal_name,
      trade_name,
      cnpj,
      email,
      phone,
      whatsapp,
      plan_code,
      status
    from organizations
    where id = ${organizationId}
    limit 1
  `;

  return rows[0] ?? null;
}

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 text-slate-900">{value}</dd>
    </div>
  );
}

export default async function SaaSCompanyPage() {
  const user = await getCurrentSaaSUser();
  const organization = await getOrganizationById(user.organization.id);

  if (!organization) {
    return (
      <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-red-700">Organização não encontrada.</p>
        <p className="mt-2 text-sm text-slate-600">
          Verifique se a sessão SaaS está apontando para uma organização válida.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Configurações
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Empresa</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Esta página já consulta a tabela <code>organizations</code> do banco real.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Dados principais</h2>

          <dl className="mt-4 space-y-3 text-sm">
            <Field label="Razão social" value={organization.legal_name} />
            <Field label="Nome fantasia" value={organization.trade_name || "Não informado"} />
            <Field label="CNPJ" value={organization.cnpj || "Não informado"} />
            <Field label="E-mail" value={organization.email || "Não informado"} />
            <Field label="Telefone" value={organization.phone || "Não informado"} />
            <Field label="WhatsApp" value={organization.whatsapp || "Não informado"} />
            <Field label="Plano" value={organization.plan_code || "Não informado"} />
            <Field label="Status" value={organization.status} />
            <Field label="Unidade atual" value={user.unit?.name || "Não definida"} />
          </dl>
        </div>

        <div className="rounded-3xl border border-dashed border-black/15 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Próximo passo do módulo</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>• permitir edição controlada da organização</li>
            <li>• registrar alteração em audit_logs</li>
            <li>• vincular parâmetros futuros da empresa</li>
            <li>• expandir para preferências da unidade</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
