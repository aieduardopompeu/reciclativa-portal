create table if not exists payables (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  unit_id uuid not null references organization_units(id) on delete restrict,
  supplier_id uuid references suppliers(id) on delete set null,
  financial_account_id uuid references financial_accounts(id) on delete set null,
  description text not null,
  document_number text,
  competence_date date,
  due_date date not null,
  payment_date date,
  amount numeric(14,2) not null,
  paid_amount numeric(14,2) not null default 0,
  status text not null default 'open',
  notes text,
  created_by uuid references saas_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payables_org_idx
  on payables (organization_id);

create index if not exists payables_unit_idx
  on payables (unit_id);

create index if not exists payables_supplier_idx
  on payables (supplier_id);

create index if not exists payables_account_idx
  on payables (financial_account_id);

create index if not exists payables_due_date_idx
  on payables (due_date);

create index if not exists payables_status_idx
  on payables (status);

drop trigger if exists trg_payables_updated_at on payables;
create trigger trg_payables_updated_at
before update on payables
for each row execute function set_updated_at();
