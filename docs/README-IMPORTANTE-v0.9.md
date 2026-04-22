# Reciclativa Gestão — session.ts real v0.9

Arquivo atualizado para conectar a sessão SaaS ao banco real usando `@vercel/postgres`.

## Substituir
- `src/lib/saas/session.ts`

## Como funciona
1. tenta ler o cookie `saas-user-email`
2. tenta `process.env.SAAS_SEED_EMAIL`
3. tenta `admin@reciclativa-teste.local`
4. faz fallback para o primeiro usuário ativo de `saas_users`

## Observação
Isso não substitui o login do `/admin`.
É apenas a primeira ponte entre o app SaaS e o banco real.
