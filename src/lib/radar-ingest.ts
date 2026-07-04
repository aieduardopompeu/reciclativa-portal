// src/lib/radar-ingest.ts
//
// Lógica compartilhada de inserção: usada pelo POST /api/radar/ingest
// (pipeline externo) e pelo POST /api/admin/radar/buscar (busca + redação
// automática direto do painel admin). Insere a notícia, dispara a
// notificação via Telegram quando a relevância atinge o mínimo configurado,
// e aplica RADAR_AUTO_PUBLISH quando ligado.
import { sql } from "@vercel/postgres";
import { invalidateRadarHomeCache, type RadarStatus, type RadarTag } from "@/lib/radar";
import { sendRadarApprovalTelegram } from "@/lib/radar-telegram";

export type RadarDraftInput = {
  titulo: string;
  resumo: string;
  conteudo?: string | null;
  fonte_url?: string | null;
  fonte_nome?: string | null;
  imagem_url?: string | null;
  tag: RadarTag;
  cidade_uf?: string | null;
  relevancia: number;
  risco: number;
};

export async function insertRadarNoticiaAndNotify(
  input: RadarDraftInput
): Promise<{ id: number; token_aprovacao: string; status: RadarStatus }> {
  const inserted = await sql<{ id: number; token_aprovacao: string }>`
    insert into radar_noticias (
      titulo, resumo, conteudo, fonte_url, fonte_nome, imagem_url, tag, cidade_uf, relevancia, risco, status
    )
    values (
      ${input.titulo}, ${input.resumo}, ${input.conteudo ?? null}, ${input.fonte_url ?? null},
      ${input.fonte_nome ?? null}, ${input.imagem_url ?? null}, ${input.tag}, ${input.cidade_uf ?? null},
      ${input.relevancia}, ${input.risco}, 'pendente'
    )
    returning id, token_aprovacao
  `;

  const row = inserted.rows[0];

  const minRelevancia = Number(process.env.RADAR_MIN_RELEVANCIA || 4);
  if (input.relevancia >= minRelevancia) {
    await sendRadarApprovalTelegram({
      id: row.id,
      titulo: input.titulo,
      resumo: input.resumo,
      tag: input.tag,
      cidade_uf: input.cidade_uf ?? null,
      relevancia: input.relevancia,
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
    return { id: row.id, token_aprovacao: row.token_aprovacao, status: "publicado" };
  }

  return { id: row.id, token_aprovacao: row.token_aprovacao, status: "pendente" };
}
