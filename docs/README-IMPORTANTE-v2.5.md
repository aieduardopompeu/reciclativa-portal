# Reciclativa Gestão — base de saídas v2.5

Este pacote prepara a base do módulo de Saídas no banco.

## Arquivos incluídos
- `sql/017_create_shipments.sql`
- `sql/018_create_shipment_items.sql`
- `docs/saas/29-saidas-base-v2.5.md`

## Ordem sugerida
1. salvar os arquivos em `/sql`
2. rodar `017_create_shipments.sql`
3. rodar `018_create_shipment_items.sql`
4. confirmar `Statement executed successfully`
5. depois subir a primeira tela real de Saídas
