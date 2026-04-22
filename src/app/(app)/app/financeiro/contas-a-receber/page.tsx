import { sql } from "@vercel/postgres";
import { createReceivableAction, receiveReceivableAction } from "./actions";
import { getCurrentSaaSUser } from "@/lib/saas/session";

export const dynamic = "force-dynamic";

type ReceivableRow = {
  id: string;
  description: string;
  due_date: string;
  amount: number;
  received_amount: number;
  status: string;
  customer_name: string | null;
  unit_name: string;
};

type OptionRow = {
  id: string;
  name: string;
};

async function getReceivables(organizationId: string): Promise<ReceivableRow[]> {
  const { rows } = await sql<ReceivableRow>`
    select
      r.id,
      r.description,
      to_char(r.due_date, 'YYYY-MM-DD') as due_date,
      r.amount,
      r.received_amount,
      r.status,
      c.name as customer_name,
      ou.name as unit_name
    from receivables r
    inner join organization_units ou on ou.id = r.unit_id
    left join customers c on c.id = r.customer_id
    where r.organization_id = ${organizationId}
    order by r.due_date asc, r.created_at desc
    limit 100
  `;
  return rows;
}

async function getUnits(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select id, name
    from organization_units
    where organization_id = ${organizationId}
      and is_active = true
    order by is_headquarters desc, name asc
  `;
  return rows;
}

async function getCustomers(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select id, name
    from customers
    where organization_id = ${organizationId}
      and is_active = true
    order by name asc
  `;
  return rows;
}

async function getFinancialAccounts(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`
    select id, name
    from financial_accounts
    where organization_id = ${organizationId}
      and is_active = true
    order by name asc
  `;
  return rows;
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-slate-50 px-5 py-8 text-sm text-slate-600">
      Nenhuma conta a receber encontrada para esta organização.
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    open: { label: "Em aberto", className: "bg-amber-50 text-amber-700 border-amber-200" },
    partial: { label: "Parcial", className: "bg-blue-50 text-blue-700 border-blue-200" },
    received: { label: "Recebida", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    canceled: { label: "Cancelada", className: "bg-red-50 text-red-700 border-red-200" },
  };
  const item = map[status] || { label: status, className: "bg-slate-50 text-slate-700 border-slate-200" };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${item.className}`}>{item.label}</span>;
}

export default async function ReceivablesPage() {
  const user = await getCurrentSaaSUser();
  const [receivables, units, customers, financialAccounts] = await Promise.all([
    getReceivables(user.organization.id),
    getUnits(user.organization.id),
    getCustomers(user.organization.id),
    getFinancialAccounts(user.organization.id),
  ]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Financeiro</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Contas a receber</h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Primeira base real do módulo financeiro para registrar e baixar recebimentos da empresa.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">{receivables.length} registro(s)</div>
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Nova conta a receber</h2>
          <p className="mt-1 text-sm text-slate-600">Cadastro manual inicial com baixa simples.</p>
        </div>

        <form action={createReceivableAction} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Unidade *</span>
              <select name="unit_id" required defaultValue="" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none">
                <option value="">Selecione</option>
                {units.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Cliente</span>
              <select name="customer_id" defaultValue="" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none">
                <option value="">Sem cliente</option>
                {customers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Conta financeira</span>
              <select name="financial_account_id" defaultValue="" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none">
                <option value="">Sem conta definida</option>
                {financialAccounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </label>

            <label className="block xl:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-700">Descrição *</span>
              <input name="description" required className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" placeholder="Ex.: Venda para cliente X" />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Documento</span>
              <input name="document_number" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" placeholder="NF / contrato / ref." />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Competência</span>
              <input type="date" name="competence_date" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Vencimento *</span>
              <input type="date" name="due_date" required className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Valor *</span>
              <input name="amount" required className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" placeholder="0,00" />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Observações</span>
            <textarea name="notes" rows={3} className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-3 text-sm outline-none" placeholder="Observações da conta" />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c]">Salvar conta</button>
            <p className="text-sm text-slate-500">O registro será salvo em <code>receivables</code> e auditado em <code>audit_logs</code>.</p>
          </div>
        </form>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        {receivables.length === 0 ? <EmptyState /> : (
          <div className="overflow-hidden rounded-2xl border border-black/10">
            <table className="min-w-full divide-y divide-black/10">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-600">
                  <th className="px-4 py-3 font-semibold">Descrição</th>
                  <th className="px-4 py-3 font-semibold">Cliente</th>
                  <th className="px-4 py-3 font-semibold">Unidade</th>
                  <th className="px-4 py-3 font-semibold">Vencimento</th>
                  <th className="px-4 py-3 font-semibold">Valor</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 bg-white">
                {receivables.map((item) => (
                  <tr key={item.id} className="text-sm text-slate-700">
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3">{item.customer_name || "—"}</td>
                    <td className="px-4 py-3">{item.unit_name}</td>
                    <td className="px-4 py-3">{item.due_date}</td>
                    <td className="px-4 py-3">{formatMoney(item.amount)}</td>
                    <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                    <td className="px-4 py-3">
                      {item.status === 'received' ? (
                        <span className="text-xs font-semibold text-emerald-700">Baixada</span>
                      ) : (
                        <form action={receiveReceivableAction}>
                          <input type="hidden" name="receivable_id" value={item.id} />
                          <button type="submit" className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700">Receber</button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-4 text-sm text-slate-500">Próximo passo deste módulo: filtros, baixa parcial e dashboard financeiro.</p>
      </section>
    </div>
  );
}
