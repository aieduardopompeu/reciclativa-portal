# Reciclativa Gestão — base do financeiro v3.1

Este pacote prepara a base inicial do financeiro para o SaaS.

## Arquivos incluídos
- `sql/019_create_financial_accounts.sql`
- `sql/020_create_payables.sql`
- `sql/021_create_receivables.sql`
- `docs/saas/30-financeiro-basico-v3.1.md`

## Ordem sugerida
1. salvar os arquivos em `/sql`
2. rodar `019_create_financial_accounts.sql`
3. rodar `020_create_payables.sql`
4. rodar `021_create_receivables.sql`
5. confirmar `Statement executed successfully`
6. depois subir as primeiras telas de contas a pagar e receber
