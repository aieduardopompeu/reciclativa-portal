import { sql } from "@vercel/postgres";
import { getCurrentSaaSUser } from "@/lib/saas/session";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  period?: PeriodKey;
}>;

type PeriodKey = "today" | "7d" | "30d" | "month";

type UpcomingItem = {
  id: string;
  kind: "payable" | "receivable";
  status: string;
  description: string;
  counterpart_name: string | null;
  unit_name: string;
  due_date: string;
  remaining_amount: number;
};

type OverdueItem = UpcomingItem;

type ConsolidatedRow = {
  id: string;
  kind: "payable" | "receivable";
  status: string;
  description: string;
  counterpart_name: string | null;
  unit_name: string;
  due_date: string;
  amount: number;
  settled_amount: number;
  remaining_amount: number;
};

type OverviewRow = {
  payables_open: number;
  receivables_open: number;
  paid_in_period: number;
  received_in_period: number;
  overdue_payables: number;
  overdue_receivables: number;
};

const PERIOD_OPTIONS: Array<{ key: PeriodKey; label: string }> = [
  { key: "today", label: "Hoje" },
  { key: "7d", label: "7 dias" },
  { key: "30d", label: "30 dias" },
  { key: "month", label: "Este mês" },
];

function getPeriodBounds(period: PeriodKey): { start: string | null; end: string | null; label: string } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const asDate = (value: Date) => value.toISOString().slice(0, 10);

  if (period === "today") {
    const date = asDate(today);
    return { start: date, end: date, label: "hoje" };
  }

  if (period === "7d") {
    const start = new Date(today);
    start.setDate(start.getDate() - 6);
    return { start: asDate(start), end: asDate(today), label: "nos últimos 7 dias" };
  }

  if (period === "30d") {
    const start = new Date(today);
    start.setDate(start.getDate() - 29);
    return { start: asDate(start), end: asDate(today), label: "nos últimos 30 dias" };
  }

  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return { start: asDate(start), end: asDate(end), label: "neste mês" };
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));
}

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function csvEscape(value: unknown): string {
  const text = String(value ?? "").replace(/\r?\n|\r/g, " ").trim();
  const escaped = text.replace(/"/g, '""');
  return `"${escaped}"`;
}

function buildDashboardCsv(rows: ConsolidatedRow[]): string {
  const header = [
    "Tipo",
    "Descrição",
    "Cliente / Fornecedor",
    "Unidade",
    "Vencimento",
    "Valor total",
    "Liquidado",
    "Saldo restante",
    "Status",
  ];

  const lines = rows.map((row) => [
    row.kind === "payable" ? "Pagar" : "Receber",
    row.description,
    row.counterpart_name ?? "",
    row.unit_name,
    row.due_date,
    Number(row.amount ?? 0).toFixed(2).replace(".", ","),
    Number(row.settled_amount ?? 0).toFixed(2).replace(".", ","),
    Number(row.remaining_amount ?? 0).toFixed(2).replace(".", ","),
    formatStatus(row.status),
  ].map(csvEscape).join(";"));

  return `\uFEFF${header.map(csvEscape).join(";")}\n${lines.join("\n")}`;
}

function buildDashboardDownloadFileName(period: PeriodKey) {
  const today = new Date().toISOString().slice(0, 10);
  return `financeiro-consolidado-${period}-${today}.csv`;
}

async function getOverview(
  organizationId: string,
  period: PeriodKey,
): Promise<OverviewRow> {
  const bounds = getPeriodBounds(period);
  const periodStart = bounds.start;
  const periodEnd = bounds.end;

  const { rows } = await sql<OverviewRow>`
    with payable_open as (
      select coalesce(sum(greatest(p.amount - coalesce(p.paid_amount, 0), 0)), 0) as total
      from payables p
      where p.organization_id = ${organizationId}
        and p.status in ('open', 'partial')
    ),
    receivable_open as (
      select coalesce(sum(greatest(r.amount - coalesce(r.received_amount, 0), 0)), 0) as total
      from receivables r
      where r.organization_id = ${organizationId}
        and r.status in ('open', 'partial')
    ),
    payable_period as (
      select coalesce(sum(coalesce(p.paid_amount, 0)), 0) as total
      from payables p
      where p.organization_id = ${organizationId}
        and p.status = 'paid'
        and (${periodStart}::date is null or p.payment_date::date >= ${periodStart}::date)
        and (${periodEnd}::date is null or p.payment_date::date <= ${periodEnd}::date)
    ),
    receivable_period as (
      select coalesce(sum(coalesce(r.received_amount, 0)), 0) as total
      from receivables r
      where r.organization_id = ${organizationId}
        and r.status = 'received'
        and (${periodStart}::date is null or r.receipt_date::date >= ${periodStart}::date)
        and (${periodEnd}::date is null or r.receipt_date::date <= ${periodEnd}::date)
    ),
    overdue_payables as (
      select coalesce(sum(greatest(p.amount - coalesce(p.paid_amount, 0), 0)), 0) as total
      from payables p
      where p.organization_id = ${organizationId}
        and p.status in ('open', 'partial')
        and p.due_date::date < current_date
    ),
    overdue_receivables as (
      select coalesce(sum(greatest(r.amount - coalesce(r.received_amount, 0), 0)), 0) as total
      from receivables r
      where r.organization_id = ${organizationId}
        and r.status in ('open', 'partial')
        and r.due_date::date < current_date
    )
    select
      (select total from payable_open) as payables_open,
      (select total from receivable_open) as receivables_open,
      (select total from payable_period) as paid_in_period,
      (select total from receivable_period) as received_in_period,
      (select total from overdue_payables) as overdue_payables,
      (select total from overdue_receivables) as overdue_receivables
  `;

  return rows[0] ?? {
    payables_open: 0,
    receivables_open: 0,
    paid_in_period: 0,
    received_in_period: 0,
    overdue_payables: 0,
    overdue_receivables: 0,
  };
}

async function getUpcomingItems(organizationId: string): Promise<UpcomingItem[]> {
  const { rows } = await sql<UpcomingItem>`
    with schedule as (
      select p.id, 'payable'::text as kind, p.status, p.description, s.name as counterpart_name,
        ou.name as unit_name, to_char(p.due_date, 'YYYY-MM-DD') as due_date,
        greatest(p.amount - coalesce(p.paid_amount, 0), 0) as remaining_amount
      from payables p
      inner join organization_units ou on ou.id = p.unit_id
      left join suppliers s on s.id = p.supplier_id
      where p.organization_id = ${organizationId}
        and p.status in ('open', 'partial')
        and p.due_date::date >= current_date
      union all
      select r.id, 'receivable'::text as kind, r.status, r.description, c.name as counterpart_name,
        ou.name as unit_name, to_char(r.due_date, 'YYYY-MM-DD') as due_date,
        greatest(r.amount - coalesce(r.received_amount, 0), 0) as remaining_amount
      from receivables r
      inner join organization_units ou on ou.id = r.unit_id
      left join customers c on c.id = r.customer_id
      where r.organization_id = ${organizationId}
        and r.status in ('open', 'partial')
        and r.due_date::date >= current_date
    )
    select * from schedule order by due_date asc, remaining_amount desc limit 6
  `;

  return rows.map((row) => ({ ...row, kind: row.kind === "payable" ? "payable" : "receivable" }));
}

async function getOverdueItems(organizationId: string): Promise<OverdueItem[]> {
  const { rows } = await sql<OverdueItem>`
    with schedule as (
      select p.id, 'payable'::text as kind, p.status, p.description, s.name as counterpart_name,
        ou.name as unit_name, to_char(p.due_date, 'YYYY-MM-DD') as due_date,
        greatest(p.amount - coalesce(p.paid_amount, 0), 0) as remaining_amount
      from payables p
      inner join organization_units ou on ou.id = p.unit_id
      left join suppliers s on s.id = p.supplier_id
      where p.organization_id = ${organizationId}
        and p.status in ('open', 'partial')
        and p.due_date::date < current_date
      union all
      select r.id, 'receivable'::text as kind, r.status, r.description, c.name as counterpart_name,
        ou.name as unit_name, to_char(r.due_date, 'YYYY-MM-DD') as due_date,
        greatest(r.amount - coalesce(r.received_amount, 0), 0) as remaining_amount
      from receivables r
      inner join organization_units ou on ou.id = r.unit_id
      left join customers c on c.id = r.customer_id
      where r.organization_id = ${organizationId}
        and r.status in ('open', 'partial')
        and r.due_date::date < current_date
    )
    select * from schedule order by due_date asc, remaining_amount desc limit 6
  `;

  return rows.map((row) => ({ ...row, kind: row.kind === "payable" ? "payable" : "receivable" }));
}

async function getConsolidatedRows(organizationId: string, period: PeriodKey): Promise<ConsolidatedRow[]> {
  const bounds = getPeriodBounds(period);
  const periodStart = bounds.start;
  const periodEnd = bounds.end;

  const { rows } = await sql<ConsolidatedRow>`
    with consolidated as (
      select
        p.id::text,
        'payable'::text as kind,
        p.status,
        p.description,
        s.name as counterpart_name,
        ou.name as unit_name,
        to_char(p.due_date, 'YYYY-MM-DD') as due_date,
        p.amount,
        coalesce(p.paid_amount, 0) as settled_amount,
        greatest(p.amount - coalesce(p.paid_amount, 0), 0) as remaining_amount
      from payables p
      inner join organization_units ou on ou.id = p.unit_id
      left join suppliers s on s.id = p.supplier_id
      where p.organization_id = ${organizationId}
        and (${periodStart}::date is null or p.due_date::date >= ${periodStart}::date)
        and (${periodEnd}::date is null or p.due_date::date <= ${periodEnd}::date)

      union all

      select
        r.id::text,
        'receivable'::text as kind,
        r.status,
        r.description,
        c.name as counterpart_name,
        ou.name as unit_name,
        to_char(r.due_date, 'YYYY-MM-DD') as due_date,
        r.amount,
        coalesce(r.received_amount, 0) as settled_amount,
        greatest(r.amount - coalesce(r.received_amount, 0), 0) as remaining_amount
      from receivables r
      inner join organization_units ou on ou.id = r.unit_id
      left join customers c on c.id = r.customer_id
      where r.organization_id = ${organizationId}
        and (${periodStart}::date is null or r.due_date::date >= ${periodStart}::date)
        and (${periodEnd}::date is null or r.due_date::date <= ${periodEnd}::date)
    )
    select *
    from consolidated
    order by due_date asc, kind asc, description asc
    limit 24
  `;

  return rows.map((row) => ({ ...row, kind: row.kind === "payable" ? "payable" : "receivable" }));
}

function formatStatus(status: string): string {
  switch (status) {
    case "open": return "Em aberto";
    case "partial": return "Parcial";
    case "paid": return "Paga";
    case "received": return "Recebida";
    case "canceled": return "Cancelada";
    default: return status;
  }
}

function HeroActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <a href="/app/financeiro/contas-a-pagar" className="rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Ir para pagar</a>
      <a href="/app/financeiro/contas-a-receber" className="rounded-2xl bg-[#1d4f77] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163d5c]">Ir para receber</a>
    </div>
  );
}

