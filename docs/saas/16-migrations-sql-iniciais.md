# Reciclativa Gestão — Migrations SQL Iniciais

## 1. Objetivo

Consolidar uma primeira leva de migrations SQL reais para a Fase 1.

> Observação: o conteúdo abaixo é base inicial. Antes de aplicar, revisar compatibilidade com a autenticação e com tabelas já existentes no projeto.

---

## 2. Migration 001 — extensões e utilitários

**Arquivo sugerido:** `001_init_extensions.sql`

```sql
create extension if not exists pgcrypto;

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;
```

---

## 3. Migration 002 — roles

**Arquivo sugerido:** `002_init_roles.sql`

```sql
do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type app_role as enum (
      'super_admin',
      'org_admin',
      'manager_operational',
      'manager_financial',
      'manager_commercial',
      'operator',
      'viewer'
    );
  end if;
end $$;
```

---

## 4. Migration 003 — organizations

**Arquivo sugerido:** `003_create_organizations.sql`

```sql
create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  trade_name text,
  cnpj varchar(18),
  email text,
  phone text,
  whatsapp text,
  plan_code text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists organizations_cnpj_uidx
  on organizations (cnpj)
  where cnpj is not null;

drop trigger if exists trg_organizations_updated_at on organizations;
create trigger trg_organizations_updated_at
before update on organizations
for each row execute function set_updated_at();
```

---

## 5. Migration 004 — organization_units

**Arquivo sugerido:** `004_create_organization_units.sql`

```sql
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
```

---

## 6. Migration 005 — users

**Arquivo sugerido:** `005_create_or_adapt_users.sql`

> Se `users` já existir no projeto, tratar esta migration como referência de adaptação.

```sql
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  unit_id uuid references organization_units(id) on delete set null,
  name text not null,
  email text not null,
  password_hash text,
  auth_provider_ref text,
  role app_role not null default 'operator',
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists users_email_org_uidx on users (organization_id, email);
create index if not exists users_org_idx on users (organization_id);
create index if not exists users_unit_idx on users (unit_id);

drop trigger if exists trg_users_updated_at on users;
create trigger trg_users_updated_at
before update on users
for each row execute function set_updated_at();
```

---

## 7. Migration 006 — customers

**Arquivo sugerido:** `006_create_customers.sql`

```sql
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
```

---

## 8. Migration 007 — suppliers

**Arquivo sugerido:** `007_create_suppliers.sql`

```sql
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
```

---

## 9. Migration 008 — carriers

**Arquivo sugerido:** `008_create_carriers.sql`

```sql
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
```

---

## 10. Migration 009 — material_categories

**Arquivo sugerido:** `009_create_material_categories.sql`

```sql
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
```

---

## 11. Migration 010 — materials

**Arquivo sugerido:** `010_create_materials.sql`

```sql
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
```

---

## 12. Migration 011 — inventory_locations

**Arquivo sugerido:** `011_create_inventory_locations.sql`

```sql
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
```

---

## 13. Migration 012 — audit_logs

**Arquivo sugerido:** `012_create_audit_logs.sql`

```sql
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  user_id uuid references users(id) on delete set null,
  module text not null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  previous_data jsonb,
  new_data jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists audit_logs_org_idx on audit_logs (organization_id);
create index if not exists audit_logs_entity_idx on audit_logs (entity_type, entity_id);
create index if not exists audit_logs_created_at_idx on audit_logs (created_at desc);
```

---

## 14. Status do documento

Versão: v0.6
Status: base inicial de migrations reais
