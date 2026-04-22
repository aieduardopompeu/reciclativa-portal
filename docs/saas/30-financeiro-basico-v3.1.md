# Reciclativa Gestão — Financeiro básico v3.1

## Objetivo
Criar a base mínima do módulo financeiro para iniciar:

- contas a pagar
- contas a receber
- vínculo com organização e unidade
- status financeiro básico
- datas de vencimento e pagamento/recebimento

## Tabelas

### financial_accounts
Representa contas financeiras da empresa:
- conta corrente
- caixa
- carteira
- conta digital

Campos principais:
- organização
- unidade opcional
- nome
- banco
- tipo
- saldo inicial
- ativo

### payables
Representa contas a pagar.

Campos principais:
- organização
- unidade
- fornecedor opcional
- descrição
- documento
- competência
- vencimento
- valor
- status
- conta financeira
- data de pagamento

### receivables
Representa contas a receber.

Campos principais:
- organização
- unidade
- cliente opcional
- descrição
- documento
- competência
- vencimento
- valor
- status
- conta financeira
- data de recebimento

## Status sugeridos
### payables
- open
- partial
- paid
- canceled

### receivables
- open
- partial
- received
- canceled

## Próximo passo
Subir:
- `/app/financeiro/contas-a-pagar`
- `/app/financeiro/contas-a-receber`
- cadastro manual inicial
- baixa simples
- histórico básico
