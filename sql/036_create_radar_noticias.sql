-- Radar Ambiental — clipping editorial com aprovação via WhatsApp.
-- Matérias entram via /api/radar/ingest (status = 'pendente'), são aprovadas
-- ou rejeitadas por um editor (link de token, sem login) e depois publicadas
-- manualmente pelo admin em /admin/radar.

create table if not exists radar_noticias (
  id serial primary key,
  titulo text not null,
  resumo text not null,
  conteudo text,
  fonte_url text,
  fonte_nome text,
  tag text not null,
  cidade_uf text,
  relevancia integer not null default 3,
  risco integer not null default 1,
  status text not null default 'pendente',
  destaque boolean not null default false,
  token_aprovacao uuid not null default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  aprovado_em timestamptz,
  publicado_em timestamptz,
  atualizado_em timestamptz not null default now(),
  constraint radar_noticias_tag_check
    check (tag in ('oportunidade', 'legislacao', 'educativo', 'parceria', 'esg', 'tendencia')),
  constraint radar_noticias_status_check
    check (status in ('pendente', 'aprovado', 'rejeitado', 'publicado')),
  constraint radar_noticias_relevancia_check
    check (relevancia between 1 and 5),
  constraint radar_noticias_risco_check
    check (risco between 1 and 5),
  constraint radar_noticias_token_unique unique (token_aprovacao)
);

create index if not exists idx_radar_status on radar_noticias (status);
create index if not exists idx_radar_publicado on radar_noticias (publicado_em desc);
create index if not exists idx_radar_destaque on radar_noticias (destaque, status);
