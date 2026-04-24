import { sql } from "@vercel/postgres";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdminMasterReady } from "../../../lib/admin-master-auth";

type SignupRow = {
  id: string;
  cnpj: string | null;
  legal_name: string | null;
  trade_name: string | null;
  status: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_whatsapp: string | null;
  official_city: string | null;
  official_state: string | null;
  lookup_mode: string | null;
  requested_modules: unknown;
  converted_organization_id: string | null;
  converted_user_id: string | null;
  created_at: Date | null;
};

type SearchParamsShape = {
  status?: string;
  q?: string;
  uf?: string;
  result?: string;
  error?: string;
  created_email?: string;
  email_status?: string;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const allowedStatuses = [
  "pending",
  "under_review",
  "approved",
  "rejected",
  "needs_adjustment",
  "cancelled",
] as const;

type AllowedStatus = (typeof allowedStatuses)[number];

function safeStatus(v?: string | null): AllowedStatus | "" {
  const x = (v || "").toLowerCase();
  return (allowedStatuses as readonly string[]).includes(x) ? (x as AllowedStatus) : "";
}

function fmtDate(d: Date | null) {
  if (!d) return "—";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo",
    }).format(d);
  } catch {
    return String(d);
  }
}

function fmtModules(value: unknown) {
  const raw = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  const labels: Record<string, string> = {
    operation: "Operação",
    inventory: "Estoque",
    finance: "Financeiro",
    customers_suppliers: "Clientes e fornecedores",
    reports: "Relatórios",
    multiunit: "Multiunidade",
  };

  return raw
    .map((item) => String(item).trim())
    .filter(Boolean)
    .map((item) => labels[item] || item);
}

function statusLabel(status: string | null) {
  switch (status) {
    case "pending":
      return "Pendente";
    case "under_review":
      return "Em análise";
    case "approved":
      return "Aprovado";
    case "rejected":
      return "Rejeitado";
    case "needs_adjustment":
      return "Solicitar ajuste";
    case "cancelled":
      return "Cancelado";
    default:
      return status || "—";
  }
}

async function resolveSearchParams(
  value?: SearchParamsShape | Promise<SearchParamsShape>
): Promise<SearchParamsShape> {
  if (!value) return {};
  if (typeof (value as Promise<SearchParamsShape>).then === "function") {
    return (await value) ?? {};
  }
  return value;
}

function resultMessage(result?: string, createdEmail?: string) {
  switch (result) {
    case "approved_and_converted":
      return createdEmail
        ? `Cadastro convertido com sucesso em organização real. Usuário principal pronto: ${createdEmail}.`
        : "Cadastro convertido com sucesso em organização real.";
    case "reconciled_existing_org":
      return createdEmail
        ? `Cadastro reconciliado com organização já existente. Usuário principal pronto: ${createdEmail}.`
        : "Cadastro reconciliado com organização já existente.";
    default:
      return "";
  }
}

function emailStatusMessage(emailStatus?: string) {
  switch (emailStatus) {
    case "sent":
      return "E-mail de acesso inicial enviado com sucesso para o responsável da empresa.";
    case "failed":
      return "A empresa foi aprovada, mas o e-mail de acesso inicial não foi enviado. Verifique a configuração do Resend e reenvie depois.";
    default:
      return "";
  }
}

function errorMessage(error?: string) {
  switch (error) {
    case "missing_required":
      return "Faltam dados obrigatórios no cadastro para criar a empresa e o usuário principal.";
    case "user_email_exists":
      return "Já existe um usuário do sistema com este e-mail em outra organização.";
    case "invalid_status":
      return "Status inválido para a ação.";
    default:
      return "";
  }
}

