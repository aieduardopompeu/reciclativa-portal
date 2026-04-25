-- Fase 2B - Recuperação de senha unificada
-- Execute uma vez no Neon antes de testar /recuperar-senha.

create extension if not exists pgcrypto;

create table if not exists auth_password_reset_tokens (
  id uuid primary key default gen_random_uuid(),
  user_type text not null check (user_type in ('admin_master', 'saas_user')),
  user_id uuid not null,
  email text not null,
  token_hash text not null unique,
  expires_at timestamptz not null,
  used_at timestamptz,
  requested_ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_auth_password_reset_tokens_lookup
  on auth_password_reset_tokens (token_hash)
  where used_at is null;

create index if not exists idx_auth_password_reset_tokens_user_open
  on auth_password_reset_tokens (user_type, user_id, created_at desc)
  where used_at is null;
