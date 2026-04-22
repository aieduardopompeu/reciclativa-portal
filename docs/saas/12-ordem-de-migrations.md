# Reciclativa Gestão — Ordem de Migrations

## 1. Objetivo

Definir a sequência segura de migrations da Fase 1, para evitar quebra de dependências.

---

## 2. Ordem sugerida

## Migration 001 — extensões e utilitários
Criar:
- extensão necessária para UUID, se ainda não existir
- função `set_updated_at()`

## Migration 002 — enum e estruturas de apoio
Criar:
- enum `app_role`

## Migration 003 — organizations
Criar:
- tabela `organizations`
- índices principais

## Migration 004 — organization_units
Criar:
- tabela `organization_units`
- foreign key para `organizations`
- índices
- trigger `updated_at`

## Migration 005 — users
Criar ou adaptar:
- tabela `users`
- vínculo com `organizations`
- vínculo opcional com `organization_units`
- campo `role`
- índices
- trigger `updated_at`

## Migration 006 — customers
Criar:
- tabela `customers`
- índices
- trigger `updated_at`

## Migration 007 — suppliers
Criar:
- tabela `suppliers`
- índices
- trigger `updated_at`

## Migration 008 — carriers
Criar:
- tabela `carriers`
- índices
- trigger `updated_at`

## Migration 009 — material_categories
Criar:
- tabela `material_categories`
- índices
- trigger `updated_at`

## Migration 010 — materials
Criar:
- tabela `materials`
- foreign key para `material_categories`
- índices
- trigger `updated_at`

## Migration 011 — inventory_locations
Criar:
- tabela `inventory_locations`
- foreign keys para `organizations` e `organization_units`
- índices
- trigger `updated_at`

## Migration 012 — audit_logs
Criar:
- tabela `audit_logs`
- índices principais

---

## 3. Ordem sugerida de seeds

### Seed 001
- organização de teste
- unidade matriz de teste

### Seed 002
- usuário admin de organização
- usuário operador de organização

### Seed 003
- categorias de materiais básicas
- materiais iniciais de teste

### Seed 004
- locais de estoque iniciais

---

## 4. Cuidados na execução

- revisar se `users` já existe no projeto antes de criar migration nova
- revisar conflitos com autenticação atual
- não implementar dados operacionais antes de validar tenancy
- testar cada migration em banco limpo
- testar rollback quando possível

---

## 5. Estrutura sugerida de nomes de arquivos

```txt
001_init_extensions.sql
002_init_roles.sql
003_create_organizations.sql
004_create_organization_units.sql
005_create_or_adapt_users.sql
006_create_customers.sql
007_create_suppliers.sql
008_create_carriers.sql
009_create_material_categories.sql
010_create_materials.sql
011_create_inventory_locations.sql
012_create_audit_logs.sql
```

---

## 6. Status do documento

Versão: v0.5
Status: pronto para virar plano de migrations
