import { ReceivablesTable } from "@/components/financeiro/receivables-table";
import { sql } from "@vercel/postgres";
import {
  cancelReceivableAction,
  createReceivableAction,
  receivePartialReceivableAction,
  receiveReceivableAction,
  receiveSelectedReceivablesAction,
  reverseReceivableAction,
} from "./actions";
import { getCurrentSaaSUser } from "@/lib/saas/session";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  status?: string;
  unidade?: string;
  cliente?: string;
  atalho?: string;
  feedback?: string;
  count?: string;
  amount?: string;
}>;

type OptionRow = { id: string; name: string };
type ReceivableRow = {
  id: string;
  description: string;
  document_number: string | null;
  competence_date: string | null;
  due_date: string;
  amount: number;
  received_amount: number;
  status: string;
  notes: string | null;
  customer_id: string | null;
  customer_name: string | null;
  unit_id: string;
  unit_name: string;
  financial_account_id: string | null;
};

type AuditLogRow = {
  id: string;
  entity_id: string;
  action: string;
  created_at: string;
  user_id: string | null;
  previous_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
};

function formatMoney(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value || 0));
}

function formatStatus(status: string): string {
  const map: Record<string, string> = {
    open: "Em aberto",
    partial: "Parcial",
    received: "Recebida",
    canceled: "Cancelada",
  };
  return map[status] ?? status;
}

