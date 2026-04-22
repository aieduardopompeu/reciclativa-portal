# Reciclativa Gestão — Estrutura Inicial do SaaS

> Documento base para evolução do produto.
> Objetivo: orientar arquitetura funcional, modelagem inicial, roadmap e versionamento do **Sistema para empresas de reciclagem e gestão de resíduos**.

---

## 1. Visão do produto

O **Reciclativa Gestão** será um SaaS voltado para empresas de reciclagem, centrais de triagem, sucateiros, operadores de resíduos, compradores, beneficiadores e empresas de gestão ambiental que precisam controlar operação, estoque, financeiro e documentos do negócio em um único ambiente.

A proposta do produto é entregar uma base de gestão especializada no setor, com foco em:

- controle operacional de entrada e saída de materiais
- rastreabilidade das movimentações
- gestão de estoque por tipo de material
- gestão financeira básica e evolutiva
- visão gerencial do negócio
- base preparada para integrações fiscais e bancárias

---

## 2. Diretrizes do SaaS

### 2.1. Premissas do produto

- O sistema deve nascer como **SaaS multiempresa**.
- Cada empresa terá seu próprio ambiente lógico dentro da mesma aplicação.
- O sistema deve ser modular, permitindo expansão sem retrabalho estrutural.
- O MVP deve resolver dores reais antes de virar um ERP completo.
- O produto deve privilegiar simplicidade operacional, rastreabilidade e escalabilidade.

### 2.2. Princípios de arquitetura

- Multi-tenant por `organization_id`
- Separação entre dados mestres, operação, financeiro e documentos
- Auditoria de ações críticas
- Permissões por perfil e função
- Base preparada para integrações futuras
- Histórico de mudanças em registros sensíveis

---

## 3. Objetivo do MVP

O MVP deve ser vendável e útil para empresas reais, mesmo sem todos os módulos finais.

### 3.1. Problema que o MVP resolve

Permitir que a empresa de reciclagem controle o básico da operação em um único sistema:

- quem comprou e de quem comprou
- que material entrou
- que material saiu
- quanto há em estoque
- quanto tem a pagar e a receber
- quais números resumem a operação

### 3.2. Entrega principal do MVP

O MVP inicial deve contemplar:

1. cadastro de empresas, usuários e permissões
2. cadastro de clientes, fornecedores, transportadores e materiais
3. entradas de materiais
4. saídas de materiais
5. controle de estoque por material
6. contas a pagar
7. contas a receber
8. dashboard básico
9. trilha de auditoria mínima

---

## 4. Perfis de usuários

### 4.1. Perfis iniciais sugeridos

#### Super Admin
Responsável por administração global do SaaS.

Permissões:
- gerenciar tenants/empresas
- gerenciar planos
- acessar logs globais
- suporte administrativo

#### Admin da Empresa
Responsável pela administração interna do cliente.

Permissões:
- gerenciar unidade(s)
- gerenciar usuários da empresa
- configurar cadastros mestres
- visualizar operação e financeiro
- acessar relatórios

#### Operador
Responsável pelo lançamento operacional.

Permissões:
- lançar entradas
- lançar saídas
- movimentar estoque
- consultar cadastros relacionados

#### Financeiro
Responsável pelo controle financeiro.

Permissões:
- contas a pagar
- contas a receber
- baixas
- conciliação futura
- relatórios financeiros

#### Comercial / Atendimento
Responsável por clientes, fornecedores e negociação.

Permissões:
- cadastro de parceiros
- acompanhamento de pedidos/propostas futuras
- consulta de histórico comercial

#### Gestor / Diretoria
Perfil mais analítico.

Permissões:
- dashboards
- relatórios
- indicadores
- visão consolidada da empresa

---

## 5. Módulos do sistema

## 5.1. Módulo: Estrutura e acesso

Escopo:
- autenticação
- multiempresa
- usuários
- perfis
- permissões
- unidades
- preferências da empresa

Itens:
- login
- recuperação de senha
- gestão de usuários
- convite de usuários
- papéis e acessos
- cadastro da empresa
- cadastro de unidades/filiais

---

## 5.2. Módulo: Cadastros mestres

Escopo:
- clientes
- fornecedores
- transportadores
- materiais
- categorias
- unidades de medida
- formas de pagamento
- bancos e contas

Itens:
- cadastro de cliente PJ/PF
- cadastro de fornecedor
- cadastro de transportador
- cadastro de material/resíduo
- classificação do material
- unidade de medida
- observações e anexos

