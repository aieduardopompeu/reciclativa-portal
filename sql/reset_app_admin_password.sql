-- Ajuste opcional para executar no Neon SQL Editor.
-- Use apenas se o login /app/login continuar retornando "E-mail ou senha inválidos".
-- Ele reseta a senha do usuário SaaS admin@reciclativa.com e força novo primeiro acesso/MFA.

update saas_users
set
  password_hash = crypt('Reciclativa@2026', gen_salt('bf')),
  is_active = true,
  must_change_password = true,
  mfa_enabled = false,
  mfa_secret_encrypted = null,
  mfa_recovery_codes = '[]'::jsonb
where lower(email) = 'admin@reciclativa.com'
returning id::text, name, email, role, is_active, must_change_password, mfa_enabled;

-- Se o comando não retornar nenhuma linha, esse e-mail não existe em saas_users.
-- Nesse caso, o problema não é senha: é ausência do usuário no cadastro do sistema.
