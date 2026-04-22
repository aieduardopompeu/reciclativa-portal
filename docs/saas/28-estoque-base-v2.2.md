# Reciclativa Gestão — Base de estoque v2.2

## Objetivo
Criar a base mínima para controlar os movimentos e saldos de estoque.

## Tabelas

### inventory_movements
Registra cada movimento de estoque gerado pelo sistema.

Campos principais:
- organização
- unidade
- local
- material
- receipt_id opcional
- movement_type
- quantity_in
- quantity_out
- unit_cost
- total_cost
- occurred_at
- created_by

### inventory_balances
Mantém o saldo consolidado por:
- organização
- unidade
- local
- material

Campos principais:
- current_quantity
- average_cost
- updated_at

## Tipos sugeridos de movimento
- receipt_confirmation
- manual_adjustment
- shipment_confirmation

## Próximo passo
Subir:
- confirmação da entrada
- criação automática de inventory_movements
- atualização de inventory_balances
