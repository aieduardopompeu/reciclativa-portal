create table if not exists receivables (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  unit_id uuid not null references organization_units(id) on delete restrict,
  customer_id uuid references customers(id) on delete set null,
  financial_account_id uuid references financial_accounts(id) on delete set null,
  description text not null,
  document_number text,
  competence_date date,
  due_date date not null,
  receipt_date date,
  amount numeric(14,2) not null,
  received_amount numeric(14,2) not null default 0,
  status text not null default 'open',
  notes text,
  created_by uuid references saas_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists receivables_org_idx
  on receivables (organization_id);

create index if not exists receivables_unit_idx
  on receivables (unit_id);

create index if not exists receivables_customer_idx
  on receivables (customer_id);

create index if not exists receivables_account_idx
  on receivables (financial_account_id);

create index if not exists receivables_due_date_idx
  on receivables (due_date);

create index if not exists receivables_status_idx
  on receivables (status);

drop trigger if exists trg_receivables_updated_at on receivables;
create trigger trg_receivables_updated_at
before update on receivables
for each row execute function set_updated_at();
