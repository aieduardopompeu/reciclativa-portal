create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  name text not null,
  document text,
  email text,
  phone text,
  whatsapp text,
  contact_name text,
  city text,
  state char(2),
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists suppliers_org_idx on suppliers (organization_id);
create index if not exists suppliers_name_idx on suppliers (name);
create index if not exists suppliers_document_idx on suppliers (document);

drop trigger if exists trg_suppliers_updated_at on suppliers;
create trigger trg_suppliers_updated_at
before update on suppliers
for each row execute function set_updated_at();
