# Reciclativa Gestão — Arquivos SQL Prontos

## 1. Objetivo

Listar os arquivos SQL incluídos no pacote para salvar diretamente no projeto.

---

## 2. Estrutura sugerida

```txt
/sql
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
  /seeds
    seed_001_org_base.sql
    seed_002_users.sql
    seed_003_materials.sql
    seed_004_inventory_locations.sql
```

---

## 3. Observação importante

O arquivo `005_create_or_adapt_users.sql` deve ser tratado com cuidado, porque pode precisar de adaptação ao modelo de autenticação já existente no projeto.

---

## 4. Ordem de aplicação

1. migrations 001 a 012
2. seeds 001 a 004
3. validação local
4. ajuste fino conforme o app atual

---

## 5. Status do documento

Versão: v0.7
Status: pronto para uso como base de implementação
