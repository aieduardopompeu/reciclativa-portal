create table if not exists carriers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  name text not null,
  document text,
  email text,
  phone text,
  whatsapp text,
  vehicle_info text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists carriers_org_idx on carriers (organization_id);
create index if not exists carriers_name_idx on carriers (name);

drop trigger if exists trg_carriers_updated_at on carriers;
create trigger trg_carriers_updated_at
before update on carriers
for each row execute function set_updated_at();
