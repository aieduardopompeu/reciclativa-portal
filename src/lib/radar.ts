// src/lib/radar.ts
import { sql } from "@vercel/postgres";

export type RadarTag =
  | "oportunidade"
  | "legislacao"
  | "educativo"
  | "parceria"
  | "esg"
  | "tendencia";

export type RadarStatus = "pendente" | "aprovado" | "rejeitado" | "publicado";

export type RadarNoticiaRow = {
  id: number;
  titulo: string;
  resumo: string;
  conteudo: string | null;
  fonte_url: string | null;
  fonte_nome: string | null;
  tag: RadarTag;
  cidade_uf: string | null;
  relevancia: number;
  risco: number;
  status: RadarStatus;
  destaque: boolean;
  token_aprovacao: string;
  criado_em: Date;
  aprovado_em: Date | null;
  publicado_em: Date | null;
  atualizado_em: Date;
};

export const RADAR_TAGS: RadarTag[] = [
  "oportunidade",
  "legislacao",
  "educativo",
  "parceria",
  "esg",
  "tendencia",
];

export const RADAR_STATUSES: RadarStatus[] = [
  "pendente",
  "aprovado",
  "rejeitado",
  "publicado",
];

export const RADAR_TAG_META: Record<
  RadarTag,
  { label: string; bg: string; text: string }
> = {
  oportunidade: { label: "Oportunidade", bg: "#eaf5ec", text: "#1a5c2e" },
  legislacao: { label: "Legislação", bg: "#FAEEDA", text: "#633806" },
  educativo: { label: "Educativo", bg: "#EEEDFE", text: "#3C3489" },
  parceria: { label: "Parceria", bg: "#E1F5EE", text: "#085041" },
  esg: { label: "ESG", bg: "#EEEDFE", text: "#3C3489" },
  tendencia: { label: "Tendência", bg: "#FAEEDA", text: "#633806" },
};

