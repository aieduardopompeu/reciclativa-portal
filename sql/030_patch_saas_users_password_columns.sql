-- 030_patch_saas_users_password_columns.sql
-- Ajuste para compatibilizar saas_users com o fluxo de criação do usuário principal

alter table saas_users
  add column if not exists must_change_password boolean not null default true;

alter table saas_users
  add column if not exists password_changed_at timestamptz;

update saas_users
set must_change_password = true
where must_change_password is null;

create index if not exists idx_saas_users_must_change_password
  on saas_users (must_change_password);
