-- 028_add_admin_master_password_change_policy.sql

alter table admin_master_users
  add column if not exists must_change_password boolean not null default true;

alter table admin_master_users
  add column if not exists password_changed_at timestamptz;

update admin_master_users
set must_change_password = true
where password_changed_at is null;
