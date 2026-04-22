# Reciclativa Gestão — Matriz de Permissões

## 1. Objetivo

Definir uma matriz inicial de permissões por role para orientar:
- guards
- menu lateral
- ações por tela
- serviços server-side

---

## 2. Roles iniciais

- `super_admin`
- `org_admin`
- `manager_operational`
- `manager_financial`
- `manager_commercial`
- `operator`
- `viewer`

---

## 3. Matriz resumida

```txt
Módulo / Ação                    super_admin  org_admin  operac.  financ.  comerc.  operator  viewer
Dashboard                        SIM          SIM        SIM      SIM      SIM      SIM       SIM
Empresa                          SIM          SIM        NÃO      NÃO      NÃO      NÃO       NÃO
Unidades                         SIM          SIM        NÃO      NÃO      NÃO      NÃO       NÃO
Usuários                         SIM          SIM        NÃO      NÃO      NÃO      NÃO       NÃO
Clientes                         SIM          SIM        SIM      NÃO      SIM      SIM       SIM
Fornecedores                     SIM          SIM        SIM      SIM      SIM      SIM       SIM
Transportadores                  SIM          SIM        SIM      NÃO      NÃO      SIM       SIM
Categorias de materiais          SIM          SIM        SIM      NÃO      NÃO      NÃO       SIM
Materiais                        SIM          SIM        SIM      NÃO      NÃO      SIM       SIM
Locais de estoque                SIM          SIM        SIM      NÃO      NÃO      SIM       SIM
Auditoria                        SIM          SIM        NÃO      NÃO      NÃO      NÃO       SIM*
```

`SIM*` em auditoria para `viewer` apenas se esse perfil for de leitura gerencial/auditoria. Caso contrário, manter `NÃO`.

---

## 4. Ações por tipo

### Criar/editar/inativar
- `super_admin`
- `org_admin`

### Operação de cadastros operacionais
- `manager_operational`
- `operator` com escopo controlado

### Visualização ampla
- `viewer`

### Financeiro
Na Fase 1, o financeiro ainda não entra completo, mas a role já pode existir para a evolução futura.

---

## 5. Helpers sugeridos

- `canAccessModule(role, module)`
- `canPerformAction(role, module, action)`

Exemplo de módulos:
- `dashboard`
- `company`
- `units`
- `users`
- `customers`
- `suppliers`
- `carriers`
- `material_categories`
- `materials`
- `inventory_locations`
- `audit_logs`

Exemplo de ações:
- `view`
- `create`
- `update`
- `archive`

---

## 6. Regra central

A role nunca substitui o filtro de `organization_id`.
Permissão e segregação de tenant precisam andar juntas.

---

## 7. Status do documento

Versão: v0.7
Status: base inicial para implementação de autorização
