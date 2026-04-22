# Reciclativa Gestão — Modelagem Inicial do Banco

## 1. Objetivo

Definir a modelagem inicial do banco para o MVP do SaaS, com foco em:
- multiempresa
- operação de materiais
- estoque
- financeiro
- auditoria

---

## 2. Premissas obrigatórias

1. O sistema deve nascer multiempresa.
2. Quase todas as tabelas devem carregar `organization_id`.
3. Sempre que existir contexto operacional local, usar `unit_id`.
4. Exclusão preferencialmente lógica (`archived_at` ou `is_active`).
5. Tabelas críticas devem possuir rastreabilidade.
6. IDs podem seguir UUID.
7. Datas de criação e atualização devem existir por padrão.

---

## 3. Tabelas principais

## 3.1. organizations
Representa a empresa cliente do SaaS.

Campos sugeridos:
- id
- legal_name
- trade_name
- cnpj
- email
- phone
- whatsapp
- plan_code
- status
- created_at
- updated_at

## 3.2. organization_units
Representa filiais, pátios ou unidades operacionais.

Campos sugeridos:
- id
- organization_id
- name
- code
- phone
- whatsapp
- email
- zip_code
- address
- number
- complement
- neighborhood
- city
- state
- is_headquarters
- is_active
- created_at
- updated_at

## 3.3. users
Usuários autenticados do sistema.

Campos sugeridos:
- id
- organization_id
- unit_id nullable
- name
- email
- password_hash ou auth_provider_ref
- role
- is_active
- last_login_at
- created_at
- updated_at

## 3.4. customers
Clientes compradores ou tomadores.

Campos sugeridos:
- id
- organization_id
- name
- document
- email
- phone
- whatsapp
- contact_name
- city
- state
- is_active
- notes
- created_at
- updated_at

## 3.5. suppliers
Fornecedores de materiais e serviços.

Campos sugeridos:
- id
- organization_id
- name
- document
- email
- phone
- whatsapp
- contact_name
- city
- state
- is_active
- notes
- created_at
- updated_at

## 3.6. carriers
Transportadores.

Campos sugeridos:
- id
- organization_id
- name
- document
- email
- phone
- whatsapp
- vehicle_info
- is_active
- created_at
- updated_at

## 3.7. materials
Materiais ou resíduos tratados pelo sistema.

Campos sugeridos:
- id
- organization_id
- category_id
- code
- name
- unit_of_measure
- residue_classification nullable
- default_purchase_price nullable
- default_sale_price nullable
- is_active
- created_at
- updated_at

## 3.8. material_categories
Categorias de materiais.

Campos sugeridos:
- id
- organization_id
- name
- code
- is_active
- created_at
- updated_at

## 3.9. inventory_locations
Locais de estoque.

Campos sugeridos:
- id
- organization_id
- unit_id
- name
- code
- is_active
- created_at
- updated_at

## 3.10. inventory_movements
Movimentações de estoque.

Campos sugeridos:
- id
- organization_id
- unit_id
- location_id
- material_id
- movement_type
- reference_type
- reference_id
- quantity
- unit_price nullable
- total_value nullable
- movement_date
- notes
- created_by
- created_at

Tipos sugeridos de `movement_type`:
- entry
- exit
- transfer_in
- transfer_out
- adjustment_in
- adjustment_out

## 3.11. receipts
Cabeçalho de entradas / recebimentos.

Campos sugeridos:
- id
- organization_id
- unit_id
- supplier_id
- carrier_id nullable
- receipt_number
- receipt_date
- gross_weight nullable
- net_weight nullable
- total_amount
- source_type nullable
- xml_access_key nullable
- xml_file_url nullable
- status
- notes
- created_by
- created_at
- updated_at

## 3.12. receipt_items
Itens de entrada.

Campos sugeridos:
- id
- receipt_id
- material_id
- quantity
- unit_price
- total_price
- location_id nullable
- xml_item_ref nullable
- notes

