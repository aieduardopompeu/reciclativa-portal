# Reciclativa Gestão — CRUD inicial de locais de estoque v1.8

## Arquivos incluídos
- `src/app/(app)/app/cadastros/locais-estoque/actions.ts`
- `src/app/(app)/app/cadastros/locais-estoque/page.tsx`
- `src/lib/saas/navigation.ts`

## O que esta versão faz
- adiciona "Locais de estoque" no menu lateral
- lista locais reais de `inventory_locations`
- cadastra local real em `inventory_locations`
- vincula o local a uma unidade
- grava auditoria mínima em `audit_logs`

## Observações
- ainda não há edição
- ainda não há inativação
- este módulo prepara a base para entradas e saídas
