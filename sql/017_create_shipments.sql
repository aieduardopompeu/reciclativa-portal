create table if not exists shipments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  unit_id uuid not null references organization_units(id) on delete restrict,
  customer_id uuid not null references customers(id) on delete restrict,
  carrier_id uuid references carriers(id) on delete set null,
  shipment_number text,
  shipment_date date not null,
  gross_weight numeric(14,3),
  net_weight numeric(14,3),
  total_amount numeric(14,2) not null default 0,
  status text not null default 'draft',
  notes text,
  created_by uuid references saas_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists shipments_org_idx on shipments (organization_id);
create index if not exists shipments_unit_idx on shipments (unit_id);
create index if not exists shipments_customer_idx on shipments (customer_id);
create index if not exists shipments_carrier_idx on shipments (carrier_id);
create index if not exists shipments_date_idx on shipments (shipment_date desc);
create index if not exists shipments_status_idx on shipments (status);

drop trigger if exists trg_shipments_updated_at on shipments;
create trigger trg_shipments_updated_at
before update on shipments
for each row execute function set_updated_at();
