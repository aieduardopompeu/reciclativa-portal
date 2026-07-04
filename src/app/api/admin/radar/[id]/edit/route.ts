import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getAdminMasterApiSession } from "@/lib/admin-master-auth";
import { isRadarTag, invalidateRadarHomeCache } from "@/lib/radar";

export const runtime = "nodejs";

export async function POST(
  req: Request,
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

  const form = await req.formData();
  const titulo = (form.get("titulo") || "").toString().trim();
  const resumo = (form.get("resumo") || "").toString().trim();
  const conteudo = (form.get("conteudo") || "").toString().trim();
  const tag = (form.get("tag") || "").toString().trim();
  const cidadeUf = (form.get("cidade_uf") || "").toString().trim();
  const publicarAgora = form.get("publicar_agora") === "1";

  if (!titulo || !resumo || !tag || !isRadarTag(tag)) {
    return NextResponse.json({ ok: false, error: "campos inválidos" }, { status: 400 });
  }

  await sql`
    update radar_noticias
    set titulo = ${titulo},
        resumo = ${resumo},
        conteudo = ${conteudo || null},
        tag = ${tag},
        cidade_uf = ${cidadeUf || null},
        atualizado_em = now()
    where id = ${noticiaId}
  `;

  if (publicarAgora) {
    const found = await sql<{ status: string; destaque: boolean }>`
      select status, destaque from radar_noticias where id = ${noticiaId} limit 1
    `;
    const noticia = found.rows[0];
    if (noticia?.status === "aprovado") {
      if (noticia.destaque) {
        await sql`update radar_noticias set destaque = false where destaque = true and id != ${noticiaId}`;
      }
      await sql`
        update radar_noticias
        set status = 'publicado', publicado_em = now(), atualizado_em = now()
        where id = ${noticiaId}
      `;
    }
  }

  invalidateRadarHomeCache();

  return NextResponse.redirect(new URL(`/admin/radar/${noticiaId}`, req.url), 303);
}
