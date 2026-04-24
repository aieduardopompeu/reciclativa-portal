-- 029_create_saas_conversion_model.sql
-- Modelagem para conversão de company_signups em organizações reais do sistema

create extension if not exists pgcrypto;

-- Organizações / empresas
create table if not exists saas_organizations (
  id uuid primary key default gen_random_uuid(),
  signup_id uuid unique references company_signups(id) on delete set null,

  legal_name text not null,
  trade_name text,
  cnpj varchar(14) not null unique,

  email text,
  phone text,
  whatsapp text,

  official_street text,
  official_number text,
  official_complement text,
  official_district text,
  official_city text,
  official_state varchar(2),
  official_zip_code text,

  status varchar(30) not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint saas_organizations_status_check check (
    status in ('active', 'inactive', 'blocked')
  ),
  constraint saas_organizations_cnpj_digits_check check (
    cnpj ~ '^[0-9]{14}$'
  )
);

create index if not exists idx_saas_organizations_cnpj
  on saas_organizations (cnpj);

create index if not exists idx_saas_organizations_status
  on saas_organizations (status);

create index if not exists idx_saas_organizations_city_state
  on saas_organizations (official_state, official_city);

-- Usuários do SaaS
create table if not exists saas_users (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references saas_organizations(id) on delete cascade,

  name text not null,
  email text not null unique,
  password_hash text not null,

  role varchar(30) not null default 'org_admin',
  is_active boolean not null default true,
  must_change_password boolean not null default true,
  password_changed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint saas_users_role_check check (
    role in ('org_admin', 'manager', 'operator', 'viewer')
  )
);

create index if not exists idx_saas_users_organization_id
  on saas_users (organization_id);

create index if not exists idx_saas_users_email
  on saas_users (email);

create index if not exists idx_saas_users_role
  on saas_users (role);

-- Módulos por organização
create table if not exists saas_organization_modules (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references saas_organizations(id) on delete cascade,

  module_key varchar(50) not null,
  is_enabled boolean not null default true,

  created_at timestamptz not null default now(),

  constraint saas_organization_modules_key_check check (
    module_key in (
      'operation',
      'inventory',
      'finance',
      'customers_suppliers',
      'reports',
      'multiunit'
    )
  ),
  constraint saas_organization_modules_unique unique (organization_id, module_key)
);

create index if not exists idx_saas_organization_modules_org_id
  on saas_organization_modules (organization_id);

create index if not exists idx_saas_organization_modules_module_key
  on saas_organization_modules (module_key);

-- Colunas de conversão na solicitação
alter table company_signups
  add column if not exists converted_organization_id uuid references saas_organizations(id) on delete set null;

alter table company_signups
  add column if not exists converted_user_id uuid references saas_users(id) on delete set null;

alter table company_signups
  add column if not exists converted_at timestamptz;

create index if not exists idx_company_signups_converted_organization_id
  on company_signups (converted_organization_id);

create index if not exists idx_company_signups_converted_user_id
  on company_signups (converted_user_id);

create index if not exists idx_company_signups_converted_at
  on company_signups (converted_at desc);

-- Trigger genérico de updated_at
create or replace function set_updated_at_generic()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_saas_organizations on saas_organizations;
create trigger trg_set_updated_at_saas_organizations
before update on saas_organizations
for each row
execute function set_updated_at_generic();

drop trigger if exists trg_set_updated_at_saas_users on saas_users;
create trigger trg_set_updated_at_saas_users
before update on saas_users
for each row
execute function set_updated_at_generic();

comment on table saas_organizations is 'Empresas/organizações aprovadas para uso da Reciclativa Gestão.';
comment on table saas_users is 'Usuários pertencentes às organizações aprovadas no sistema.';
comment on table saas_organization_modules is 'Módulos liberados por organização.';
comment on column company_signups.converted_organization_id is 'Organização criada a partir da aprovação da solicitação.';
comment on column company_signups.converted_user_id is 'Usuário principal criado a partir da aprovação da solicitação.';
comment on column company_signups.converted_at is 'Data/hora em que a solicitação foi convertida em organização real.';