function PeriodFilter({ active }: { active: PeriodKey }) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Período do painel</p>
          <p className="mt-1 text-sm text-slate-600">Os cards, comparativos e o resumo consolidado respeitam o período selecionado.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PERIOD_OPTIONS.map((option) => {
            const isActive = option.key === active;
            return (
              <a key={option.key} href={`/app/dashboard?period=${option.key}`} className={cn("rounded-full border px-4 py-2 text-sm font-semibold transition", isActive ? "border-[#1d4f77] bg-[#1d4f77] text-white" : "border-black/10 bg-white text-slate-700 hover:bg-slate-50")}>{option.label}</a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ label, value, helper, tone = "default" }: { label: string; value: string; helper: string; tone?: "default" | "success" | "danger"; }) {
  return (
    <div className={cn("rounded-3xl border bg-white p-5 shadow-sm", tone === "danger" ? "border-red-200" : tone === "success" ? "border-emerald-200" : "border-black/10")}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={cn("mt-2 text-3xl font-bold tracking-tight", tone === "danger" ? "text-red-700" : tone === "success" ? "text-emerald-700" : "text-slate-900")}>{value}</p>
      <p className="mt-3 text-sm text-slate-600">{helper}</p>
    </div>
  );
}

function CompareCard({ title, description, rows }: { title: string; description: string; rows: Array<{ label: string; value: number }>; }) {
  const max = Math.max(...rows.map((row) => Number(row.value || 0)), 1);
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <div className="mt-6 space-y-5">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between gap-3 text-sm font-medium text-slate-700"><span>{row.label}</span><span>{formatMoney(row.value)}</span></div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#1d4f77]" style={{ width: `${Math.max((Number(row.value || 0) / max) * 100, 6)}%` }} /></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function KindBadge({ kind }: { kind: UpcomingItem["kind"] }) {
  const isPayable = kind === "payable";
  return <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold", isPayable ? "border-amber-200 bg-amber-50 text-amber-700" : "border-emerald-200 bg-emerald-50 text-emerald-700")}>{isPayable ? "Pagar" : "Receber"}</span>;
}

function StatusBadge({ status }: { status: string }) {
  return <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold", status === "partial" ? "border-blue-200 bg-blue-50 text-blue-700" : status === "open" ? "border-amber-200 bg-amber-50 text-amber-700" : status === "paid" || status === "received" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-700")}>{formatStatus(status)}</span>;
}

