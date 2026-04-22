create table if not exists saas_users (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  unit_id uuid references organization_units(id) on delete set null,
  name text not null,
  email text not null,
  password_hash text,
  auth_provider_ref text,
  role app_role not null default 'operator',
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists saas_users_email_org_uidx
  on saas_users (organization_id, email);

create index if not exists saas_users_org_idx
  on saas_users (organization_id);

create index if not exists saas_users_unit_idx
  on saas_users (unit_id);

drop trigger if exists trg_saas_users_updated_at on saas_users;
create trigger trg_saas_users_updated_at
before update on saas_users
for each row execute function set_updated_at();