---

## 5.3. Módulo: Operação

Escopo:
- recebimento de materiais
- lançamentos de entrada
- lançamentos de saída
- pesagem
- movimentações internas
- estoque

Itens principais:
- registro de entrada de material
- registro de saída de material
- número do documento associado
- data e hora da movimentação
- peso bruto / líquido
- valor unitário / total
- origem / destino
- motorista / transportador
- observações

---

## 5.4. Módulo: Estoque

Escopo:
- saldo por material
- saldo por unidade
- movimentações
- ajustes
- inventário futuro

Itens:
- posição atual de estoque
- histórico de movimentação
- entrada e saída vinculadas
- ajuste manual com motivo
- saldo consolidado por empresa e unidade

---

## 5.5. Módulo: Financeiro

Escopo:
- contas a pagar
- contas a receber
- caixa
- bancos
- baixas
- fluxo de caixa futuro

Itens:
- lançamento manual de título
- vínculo opcional com operação
- baixa parcial ou total
- situação do título
- vencimento
- pagamento/recebimento
- centro de custo futuro
- importação bancária futura

---

## 5.6. Módulo: Fiscal e documentos

Escopo futuro e parcialmente preparado no MVP:
- NFe
- NFS-e
- documentos de transporte
- MTR e rastreabilidade documental
- anexos por lançamento

Itens:
- armazenar número/chave de documentos
- anexar PDF/XML/comprovantes
- vincular documento a entrada, saída ou financeiro

---

## 5.7. Módulo: Gestão e inteligência

Escopo:
- dashboard
- indicadores operacionais
- indicadores financeiros
- relatórios
- exportações

KPIs iniciais sugeridos:
- volume de entrada por período
- volume de saída por período
- saldo por material
- compras por fornecedor
- vendas por cliente
- contas vencidas
- contas a vencer
- receita, despesa e saldo

---

## 6. Navegação inicial do app

Sugestão de menu lateral do SaaS:

- Dashboard
- Operação
  - Entradas
  - Saídas
  - Movimentações
- Estoque
  - Saldo por material
  - Histórico
- Financeiro
  - Contas a pagar
  - Contas a receber
  - Caixa
  - Bancos
- Cadastros
  - Clientes
  - Fornecedores
  - Transportadores
  - Materiais
  - Unidades
- Documentos
  - Anexos
  - Fiscais
- Relatórios
- Configurações
  - Empresa
  - Usuários
  - Perfis e permissões

---

## 7. Fluxos principais do MVP

## 7.1. Fluxo de entrada de material

1. usuário acessa Entradas
2. cria novo lançamento
3. seleciona fornecedor/origem
4. seleciona material
5. informa peso, valor e data
6. associa transportador e documento, se houver
7. salva lançamento
8. sistema gera movimentação de estoque
9. sistema pode gerar conta a pagar vinculada, quando aplicável

## 7.2. Fluxo de saída de material

1. usuário acessa Saídas
2. cria novo lançamento
3. seleciona cliente/destino
4. seleciona material
5. informa peso, valor e data
6. associa transportador e documento, se houver
7. salva lançamento
8. sistema baixa saldo do estoque
9. sistema pode gerar conta a receber vinculada, quando aplicável

## 7.3. Fluxo financeiro básico

1. usuário cria ou recebe um título
2. define tipo: pagar ou receber
3. informa vencimento, valor, parte relacionada e observações
4. registra baixa quando houver pagamento/recebimento
5. sistema atualiza status do título
6. dashboard reflete situação financeira

---

## 8. Entidades principais do banco de dados

Abaixo está a estrutura conceitual inicial do banco. A modelagem final pode evoluir, mas esta deve ser a espinha dorsal do produto.

## 8.1. Núcleo multiempresa

### `organizations`
Representa cada empresa cliente do SaaS.

Campos sugeridos:
- id
- name
- legal_name
- document_number
- email
- phone
- plan_code
- status
- created_at
- updated_at

### `organization_units`
Representa unidades, filiais, plantas ou pátios da empresa.

Campos sugeridos:
- id
- organization_id
- name
- code
- city
- state
- address
- status
- created_at
- updated_at

### `users`
Usuários da plataforma.

Campos sugeridos:
- id
- name
- email
- password_hash / auth_provider
- status
- created_at
- updated_at

### `organization_users`
Liga usuários às empresas e perfis.

Campos sugeridos:
- id
- organization_id
- user_id
- role_id
- unit_id (opcional)
- status
- created_at
- updated_at