function ScheduleCard({ title, description, items, emptyText, compactWhenEmpty = false }: { title: string; description: string; items: Array<UpcomingItem | OverdueItem>; emptyText: string; compactWhenEmpty?: boolean; }) {
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      {items.length === 0 ? (
        <div className={cn("mt-6 rounded-2xl border border-dashed border-black/10 bg-slate-50 px-4 text-sm text-slate-500", compactWhenEmpty ? "py-6" : "py-12")}>{emptyText}</div>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <a key={`${item.kind}-${item.id}`} href={item.kind === "payable" ? "/app/financeiro/contas-a-pagar" : "/app/financeiro/contas-a-receber"} className="block rounded-3xl border border-black/10 bg-slate-50 px-4 py-4 transition hover:bg-slate-100">
              <div className="flex flex-wrap items-center gap-2"><KindBadge kind={item.kind} /><StatusBadge status={item.status} /></div>
              <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div><p className="text-xl font-semibold tracking-tight text-slate-900">{item.description}</p><p className="mt-1 text-sm text-slate-600">{item.counterpart_name ?? "Sem vínculo"} • {item.unit_name}</p></div>
                <div className="text-right"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Vencimento</p><p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{formatDate(item.due_date)}</p><p className="mt-2 text-sm text-slate-500">Saldo restante</p><p className="text-2xl font-semibold text-slate-900">{formatMoney(item.remaining_amount)}</p></div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

function QuickActionsCard() {
  const actions = [
    { title: "Nova conta a pagar", description: "Abrir o financeiro de saídas para cadastrar uma nova saída.", href: "/app/financeiro/contas-a-pagar", tone: "default" as const },
    { title: "Nova conta a receber", description: "Abrir o financeiro de cobranças para cadastrar uma nova entrada.", href: "/app/financeiro/contas-a-receber", tone: "primary" as const },
    { title: "Revisar vencidas", description: "Conferir rapidamente os itens em atraso nas telas de pagar e receber.", href: "/app/financeiro/contas-a-pagar?status=open", tone: "warning" as const },
    { title: "Revisar parciais", description: "Voltar nas contas parcialmente liquidadas para finalizar pendências.", href: "/app/financeiro/contas-a-receber?status=partial", tone: "subtle" as const },
  ];
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"><div><h2 className="text-xl font-bold tracking-tight text-slate-900">Ações rápidas</h2><p className="mt-1 text-sm text-slate-600">Atalhos para transformar o painel em ponto de trabalho do financeiro.</p></div></div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const className = action.tone === "primary" ? "border-[#1d4f77]/20 bg-[#1d4f77] text-white hover:bg-[#163d5c]" : action.tone === "warning" ? "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100" : action.tone === "subtle" ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100" : "border-black/10 bg-slate-50 text-slate-800 hover:bg-slate-100";
          const descriptionClass = action.tone === "primary" ? "text-white/80" : "text-current/80";
          return <a key={action.title} href={action.href} className={cn("rounded-3xl border px-4 py-4 transition", className)}><div className="flex items-center justify-between gap-3"><span className="text-base font-semibold">{action.title}</span><span aria-hidden="true" className="text-lg">→</span></div><p className={cn("mt-2 text-sm leading-6", descriptionClass)}>{action.description}</p></a>;
        })}
      </div>
    </section>
  );
}

