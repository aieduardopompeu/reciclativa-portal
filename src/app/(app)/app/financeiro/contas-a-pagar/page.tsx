import { PayablesTable } from "@/components/financeiro/payables-table";
import { sql } from "@vercel/postgres";
import SaaSAccessDenied from "@/components/saas/access-denied";
import SaaSReadOnlyNotice from "@/components/saas/read-only-notice";
import { canAccessModuleForUser, canPerformActionForUser } from "@/lib/saas/permissions";
import {
  cancelPayableAction,
  createPayableAction,
  payPartialPayableAction,
  payPayableAction,
  paySelectedPayablesAction,
  reversePayableAction,
} from "./actions";
import { getCurrentSaaSUser } from "@/lib/saas/session";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  status?: string;
  unidade?: string;
  fornecedor?: string;
  atalho?: string;
  feedback?: string;
  count?: string;
  amount?: string;
}>;

type OptionRow = { id: string; name: string };
type PayableRow = {
  id: string;
  description: string;
  document_number: string | null;
  competence_date: string | null;
  due_date: string;
  amount: number;
  paid_amount: number;
  status: string;
  notes: string | null;
  supplier_id: string | null;
  supplier_name: string | null;
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
    paid: "Paga",
    canceled: "Cancelada",
  };
  return map[status] ?? status;
}

