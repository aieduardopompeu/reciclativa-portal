create table if not exists inventory_balances (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  unit_id uuid not null references organization_units(id) on delete restrict,
  location_id uuid references inventory_locations(id) on delete set null,
  material_id uuid not null references materials(id) on delete restrict,
  current_quantity numeric(14,3) not null default 0,
  average_cost numeric(14,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, unit_id, location_id, material_id)
);

create index if not exists inventory_balances_org_idx
  on inventory_balances (organization_id);

create index if not exists inventory_balances_unit_idx
  on inventory_balances (unit_id);

create index if not exists inventory_balances_location_idx
  on inventory_balances (location_id);

create index if not exists inventory_balances_material_idx
  on inventory_balances (material_id);

drop trigger if exists trg_inventory_balances_updated_at on inventory_balances;
create trigger trg_inventory_balances_updated_at
before update on inventory_balances
for each row execute function set_updated_at();