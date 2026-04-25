-- DIAGNOSTICO LOGIN APP / ADMIN MASTER - SOMENTE LEITURA
-- Troque abaixo pela senha que voce esta digitando no /app/login.
-- Nao altera senha, usuario, MFA ou permissao.

create extension if not exists pgcrypto;

-- 1) Verifica usuario do sistema SaaS (/app/login)
select
  'saas_users' as origem,
  id::text,
  email,
  is_active,
  must_change_password,
  mfa_enabled,
  case
    when password_hash is null then 'SEM_HASH'
    when password_hash = crypt('COLE_A_SENHA_DIGITADA_AQUI', password_hash) then 'SENHA_CONFERE_NO_APP'
    else 'SENHA_NAO_CONFERE_NO_APP'
  end as diagnostico_senha_app,
  created_at,
  updated_at
from saas_users
where lower(email) = lower('admin@reciclativa.com');

-- 2) Verifica usuario admin master (/admin/login)
-- Esta tabela aparentemente NAO possui coluna "name" no seu banco.
select
  'admin_master_users' as origem,
  id::text,
  email,
  is_active,
  must_change_password,
  mfa_enabled,
  case
    when password_hash is null then 'SEM_HASH'
    when password_hash = crypt('COLE_A_SENHA_DIGITADA_AQUI', password_hash) then 'SENHA_CONFERE_NO_ADMIN_MASTER'
    else 'SENHA_NAO_CONFERE_NO_ADMIN_MASTER'
  end as diagnostico_senha_admin_master,
  created_at,
  updated_at
from admin_master_users
where lower(email) = lower('admin@reciclativa.com');

-- 3) Lista colunas reais das duas tabelas para confirmar divergencia de estrutura
select
  table_name,
  column_name,
  data_type,
  is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name in ('saas_users', 'admin_master_users')
order by table_name, ordinal_position;
