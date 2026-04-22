# Reciclativa Gestão — Módulos e Permissões

## 1. Objetivo

Definir os módulos iniciais do SaaS e os perfis de acesso para orientar:
- menu do app
- regras de autorização
- escopo de cada tela
- modelagem de banco
- futuro versionamento do produto

---

## 2. Perfis iniciais de usuário

### 2.1. Super Admin
Responsável pela administração geral da plataforma.

Permissões:
- gerenciar organizações
- gerenciar planos
- gerenciar usuários internos da plataforma
- visualizar logs completos
- acessar configurações globais
- suporte operacional

### 2.2. Admin da Empresa
Responsável pela gestão da conta da empresa cliente.

Permissões:
- gerenciar unidades
- gerenciar usuários da empresa
- configurar cadastros mestres
- visualizar dashboard completo
- aprovar operações internas
- acessar financeiro
- acessar relatórios

### 2.3. Gestor Operacional
Responsável pela operação da empresa.

Permissões:
- cadastrar entradas
- cadastrar saídas
- movimentar estoque
- registrar pesagens
- anexar documentos operacionais
- visualizar relatórios operacionais

### 2.4. Financeiro
Responsável por contas e caixa.

Permissões:
- lançar contas a pagar
- lançar contas a receber
- baixar títulos
- conciliar movimentações futuramente
- visualizar fluxo de caixa
- emitir relatórios financeiros

### 2.5. Comercial
Responsável por clientes, fornecedores e negociações.

Permissões:
- cadastrar clientes e fornecedores
- registrar propostas e pedidos futuramente
- consultar histórico comercial
- acompanhar status de negociação

### 2.6. Operador
Perfil mais restrito, focado em execução.

Permissões:
- lançar entradas
- lançar saídas
- registrar pesagem
- consultar cadastros permitidos
- sem acesso a configurações sensíveis
- sem acesso ao financeiro completo

### 2.7. Leitura / Auditoria
Perfil consultivo.

Permissões:
- visualizar relatórios
- visualizar movimentações
- visualizar histórico
- sem permissão de edição

---

## 3. Módulos do sistema

## 3.1. Dashboard
Função:
- visão geral da operação
- indicadores rápidos
- alertas operacionais e financeiros

Indicadores iniciais:
- entradas no período
- saídas no período
- saldo por material
- contas a receber em aberto
- contas a pagar em aberto
- resultado bruto simples

## 3.2. Cadastros
Submódulos:
- empresas
- unidades
- usuários
- clientes
- fornecedores
- transportadores
- materiais
- categorias de materiais
- contas bancárias
- centros de custo

## 3.3. Operação
Submódulos:
- recebimentos / entradas
- expedições / saídas
- pesagens
- movimentações de estoque
- ajustes de estoque
- histórico operacional

## 3.4. Estoque
Submódulos:
- saldo por material
- saldo por unidade
- movimentações
- custo médio futuro
- posição de estoque

## 3.5. Financeiro
Submódulos:
- contas a pagar
- contas a receber
- caixa
- contas bancárias
- baixa manual
- conciliação bancária futura

## 3.6. Fiscal e Documentos
Submódulos:
- anexos
- documentos de entrada
- documentos de saída
- NFe futura
- NFS-e futura
- comprovantes

## 3.7. Relatórios
Submódulos:
- relatório operacional
- relatório de estoque
- relatório financeiro
- relatório por material
- relatório por cliente
- relatório por fornecedor

## 3.8. Configurações
Submódulos:
- dados da empresa
- preferências da unidade
- permissões
- parâmetros do sistema
- trilha de auditoria

---

## 4. Regras de permissão

### 4.1. Regra estrutural
Toda ação relevante deve respeitar:
- `organization_id`
- `unit_id` quando aplicável
- `role`
- permissões específicas por módulo

### 4.2. Regra de segregação
Usuários de uma empresa não podem ver dados de outra empresa.

### 4.3. Regra de rastreabilidade
Toda ação crítica deve registrar:
- usuário
- data/hora
- módulo
- ação
- entidade afetada
- valor anterior e novo valor quando fizer sentido

---

## 5. Sugestão de menu lateral do app

```txt
Dashboard
Cadastros
  Empresas / Unidades
  Usuários
  Clientes
  Fornecedores
  Transportadores
  Materiais
Operação
  Entradas
  Saídas
  Pesagens
  Movimentações
Estoque
Financeiro
  Contas a pagar
  Contas a receber
  Caixa
Documentos
Relatórios
Configurações
```

---

## 6. Status do documento

Versão: v0.2
Status: base inicial para validação
