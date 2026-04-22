# Reciclativa Gestão — Backlog Técnico por Arquivo

## 1. Objetivo

Transformar a Fase 1 em blocos de implementação mais concretos.

---

## 2. Banco

### Arquivos de migration
- [ ] `001_init_extensions.sql`
- [ ] `002_init_roles.sql`
- [ ] `003_create_organizations.sql`
- [ ] `004_create_organization_units.sql`
- [ ] `005_create_or_adapt_users.sql`
- [ ] `006_create_customers.sql`
- [ ] `007_create_suppliers.sql`
- [ ] `008_create_carriers.sql`
- [ ] `009_create_material_categories.sql`
- [ ] `010_create_materials.sql`
- [ ] `011_create_inventory_locations.sql`
- [ ] `012_create_audit_logs.sql`

### Seeds
- [ ] `seed_001_org_base.sql`
- [ ] `seed_002_users.sql`
- [ ] `seed_003_materials.sql`
- [ ] `seed_004_inventory_locations.sql`

---

## 3. Libs de base

### `/src/lib/auth`
- [ ] helper de usuário atual
- [ ] helper de sessão atual
- [ ] logout seguro

### `/src/lib/tenancy`
- [ ] helper de organização atual
- [ ] helper de unidade atual
- [ ] validador de escopo da organização

### `/src/lib/permissions`
- [ ] matriz de permissões por role
- [ ] helper `canAccessModule`
- [ ] helper `canPerformAction`

### `/src/lib/audit`
- [ ] função `writeAuditLog`
- [ ] utilitário para serialização de `previous_data` e `new_data`

### `/src/lib/validators`
- [ ] schema de cliente
- [ ] schema de fornecedor
- [ ] schema de transportador
- [ ] schema de categoria
- [ ] schema de material
- [ ] schema de local de estoque
- [ ] schema de unidade
- [ ] schema de usuário

---

## 4. Repositórios

- [ ] `organizations.repository`
- [ ] `organization-units.repository`
- [ ] `users.repository`
- [ ] `customers.repository`
- [ ] `suppliers.repository`
- [ ] `carriers.repository`
- [ ] `material-categories.repository`
- [ ] `materials.repository`
- [ ] `inventory-locations.repository`
- [ ] `audit-logs.repository`

---

## 5. Serviços

- [ ] `organizations.service`
- [ ] `organization-units.service`
- [ ] `users.service`
- [ ] `customers.service`
- [ ] `suppliers.service`
- [ ] `carriers.service`
- [ ] `material-categories.service`
- [ ] `materials.service`
- [ ] `inventory-locations.service`
- [ ] `audit.service`

---

## 6. Rotas / páginas

### Estrutura do app
- [ ] `/app/dashboard`
- [ ] `/app/configuracoes/empresa`
- [ ] `/app/configuracoes/auditoria`

### Cadastros
- [ ] `/app/cadastros/unidades`
- [ ] `/app/cadastros/usuarios`
- [ ] `/app/cadastros/clientes`
- [ ] `/app/cadastros/fornecedores`
- [ ] `/app/cadastros/transportadores`
- [ ] `/app/cadastros/categorias-materiais`
- [ ] `/app/cadastros/materiais`
- [ ] `/app/cadastros/locais-estoque`

---

## 7. Componentes mínimos por módulo

- [ ] tabela/listagem
- [ ] formulário
- [ ] filtros
- [ ] estado vazio
- [ ] feedback de sucesso/erro

---

## 8. Status do documento

Versão: v0.6
Status: pronto para execução técnica controlada
