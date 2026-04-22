# Reciclativa Gestão — Starter de Código v0.8

## Objetivo

Subir a base visual e estrutural do SaaS no app sem acoplar ainda no banco.

## O que entra nesta versão

- tipo central de role e sessão SaaS
- matriz inicial de permissões
- navegação lateral do SaaS
- shell visual do app
- layout do grupo `/(app)/app`
- páginas iniciais:
  - dashboard
  - clientes
  - empresa

## O que ainda não entra

- leitura real de `saas_users`
- tenancy real por `organization_id`
- CRUD com banco
- guards completos server-side
- formulários finais

## Próximo passo depois desta base

- integrar `session.ts` ao banco
- criar guardas de rota
- subir CRUD real de clientes
- subir CRUD real de unidades e usuários