export function isRadarTag(value: string): value is RadarTag {
  return (RADAR_TAGS as string[]).includes(value);
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** token_aprovacao é uuid no banco — valida o formato antes de consultar,
 * senão o Postgres lança erro de sintaxe (22P02) em vez de "não encontrado". */
export function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

/** "há X min/horas/dias" — nunca exibir a data bruta ao usuário final. */
export function relativeTimeFromNow(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return "agora mesmo";
  if (diffMin < 60) return `há ${diffMin} min`;

  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return `há ${diffH} hora${diffH === 1 ? "" : "s"}`;

  const diffD = Math.round(diffH / 24);
  if (diffD < 30) return `há ${diffD} dia${diffD === 1 ? "" : "s"}`;

  const diffMonth = Math.round(diffD / 30);
  if (diffMonth < 12) return `há ${diffMonth} mês${diffMonth === 1 ? "" : "es"}`;

  const diffY = Math.round(diffMonth / 12);
  return `há ${diffY} ano${diffY === 1 ? "" : "s"}`;
}

/**
 * Versão "pública" da notícia — nunca inclui token_aprovacao (usado nos
 * links de aprovação via Telegram) nem fonte_url (fonte não é linkada
 * para o usuário final, apenas citada pelo nome em fonte_nome).
 */
export type RadarNoticiaPublic = Omit<
  RadarNoticiaRow,
  "token_aprovacao" | "fonte_url" | "criado_em" | "atualizado_em" | "aprovado_em" | "publicado_em"
> & {
  publicado_em: string | null;
};

export function toPublicNoticia(row: RadarNoticiaRow): RadarNoticiaPublic {
  return {
    id: row.id,
    titulo: row.titulo,
    resumo: row.resumo,
    conteudo: row.conteudo,
    fonte_nome: row.fonte_nome,
    tag: row.tag,
    cidade_uf: row.cidade_uf,
    relevancia: row.relevancia,
    risco: row.risco,
    status: row.status,
    destaque: row.destaque,
    publicado_em: row.publicado_em ? row.publicado_em.toISOString() : null,
  };
}

// --- /api/radar/home: sem Redis no projeto, cache em memória do processo ---

export type RadarHomeData = {
  destaque: RadarNoticiaPublic | null;
  secundarias: RadarNoticiaPublic[];
  grid: RadarNoticiaPublic[];
  total_publicadas: number;
  ultima_atualizacao: string;
};

let homeCache: { data: RadarHomeData; expiresAt: number } | null = null;

export function invalidateRadarHomeCache() {
  homeCache = null;
}

export async function getRadarHomeData(): Promise<RadarHomeData> {
  const now = Date.now();
  if (homeCache && homeCache.expiresAt > now) {
    return homeCache.data;
  }

  const [{ total }] = await sql<{ total: number }>`
    select count(*)::int as total
    from radar_noticias
    where status = 'publicado'
  `.then((r) => r.rows);

  const destaqueResult = await sql<RadarNoticiaRow>`
    select * from radar_noticias
    where status = 'publicado' and destaque = true
    order by publicado_em desc
    limit 1
  `;
  const destaqueRow = destaqueResult.rows[0] ?? null;
  const excludeId = destaqueRow ? destaqueRow.id : -1;

  const secundariasResult = await sql<RadarNoticiaRow>`
    select * from radar_noticias
    where status = 'publicado' and id != ${excludeId}
    order by publicado_em desc
    limit 3
  `;

  const gridResult = await sql<RadarNoticiaRow>`
    select * from radar_noticias
    where status = 'publicado' and id != ${excludeId}
    order by publicado_em desc
    limit 3 offset 3
  `;

  const data: RadarHomeData = {
    destaque: destaqueRow ? toPublicNoticia(destaqueRow) : null,
    secundarias: secundariasResult.rows.map(toPublicNoticia),
    grid: gridResult.rows.map(toPublicNoticia),
    total_publicadas: total,
    ultima_atualizacao: new Date().toISOString(),
  };

  const ttlSeconds = Number(process.env.RADAR_CACHE_TTL || 900);
  homeCache = { data, expiresAt: now + ttlSeconds * 1000 };

  return data;
}

// --- /radar: listagem pública paginada, com filtro por tag e UF ---

export async function getRadarListingPage(params: {
  tag?: RadarTag | null;
  uf?: string | null;
  page?: number;
  pageSize?: number;
}) {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = params.pageSize ?? 20;
  const offset = (page - 1) * pageSize;
  const tagFilter = params.tag ?? null;
  const ufFilter = params.uf ?? null;

  const { rows } = await sql<RadarNoticiaRow>`
    select * from radar_noticias
    where status = 'publicado'
      and (${tagFilter}::text is null or tag = ${tagFilter})
      and (${ufFilter}::text is null or cidade_uf ilike '%' || ${ufFilter} || '%')
    order by publicado_em desc
    limit ${pageSize} offset ${offset}
  `;

  const [{ total }] = await sql<{ total: number }>`
    select count(*)::int as total from radar_noticias
    where status = 'publicado'
      and (${tagFilter}::text is null or tag = ${tagFilter})
      and (${ufFilter}::text is null or cidade_uf ilike '%' || ${ufFilter} || '%')
  `.then((r) => r.rows);

  return {
    items: rows.map(toPublicNoticia),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getRadarUfOptions(): Promise<string[]> {
  const { rows } = await sql<{ uf: string }>`
    select distinct trim(split_part(cidade_uf, '·', 2)) as uf
    from radar_noticias
    where status = 'publicado' and cidade_uf is not null and cidade_uf like '%·%'
    order by uf
  `;
  return rows.map((r) => r.uf).filter(Boolean);
}

export async function getPublicNoticiaById(id: number): Promise<RadarNoticiaPublic | null> {
  const { rows } = await sql<RadarNoticiaRow>`
    select * from radar_noticias
    where id = ${id} and status = 'publicado'
    limit 1
  `;
  const row = rows[0];
  return row ? toPublicNoticia(row) : null;
}