### `roles`
Perfis de acesso.

Campos sugeridos:
- id
- organization_id (nullable para perfis globais)
- name
- code
- description

### `role_permissions`
Permissões por perfil.

Campos sugeridos:
- id
- role_id
- permission_key

---

## 8.2. Cadastros mestres

### `customers`
- id
- organization_id
- unit_id
- type (PF/PJ)
- name
- legal_name
- document_number
- email
- phone
- mobile
- city
- state
- address
- notes
- status
- created_at
- updated_at

### `suppliers`
Estrutura semelhante a customers.

### `carriers`
Estrutura semelhante a customers, com campos operacionais extras.

### `materials`
Cadastro dos materiais/resíduos negociados ou controlados.

Campos sugeridos:
- id
- organization_id
- code
- name
- category_id
- unit_of_measure
- internal_description
- status
- created_at
- updated_at

### `material_categories`
- id
- organization_id
- name
- code
- description

---

## 8.3. Operação e estoque

### `receipts`
Cabeçalho de entrada de material.

Campos sugeridos:
- id
- organization_id
- unit_id
- supplier_id
- carrier_id
- document_number
- movement_date
- gross_weight
- net_weight
- total_amount
- notes
- status
- created_by
- created_at
- updated_at

### `receipt_items`
Itens da entrada.

Campos sugeridos:
- id
- receipt_id
- material_id
- quantity
- unit_price
- total_price
- notes

### `shipments`
Cabeçalho de saída de material.

Campos sugeridos:
- id
- organization_id
- unit_id
- customer_id
- carrier_id
- document_number
- movement_date
- gross_weight
- net_weight
- total_amount
- notes
- status
- created_by
- created_at
- updated_at

### `shipment_items`
Itens da saída.

Campos sugeridos:
- id
- shipment_id
- material_id
- quantity
- unit_price
- total_price
- notes

### `inventory_movements`
Tabela central de movimentações de estoque.

Campos sugeridos:
- id
- organization_id
- unit_id
- material_id
- movement_type (IN, OUT, ADJUSTMENT)
- source_type (RECEIPT, SHIPMENT, MANUAL)
- source_id
- quantity
- movement_date
- notes
- created_by
- created_at

### `inventory_balances`
Tabela de saldo consolidado, opcionalmente materializada.

Campos sugeridos:
- id
- organization_id
- unit_id
- material_id
- quantity_on_hand
- updated_at

---

## 8.4. Financeiro

### `bank_accounts`
- id
- organization_id
- unit_id
- bank_name
- account_name
- branch_number
- account_number
- account_type
- initial_balance
- status
- created_at
- updated_at

### `accounts_payable`
- id
- organization_id
- unit_id
- supplier_id
- receipt_id (opcional)
- description
- amount
- due_date
- issue_date
- paid_at
- status
- bank_account_id (opcional)
- notes
- created_at
- updated_at

### `accounts_receivable`
- id
- organization_id
- unit_id
- customer_id
- shipment_id (opcional)
- description
- amount
- due_date
- issue_date
- received_at
- status
- bank_account_id (opcional)
- notes
- created_at
- updated_at

### `bank_transactions`
Preparação para conciliação bancária.

Campos sugeridos:
- id
- organization_id
- bank_account_id
- transaction_date
- description
- amount
- transaction_type (CREDIT/DEBIT)
- external_reference
- reconciled
- reconciled_at
- created_at

---

## 8.5. Documentos e anexos

### `attachments`
- id
- organization_id
- related_type
- related_id
- file_name
- file_url
- mime_type
- uploaded_by
- created_at

### `fiscal_documents`
- id
- organization_id
- related_type
- related_id
- document_type
- document_number
- document_key
- issue_date
- xml_url
- pdf_url
- status
- created_at

---

## 8.6. Auditoria

### `audit_logs`
Registro de ações críticas no sistema.

Campos sugeridos:
- id
- organization_id
- user_id
- entity_type
- entity_id
- action_type
- before_data_json
- after_data_json
- ip_address
- user_agent
- created_at

---

## 9. Regras estruturais importantes

### 9.1. Multiempresa

Quase todas as tabelas devem possuir `organization_id`.

### 9.2. Unidade/filial

Sempre que fizer sentido operacionalmente, incluir `unit_id`.

### 9.3. Soft delete ou status

Preferir `status` e trilha histórica em vez de exclusão física em registros sensíveis.

### 9.4. Auditoria

