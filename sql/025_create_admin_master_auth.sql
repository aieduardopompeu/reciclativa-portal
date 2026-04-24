-- 025_create_admin_master_auth.sql
create extension if not exists pgcrypto;

create table if not exists admin_master_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  role text not null default 'admin_master',
  is_active boolean not null default true,
  mfa_secret_encrypted text,
  mfa_enabled boolean not null default false,
  mfa_recovery_codes jsonb not null default '[]'::jsonb,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_master_users_role_check check (role in ('admin_master'))
);

create table if not exists admin_master_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references admin_master_users(id) on delete cascade,
  session_token_hash text not null unique,
  ip_address text,
  user_agent text,
  mfa_verified_at timestamptz,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_master_sessions_user_id
  on admin_master_sessions (user_id, created_at desc);

create index if not exists idx_admin_master_sessions_expires_at
  on admin_master_sessions (expires_at);

create table if not exists admin_master_login_challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references admin_master_users(id) on delete cascade,
  challenge_token_hash text not null unique,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_master_login_challenges_user_id
  on admin_master_login_challenges (user_id, created_at desc);

create or replace function set_updated_at_admin_master_users()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_admin_master_users on admin_master_users;

create trigger trg_set_updated_at_admin_master_users
before update on admin_master_users
for each row
execute function set_updated_at_admin_master_users();
