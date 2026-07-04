import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getAdminMasterApiSession } from "@/lib/admin-master-auth";
import { searchRadarNews } from "@/lib/radar-search";
import { draftRadarNoticia } from "@/lib/radar-draft";
import { insertRadarNoticiaAndNotify } from "@/lib/radar-ingest";

export const runtime = "nodejs";

const DEFAULT_QUERY =
  "notícias reciclagem eletrônicos descarte legislação ambiental economia circular Brasil";

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
  const query = (form.get("query") || "").toString().trim() || DEFAULT_QUERY;
  const returnTo = safeReturnTo((form.get("returnTo") || "").toString());

  let results;
  try {
    results = await searchRadarNews(query, 5);
  } catch (err) {
    const redirectUrl = new URL(`/admin/radar?status=${returnTo}`, req.url);
    redirectUrl.searchParams.set("busca_erro", String(err instanceof Error ? err.message : err));
    return NextResponse.redirect(redirectUrl, 303);
  }

  let criadas = 0;
  let ignoradas = 0;

  for (const result of results) {
    const existing = await sql`
      select id from radar_noticias where fonte_url = ${result.url} limit 1
    `;
    if ((existing.rowCount ?? 0) > 0) {
      ignoradas++;
      continue;
    }

    let draft;
    try {
      draft = await draftRadarNoticia(result);
    } catch (err) {
      console.error("[radar/buscar] falha ao redigir", result.url, err);
      ignoradas++;
      continue;
    }

    if (!draft) {
      ignoradas++;
      continue;
    }

    let fonteNome = result.url;
    try {
      fonteNome = new URL(result.url).hostname.replace(/^www\./, "");
    } catch {
      // mantém a URL crua se não for parseável
    }

    await insertRadarNoticiaAndNotify({
      titulo: draft.titulo,
      resumo: draft.resumo,
      conteudo: draft.conteudo,
      fonte_url: result.url,
      fonte_nome: fonteNome,
      imagem_url: result.imageUrl,
      tag: draft.tag,
      cidade_uf: draft.cidade_uf,
      relevancia: draft.relevancia,
      risco: draft.risco,
    });
    criadas++;
  }

  const redirectUrl = new URL(`/admin/radar?status=${returnTo}`, req.url);
  redirectUrl.searchParams.set("buscadas", String(criadas));
  redirectUrl.searchParams.set("ignoradas", String(ignoradas));
  return NextResponse.redirect(redirectUrl, 303);
}