Criar auditoria para:
- lançamentos operacionais
- baixas financeiras
- permissões
- exclusões lógicas
- alterações de documentos

### 9.5. Integridade de estoque

O saldo não deve ser digitado diretamente; ele deve ser consequência das movimentações.

---

## 10. Roadmap de implementação

## Fase 1 — Fundação do SaaS

Objetivo:
criar a base estrutural do produto.

Entregas:
- autenticação
- multiempresa
- usuários
- perfis e permissões
- empresa e unidades
- layout principal do app
- menu lateral
- base de auditoria

Status: `planejado`

---

## Fase 2 — Cadastros mestres

Objetivo:
permitir que cada empresa estruture seus dados principais.

Entregas:
- clientes
- fornecedores
- transportadores
- materiais
- categorias
- configurações iniciais

Status: `planejado`

---

## Fase 3 — Operação e estoque

Objetivo:
colocar a operação principal no sistema.

Entregas:
- entradas
- saídas
- itens
- movimentações de estoque
- saldo por material
- histórico

Status: `planejado`

---

## Fase 4 — Financeiro básico

Objetivo:
incluir a camada mínima de gestão financeira.

Entregas:
- contas a pagar
- contas a receber
- bancos
- caixa
- baixa manual
- relatórios financeiros iniciais

Status: `planejado`

---

## Fase 5 — Dashboard e relatórios

Objetivo:
entregar visão gerencial.

Entregas:
- dashboard operacional
- dashboard financeiro
- relatórios por período
- exportações

Status: `planejado`

---

## Fase 6 — Documentos e integrações

Objetivo:
evoluir o sistema para rotinas mais completas.

Entregas:
- anexos robustos
- documentos fiscais
- integrações NFe/NFS-e
- importação de extrato bancário
- conciliação bancária

Status: `futuro`

---

## 11. Stack sugerida para o produto

Baseando-se no stack já alinhado com o projeto:

- **Frontend/App:** Next.js
- **Hospedagem:** Vercel
- **Versionamento:** GitHub
- **Banco de dados:** Neon PostgreSQL
- **ORM/queries:** a definir (sugestão: Drizzle ORM ou Prisma)
- **Auth:** a definir conforme estrutura do app atual
- **Storage de arquivos:** Vercel Blob, S3 compatível ou Cloudflare R2
- **Jobs/filas futuras:** a definir

---

## 12. Estrutura sugerida para documentação dentro do projeto

Sugestão de árvore para documentação do SaaS:

```txt
/docs
  /saas
    00-visao-geral.md
    01-mvp.md
    02-modulos.md
    03-modelagem-banco.md
    04-roadmap.md
    05-regras-negocio.md
    06-versionamento.md
```

Como documento inicial único, este arquivo pode começar como:

```txt
/docs/saas/00-visao-geral.md
```

Ou, se preferirem algo mais simples no início:

```txt
/docs/reciclativa-saas-estrutura.md
```

---

## 13. Modelo de versionamento do documento

Este arquivo deve funcionar como documento vivo.

### 13.1. Convenção sugerida

- `v0.1` — estrutura inicial do SaaS
- `v0.2` — ajustes de módulos e perfis
- `v0.3` — modelagem inicial do banco
- `v0.4` — definição de regras de negócio do MVP
- `v0.5` — escopo técnico da Fase 1
- `v1.0` — blueprint funcional validado

### 13.2. Changelog dentro do próprio arquivo

Adicionar sempre ao final uma seção como esta:

```md
## Changelog

### v0.1 - Estrutura inicial
- definição da visão do produto
- definição do MVP
- definição dos módulos
- definição das entidades iniciais
- definição do roadmap
```

---

## 14. Próximos passos recomendados

### Imediatos

1. validar esta estrutura macro do produto
2. fechar os módulos do MVP
3. decidir o menu inicial do app
4. definir as tabelas reais da Fase 1
5. iniciar a modelagem física do banco
6. criar as primeiras rotas e telas base

### Após validação

1. detalhar regras de negócio de entradas
2. detalhar regras de negócio de saídas
3. detalhar regras do financeiro
4. desenhar relacionamento entre operação e financeiro
5. documentar permissões por perfil

---

## 15. Changelog

### v0.1 - Estrutura inicial
- criada a visão inicial do SaaS Reciclativa Gestão
- definido o MVP funcional
- definidos módulos principais
- definidos perfis de usuários
- proposta modelagem conceitual do banco
- proposto roadmap em fases
- definida convenção inicial de versionamento documental

