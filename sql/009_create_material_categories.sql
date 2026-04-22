create table if not exists material_categories (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  name text not null,
  code text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists material_categories_org_idx on material_categories (organization_id);
create unique index if not exists material_categories_name_org_uidx
  on material_categories (organization_id, name);

drop trigger if exists trg_material_categories_updated_at on material_categories;
create trigger trg_material_categories_updated_at
before update on material_categories
for each row execute function set_updated_at();
