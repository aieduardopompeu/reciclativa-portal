# Reciclativa Gestão — Estrutura Sugerida de Pastas do App

## 1. Objetivo

Propor uma estrutura inicial para o `app.reciclativa.com` que sustente o SaaS sem misturar:
- área pública
- área SaaS do cliente
- área administrativa interna

---

## 2. Estrutura sugerida

```txt
/src
  /app
    /(public)
      ...
    /(app)
      /app
        /dashboard
        /cadastros
          /clientes
          /fornecedores
          /transportadores
          /materiais
          /categorias-materiais
          /locais-estoque
          /unidades
          /usuarios
        /configuracoes
          /empresa
          /permissoes
          /auditoria
        layout.tsx
    /admin
      ...
  /components
    /ui
    /layout
    /forms
    /tables
  /lib
    /auth
    /permissions
    /db
    /audit
    /validators
    /tenancy
  /server
    /repositories
      /organizations
      /units
      /users
      /customers
      /suppliers
      /carriers
      /material-categories
      /materials
      /inventory-locations
      /audit-logs
    /services
      /organizations
      /units
      /users
      /customers
      /suppliers
      /carriers
      /material-categories
      /materials
      /inventory-locations
      /audit
  /types
  /constants
```

---

## 3. Estrutura sugerida de um módulo

Exemplo: `clientes`

```txt
/app/cadastros/clientes
  page.tsx
  loading.tsx
  actions.ts
  _components/
    customer-form.tsx
    customers-table.tsx
    customers-filters.tsx
```

---

## 4. Responsabilidade por pasta

### `/app`
Rotas e composição de páginas.

### `/components`
Componentes reutilizáveis de UI.

### `/lib/auth`
Sessão, usuário atual, login, logout.

### `/lib/tenancy`
Helpers para `organization_id`, `unit_id`, contexto atual.

### `/lib/permissions`
Regras de autorização por role e módulo.

### `/lib/db`
Conexão, helpers e utilitários de banco.

### `/lib/audit`
Funções para escrita e consulta simplificada de logs.

### `/lib/validators`
Schemas de validação.

### `/server/repositories`
Acesso direto a dados.

### `/server/services`
Regra de negócio e orquestração.

---

## 5. Regra importante

Evitar colocar:
- query de banco espalhada em componente
- lógica de permissão só na interface
- regra de negócio complexa dentro de `page.tsx`

---

## 6. Status do documento

Versão: v0.6
Status: pronto para orientar a organização do projeto
