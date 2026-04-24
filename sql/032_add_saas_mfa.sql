-- 032_add_saas_mfa.sql

alter table saas_users
  add column if not exists mfa_enabled boolean not null default false;

alter table saas_users
  add column if not exists mfa_secret_encrypted text;

alter table saas_users
  add column if not exists mfa_recovery_codes jsonb not null default '[]'::jsonb;

create table if not exists saas_login_challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references saas_users(id) on delete cascade,
  challenge_token_hash text not null unique,
  ip_address text,
  user_agent text,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_saas_login_challenges_user_id
  on saas_login_challenges (user_id);

create index if not exists idx_saas_login_challenges_expires_at
  on saas_login_challenges (expires_at);

create index if not exists idx_saas_login_challenges_consumed_at
  on saas_login_challenges (consumed_at);
