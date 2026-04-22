# Reciclativa Gestão — Regras de Negócio do MVP

## 1. Objetivo

Registrar as regras centrais do MVP para orientar:
- telas
- APIs
- validações
- permissões
- testes

---

## 2. Regras gerais

### 2.1. Multiempresa
Todo registro deve pertencer a uma empresa (`organization_id`).

### 2.2. Unidade
Quando a operação ocorrer em local específico, deve haver `unit_id`.

### 2.3. Auditoria
Ações críticas devem registrar log:
- criação
- edição
- confirmação
- cancelamento
- baixa financeira
- arquivamento

### 2.4. Exclusão
No MVP, evitar exclusão física de dados críticos.
Preferir:
- cancelamento
- inativação
- arquivamento

---

## 3. Cadastros

### 3.1. Clientes
- não podem ser duplicados facilmente pelo mesmo documento
- aceitar CPF/CNPJ ou documento equivalente
- podem ser inativados

### 3.2. Fornecedores
- mesma lógica de deduplicação por documento
- podem participar de entradas financeiras e operacionais

### 3.3. Materiais
- devem possuir unidade de medida
- podem ter categoria
- podem ter preço padrão de compra e venda apenas como apoio
- preços reais da operação vêm do lançamento

---

## 4. Entradas de materiais

### 4.1. Conceito
Entrada representa o recebimento/compra de material.

### 4.2. Regras
- deve ter fornecedor
- deve ter data
- deve ter ao menos um item
- cada item deve ter material e quantidade
- pode ter peso bruto e líquido
- pode gerar movimentação de estoque
- pode gerar conta a pagar

### 4.3. Confirmação
Somente ao confirmar a entrada:
- movimenta estoque
- gera efeitos financeiros automáticos, se configurado
- trava os números principais para evitar alterações livres

### 4.4. Cancelamento
Ao cancelar:
- reverte estoque se já confirmado
- marca registros derivados conforme política do sistema
- exige permissão adequada

### 4.5. Entrada por importação de XML da NFe
O MVP já deve prever entrada de produto por importação de XML de NFe.

Regras:
- o usuário pode importar o arquivo XML da NFe
- o sistema deve ler os dados principais da nota
- o sistema deve criar uma pré-entrada em status intermediário
- fornecedor, número da nota, chave de acesso, data e itens devem ser trazidos do XML quando disponíveis
- o usuário deve revisar os dados antes da confirmação final
- materiais importados podem exigir vinculação manual com o cadastro interno, quando não houver correspondência
- a confirmação da importação deve gerar a entrada formal, movimentação de estoque e possível vínculo financeiro
- o XML importado deve ficar vinculado ao registro para rastreabilidade
- importações repetidas da mesma chave de acesso devem ser bloqueadas ou sinalizadas

### 4.6. Fluxo sugerido da importação
1. upload do XML
2. leitura dos dados
3. pré-cadastro da entrada
4. conferência e vínculo dos itens
5. confirmação
6. geração dos efeitos operacionais e financeiros

---

## 5. Saídas de materiais

### 5.1. Conceito
Saída representa venda/expedição de material.

### 5.2. Regras
- deve ter cliente
- deve ter data
- deve ter ao menos um item
- cada item deve ter material e quantidade
- não pode confirmar se não houver saldo suficiente, salvo permissão especial futura

### 5.3. Confirmação
Somente ao confirmar:
- baixa estoque
- gera conta a receber quando aplicável

### 5.4. Cancelamento
Ao cancelar:
- reverte efeitos de estoque
- reverte vínculo financeiro conforme regra

---

## 6. Estoque

### 6.1. Fonte de verdade
O saldo decorre das movimentações.

### 6.2. Ajustes
Ajustes de estoque devem:
- exigir motivo
- gerar trilha de auditoria
- registrar usuário e data

### 6.3. Transferências
Transferência entre locais pode entrar após o MVP inicial, mas a modelagem já deve suportar isso.

---

## 7. Financeiro

## 7.1. Contas a pagar
- podem nascer de uma entrada
- também podem ser lançadas manualmente
- devem ter valor, vencimento e status

## 7.2. Contas a receber
- podem nascer de uma saída
- também podem ser lançadas manualmente
- devem ter valor, vencimento e status

## 7.3. Baixas
Baixas financeiras devem registrar:
- data do pagamento/recebimento
- valor pago/recebido
- conta bancária ou caixa
- observação opcional
- usuário responsável

## 7.4. Parcialidade
O sistema deve suportar baixa parcial.

---

## 8. Permissões

### 8.1. Operador
Pode:
- lançar entradas
- lançar saídas
- consultar estoques

Não pode:
- excluir dados críticos
- alterar parâmetros
- acessar relatórios estratégicos completos

### 8.2. Financeiro
Pode:
- lançar títulos
- realizar baixas
- consultar fluxo financeiro

### 8.3. Admin da empresa
Pode:
- configurar cadastros
- visualizar todos os módulos da empresa
- cancelar operações com controle

---

## 9. Relatórios mínimos do MVP

- entradas por período
- saídas por período
- saldo por material
- contas a pagar em aberto
- contas a receber em aberto
- resumo gerencial do período

---

## 10. Critérios de aceite do MVP

O MVP estará funcional quando permitir:
1. cadastrar empresa, unidade e usuários
2. cadastrar clientes, fornecedores e materiais
3. lançar entrada com itens
4. importar XML de NFe para gerar pré-entrada revisável
5. lançar saída com itens
6. calcular saldo de estoque
7. lançar e baixar contas a pagar
8. lançar e baixar contas a receber
9. exibir dashboard básico
10. registrar auditoria mínima

---

## 11. Status do documento

Versão: v0.3
Status: base de validação do produto
