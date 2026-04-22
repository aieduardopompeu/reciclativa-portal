# Reciclativa Gestão — Base do módulo de Entradas v1.9

## Objetivo

Criar a estrutura mínima de banco para começar o módulo de Entradas.

## Tabelas

### receipts
Cabeçalho da entrada.

Campos principais:
- organização
- unidade
- fornecedor
- transportador
- número
- data
- peso bruto / líquido
- total
- origem por XML opcional
- status

### receipt_items
Itens da entrada.

Campos principais:
- receipt_id
- material_id
- quantity
- unit_price
- total_price
- location_id
- xml_item_ref

## Status sugeridos
- draft
- imported_xml
- confirmed
- canceled

## Próximo passo após estas migrations
Subir:
- `/app/operacao/entradas`
- formulário inicial
- listagem por organização
- criação manual de entrada
