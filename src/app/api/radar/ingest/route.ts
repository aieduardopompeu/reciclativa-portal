import { NextResponse } from "next/server";
import { isRadarTag } from "@/lib/radar";
import { insertRadarNoticiaAndNotify } from "@/lib/radar-ingest";

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
  imagem_url?: unknown;
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

  const result = await insertRadarNoticiaAndNotify({
    titulo,
    resumo,
    conteudo: asText(body.conteudo),
    fonte_url: asText(body.fonte_url),
    fonte_nome: asText(body.fonte_nome),
    imagem_url: asText(body.imagem_url),
    tag: tagRaw,
    cidade_uf: asText(body.cidade_uf),
    relevancia: asIntInRange(body.relevancia, 1, 5, 3),
    risco: asIntInRange(body.risco, 1, 5, 1),
  });

  return NextResponse.json(result);
}
