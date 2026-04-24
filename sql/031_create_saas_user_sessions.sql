-- 031_create_saas_user_sessions.sql

create table if not exists saas_user_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references saas_users(id) on delete cascade,
  session_token_hash text not null unique,
  ip_address text,
  user_agent text,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_saas_user_sessions_user_id
  on saas_user_sessions (user_id);

create index if not exists idx_saas_user_sessions_expires_at
  on saas_user_sessions (expires_at);

create index if not exists idx_saas_user_sessions_revoked_at
  on saas_user_sessions (revoked_at);
