import { sql } from "@vercel/postgres";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminMasterReady } from "../../../../lib/admin-master-auth";
import { RADAR_TAGS, RADAR_TAG_META, type RadarNoticiaRow } from "@/lib/radar";
import { RadarTagBadge } from "@/components/radar/RadarTagBadge";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function fmtDate(d: Date | null) {
  if (!d) return "—";
  try {
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(d);
  } catch {
    return String(d);
  }
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    aprovado?: string;
    rejeitado?: string;
    sugerir_destaque?: string;
    erro?: string;
  }>;
};

export default async function AdminRadarDetailPage({ params, searchParams }: Props) {
  await requireAdminMasterReady("/admin/radar");
  const { id } = await params;
  const sp = (await searchParams) ?? {};
  const noticiaId = Number(id);
  if (!Number.isFinite(noticiaId)) return notFound();

  const { rows } = await sql<RadarNoticiaRow>`
    select * from radar_noticias where id = ${noticiaId} limit 1
  `;
  const noticia = rows[0];
  if (!noticia) return notFound();

  const statusActionUrl = "/api/admin/radar/status";
  const editActionUrl = `/api/admin/radar/${noticia.id}/edit`;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/admin/radar" className="text-sm font-semibold text-emerald-700 hover:underline">
        ← Voltar para Radar Ambiental
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">
          #{noticia.id} · {noticia.titulo}
        </h1>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">
          {noticia.status}
        </span>
      </div>

      {sp.aprovado ? (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Matéria aprovada. Publique quando estiver pronta.
        </div>
      ) : null}
      {sp.rejeitado ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
          Matéria rejeitada.
        </div>
      ) : null}
      {sp.sugerir_destaque ? (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Relevância máxima (5/5) — considere marcar esta matéria como destaque ao publicar.
        </div>
      ) : null}
      {sp.erro === "ja_processado" ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          Este link já foi usado — a matéria já não está mais pendente.
        </div>
      ) : null}

      {/* Preview como ficará publicada */}
      <section className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Preview</p>
        <div
          className="relative overflow-hidden rounded-xl bg-[#0d1f12] bg-cover bg-center p-6 text-white"
          style={noticia.imagem_url ? { backgroundImage: `url(${noticia.imagem_url})` } : undefined}
        >
          {noticia.imagem_url ? <div className="absolute inset-0 bg-[#0d1f12]/65" /> : null}
          <div className="relative">
            <RadarTagBadge tag={noticia.tag} />
            <h2 className="mt-3 text-xl font-black">{noticia.titulo}</h2>
            <p className="mt-2 text-sm text-white/70">
              {noticia.cidade_uf ?? "Sem cidade/UF"} · relevância {noticia.relevancia}/5
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-700">{noticia.resumo}</p>

        {noticia.fonte_url ? (
          <p className="mt-3 text-xs text-slate-500">
            Fonte:{" "}
            <a
              href={noticia.fonte_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-700 hover:underline"
            >
              {noticia.fonte_nome ?? noticia.fonte_url}
            </a>
          </p>
        ) : null}

        {noticia.conteudo ? (
          <div className="mt-5 border-t border-black/5 pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Conteúdo completo
            </p>
            <div
              className={[
                "mt-3 space-y-3 text-sm leading-relaxed text-slate-800",
                "[&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-900",
                "[&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-slate-900",
                "[&_ul]:list-disc [&_ul]:pl-5",
                "[&_ol]:list-decimal [&_ol]:pl-5",
              ].join(" ")}
              dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
            />
          </div>
        ) : null}
      </section>

      {/* Campos editáveis */}
      <section className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold tracking-tight">Editar</h2>
        <form method="post" action={editActionUrl} className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="titulo">
              Título
            </label>
            <input
              id="titulo"
              name="titulo"
              defaultValue={noticia.titulo}
              className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="resumo">
              Resumo
            </label>
            <textarea
              id="resumo"
              name="resumo"
              defaultValue={noticia.resumo}
              className="mt-1 min-h-[96px] w-full rounded-xl border border-black/10 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="imagem_url">
              Imagem de destaque (URL)
            </label>
            <input
              id="imagem_url"
              name="imagem_url"
              defaultValue={noticia.imagem_url ?? ""}
              placeholder="https://..."
              className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700" htmlFor="conteudo">
              Conteúdo (HTML)
            </label>
            <textarea
              id="conteudo"
              name="conteudo"
              defaultValue={noticia.conteudo ?? ""}
              className="mt-1 min-h-[220px] w-full rounded-xl border border-black/10 px-3 py-2 font-mono text-xs"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="tag">
                Tag
              </label>
              <select
                id="tag"
                name="tag"
                defaultValue={noticia.tag}
                className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"
              >
                {RADAR_TAGS.map((t) => (
                  <option key={t} value={t}>
                    {RADAR_TAG_META[t].label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="cidade_uf">
                Cidade · UF
              </label>
              <input
                id="cidade_uf"
                name="cidade_uf"
                defaultValue={noticia.cidade_uf ?? ""}
                placeholder="Rio de Janeiro · RJ"
                className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Salvar alterações
            </button>
            {noticia.status === "aprovado" ? (
              <button
                type="submit"
                name="publicar_agora"
                value="1"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                Editar e publicar
              </button>
            ) : null}
          </div>
        </form>
      </section>

      {/* Ações de status */}
      <section className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold tracking-tight">Ações</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {noticia.status === "pendente" ? (
            <>
              <form method="post" action={statusActionUrl}>
                <input type="hidden" name="id" value={noticia.id} />
                <input type="hidden" name="action" value="aprovar" />
                <input type="hidden" name="returnTo" value={noticia.status} />
                <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">
                  Aprovar
                </button>
              </form>
              <form method="post" action={statusActionUrl}>
                <input type="hidden" name="id" value={noticia.id} />
                <input type="hidden" name="action" value="rejeitar" />
                <input type="hidden" name="returnTo" value={noticia.status} />
                <button className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                  Rejeitar
                </button>
              </form>
            </>
          ) : null}

          {noticia.status === "aprovado" ? (
            <>
              <form method="post" action={statusActionUrl}>
                <input type="hidden" name="id" value={noticia.id} />
                <input type="hidden" name="action" value="publicar" />
                <input type="hidden" name="returnTo" value={noticia.status} />
                <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">
                  Publicar
                </button>
              </form>
              <form method="post" action={statusActionUrl}>
                <input type="hidden" name="id" value={noticia.id} />
                <input type="hidden" name="action" value={noticia.destaque ? "remover_destaque" : "destaque"} />
                <input type="hidden" name="returnTo" value={noticia.status} />
                <button className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                  {noticia.destaque ? "Remover destaque" : "Marcar destaque"}
                </button>
              </form>
              <form method="post" action={statusActionUrl}>
                <input type="hidden" name="id" value={noticia.id} />
                <input type="hidden" name="action" value="rejeitar" />
                <input type="hidden" name="returnTo" value={noticia.status} />
                <button className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                  Rejeitar
                </button>
              </form>
            </>
          ) : null}

          {noticia.status === "publicado" ? (
            <form method="post" action={statusActionUrl}>
              <input type="hidden" name="id" value={noticia.id} />
              <input type="hidden" name="action" value={noticia.destaque ? "remover_destaque" : "destaque"} />
              <input type="hidden" name="returnTo" value={noticia.status} />
              <button className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                {noticia.destaque ? "Remover destaque" : "Marcar destaque"}
              </button>
            </form>
          ) : null}

          <form method="post" action={statusActionUrl}>
            <input type="hidden" name="id" value={noticia.id} />
            <input type="hidden" name="action" value="excluir" />
            <input type="hidden" name="returnTo" value={noticia.status} />
            <button className="rounded-xl px-4 py-2 text-sm font-semibold text-red-600 hover:underline">
              Excluir
            </button>
          </form>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm text-sm text-slate-600">
        <div className="grid gap-2 sm:grid-cols-2">
          <div>Criado em: {fmtDate(noticia.criado_em)}</div>
          <div>Aprovado em: {fmtDate(noticia.aprovado_em)}</div>
          <div>Publicado em: {fmtDate(noticia.publicado_em)}</div>
          <div>Fonte: {noticia.fonte_nome ?? "—"}</div>
        </div>
      </section>
    </main>
  );
}
