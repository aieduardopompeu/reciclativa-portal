-- Fase 3A — base para permissões personalizadas por usuário SaaS.
-- Execute no Neon antes de criar usuários com role = 'custom'.

-- 1) Garante que o enum da coluna saas_users.role aceite o valor 'custom'.
do $$
declare
  enum_name text;
begin
  select t.typname
    into enum_name
  from pg_type t
  join pg_attribute a on a.atttypid = t.oid
  join pg_class c on c.oid = a.attrelid
  join pg_namespace n on n.oid = c.relnamespace
  where c.relname = 'saas_users'
    and a.attname = 'role'
    and t.typtype = 'e'
  limit 1;

  if enum_name is not null then
    if not exists (
      select 1
      from pg_enum e
      join pg_type t on t.oid = e.enumtypid
      where t.typname = enum_name
        and e.enumlabel = 'custom'
    ) then
      execute format('alter type %I add value %L', enum_name, 'custom');
    end if;
  end if;
end $$;

-- 2) Cria tabela de permissões granulares para usuários com perfil personalizado.
create table if not exists saas_user_permissions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null references saas_users(id) on delete cascade,
  feature text not null,
  access_level text not null default 'none',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint saas_user_permissions_access_level_check
    check (access_level in ('none', 'read', 'write', 'admin')),
  constraint saas_user_permissions_feature_check
    check (feature in (
      'dashboard',
      'company',
      'units',
      'users',
      'customers',
      'suppliers',
      'carriers',
      'material_categories',
      'materials',
      'inventory_locations',
      'operation',
      'finance',
      'settings',
      'audit_logs'
    )),
  constraint saas_user_permissions_unique_feature
    unique (organization_id, user_id, feature)
);

create index if not exists saas_user_permissions_org_user_idx
  on saas_user_permissions (organization_id, user_id);
