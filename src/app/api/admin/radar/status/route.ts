import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getAdminMasterApiSession } from "@/lib/admin-master-auth";
import { invalidateRadarHomeCache } from "@/lib/radar";

export const runtime = "nodejs";

const VALID_ACTIONS = ["aprovar", "rejeitar", "publicar", "destaque", "remover_destaque", "excluir"] as const;
type Action = (typeof VALID_ACTIONS)[number];

function isValidAction(v: string): v is Action {
  return (VALID_ACTIONS as readonly string[]).includes(v);
}

function safeReturnTo(v: string) {
  const x = (v || "").toLowerCase();
  if (["pendente", "aprovado", "rejeitado", "publicado"].includes(x)) return x;
  return "pendente";
}

export async function POST(req: Request) {
  const session = await getAdminMasterApiSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const idRaw = (form.get("id") || "").toString();
  const action = (form.get("action") || "").toString();
  const returnTo = safeReturnTo((form.get("returnTo") || "").toString());

  const id = Number(idRaw);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  if (!isValidAction(action)) {
    return NextResponse.json({ ok: false, error: "invalid_action" }, { status: 400 });
  }

  if (action === "excluir") {
    await sql`delete from radar_noticias where id = ${id}`;
    invalidateRadarHomeCache();
    return NextResponse.redirect(new URL(`/admin/radar?status=${returnTo}`, req.url), 303);
  }

  if (action === "aprovar") {
    await sql`
      update radar_noticias
      set status = 'aprovado', aprovado_em = now(), atualizado_em = now()
      where id = ${id}
    `;
  } else if (action === "rejeitar") {
    await sql`
      update radar_noticias
      set status = 'rejeitado', atualizado_em = now()
      where id = ${id}
    `;
  } else if (action === "destaque") {
    await sql`update radar_noticias set destaque = false where destaque = true and id != ${id}`;
    await sql`update radar_noticias set destaque = true, atualizado_em = now() where id = ${id}`;
    invalidateRadarHomeCache();
  } else if (action === "remover_destaque") {
    await sql`update radar_noticias set destaque = false, atualizado_em = now() where id = ${id}`;
    invalidateRadarHomeCache();
  } else if (action === "publicar") {
    const found = await sql<{ status: string; destaque: boolean }>`
      select status, destaque from radar_noticias where id = ${id} limit 1
    `;
    const noticia = found.rows[0];
    if (!noticia) {
      return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    }
    if (noticia.status !== "aprovado") {
      return NextResponse.json(
        { ok: false, error: "só é possível publicar notícias com status 'aprovado'" },
        { status: 400 }
      );
    }
    if (noticia.destaque) {
      await sql`update radar_noticias set destaque = false where destaque = true and id != ${id}`;
    }
    await sql`
      update radar_noticias
      set status = 'publicado', publicado_em = now(), atualizado_em = now()
      where id = ${id}
    `;
    invalidateRadarHomeCache();
  }

  return NextResponse.redirect(new URL(`/admin/radar?status=${returnTo}`, req.url), 303);
}
