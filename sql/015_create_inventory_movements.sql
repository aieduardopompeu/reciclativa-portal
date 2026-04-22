create table if not exists inventory_movements (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  unit_id uuid not null references organization_units(id) on delete restrict,
  location_id uuid references inventory_locations(id) on delete set null,
  material_id uuid not null references materials(id) on delete restrict,
  receipt_id uuid references receipts(id) on delete set null,
  movement_type text not null,
  quantity_in numeric(14,3) not null default 0,
  quantity_out numeric(14,3) not null default 0,
  unit_cost numeric(14,2),
  total_cost numeric(14,2),
  occurred_at timestamptz not null default now(),
  notes text,
  created_by uuid references saas_users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists inventory_movements_org_idx
  on inventory_movements (organization_id);

create index if not exists inventory_movements_unit_idx
  on inventory_movements (unit_id);

create index if not exists inventory_movements_location_idx
  on inventory_movements (location_id);

create index if not exists inventory_movements_material_idx
  on inventory_movements (material_id);

create index if not exists inventory_movements_receipt_idx
  on inventory_movements (receipt_id);

create index if not exists inventory_movements_occurred_at_idx
  on inventory_movements (occurred_at desc);
