import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { isRadarTag, invalidateRadarHomeCache } from "@/lib/radar";
import { sendRadarApprovalTelegram } from "@/lib/radar-telegram";

export const runtime = "nodejs";

function isAuthorized(req: Request) {
  const expected = process.env.RADAR_API_KEY;
  const provided = req.headers.get("x-api-key");
  return Boolean(expected && provided && provided === expected);
}

type IngestBody = {
  titulo?: unknown;
  resumo?: unknown;
  conteudo?: unknown;
  fonte_url?: unknown;
  fonte_nome?: unknown;
  tag?: unknown;
  cidade_uf?: unknown;
  relevancia?: unknown;
  risco?: unknown;
};

function asText(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asIntInRange(v: unknown, min: number, max: number, fallback: number): number {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: IngestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const titulo = asText(body.titulo);
  const resumo = asText(body.resumo);
  const tagRaw = asText(body.tag);

  if (!titulo || !resumo || !tagRaw || !isRadarTag(tagRaw)) {
    return NextResponse.json(
      { ok: false, error: "campos obrigatórios: titulo, resumo, tag (tag inválida)" },
      { status: 400 }
    );
  }

  const conteudo = asText(body.conteudo);
  const fonteUrl = asText(body.fonte_url);
  const fonteNome = asText(body.fonte_nome);
  const cidadeUf = asText(body.cidade_uf);
  const relevancia = asIntInRange(body.relevancia, 1, 5, 3);
  const risco = asIntInRange(body.risco, 1, 5, 1);

  const inserted = await sql<{ id: number; token_aprovacao: string }>`
    insert into radar_noticias (
      titulo, resumo, conteudo, fonte_url, fonte_nome, tag, cidade_uf, relevancia, risco, status
    )
    values (
      ${titulo}, ${resumo}, ${conteudo}, ${fonteUrl}, ${fonteNome}, ${tagRaw}, ${cidadeUf}, ${relevancia}, ${risco}, 'pendente'
    )
    returning id, token_aprovacao
  `;

  const row = inserted.rows[0];

  const minRelevancia = Number(process.env.RADAR_MIN_RELEVANCIA || 4);
  if (relevancia >= minRelevancia) {
    await sendRadarApprovalTelegram({
      id: row.id,
      titulo,
      resumo,
      tag: tagRaw,
      cidade_uf: cidadeUf,
      relevancia,
      token_aprovacao: row.token_aprovacao,
    });
  }

  if (process.env.RADAR_AUTO_PUBLISH === "true") {
    await sql`
      update radar_noticias
      set status = 'publicado', aprovado_em = now(), publicado_em = now(), atualizado_em = now()
      where id = ${row.id}
    `;
    invalidateRadarHomeCache();
    return NextResponse.json({ id: row.id, token_aprovacao: row.token_aprovacao, status: "publicado" });
  }

  return NextResponse.json({ id: row.id, token_aprovacao: row.token_aprovacao, status: "pendente" });
}