function csvEscape(value: unknown): string {
  const text = String(value ?? "").replace(/\r?\n|\r/g, " ").trim();
  const escaped = text.replace(/"/g, '""');
  return `"${escaped}"`;
}

function buildReceivablesCsv(receivables: ReceivableRow[], accountOptions: OptionRow[]): string {
  const accountMap = new Map(accountOptions.map((item) => [item.id, item.name]));
  const header = [
    "Descrição",
    "Documento",
    "Competência",
    "Vencimento",
    "Unidade",
    "Cliente",
    "Conta financeira",
    "Valor total",
    "Valor recebido",
    "Saldo restante",
    "Status",
    "Observações",
  ];

  const lines = receivables.map((item) => {
    const amount = Number(item.amount ?? 0);
    const received = Number(item.received_amount ?? 0);
    const remaining = Number((amount - received).toFixed(2));
    return [
      item.description,
      item.document_number ?? "",
      item.competence_date ?? "",
      item.due_date,
      item.unit_name,
      item.customer_name ?? "",
      item.financial_account_id ? accountMap.get(item.financial_account_id) ?? item.financial_account_id : "",
      amount.toFixed(2).replace(".", ","),
      received.toFixed(2).replace(".", ","),
      remaining.toFixed(2).replace(".", ","),
      formatStatus(item.status),
      item.notes ?? "",
    ]
      .map(csvEscape)
      .join(";");
  });

  return `\uFEFF${header.map(csvEscape).join(";")}\n${lines.join("\n")}`;
}

function buildQuickHref(basePath: string, next: { status?: string; atalho?: string }) {
  const params = new URLSearchParams();
  if (next.status) params.set("status", next.status);
  if (next.atalho) params.set("atalho", next.atalho);
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

function buildDownloadFileName(prefix: string, filters: { status?: string; atalho?: string }) {
  const today = new Date().toISOString().slice(0, 10);
  const suffix = filters.atalho || filters.status || "todos";
  return `${prefix}-${suffix}-${today}.csv`;
}

async function getUnits(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`select id, name from organization_units where organization_id = ${organizationId} and is_active = true order by is_headquarters desc, name asc`;
  return rows;
}

async function getCustomers(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`select id, name from customers where organization_id = ${organizationId} and is_active = true order by name asc`;
  return rows;
}

async function getFinancialAccounts(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`select id, name from financial_accounts where organization_id = ${organizationId} and is_active = true order by name asc`;
  return rows;
}

async function getReceivables(
  organizationId: string,
  filters: { status?: string; unidade?: string; cliente?: string; overdueOnly?: boolean },
): Promise<ReceivableRow[]> {
  const status = filters.status?.trim() || "";
  const unidade = filters.unidade?.trim() || "";
  const cliente = filters.cliente?.trim() || "";
  const overdueOnly = Boolean(filters.overdueOnly);
  const { rows } = await sql<ReceivableRow>`
    select
      r.id,
      r.description,
      r.document_number,
      to_char(r.competence_date, 'YYYY-MM-DD') as competence_date,
      to_char(r.due_date, 'YYYY-MM-DD') as due_date,
      r.amount,
      coalesce(r.received_amount, 0) as received_amount,
      r.status,
      r.notes,
      r.customer_id::text,
      c.name as customer_name,
      r.unit_id::text,
      ou.name as unit_name,
      r.financial_account_id::text
    from receivables r
    inner join organization_units ou on ou.id = r.unit_id
    left join customers c on c.id = r.customer_id
    where r.organization_id = ${organizationId}
      and (${status} = '' or r.status = ${status})
      and (${unidade} = '' or ou.name = ${unidade})
      and (${cliente} = '' or coalesce(c.name, '') = ${cliente})
      and (${overdueOnly} = false or (r.status in ('open', 'partial') and r.due_date < current_date))
    order by
      case when r.status in ('open', 'partial') and r.due_date < current_date then 0 else 1 end,
      r.due_date asc,
      r.created_at desc
    limit 100
  `;
  return rows;
}

async function getSummary(
  organizationId: string,
  filters: { status?: string; unidade?: string; cliente?: string; overdueOnly?: boolean },
) {
  const status = filters.status?.trim() || "";
  const unidade = filters.unidade?.trim() || "";
  const cliente = filters.cliente?.trim() || "";
  const overdueOnly = Boolean(filters.overdueOnly);
  const { rows } = await sql<{
    total_registros: number;
    total_aberto: number | null;
    total_recebido: number | null;
  }>`
    select
      count(*)::int as total_registros,
      coalesce(sum(case when r.status in ('open', 'partial') then r.amount - coalesce(r.received_amount, 0) else 0 end), 0) as total_aberto,
      coalesce(sum(coalesce(r.received_amount, 0)), 0) as total_recebido
    from receivables r
    inner join organization_units ou on ou.id = r.unit_id
    left join customers c on c.id = r.customer_id
    where r.organization_id = ${organizationId}
      and (${status} = '' or r.status = ${status})
      and (${unidade} = '' or ou.name = ${unidade})
      and (${cliente} = '' or coalesce(c.name, '') = ${cliente})
      and (${overdueOnly} = false or (r.status in ('open', 'partial') and r.due_date < current_date))
  `;
  return rows[0] ?? { total_registros: 0, total_aberto: 0, total_recebido: 0 };
}

async function getReceivableHistory(organizationId: string, entityIds: string[]): Promise<Record<string, AuditLogRow[]>> {
  if (entityIds.length === 0) return {};
  const { rows } = await sql<AuditLogRow>`
    select
      id::text,
      entity_id::text,
      action,
      to_char(created_at at time zone 'America/Sao_Paulo', 'YYYY-MM-DD"T"HH24:MI:SS') as created_at,
      user_id::text,
      previous_data,
      new_data
    from audit_logs
    where organization_id = ${organizationId}
      and entity_type = 'receivables'
    order by created_at desc
    limit 500
  `;
  const allowed = new Set(entityIds);
  return rows.filter((item) => allowed.has(String(item.entity_id))).reduce((acc, item) => {
    const key = String(item.entity_id);
    if (!acc[key]) acc[key] = [];
    if (acc[key].length < 8) acc[key].push(item);
    return acc;
  }, {} as Record<string, AuditLogRow[]>);
}

function FeedbackBanner({ feedback, count, amount }: { feedback: string; count: number; amount: number | null }) {
  if (!feedback) return null;
  const amountLabel = amount === null ? "" : formatMoney(amount);
  const map: Record<string, { title: string; description: string; className: string }> = {
    created: { title: "Conta criada com sucesso", description: "O lançamento foi salvo e já está disponível na listagem.", className: "border-sky-200 bg-sky-50 text-sky-900" },
    updated: { title: "Conta atualizada com sucesso", description: "Os dados da conta foram editados e a listagem já foi atualizada.", className: "border-sky-200 bg-sky-50 text-sky-900" },
    received_total: { title: "Recebimento total concluído", description: amountLabel ? `Recebimento total registrado no valor de ${amountLabel}.` : "Recebimento total registrado com sucesso.", className: "border-emerald-200 bg-emerald-50 text-emerald-900" },
    received_partial: { title: "Recebimento parcial concluído", description: amountLabel ? `Recebimento parcial registrado no valor de ${amountLabel}.` : "Recebimento parcial registrado com sucesso.", className: "border-blue-200 bg-blue-50 text-blue-900" },
    received_bulk: { title: "Lote processado com sucesso", description: `${count} conta(s) foram recebidas em lote.`, className: "border-emerald-200 bg-emerald-50 text-emerald-900" },
    already_received: { title: "Conta já estava recebida", description: "Nenhuma alteração adicional foi necessária.", className: "border-amber-200 bg-amber-50 text-amber-900" },
    reversed: { title: "Conta estornada com sucesso", description: "A conta recebida foi reaberta e voltou para em aberto.", className: "border-amber-200 bg-amber-50 text-amber-900" },
    canceled: { title: "Conta cancelada com sucesso", description: "O lançamento foi marcado como cancelado e não aceita novas movimentações.", className: "border-red-200 bg-red-50 text-red-900" },
    already_canceled: { title: "Conta já estava cancelada", description: "Nenhuma alteração adicional foi necessária.", className: "border-amber-200 bg-amber-50 text-amber-900" },
    no_remaining_balance: { title: "Sem saldo restante", description: "Essa conta já não possui saldo pendente para recebimento.", className: "border-amber-200 bg-amber-50 text-amber-900" },
  };
  const item = map[feedback];
  if (!item) return null;
  return (
    <section className={`rounded-3xl border px-5 py-4 shadow-sm ${item.className}`}>
      <p className="text-sm font-semibold">{item.title}</p>
      <p className="mt-1 text-sm opacity-90">{item.description}</p>
    </section>
  );
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const user = await getCurrentSaaSUser();
  const params = await searchParams;
  const atalho = (params.atalho || "").trim();
  const inferredStatus = params.status || (atalho === "parciais" ? "partial" : atalho === "abertas" ? "open" : "");
  const filters = { status: inferredStatus, unidade: params.unidade || "", cliente: params.cliente || "", overdueOnly: atalho === "vencidas" };

  const [receivables, summary, units, customers, financialAccounts] = await Promise.all([
    getReceivables(user.organization.id, filters),
    getSummary(user.organization.id, filters),
    getUnits(user.organization.id),
    getCustomers(user.organization.id),
    getFinancialAccounts(user.organization.id),
  ]);

  const histories = await getReceivableHistory(user.organization.id, receivables.map((item) => item.id));
  const feedback = (params.feedback || "").trim();
  const count = Number(params.count || 0);
  const amount = params.amount ? Number(params.amount) : null;
  const csvContent = buildReceivablesCsv(receivables, financialAccounts);
  const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
  const csvFileName = buildDownloadFileName("contas-a-receber", { status: filters.status, atalho });

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Financeiro</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Contas a receber</h1>
            <p className="mt-3 max-w-3xl text-slate-600">Cadastro manual com recebimento total, parcial, em lote e edição de contas em aberto/parciais.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">{receivables.length} registro(s)</div>
        </div>
      </section>

      <FeedbackBanner feedback={feedback} count={count} amount={amount} />

      <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-700">Atalhos rápidos</p>
            <p className="mt-1 text-sm text-slate-500">Acesse rapidamente contas em aberto, parciais ou vencidas.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="#nova-conta-receber" className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c]">Nova conta a receber</a>
            <a href={csvHref} download={csvFileName} className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100">Exportar CSV</a>
            <a href="/app/dashboard" className="rounded-2xl border border-black/10 px-4 py-2.5 text-sm font-semibold text-slate-700">Voltar ao dashboard</a>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { label: "Todas", href: buildQuickHref("/app/financeiro/contas-a-receber", {}), active: !filters.status && !atalho },
            { label: "Em aberto", href: buildQuickHref("/app/financeiro/contas-a-receber", { status: "open", atalho: "abertas" }), active: filters.status === "open" && atalho === "abertas" },
            { label: "Parciais", href: buildQuickHref("/app/financeiro/contas-a-receber", { status: "partial", atalho: "parciais" }), active: filters.status === "partial" && atalho === "parciais" },
            { label: "Vencidas", href: buildQuickHref("/app/financeiro/contas-a-receber", { atalho: "vencidas" }), active: atalho === "vencidas" },
          ].map((item) => (
            <a key={item.label} href={item.href} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${item.active ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-black/10 bg-white text-slate-600 hover:bg-slate-50"}`}>{item.label}</a>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">Registros</p><p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{summary.total_registros}</p></div>
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">Total em aberto</p><p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{formatMoney(Number(summary.total_aberto ?? 0))}</p></div>
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">Total recebido</p><p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{formatMoney(Number(summary.total_recebido ?? 0))}</p></div>
      </section>

      <section id="nova-conta-receber" className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Nova conta a receber</h2>
          <p className="mt-1 text-sm text-slate-600">Cadastro manual inicial.</p>
        </div>
        <form action={createReceivableAction} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Unidade *</span><select name="unit_id" required defaultValue="" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"><option value="">Selecione</option>{units.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Cliente</span><select name="customer_id" defaultValue="" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"><option value="">Sem cliente</option>{customers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Conta financeira</span><select name="financial_account_id" defaultValue="" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"><option value="">Sem conta definida</option>{financialAccounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <label className="block xl:col-span-2"><span className="mb-1 block text-sm font-medium text-slate-700">Descrição *</span><input name="description" required className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" placeholder="Ex.: Venda da semana" /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Documento</span><input name="document_number" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" placeholder="NF / pedido / ref." /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Competência</span><input type="date" name="competence_date" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Vencimento *</span><input type="date" name="due_date" required className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Valor *</span><input name="amount" required className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" placeholder="0,00" /></label>
          </div>
          <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Observações</span><textarea name="notes" rows={3} className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-3 text-sm outline-none" placeholder="Observações da conta" /></label>
          <div className="flex flex-wrap items-center gap-3"><button type="submit" className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c]">Salvar conta</button><p className="text-sm text-slate-500">As ações e o histórico da conta ficam disponíveis diretamente na listagem.</p></div>
        </form>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        {receivables.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 bg-slate-50 px-5 py-8 text-sm text-slate-600">Nenhuma conta a receber encontrada para os filtros aplicados.</div>
        ) : (
          <ReceivablesTable
            items={receivables}
            bulkAction={receiveSelectedReceivablesAction}
            receiveAction={receiveReceivableAction}
            partialReceiveAction={receivePartialReceivableAction}
            cancelAction={cancelReceivableAction}
            reverseAction={reverseReceivableAction}
            histories={histories}
          />
        )}
        <p className="mt-4 text-sm text-slate-500">As ações operacionais e o histórico da conta ficam disponíveis diretamente na listagem.</p>
      </section>
    </div>
  );
}
