-- 026_seed_first_admin_master.sql
-- Primeiro admin master do projeto

insert into admin_master_users (
  email,
  password_hash,
  role,
  is_active,
  mfa_enabled
)
values (
  'ai.eduardopompeu@gmail.com',
  '$2y$12$cUdzPKinduJagHnv.PLco.ibrZCa1PhNgq4NnmZb8b0oUnUJHY.1.',
  'admin_master',
  true,
  false
)
on conflict (email) do update
set
  password_hash = excluded.password_hash,
  role = excluded.role,
  is_active = true;

-- Credenciais iniciais
-- E-mail: ai.eduardopompeu@gmail.com
-- Senha provisória: Recicla@2026!Admin
--
-- Importante:
-- 1. Use essa senha apenas no primeiro acesso.
-- 2. O próximo passo é trocar o login atual do /admin
--    para autenticação real com sessão em banco.
-- 3. Em seguida, habilitar MFA obrigatório para esse usuário.