## 3.13. shipments
Cabeçalho de saídas / expedições.

Campos sugeridos:
- id
- organization_id
- unit_id
- customer_id
- carrier_id nullable
- shipment_number
- shipment_date
- gross_weight nullable
- net_weight nullable
- total_amount
- status
- notes
- created_by
- created_at
- updated_at

## 3.14. shipment_items
Itens de saída.

Campos sugeridos:
- id
- shipment_id
- material_id
- quantity
- unit_price
- total_price
- location_id nullable
- notes

## 3.15. bank_accounts
Contas bancárias.

Campos sugeridos:
- id
- organization_id
- bank_name
- account_name
- agency
- account_number
- pix_key nullable
- is_active
- created_at
- updated_at

## 3.16. accounts_payable
Contas a pagar.

Campos sugeridos:
- id
- organization_id
- unit_id nullable
- supplier_id nullable
- receipt_id nullable
- description
- due_date
- issue_date nullable
- amount
- paid_amount default 0
- status
- bank_account_id nullable
- cost_center nullable
- notes
- created_by
- created_at
- updated_at

## 3.17. accounts_receivable
Contas a receber.

Campos sugeridos:
- id
- organization_id
- unit_id nullable
- customer_id nullable
- shipment_id nullable
- description
- due_date
- issue_date nullable
- amount
- received_amount default 0
- status
- bank_account_id nullable
- revenue_center nullable
- notes
- created_by
- created_at
- updated_at

## 3.18. bank_transactions
Movimentações bancárias importadas ou lançadas.

Campos sugeridos:
- id
- organization_id
- bank_account_id
- transaction_date
- description
- amount
- transaction_type
- external_ref nullable
- reconciled default false
- created_at
- updated_at

## 3.19. attachments
Arquivos vinculados a registros.

Campos sugeridos:
- id
- organization_id
- entity_type
- entity_id
- file_name
- file_url
- mime_type
- uploaded_by
- created_at

## 3.20. audit_logs
Trilha de auditoria.

Campos sugeridos:
- id
- organization_id
- user_id
- module
- action
- entity_type
- entity_id
- previous_data jsonb nullable
- new_data jsonb nullable
- ip_address nullable
- user_agent nullable
- created_at

---

## 4. Relacionamentos principais

- organization possui muitas units
- organization possui muitos users
- organization possui muitos customers
- organization possui muitos suppliers
- organization possui muitos materials
- receipt possui muitos receipt_items
- shipment possui muitos shipment_items
- receipt pode gerar contas a pagar
- shipment pode gerar contas a receber
- receipts e shipments alimentam inventory_movements

---

## 5. Regras estruturais

### 5.1. Estoque
O saldo não deve ser digitado manualmente como fonte principal.
O saldo deve ser derivado de `inventory_movements`.

### 5.2. Financeiro
Sempre que possível, títulos devem referenciar a origem:
- entrada
- saída
- contrato futuro
- lançamento avulso

### 5.3. Auditoria
Criação, edição, baixa financeira, cancelamento e arquivamento devem gerar log.

### 5.4. Status sugeridos
Recebimentos:
- draft
- imported_xml
- confirmed
- canceled

Expedições:
- draft
- confirmed
- canceled

Contas:
- pending
- partially_paid
- paid
- overdue
- canceled

### 5.5. Entrada por XML
A modelagem já deve suportar entrada de produto por importação de XML de NFe, com possibilidade de registrar:
- chave de acesso
- arquivo XML importado
- origem da entrada
- referência do item importado

---

## 6. Ordem sugerida de implementação do banco

1. organizations
2. organization_units
3. users
4. customers
5. suppliers
6. materials
7. inventory_locations
8. receipts + receipt_items
9. shipments + shipment_items
10. inventory_movements
11. accounts_payable
12. accounts_receivable
13. attachments
14. audit_logs

---

## 7. Status do documento

Versão: v0.3
Status: pronto para validação funcional antes do SQL físico
