create table if not exists financial_accounts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  unit_id uuid references organization_units(id) on delete set null,
  name text not null,
  bank_name text,
  account_type text not null default 'checking',
  initial_balance numeric(14,2) not null default 0,
  is_active boolean not null default true,
  created_by uuid references saas_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists financial_accounts_org_idx
  on financial_accounts (organization_id);

create index if not exists financial_accounts_unit_idx
  on financial_accounts (unit_id);

create index if not exists financial_accounts_active_idx
  on financial_accounts (is_active);

drop trigger if exists trg_financial_accounts_updated_at on financial_accounts;
create trigger trg_financial_accounts_updated_at
before update on financial_accounts
for each row execute function set_updated_at();
