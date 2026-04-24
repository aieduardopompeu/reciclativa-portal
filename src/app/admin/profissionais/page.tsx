import { sql } from "@vercel/postgres";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdminMasterReady } from "../../../lib/admin-master-auth";

type ProfRow = {
  id: number;
  status: string | null;
  name: string | null;
  uf: string | null;
  city: string | null;
  category: string | null;
  service: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  created_at: Date | null;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

function fmtDate(d: Date | null) {
  if (!d) return "—";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(d);
  } catch {
    return String(d);
  }
}

function safeStatus(v?: string | null) {
  const x = (v || "").toLowerCase();
  if (x === "pending" || x === "approved" || x === "rejected") return x;
  return "";
}

async function resolveSearchParams(
  value?: { status?: string } | Promise<{ status?: string }>
): Promise<{ status?: string }> {
  if (!value) return {};
  if (typeof (value as Promise<{ status?: string }>).then === "function") {
    return (await value) ?? {};
  }
  return value;
}

export default async function AdminProfissionaisPage({
  searchParams,
}: {
  searchParams?: { status?: string } | Promise<{ status?: string }>;
}) {
  await requireAdminMasterReady("/admin/profissionais");
  const sp = await resolveSearchParams(searchParams);
  const requested = safeStatus(sp.status);

  const [{ pending_count }] = await sql<{ pending_count: number }>`
    select count(*)::int as pending_count
    from profissionais
    where status = 'pending'
  `.then((r) => r.rows);

  const [{ approved_count }] = await sql<{ approved_count: number }>`
    select count(*)::int as approved_count
    from profissionais
    where status = 'approved'
  `.then((r) => r.rows);

  const [{ rejected_count }] = await sql<{ rejected_count: number }>`
    select count(*)::int as rejected_count
    from profissionais
    where status = 'rejected'
  `.then((r) => r.rows);

  const status =
    requested ||
    (pending_count > 0 ? "pending" : approved_count > 0 ? "approved" : "rejected");

  const { rows } = await sql<ProfRow>`
    select id, status, name, uf, city, category, service, whatsapp, email, website, created_at
    from profissionais
    where status = ${status}
    order by created_at desc nulls last, id desc
    limit 200
  `;

  async function refreshAction() {
    "use server";
    redirect(`/admin/profissionais?status=${encodeURIComponent(status)}`);
  }

  const statusActionUrl = "/api/admin/profissionais/status";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Aprovação de Profissionais
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Gerencie cadastros pendentes e aprovados.
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

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-600">Pendentes</div>
          <div className="mt-1 text-3xl font-bold">{pending_count}</div>
          <div className="mt-3">
            <Link
              className={`text-sm font-semibold hover:underline ${
                status === "pending" ? "text-emerald-700" : "text-slate-700"
              }`}
              href={`/admin/profissionais?status=pending`}
            >
              Ver pendentes →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-600">Aprovados</div>
          <div className="mt-1 text-3xl font-bold">{approved_count}</div>
          <div className="mt-3">
            <Link
              className={`text-sm font-semibold hover:underline ${
                status === "approved" ? "text-emerald-700" : "text-slate-700"
              }`}
              href={`/admin/profissionais?status=approved`}
            >
              Ver aprovados →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-600">Rejeitados</div>
          <div className="mt-1 text-3xl font-bold">{rejected_count}</div>
          <div className="mt-3">
            <Link
              className={`text-sm font-semibold hover:underline ${
                status === "rejected" ? "text-emerald-700" : "text-slate-700"
              }`}
              href={`/admin/profissionais?status=rejected`}
            >
              Ver rejeitados →
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-8 rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-xl font-bold tracking-tight">
            Lista: <span className="text-slate-500">{status}</span>
          </h2>

          <div className="text-sm text-slate-600">
            Mostrando <span className="font-semibold text-slate-900">{rows.length}</span>{" "}
            itens
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-700">
            Nenhum cadastro com status <strong>{status}</strong>.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {rows.map((p) => {
              const cityLabel = (p.city ?? "").toString().trim();
              const ufLabel = (p.uf ?? "").toString().trim().toUpperCase();
              const title = (p.name ?? "Sem nome").toString();

              return (
                <div
                  key={p.id}
                  className="rounded-2xl border border-black/5 bg-white p-5 hover:bg-slate-50"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        #{p.id} · {title}
                      </div>

                      <div className="mt-1 text-sm text-slate-600">
                        {cityLabel ? (
                          <span className="font-semibold text-slate-800">
                            {cityLabel}
                          </span>
                        ) : (
                          "—"
                        )}
                        {ufLabel ? <span> · {ufLabel}</span> : null}
                        {p.category ? <span> · {p.category}</span> : null}
                      </div>

                      <div className="mt-2 text-xs text-slate-500">
                        Criado em: {fmtDate(p.created_at)}
                      </div>

                      <div className="mt-3 text-sm text-slate-700">
                        {p.service ? (
                          <div>
                            <span className="font-semibold">Serviço:</span>{" "}
                            {p.service}
                          </div>
                        ) : null}
                        {p.whatsapp ? (
                          <div>
                            <span className="font-semibold">WhatsApp:</span>{" "}
                            {p.whatsapp}
                          </div>
                        ) : null}
                        {p.email ? (
                          <div>
                            <span className="font-semibold">E-mail:</span> {p.email}
                          </div>
                        ) : null}
                        {p.website ? (
                          <div>
                            <span className="font-semibold">Site:</span> {p.website}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex min-w-[220px] flex-col gap-2">
                      {status !== "approved" ? (
                        <form method="post" action={statusActionUrl}>
                          <input type="hidden" name="id" value={p.id} />
                          <input type="hidden" name="action" value="approve" />
                          <input type="hidden" name="returnTo" value={status} />
                          <button
                            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                            type="submit"
                          >
                            Aprovar
                          </button>
                        </form>
                      ) : null}

                      {status !== "rejected" ? (
                        <form method="post" action={statusActionUrl}>
                          <input type="hidden" name="id" value={p.id} />
                          <input type="hidden" name="action" value="reject" />
                          <input type="hidden" name="returnTo" value={status} />
                          <textarea
                            name="reason"
                            className="min-h-[88px] rounded-xl border border-black/10 px-3 py-2 text-sm"
                            placeholder="Motivo da rejeição (opcional)"
                          />
                          <label className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                            <input type="checkbox" name="addToBlacklist" value="1" />
                            Adicionar e-mail/site/WhatsApp à blacklist, se houver
                          </label>
                          <button
                            className="mt-2 rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                            type="submit"
                          >
                            Rejeitar
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
