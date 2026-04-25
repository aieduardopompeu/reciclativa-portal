# Patch — Login unificado Reciclativa

## O que este patch faz

- Cria `/login` como tela única de entrada.
- Cria `/api/auth/login` como endpoint único de autenticação.
- Mantém as tabelas atuais:
  - `admin_master_users` para Admin Master.
  - `saas_users` para usuários do sistema.
- Redireciona rotas antigas:
  - `/admin/login` → `/login?next=/admin`
  - `/admin-login` → `/login?next=/admin`
  - `/app/login` → `/login?next=/app/dashboard`
- Mantém MFA existente:
  - Admin Master segue para `/admin/mfa` ou `/admin/mfa/setup`.
  - SaaS segue para `/app/mfa` ou `/app/mfa/setup`.
- Altera o botão do rodapé para `Área restrita`.
- Adiciona logoff por inatividade:
  - 30 minutos sem atividade.
  - aviso 2 minutos antes.
- Ajusta a expiração absoluta de sessão para 8 horas:
  - Admin Master: 8 horas.
  - SaaS: 8 horas.

## Teste local sugerido

```bash
npm run build
npm run dev
```

Depois testar:

```text
http://localhost:3000/login
http://localhost:3000/admin/login
http://localhost:3000/app/login
```

## Fluxo esperado

- Usuário SaaS válido → senha → MFA SaaS → `/app/dashboard`.
- Admin Master válido → senha → MFA Admin → `/admin`.
- E-mail/senha inválidos → volta para `/login` mantendo o e-mail digitado.
