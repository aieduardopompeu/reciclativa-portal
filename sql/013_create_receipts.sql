create table if not exists receipts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  unit_id uuid not null references organization_units(id) on delete restrict,
  supplier_id uuid not null references suppliers(id) on delete restrict,
  carrier_id uuid references carriers(id) on delete set null,
  receipt_number text,
  receipt_date date not null,
  gross_weight numeric(14,3),
  net_weight numeric(14,3),
  total_amount numeric(14,2) not null default 0,
  source_type text,
  xml_access_key text,
  xml_file_url text,
  status text not null default 'draft',
  notes text,
  created_by uuid references saas_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists receipts_org_idx on receipts (organization_id);
create index if not exists receipts_unit_idx on receipts (unit_id);
create index if not exists receipts_supplier_idx on receipts (supplier_id);
create index if not exists receipts_carrier_idx on receipts (carrier_id);
create index if not exists receipts_date_idx on receipts (receipt_date desc);
create index if not exists receipts_status_idx on receipts (status);

drop trigger if exists trg_receipts_updated_at on receipts;
create trigger trg_receipts_updated_at
before update on receipts
for each row execute function set_updated_at();