export default async function AdminCadastrosEmpresasPage({
  searchParams,
}: {
  searchParams?: SearchParamsShape | Promise<SearchParamsShape>;
}) {
  await requireAdminMasterReady("/admin/cadastros-empresas");
  const sp = await resolveSearchParams(searchParams);
  const status = safeStatus(sp.status);
  const q = (sp.q || "").trim();
  const uf = (sp.uf || "").trim().toUpperCase().slice(0, 2);

  const successMsg = resultMessage(sp.result, sp.created_email);
  const emailMsg = emailStatusMessage(sp.email_status);
  const errorMsg = errorMessage(sp.error);

  const countsResult = await sql<{
    status: string;
    total: number;
  }>`
    select status, count(*)::int as total
    from company_signups
    group by status
  `;
  const counts = new Map(countsResult.rows.map((row) => [row.status, row.total]));

  const defaultStatus =
    status ||
    (counts.get("pending")
      ? "pending"
      : counts.get("under_review")
        ? "under_review"
        : counts.get("approved")
          ? "approved"
          : "pending");

  const ufRows = await sql<{ official_state: string | null }>`
    select distinct official_state
    from company_signups
    where official_state is not null and official_state <> ''
    order by official_state asc
  `;

  const rowsResult = await sql<SignupRow>`
    select
      id::text,
      cnpj,
      legal_name,
      trade_name,
      status,
      contact_name,
      contact_email,
      contact_whatsapp,
      official_city,
      official_state,
      lookup_mode,
      requested_modules,
      converted_organization_id::text,
      converted_user_id::text,
      created_at
    from company_signups
    where status = ${defaultStatus}
      and (
        ${q} = ''
        or legal_name ilike ${"%" + q + "%"}
        or coalesce(trade_name, '') ilike ${"%" + q + "%"}
        or cnpj ilike ${"%" + q + "%"}
        or contact_email ilike ${"%" + q + "%"}
        or contact_name ilike ${"%" + q + "%"}
      )
      and (${uf} = '' or official_state = ${uf})
    order by created_at desc, legal_name asc
    limit 200
  `;
  const rows = rowsResult.rows;

  async function refreshAction() {
    "use server";
    const params = new URLSearchParams();
    params.set("status", defaultStatus);
    if (q) params.set("q", q);
    if (uf) params.set("uf", uf);
    redirect(`/admin/cadastros-empresas?${params.toString()}`);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {successMsg ? (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {successMsg}
        </div>
      ) : null}

      {emailMsg ? (
        <div className={`mb-4 rounded-xl px-4 py-3 text-sm ${
          sp.email_status === "sent"
            ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
            : "border border-amber-200 bg-amber-50 text-amber-900"
        }`}>
          {emailMsg}
        </div>
      ) : null}

      {errorMsg ? (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          {errorMsg}
        </div>
      ) : null}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Cadastros de empresas
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Gestão das solicitações enviadas pela página pública de cadastro.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Na aprovação, o sistema cria ou reconcilia a organização, a unidade matriz, o usuário principal, libera os módulos solicitados e tenta enviar o acesso inicial por e-mail.
          </p>
        </div>

        <form action={refreshAction}>
          <button
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
            type="submit"
          >
            Atualizar
          </button>
        </form>
      </div>
      {/* resto da página permanece igual abaixo */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allowedStatuses.map((item) => (
          <Link
            key={item}
            href={`/admin/cadastros-empresas?status=${item}`}
            className={`rounded-2xl border p-5 shadow-sm transition ${
              defaultStatus === item
                ? "border-emerald-200 bg-emerald-50"
                : "border-black/5 bg-white hover:bg-slate-50"
            }`}
          >
            <div className="text-sm text-slate-600">{statusLabel(item)}</div>
            <div className="mt-1 text-3xl font-bold">{counts.get(item) || 0}</div>
            <div className="mt-3 text-sm font-semibold text-slate-700">
              Ver lista →
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-8 rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
        <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px]" method="get">
          <input type="hidden" name="status" value={defaultStatus} />
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-900">Buscar</span>
            <input className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-400" name="q" defaultValue={q} placeholder="Razão social, CNPJ, e-mail ou responsável" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-900">UF</span>
            <select className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-emerald-400" name="uf" defaultValue={uf}>
              <option value="">Todas</option>
              {ufRows.rows.map((row) => {
                const value = (row.official_state || "").trim().toUpperCase();
                if (!value) return null;
                return <option key={value} value={value}>{value}</option>;
              })}
            </select>
          </label>
          <div className="flex items-end gap-2">
            <button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800" type="submit">Filtrar</button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-xl font-bold tracking-tight">
            Lista: <span className="text-slate-500">{statusLabel(defaultStatus)}</span>
          </h2>

          <div className="text-sm text-slate-600">
            Mostrando <span className="font-semibold text-slate-900">{rows.length}</span> itens
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-700">
            Nenhum cadastro encontrado para os filtros atuais.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {rows.map((row) => {
              const modules = fmtModules(row.requested_modules);

              return (
                <details key={row.id} className="rounded-2xl border border-black/5 bg-white p-5 open:bg-slate-50">
                  <summary className="cursor-pointer list-none">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{row.legal_name || "Sem razão social"}</div>
                        <div className="mt-1 text-sm text-slate-600">
                          {row.trade_name ? <span>{row.trade_name}</span> : null}
                          {row.cnpj ? <span>{row.trade_name ? " · " : ""}{row.cnpj}</span> : null}
                          {row.official_city ? <span>{" · "}{row.official_city}{row.official_state ? `/${row.official_state}` : ""}</span> : null}
                        </div>
                        {row.converted_organization_id ? (
                          <div className="mt-2 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                            Organização vinculada no sistema
                          </div>
                        ) : null}
                      </div>
                      <div className="text-right">
                        <div className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">{statusLabel(row.status)}</div>
                        <div className="mt-2 text-xs text-slate-500">{fmtDate(row.created_at)}</div>
                      </div>
                    </div>
                  </summary>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                      <h3 className="text-sm font-bold text-slate-900">Dados do cadastro</h3>
                      <dl className="mt-3 space-y-2 text-sm text-slate-700">
                        <div><dt className="font-semibold text-slate-900">Responsável</dt><dd>{row.contact_name || "—"}</dd></div>
                        <div><dt className="font-semibold text-slate-900">E-mail</dt><dd>{row.contact_email || "—"}</dd></div>
                        <div><dt className="font-semibold text-slate-900">WhatsApp</dt><dd>{row.contact_whatsapp || "—"}</dd></div>
                        <div><dt className="font-semibold text-slate-900">Modo da consulta</dt><dd>{row.lookup_mode === "manual" ? "Manual" : "Consulta pública"}</dd></div>
                        {row.converted_organization_id ? <div><dt className="font-semibold text-slate-900">ID da organização</dt><dd>{row.converted_organization_id}</dd></div> : null}
                        {row.converted_user_id ? <div><dt className="font-semibold text-slate-900">ID do usuário principal</dt><dd>{row.converted_user_id}</dd></div> : null}
                      </dl>
                    </div>
                    <div className="rounded-2xl border border-black/5 bg-slate-50 p-4">
                      <h3 className="text-sm font-bold text-slate-900">Módulos solicitados</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {modules.length ? modules.map((item) => (
                          <span key={item} className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">{item}</span>
                        )) : <span className="text-sm text-slate-500">Nenhum módulo informado.</span>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {defaultStatus !== "under_review" ? <StatusForm id={row.id} actionLabel="Marcar em análise" actionValue="under_review" /> : null}
                    {defaultStatus !== "approved" ? <StatusForm id={row.id} actionLabel="Aprovar e converter" actionValue="approved" /> : null}
                    {defaultStatus !== "needs_adjustment" ? <StatusForm id={row.id} actionLabel="Solicitar ajuste" actionValue="needs_adjustment" /> : null}
                    {defaultStatus !== "rejected" ? <StatusForm id={row.id} actionLabel="Rejeitar" actionValue="rejected" /> : null}
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

function StatusForm({ id, actionLabel, actionValue }: { id: string; actionLabel: string; actionValue: AllowedStatus; }) {
  return (
    <form action="/api/admin/company-signups/status" method="post">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={actionValue} />
      <button className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50" type="submit">
        {actionLabel}
      </button>
    </form>
  );
}
