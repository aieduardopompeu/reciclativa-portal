import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getAdminMasterApiSession } from "@/lib/admin-master-auth";
import { invalidateRadarHomeCache, toPublicNoticia, type RadarNoticiaRow } from "@/lib/radar";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminMasterApiSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const noticiaId = Number(id);
  if (!Number.isFinite(noticiaId)) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  const found = await sql<RadarNoticiaRow>`
    select * from radar_noticias where id = ${noticiaId} limit 1
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
    await sql`
      update radar_noticias set destaque = false where destaque = true and id != ${noticiaId}
    `;
  }

  const updated = await sql<RadarNoticiaRow>`
    update radar_noticias
    set status = 'publicado', publicado_em = now(), atualizado_em = now()
    where id = ${noticiaId}
    returning *
  `;

  invalidateRadarHomeCache();

  return NextResponse.json({ ok: true, noticia: toPublicNoticia(updated.rows[0]) });
}
