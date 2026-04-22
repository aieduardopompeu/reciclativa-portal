create table if not exists organization_units (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  name text not null,
  code text,
  phone text,
  whatsapp text,
  email text,
  zip_code text,
  address text,
  number text,
  complement text,
  neighborhood text,
  city text,
  state char(2),
  is_headquarters boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists organization_units_org_idx on organization_units (organization_id);
create index if not exists organization_units_city_state_idx on organization_units (city, state);

drop trigger if exists trg_organization_units_updated_at on organization_units;
create trigger trg_organization_units_updated_at
before update on organization_units
for each row execute function set_updated_at();
