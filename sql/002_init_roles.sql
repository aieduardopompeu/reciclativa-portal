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
