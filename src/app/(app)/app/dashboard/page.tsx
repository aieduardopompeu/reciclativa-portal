import { getCurrentSaaSUser } from "@/lib/saas/session";

export const dynamic = "force-dynamic";

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{helper}</p>
    </div>
  );
}

export default async function SaaSDashboardPage() {
  const user = await getCurrentSaaSUser();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Dashboard inicial
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Bem-vindo, {user.name}
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Esta é a base inicial da área SaaS da Reciclativa Gestão. Neste primeiro passo,
          o foco é validar navegação, permissões e estrutura do app antes do CRUD real.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Organização"
          value={user.organization.tradeName ?? user.organization.legalName}
          helper="Dados vindos da sessão SaaS temporária."
        />
        <StatCard
          label="Role atual"
          value={user.role}
          helper="Use o cookie saas-role no futuro para testar perfis diferentes."
        />
        <StatCard
          label="Unidade"
          value={user.unit?.name ?? "Não definida"}
          helper="Estrutura pronta para contexto por unidade."
        />
      </section>

      <section className="rounded-3xl border border-dashed border-black/15 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Próximos blocos</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[
            "Integrar saas_users, organizations e organization_units",
            "Criar guardas reais por role",
            "Subir CRUD de clientes",
            "Subir CRUD de unidades",
            "Subir CRUD de usuários SaaS",
            "Adicionar auditoria nas ações",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-black/10 bg-slate-50 px-4 py-3 text-sm text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
