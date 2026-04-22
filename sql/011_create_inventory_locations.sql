create table if not exists inventory_locations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  unit_id uuid not null references organization_units(id) on delete restrict,
  name text not null,
  code text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists inventory_locations_org_idx on inventory_locations (organization_id);
create index if not exists inventory_locations_unit_idx on inventory_locations (unit_id);
create unique index if not exists inventory_locations_name_unit_uidx
  on inventory_locations (unit_id, name);

drop trigger if exists trg_inventory_locations_updated_at on inventory_locations;
create trigger trg_inventory_locations_updated_at
before update on inventory_locations
for each row execute function set_updated_at();
