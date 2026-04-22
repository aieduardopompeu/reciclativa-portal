# Reciclativa Gestão — Convenções Iniciais

## 1. Objetivo

Estabelecer padrões mínimos para reduzir retrabalho durante a evolução do SaaS.

---

## 2. Convenções de nomenclatura

### Tabelas
- plural
- snake_case
- exemplo: `organization_units`, `accounts_payable`

### Colunas
- snake_case
- ids com sufixo `_id`
- timestamps com `created_at` e `updated_at`

### Componentes
- kebab-case em arquivos
- PascalCase no componente exportado

### Rotas
- kebab-case
- nomes orientados ao domínio
- exemplo: `categorias-materiais`, `contas-a-pagar`

---

## 3. Convenções de modelagem

- quase tudo com `organization_id`
- usar `unit_id` quando houver contexto local
- preferir `is_active` ou `archived_at` para exclusão lógica
- guardar referência de criação por `created_by` em registros críticos

---

## 4. Convenções de UI

- listagem + filtro + ação principal por módulo
- botão principal consistente
- estados vazios claros
- feedback de sucesso/erro padronizado
- evitar telas excessivamente carregadas no MVP

---

## 5. Convenções de autorização

- nunca confiar apenas no front
- checar role no servidor
- isolar por organização sempre
- ações críticas devem verificar permissão específica

---

## 6. Convenções de auditoria

Para toda ação crítica registrar:
- organization_id
- user_id
- module
- action
- entity_type
- entity_id
- previous_data quando houver
- new_data quando houver
- created_at

---

## 7. Convenções de evolução documental

### Arquivos de produto
Ficam em:
- `/docs/reciclativa-saas-estrutura.md`
- `/docs/saas/*.md`

### Evolução
- cada ajuste relevante entra no changelog
- versões documentais podem seguir `v0.x`
- mudanças grandes devem atualizar o roadmap

---

## 8. Status do documento

Versão: v0.4
Status: base de padrão inicial
