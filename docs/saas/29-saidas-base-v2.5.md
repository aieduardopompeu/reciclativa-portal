# Reciclativa Gestão — Base do módulo de Saídas v2.5

## Objetivo
Criar a estrutura mínima para registrar saídas de materiais e preparar a baixa de estoque.

## Tabelas

### shipments
Cabeçalho da saída.

Campos principais:
- organização
- unidade
- cliente
- transportador
- número
- data
- peso bruto / líquido
- total
- status
- observações

### shipment_items
Itens da saída.

Campos principais:
- shipment_id
- material_id
- quantity
- unit_price
- total_price
- location_id
- notes

## Status sugeridos
- draft
- confirmed
- canceled

## Próximo passo
Subir:
- `/app/operacao/saidas`
- lançamento manual inicial
- confirmação da saída
- geração de movimento de estoque com `quantity_out`