function AlertsCard({ overduePayables, overdueReceivables, projectedBalance, netPeriod }: { overduePayables: number; overdueReceivables: number; projectedBalance: number; netPeriod: number; }) {
  const alerts: Array<{ tone: "warning" | "danger" | "success"; text: string }> = [];
  if (overduePayables > 0) alerts.push({ tone: "warning", text: `Há contas a pagar vencidas somando ${formatMoney(overduePayables)}.` });
  if (overdueReceivables > 0) alerts.push({ tone: "warning", text: `Há contas a receber vencidas somando ${formatMoney(overdueReceivables)}.` });
  if (projectedBalance < 0) alerts.push({ tone: "danger", text: `O saldo projetado está negativo em ${formatMoney(Math.abs(projectedBalance))}.` });
  if (netPeriod > 0) alerts.push({ tone: "success", text: `O resultado líquido do período está positivo em ${formatMoney(netPeriod)}.` });
  else if (netPeriod < 0) alerts.push({ tone: "danger", text: `O resultado líquido do período está negativo em ${formatMoney(Math.abs(netPeriod))}.` });
  if (alerts.length === 0) alerts.push({ tone: "success", text: "Sem alertas críticos no momento. O painel está equilibrado com os dados atuais." });
  return (
    <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold tracking-tight text-slate-900">Alertas simples</h2>
      <p className="mt-2 text-sm text-slate-600">Leitura rápida da saúde financeira com base nos dados atuais.</p>
      <div className="mt-6 space-y-3">{alerts.map((alert, index) => <div key={`${alert.text}-${index}`} className={cn("rounded-2xl border px-4 py-3 text-sm font-medium", alert.tone === "danger" ? "border-red-200 bg-red-50 text-red-700" : alert.tone === "warning" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-emerald-200 bg-emerald-50 text-emerald-700")}>{alert.text}</div>)}</div>
    </section>
  );
}

function ConsolidatedReportCard({ period, rows }: { period: PeriodKey; rows: ConsolidatedRow[] }) {
  const csv = buildDashboardCsv(rows);
  const href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
  const visibleRows = rows.slice(0, 8);

  return (
    <section className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Relatório consolidado</h2>
          <p className="mt-1 text-sm text-slate-600">Resumo de pagar e receber no período selecionado, em uma leitura mais rápida.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={href} download={buildDashboardDownloadFileName(period)} className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100">Exportar CSV consolidado</a>
        </div>
      </div>
      {rows.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-black/10 bg-slate-50 px-4 py-8 text-sm text-slate-500">Nenhum lançamento encontrado no período selecionado.</div>
      ) : (
        <>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {visibleRows.map((row) => (
              <div key={`${row.kind}-${row.id}`} className="rounded-2xl border border-black/10 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <KindBadge kind={row.kind} />
                      <StatusBadge status={row.status} />
                    </div>
                    <p className="mt-3 text-base font-semibold text-slate-900">{row.description}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {row.counterpart_name ?? "Sem vínculo"} • {row.unit_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Vencimento</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{formatDate(row.due_date)}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-black/5 bg-white px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Total</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">{formatMoney(row.amount)}</p>
                  </div>
                  <div className="rounded-2xl border border-black/5 bg-white px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Liquidado</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">{formatMoney(row.settled_amount)}</p>
                  </div>
                  <div className="rounded-2xl border border-black/5 bg-white px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Saldo</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">{formatMoney(row.remaining_amount)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Mostrando {Math.min(visibleRows.length, rows.length)} de {rows.length} lançamento(s) do período.</span>
            <span>Use o CSV consolidado para abrir a visão completa.</span>
          </div>
        </>
      )}
    </section>
  );
}

export default async function SaaSDashboardPage({ searchParams }: { searchParams: SearchParams }) {
  const user = await getCurrentSaaSUser();
  const params = await searchParams;
  const period: PeriodKey = ["today", "7d", "30d", "month"].includes(params.period || "") ? (params.period as PeriodKey) : "month";
  const [overview, upcomingItems, overdueItems, consolidatedRows] = await Promise.all([
    getOverview(user.organization.id, period),
    getUpcomingItems(user.organization.id),
    getOverdueItems(user.organization.id),
    getConsolidatedRows(user.organization.id, period),
  ]);

  const projectedBalance = Number(overview.receivables_open || 0) - Number(overview.payables_open || 0);
  const netPeriod = Number(overview.received_in_period || 0) - Number(overview.paid_in_period || 0);
  const periodLabel = getPeriodBounds(period).label;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Dashboard financeiro</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Visão inicial do financeiro</h1>
            <p className="mt-3 text-slate-600">Painel inicial para acompanhar contas a pagar, contas a receber, valores liquidados e prioridades de vencimento da {user.organization.tradeName ?? user.organization.legalName}.</p>
          </div>
          <HeroActions />
        </div>
      </section>
      <PeriodFilter active={period} />
      <QuickActionsCard />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Contas a pagar em aberto" value={formatMoney(overview.payables_open)} helper="Saldo restante das obrigações abertas e parciais." />
        <SummaryCard label="Contas a receber em aberto" value={formatMoney(overview.receivables_open)} helper="Saldo restante dos recebimentos abertos e parciais." />
        <SummaryCard label="Pago no período" value={formatMoney(overview.paid_in_period)} helper={`Total quitado ${periodLabel}.`} />
        <SummaryCard label="Recebido no período" value={formatMoney(overview.received_in_period)} helper={`Total recebido ${periodLabel}.`} />
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Vencidas a pagar" value={formatMoney(overview.overdue_payables)} helper="Saldo pendente de contas a pagar vencidas." />
        <SummaryCard label="Vencidas a receber" value={formatMoney(overview.overdue_receivables)} helper="Saldo pendente de contas a receber vencidas." />
        <SummaryCard label="Saldo projetado" value={formatMoney(projectedBalance)} helper="Receber em aberto menos pagar em aberto." tone={projectedBalance < 0 ? "danger" : projectedBalance > 0 ? "success" : "default"} />
        <SummaryCard label="Resultado líquido do período" value={formatMoney(netPeriod)} helper="Recebido no período menos pago no período." tone={netPeriod < 0 ? "danger" : netPeriod > 0 ? "success" : "default"} />
      </section>
      <section className="grid gap-4 xl:grid-cols-2">
        <CompareCard title="Comparativo liquidado" description={`Valores já realizados ${periodLabel}.`} rows={[{ label: "Pago no período", value: overview.paid_in_period }, { label: "Recebido no período", value: overview.received_in_period }]} />
        <CompareCard title="Comparativo em aberto" description="Saldo pendente atual entre obrigações e cobranças." rows={[{ label: "Contas a pagar em aberto", value: overview.payables_open }, { label: "Contas a receber em aberto", value: overview.receivables_open }]} />
      </section>
      <ConsolidatedReportCard period={period} rows={consolidatedRows} />
      <section className="grid gap-4 xl:grid-cols-2 xl:items-start">
        <ScheduleCard title="Próximos vencimentos" description="Itens abertos ou parciais com vencimento a partir de hoje." items={upcomingItems} emptyText="Nenhum próximo vencimento encontrado." />
        <ScheduleCard title="Contas vencidas" description="Itens em atraso que merecem atenção imediata." items={overdueItems} emptyText="Nenhuma conta vencida encontrada." compactWhenEmpty />
      </section>
      <AlertsCard overduePayables={overview.overdue_payables} overdueReceivables={overview.overdue_receivables} projectedBalance={projectedBalance} netPeriod={netPeriod} />
    </div>
  );
}