function csvEscape(value: unknown): string {
  const text = String(value ?? "").replace(/\r?\n|\r/g, " ").trim();
  const escaped = text.replace(/"/g, '""');
  return `"${escaped}"`;
}

function buildPayablesCsv(payables: PayableRow[], accountOptions: OptionRow[]): string {
  const accountMap = new Map(accountOptions.map((item) => [item.id, item.name]));
  const header = [
    "Descrição",
    "Documento",
    "Competência",
    "Vencimento",
    "Unidade",
    "Fornecedor",
    "Conta financeira",
    "Valor total",
    "Valor pago",
    "Saldo restante",
    "Status",
    "Observações",
  ];

  const lines = payables.map((item) => {
    const amount = Number(item.amount ?? 0);
    const paid = Number(item.paid_amount ?? 0);
    const remaining = Number((amount - paid).toFixed(2));
    return [
      item.description,
      item.document_number ?? "",
      item.competence_date ?? "",
      item.due_date,
      item.unit_name,
      item.supplier_name ?? "",
      item.financial_account_id ? accountMap.get(item.financial_account_id) ?? item.financial_account_id : "",
      amount.toFixed(2).replace(".", ","),
      paid.toFixed(2).replace(".", ","),
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

async function getSuppliers(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`select id, name from suppliers where organization_id = ${organizationId} and is_active = true order by name asc`;
  return rows;
}

async function getFinancialAccounts(organizationId: string): Promise<OptionRow[]> {
  const { rows } = await sql<OptionRow>`select id, name from financial_accounts where organization_id = ${organizationId} and is_active = true order by name asc`;
  return rows;
}

async function getPayables(
  organizationId: string,
  filters: { status?: string; unidade?: string; fornecedor?: string; overdueOnly?: boolean },
): Promise<PayableRow[]> {
  const status = filters.status?.trim() || "";
  const unidade = filters.unidade?.trim() || "";
  const fornecedor = filters.fornecedor?.trim() || "";
  const overdueOnly = Boolean(filters.overdueOnly);
  const { rows } = await sql<PayableRow>`
    select
      p.id,
      p.description,
      p.document_number,
      to_char(p.competence_date, 'YYYY-MM-DD') as competence_date,
      to_char(p.due_date, 'YYYY-MM-DD') as due_date,
      p.amount,
      coalesce(p.paid_amount, 0) as paid_amount,
      p.status,
      p.notes,
      p.supplier_id::text,
      s.name as supplier_name,
      p.unit_id::text,
      ou.name as unit_name,
      p.financial_account_id::text
    from payables p
    inner join organization_units ou on ou.id = p.unit_id
    left join suppliers s on s.id = p.supplier_id
    where p.organization_id = ${organizationId}
      and (${status} = '' or p.status = ${status})
      and (${unidade} = '' or ou.name = ${unidade})
      and (${fornecedor} = '' or coalesce(s.name, '') = ${fornecedor})
      and (${overdueOnly} = false or (p.status in ('open', 'partial') and p.due_date < current_date))
    order by
      case when p.status in ('open', 'partial') and p.due_date < current_date then 0 else 1 end,
      p.due_date asc,
      p.created_at desc
    limit 100
  `;
  return rows;
}

async function getSummary(
  organizationId: string,
  filters: { status?: string; unidade?: string; fornecedor?: string; overdueOnly?: boolean },
) {
  const status = filters.status?.trim() || "";
  const unidade = filters.unidade?.trim() || "";
  const fornecedor = filters.fornecedor?.trim() || "";
  const overdueOnly = Boolean(filters.overdueOnly);
  const { rows } = await sql<{
    total_registros: number;
    total_aberto: number | null;
    total_pago: number | null;
  }>`
    select
      count(*)::int as total_registros,
      coalesce(sum(case when p.status in ('open', 'partial') then p.amount - coalesce(p.paid_amount, 0) else 0 end), 0) as total_aberto,
      coalesce(sum(coalesce(p.paid_amount, 0)), 0) as total_pago
    from payables p
    inner join organization_units ou on ou.id = p.unit_id
    left join suppliers s on s.id = p.supplier_id
    where p.organization_id = ${organizationId}
      and (${status} = '' or p.status = ${status})
      and (${unidade} = '' or ou.name = ${unidade})
      and (${fornecedor} = '' or coalesce(s.name, '') = ${fornecedor})
      and (${overdueOnly} = false or (p.status in ('open', 'partial') and p.due_date < current_date))
  `;
  return rows[0] ?? { total_registros: 0, total_aberto: 0, total_pago: 0 };
}

async function getPayableHistory(organizationId: string, entityIds: string[]): Promise<Record<string, AuditLogRow[]>> {
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
      and entity_type = 'payables'
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
    paid_total: { title: "Quitação total concluída", description: amountLabel ? `Pagamento total registrado no valor de ${amountLabel}.` : "Pagamento total registrado com sucesso.", className: "border-emerald-200 bg-emerald-50 text-emerald-900" },
    paid_partial: { title: "Baixa parcial concluída", description: amountLabel ? `Baixa parcial registrada no valor de ${amountLabel}.` : "Baixa parcial registrada com sucesso.", className: "border-blue-200 bg-blue-50 text-blue-900" },
    paid_bulk: { title: "Lote processado com sucesso", description: `${count} conta(s) foram quitadas em lote.`, className: "border-emerald-200 bg-emerald-50 text-emerald-900" },
    already_paid: { title: "Conta já estava paga", description: "Nenhuma alteração adicional foi necessária.", className: "border-amber-200 bg-amber-50 text-amber-900" },
    reversed: { title: "Conta estornada com sucesso", description: "A conta paga foi reaberta e voltou para em aberto.", className: "border-amber-200 bg-amber-50 text-amber-900" },
    canceled: { title: "Conta cancelada com sucesso", description: "O lançamento foi marcado como cancelado e não aceita novas movimentações.", className: "border-red-200 bg-red-50 text-red-900" },
    already_canceled: { title: "Conta já estava cancelada", description: "Nenhuma alteração adicional foi necessária.", className: "border-amber-200 bg-amber-50 text-amber-900" },
    no_remaining_balance: { title: "Sem saldo restante", description: "Essa conta já não possui saldo pendente para quitação.", className: "border-amber-200 bg-amber-50 text-amber-900" },
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
  if (!canAccessModuleForUser(user, "finance")) {
    return <SaaSAccessDenied moduleLabel="financeiro" />;
  }

  const canCreate = canPerformActionForUser(user, "finance", "create");
  const canManage = canPerformActionForUser(user, "finance", "update");
  const params = await searchParams;
  const atalho = (params.atalho || "").trim();
  const inferredStatus = params.status || (atalho === "parciais" ? "partial" : atalho === "abertas" ? "open" : "");
  const filters = { status: inferredStatus, unidade: params.unidade || "", fornecedor: params.fornecedor || "", overdueOnly: atalho === "vencidas" };

  const [payables, summary, units, suppliers, financialAccounts] = await Promise.all([
    getPayables(user.organization.id, filters),
    getSummary(user.organization.id, filters),
    getUnits(user.organization.id),
    getSuppliers(user.organization.id),
    getFinancialAccounts(user.organization.id),
  ]);

  const histories = await getPayableHistory(user.organization.id, payables.map((item) => item.id));
  const feedback = (params.feedback || "").trim();
  const count = Number(params.count || 0);
  const amount = params.amount ? Number(params.amount) : null;
  const csvContent = buildPayablesCsv(payables, financialAccounts);
  const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
  const csvFileName = buildDownloadFileName("contas-a-pagar", { status: filters.status, atalho });

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Financeiro</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Contas a pagar</h1>
            <p className="mt-3 max-w-3xl text-slate-600">Cadastro manual com quitação total, parcial, em lote e edição de contas em aberto/parciais.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">{payables.length} registro(s)</div>
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
            {canCreate ? (<a href="#nova-conta-pagar" className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c]">Nova conta a pagar</a>) : null}
            <a href={csvHref} download={csvFileName} className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100">Exportar CSV</a>
            <a href="/app/dashboard" className="rounded-2xl border border-black/10 px-4 py-2.5 text-sm font-semibold text-slate-700">Voltar ao dashboard</a>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { label: "Todas", href: buildQuickHref("/app/financeiro/contas-a-pagar", {}), active: !filters.status && !atalho },
            { label: "Em aberto", href: buildQuickHref("/app/financeiro/contas-a-pagar", { status: "open", atalho: "abertas" }), active: filters.status === "open" && atalho === "abertas" },
            { label: "Parciais", href: buildQuickHref("/app/financeiro/contas-a-pagar", { status: "partial", atalho: "parciais" }), active: filters.status === "partial" && atalho === "parciais" },
            { label: "Vencidas", href: buildQuickHref("/app/financeiro/contas-a-pagar", { atalho: "vencidas" }), active: atalho === "vencidas" },
          ].map((item) => (
            <a key={item.label} href={item.href} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${item.active ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-black/10 bg-white text-slate-600 hover:bg-slate-50"}`}>{item.label}</a>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">Registros</p><p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{summary.total_registros}</p></div>
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">Total em aberto</p><p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{formatMoney(Number(summary.total_aberto ?? 0))}</p></div>
        <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-500">Total pago</p><p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{formatMoney(Number(summary.total_pago ?? 0))}</p></div>
      </section>

      {canCreate ? (
      <section id="nova-conta-pagar" className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Nova conta a pagar</h2>
          <p className="mt-1 text-sm text-slate-600">Cadastro manual inicial.</p>
        </div>
        <form action={createPayableAction} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Unidade *</span><select name="unit_id" required defaultValue="" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"><option value="">Selecione</option>{units.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Fornecedor</span><select name="supplier_id" defaultValue="" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"><option value="">Sem fornecedor</option>{suppliers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Conta financeira</span><select name="financial_account_id" defaultValue="" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none"><option value="">Sem conta definida</option>{financialAccounts.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <label className="block xl:col-span-2"><span className="mb-1 block text-sm font-medium text-slate-700">Descrição *</span><input name="description" required className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Documento</span><input name="document_number" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Competência</span><input type="date" name="competence_date" className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Vencimento *</span><input type="date" name="due_date" required className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Valor *</span><input name="amount" required className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm outline-none" placeholder="0,00" /></label>
          </div>
          <label className="block"><span className="mb-1 block text-sm font-medium text-slate-700">Observações</span><textarea name="notes" rows={3} className="w-full rounded-2xl border border-black/10 bg-slate-50 px-4 py-3 text-sm outline-none" /></label>
          <div className="flex flex-wrap items-center gap-3"><button type="submit" className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c]">Salvar conta</button><p className="text-sm text-slate-500">As ações e o histórico da conta ficam disponíveis diretamente na listagem.</p></div>
        </form>
      </section>
      ) : (
        <SaaSReadOnlyNotice description="Seu perfil permite consultar o financeiro, mas não permite criar novos lançamentos." />
      )}

      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        {payables.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 bg-slate-50 px-5 py-8 text-sm text-slate-600">Nenhuma conta a pagar encontrada para os filtros aplicados.</div>
        ) : (
          <PayablesTable
            items={payables}
            bulkAction={paySelectedPayablesAction}
            payAction={payPayableAction}
            partialPayAction={payPartialPayableAction}
            cancelAction={cancelPayableAction}
            reverseAction={reversePayableAction}
            histories={histories}
            canManage={canManage}
          />
        )}
        <p className="mt-4 text-sm text-slate-500">As ações operacionais e o histórico da conta ficam disponíveis diretamente na listagem.</p>
      </section>
    </div>
  );
}
