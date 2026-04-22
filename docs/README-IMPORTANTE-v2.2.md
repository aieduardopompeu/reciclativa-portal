# Reciclativa Gestão — base de estoque v2.2

Este pacote prepara a base do estoque para o próximo passo:
- confirmar entradas
- gerar movimento automático
- acompanhar saldo por material e local

## Arquivos incluídos
- `sql/015_create_inventory_movements.sql`
- `sql/016_create_inventory_balances.sql`
- `docs/saas/28-estoque-base-v2.2.md`

## Ordem sugerida
1. salvar os arquivos em `/sql`
2. rodar `015_create_inventory_movements.sql`
3. rodar `016_create_inventory_balances.sql`
4. confirmar `Statement executed successfully`
5. depois subir a confirmação da entrada com movimento automático
