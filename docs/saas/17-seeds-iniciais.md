# Reciclativa Gestão — Seeds Iniciais

## 1. Objetivo

Definir seeds mínimas para validar a estrutura da Fase 1 em ambiente local.

---

## 2. Seed 001 — organização e unidade

**Arquivo sugerido:** `seed_001_org_base.sql`

```sql
insert into organizations (
  id, legal_name, trade_name, cnpj, email, phone, whatsapp, plan_code, status
) values (
  '11111111-1111-1111-1111-111111111111',
  'Reciclativa Gestão Ambiente de Testes Ltda',
  'Reciclativa Teste',
  '12.345.678/0001-90',
  'contato@reciclativa-teste.local',
  '(21) 3000-0000',
  '(21) 99999-0000',
  'starter',
  'active'
)
on conflict do nothing;

insert into organization_units (
  id, organization_id, name, code, phone, whatsapp, email, city, state, is_headquarters, is_active
) values (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'Matriz',
  'MATRIZ',
  '(21) 3000-0001',
  '(21) 99999-0001',
  'matriz@reciclativa-teste.local',
  'Itaboraí',
  'RJ',
  true,
  true
)
on conflict do nothing;
```

---

## 3. Seed 002 — usuários iniciais

**Arquivo sugerido:** `seed_002_users.sql`

> Ajustar se o projeto usar autenticação externa.

```sql
insert into users (
  id, organization_id, unit_id, name, email, role, is_active
) values
(
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'Admin Organização',
  'admin@reciclativa-teste.local',
  'org_admin',
  true
),
(
  '44444444-4444-4444-4444-444444444444',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'Operador Teste',
  'operador@reciclativa-teste.local',
  'operator',
  true
)
on conflict do nothing;
```

---

## 4. Seed 003 — categorias e materiais

**Arquivo sugerido:** `seed_003_materials.sql`

```sql
insert into material_categories (
  id, organization_id, name, code, is_active
) values
(
  '55555555-5555-5555-5555-555555555555',
  '11111111-1111-1111-1111-111111111111',
  'Plásticos',
  'PLAST',
  true
),
(
  '66666666-6666-6666-6666-666666666666',
  '11111111-1111-1111-1111-111111111111',
  'Metais',
  'METAIS',
  true
)
on conflict do nothing;

insert into materials (
  id, organization_id, category_id, code, name, unit_of_measure, is_active
) values
(
  '77777777-7777-7777-7777-777777777777',
  '11111111-1111-1111-1111-111111111111',
  '55555555-5555-5555-5555-555555555555',
  'PET-PRENSADO',
  'PET Prensado',
  'kg',
  true
),
(
  '88888888-8888-8888-8888-888888888888',
  '11111111-1111-1111-1111-111111111111',
  '66666666-6666-6666-6666-666666666666',
  'ALUMINIO',
  'Alumínio',
  'kg',
  true
)
on conflict do nothing;
```

---

## 5. Seed 004 — local de estoque

**Arquivo sugerido:** `seed_004_inventory_locations.sql`

```sql
insert into inventory_locations (
  id, organization_id, unit_id, name, code, is_active
) values
(
  '99999999-9999-9999-9999-999999999999',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'Pátio Principal',
  'PATIO-01',
  true
)
on conflict do nothing;
```

---

## 6. Ordem sugerida de execução

1. seed_001_org_base.sql
2. seed_002_users.sql
3. seed_003_materials.sql
4. seed_004_inventory_locations.sql

---

## 7. Validações após seed

- organização criada
- unidade matriz criada
- usuário admin disponível
- categorias disponíveis
- materiais disponíveis
- local de estoque disponível

---

## 8. Status do documento

Versão: v0.6
Status: pronto para ambiente local de testes
