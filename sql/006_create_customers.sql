create table if not exists customers (
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

create index if not exists customers_org_idx on customers (organization_id);
create index if not exists customers_name_idx on customers (name);
create index if not exists customers_document_idx on customers (document);

drop trigger if exists trg_customers_updated_at on customers;
create trigger trg_customers_updated_at
before update on customers
for each row execute function set_updated_at();
