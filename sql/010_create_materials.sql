create table if not exists materials (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  category_id uuid references material_categories(id) on delete set null,
  code text,
  name text not null,
  unit_of_measure text not null,
  residue_classification text,
  default_purchase_price numeric(14,2),
  default_sale_price numeric(14,2),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists materials_org_idx on materials (organization_id);
create index if not exists materials_category_idx on materials (category_id);
create index if not exists materials_name_idx on materials (name);
create unique index if not exists materials_name_org_uidx
  on materials (organization_id, name);

drop trigger if exists trg_materials_updated_at on materials;
create trigger trg_materials_updated_at
before update on materials
for each row execute function set_updated_at();
