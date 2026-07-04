import { sql } from "@vercel/postgres";
import Link from "next/link";
import { requireAdminMasterReady } from "../../../lib/admin-master-auth";
import { RADAR_TAG_META, type RadarNoticiaRow, type RadarStatus } from "@/lib/radar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function safeStatus(v?: string | null): RadarStatus | "" {
  const x = (v || "").toLowerCase();
  if (x === "pendente" || x === "aprovado" || x === "rejeitado" || x === "publicado") return x;
  return "";
}

function fmtDate(d: Date | null) {
  if (!d) return "—";
  try {
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(d);
  } catch {
    return String(d);
  }
}

function stars(relevancia: number) {
  return "★".repeat(relevancia) + "☆".repeat(5 - relevancia);
}

export default async function AdminRadarPage({
  searchParams,
}: {
  searchParams?: Promise<{
    status?: string;
    buscadas?: string;
    ignoradas?: string;
    busca_erro?: string;
  }>;
}) {
  await requireAdminMasterReady("/admin/radar");
  const sp = (await searchParams) ?? {};
  const requested = safeStatus(sp.status);

  const [{ pendente_count }] = await sql<{ pendente_count: number }>`
    select count(*)::int as pendente_count from radar_noticias where status = 'pendente'
  `.then((r) => r.rows);

  const [{ aprovado_count }] = await sql<{ aprovado_count: number }>`
    select count(*)::int as aprovado_count from radar_noticias where status = 'aprovado'
  `.then((r) => r.rows);

  const [{ publicado_mes_count }] = await sql<{ publicado_mes_count: number }>`
    select count(*)::int as publicado_mes_count from radar_noticias
    where status = 'publicado' and date_trunc('month', publicado_em) = date_trunc('month', now())
  `.then((r) => r.rows);

  const [{ rejeitado_count }] = await sql<{ rejeitado_count: number }>`
    select count(*)::int as rejeitado_count from radar_noticias where status = 'rejeitado'
  `.then((r) => r.rows);

  const status: RadarStatus = requested || "pendente";

  const { rows } = await sql<RadarNoticiaRow>`
    select * from radar_noticias
    where status = ${status}
    order by criado_em desc
    limit 200
  `;

  const statusActionUrl = "/api/admin/radar/status";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Admin</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Radar Ambiental</h1>
          <p className="mt-2 text-sm text-slate-600">
            Aprovação, rejeição e publicação das matérias do clipping editorial.
          </p>
        </div>
      </div>

      {sp.buscadas !== undefined ? (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Busca concluída: <strong>{sp.buscadas}</strong> matéria(s) nova(s) criada(s) como
          pendente
          {Number(sp.ignoradas) > 0 ? (
            <span>
              {" "}
              · {sp.ignoradas} ignorada(s) (já existente ou sem relação com o tema)
            </span>
          ) : null}
          .
        </div>
      ) : null}
      {sp.busca_erro ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          Falha na busca: {sp.busca_erro}
        </div>
      ) : null}

      <section className="mt-6 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-600">
          Buscar notícias automaticamente
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Pesquisa notícias reais na web e redige rascunhos com IA, já entrando como pendente
          (com notificação no Telegram se a relevância for alta).
        </p>
        <form
          method="post"
          action="/api/admin/radar/buscar"
          className="mt-4 flex flex-wrap gap-3"
        >
          <input type="hidden" name="returnTo" value={status} />
          <input
            type="text"
            name="query"
            placeholder="Tema da busca (opcional — ex: legislação lixo eletrônico São Paulo)"
            className="min-w-[260px] flex-1 rounded-xl border border-black/10 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            Buscar notícias
          </button>
        </form>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-600">Pendentes</div>
          <div className="mt-1 text-3xl font-bold">{pendente_count}</div>
          <Link
            className={`mt-3 inline-block text-sm font-semibold hover:underline ${
              status === "pendente" ? "text-emerald-700" : "text-slate-700"
            }`}
            href="/admin/radar?status=pendente"
          >
            Ver pendentes →
          </Link>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-600">Aprovadas</div>
          <div className="mt-1 text-3xl font-bold">{aprovado_count}</div>
          <Link
            className={`mt-3 inline-block text-sm font-semibold hover:underline ${
              status === "aprovado" ? "text-emerald-700" : "text-slate-700"
            }`}
            href="/admin/radar?status=aprovado"
          >
            Ver aprovadas →
          </Link>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-600">Publicadas este mês</div>
          <div className="mt-1 text-3xl font-bold">{publicado_mes_count}</div>
          <Link
            className={`mt-3 inline-block text-sm font-semibold hover:underline ${
              status === "publicado" ? "text-emerald-700" : "text-slate-700"
            }`}
            href="/admin/radar?status=publicado"
          >
            Ver publicadas →
          </Link>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-600">Rejeitadas</div>
          <div className="mt-1 text-3xl font-bold">{rejeitado_count}</div>
          <Link
            className={`mt-3 inline-block text-sm font-semibold hover:underline ${
              status === "rejeitado" ? "text-emerald-700" : "text-slate-700"
            }`}
            href="/admin/radar?status=rejeitado"
          >
            Ver rejeitadas →
          </Link>
        </div>
      </div>

      <section className="mt-8 rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-xl font-bold tracking-tight">
            Lista: <span className="text-slate-500">{status}</span>
          </h2>
          <div className="text-sm text-slate-600">
            Mostrando <span className="font-semibold text-slate-900">{rows.length}</span> itens
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-black/5 bg-slate-50 p-4 text-sm text-slate-700">
            Nenhuma notícia com status <strong>{status}</strong>.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {rows.map((n) => (
              <div
                key={n.id}
                className="rounded-2xl border border-black/5 bg-white p-5 hover:bg-slate-50"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">
                      #{n.id} ·{" "}
                      <Link href={`/admin/radar/${n.id}`} className="hover:underline">
                        {n.titulo}
                      </Link>
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      {RADAR_TAG_META[n.tag]?.label ?? n.tag}
                      {n.cidade_uf ? <span> · {n.cidade_uf}</span> : null}
                      <span> · relevância {stars(n.relevancia)}</span>
                      {n.destaque ? <span> · destaque</span> : null}
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      Criado em: {fmtDate(n.criado_em)}
                    </div>
                  </div>

                  <div className="flex min-w-[220px] flex-col gap-2">
                    {status === "pendente" ? (
                      <>
                        <form method="post" action={statusActionUrl}>
                          <input type="hidden" name="id" value={n.id} />
                          <input type="hidden" name="action" value="aprovar" />
                          <input type="hidden" name="returnTo" value={status} />
                          <button className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">
                            Aprovar
                          </button>
                        </form>
                        <form method="post" action={statusActionUrl}>
                          <input type="hidden" name="id" value={n.id} />
                          <input type="hidden" name="action" value="rejeitar" />
                          <input type="hidden" name="returnTo" value={status} />
                          <button className="w-full rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                            Rejeitar
                          </button>
                        </form>
                      </>
                    ) : null}

                    {status === "aprovado" ? (
                      <form method="post" action={statusActionUrl}>
                        <input type="hidden" name="id" value={n.id} />
                        <input type="hidden" name="action" value="publicar" />
                        <input type="hidden" name="returnTo" value={status} />
                        <button className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">
                          Publicar
                        </button>
                      </form>
                    ) : null}

                    {status === "publicado" ? (
                      <form method="post" action={statusActionUrl}>
                        <input type="hidden" name="id" value={n.id} />
                        <input
                          type="hidden"
                          name="action"
                          value={n.destaque ? "remover_destaque" : "destaque"}
                        />
                        <input type="hidden" name="returnTo" value={status} />
                        <button className="w-full rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                          {n.destaque ? "Remover destaque" : "Marcar destaque"}
                        </button>
                      </form>
                    ) : null}

                    <Link
                      href={`/admin/radar/${n.id}`}
                      className="text-center text-sm font-semibold text-emerald-700 hover:underline"
                    >
                      Ver detalhes →
                    </Link>

                    <form method="post" action={statusActionUrl}>
                      <input type="hidden" name="id" value={n.id} />
                      <input type="hidden" name="action" value="excluir" />
                      <input type="hidden" name="returnTo" value={status} />
                      <button className="w-full text-center text-xs font-semibold text-red-600 hover:underline">
                        Excluir
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
