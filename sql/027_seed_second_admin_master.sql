-- 027_seed_second_admin_master.sql
-- Segundo admin master do projeto

insert into admin_master_users (
  email,
  password_hash,
  role,
  is_active,
  mfa_enabled
)
values (
  'admin@reciclativa.com',
  crypt('Recicla@2026!Admin2', gen_salt('bf')),
  'admin_master',
  true,
  false
)
on conflict (email) do update
set
  password_hash = excluded.password_hash,
  role = excluded.role,
  is_active = true,
  mfa_enabled = false;

-- Credenciais iniciais
-- E-mail: admin@reciclativa.com
-- Senha provisória: Recicla@2026!Admin2
--
-- Fluxo esperado:
-- 1. Login em /admin-login
-- 2. Senha correta
-- 3. Setup obrigatório do MFA no primeiro acesso
-- 4. Acesso ao /admin somente após ativação do MFA
