# Reciclativa Gestão — SQL Físico Inicial

## 1. Objetivo

Definir uma primeira proposta de estrutura física para as tabelas-base da Fase 1.

> Observação: este documento é propositalmente conservador. A ideia é iniciar pela base multiempresa, permissões e cadastros mestres, sem inflar o schema antes da operação.

---

## 2. Convenções assumidas

- Banco: Postgres / Neon
- Chaves primárias: UUID
- `gen_random_uuid()` disponível
- timestamps com `timestamptz`
- exclusão lógica quando aplicável
- índices mínimos já previstos para os campos mais consultados

---

## 3. Enum sugerido para roles

```sql
create type app_role as enum (
  'super_admin',
  'org_admin',
  'manager_operational',
  'manager_financial',
  'manager_commercial',
  'operator',
  'viewer'
);
```

---

## 4. Tabelas-base

## 4.1. organizations

```sql
create table organizations (
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

create unique index organizations_cnpj_uidx
  on organizations (cnpj)
  where cnpj is not null;
```

## 4.2. organization_units

```sql
create table organization_units (
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

create index organization_units_org_idx on organization_units (organization_id);
create index organization_units_city_state_idx on organization_units (city, state);
```

## 4.3. users

> Caso já exista tabela de usuários/autenticação no projeto, adaptar esta estrutura ao modelo atual, em vez de duplicar responsabilidade.

```sql
create table users (
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

create unique index users_email_org_uidx on users (organization_id, email);
create index users_org_idx on users (organization_id);
create index users_unit_idx on users (unit_id);
```

## 4.4. customers

```sql
create table customers (
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

create index customers_org_idx on customers (organization_id);
create index customers_name_idx on customers (name);
create index customers_document_idx on customers (document);
```

## 4.5. suppliers

```sql
create table suppliers (
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

create index suppliers_org_idx on suppliers (organization_id);
create index suppliers_name_idx on suppliers (name);
create index suppliers_document_idx on suppliers (document);
```

## 4.6. carriers

```sql
create table carriers (
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

create index carriers_org_idx on carriers (organization_id);
create index carriers_name_idx on carriers (name);
```

## 4.7. material_categories

```sql
create table material_categories (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  name text not null,
  code text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index material_categories_org_idx on material_categories (organization_id);
create unique index material_categories_name_org_uidx
  on material_categories (organization_id, name);
```

## 4.8. materials

```sql
create table materials (
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

create index materials_org_idx on materials (organization_id);
create index materials_category_idx on materials (category_id);
create index materials_name_idx on materials (name);
create unique index materials_name_org_uidx
  on materials (organization_id, name);
```

## 4.9. inventory_locations

```sql
create table inventory_locations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  unit_id uuid not null references organization_units(id) on delete restrict,
  name text not null,
  code text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index inventory_locations_org_idx on inventory_locations (organization_id);
create index inventory_locations_unit_idx on inventory_locations (unit_id);
create unique index inventory_locations_name_unit_uidx
  on inventory_locations (unit_id, name);
```

## 4.10. audit_logs

```sql
create table audit_logs (
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

create index audit_logs_org_idx on audit_logs (organization_id);
create index audit_logs_entity_idx on audit_logs (entity_type, entity_id);
create index audit_logs_created_at_idx on audit_logs (created_at desc);
```

---

## 5. Trigger de updated_at

```sql
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_organizations_updated_at
before update on organizations
for each row execute function set_updated_at();

create trigger trg_organization_units_updated_at
before update on organization_units
for each row execute function set_updated_at();

create trigger trg_users_updated_at
before update on users
for each row execute function set_updated_at();

create trigger trg_customers_updated_at
before update on customers
for each row execute function set_updated_at();

create trigger trg_suppliers_updated_at
before update on suppliers
for each row execute function set_updated_at();

create trigger trg_carriers_updated_at
before update on carriers
for each row execute function set_updated_at();

create trigger trg_material_categories_updated_at
before update on material_categories
for each row execute function set_updated_at();

create trigger trg_materials_updated_at
before update on materials
for each row execute function set_updated_at();

create trigger trg_inventory_locations_updated_at
before update on inventory_locations
for each row execute function set_updated_at();
```

---

## 6. Observações importantes

- `users` pode precisar ser adaptada ao provedor atual de autenticação do projeto.
- `super_admin` pode, se preferirem, ficar fora da tabela de usuários cliente e viver numa camada administrativa separada.
- Esta versão ainda não inclui `receipts`, `shipments`, `inventory_movements`, `accounts_payable` e `accounts_receivable`, porque o foco aqui é consolidar a base estrutural da Fase 1.

---

## 7. Status do documento

Versão: v0.5
Status: pronto para ser traduzido em migrations reais
