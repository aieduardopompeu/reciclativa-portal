-- Radar Ambiental — imagem de destaque (capturada via busca ou informada
-- manualmente no ingest). Opcional: nem toda matéria tem uma imagem confiável.

alter table radar_noticias
  add column if not exists imagem_url text;
