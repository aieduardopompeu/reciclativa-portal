# Reciclativa Gestão — Backlog Técnico da Fase 1

## 1. Objetivo

Quebrar a Fase 1 em blocos técnicos executáveis.

---

## 2. Backlog por sprint

## Sprint 1 — Base multiempresa

### Objetivo
Preparar o núcleo estrutural do SaaS.

### Itens
- criar tabela `organizations`
- criar tabela `organization_units`
- adaptar `users` para `organization_id`
- definir role inicial do usuário
- garantir contexto de organização na sessão
- proteger leitura por tenant

### Entrega esperada
O usuário autenticado passa a operar dentro de uma organização.

---

## Sprint 2 — Autorização e estrutura do app

### Objetivo
Preparar navegação e controle de acesso.

### Itens
- criar helpers de permissão
- implementar guardas de rota
- definir menu lateral do SaaS
- criar `/app/dashboard`
- criar placeholders das áreas principais
- organizar estrutura `/(app)/app/...`

### Entrega esperada
O app passa a ter área SaaS organizada, com acesso por perfil.

---

## Sprint 3 — Cadastros mestres I

### Objetivo
Subir os principais cadastros-base.

### Itens
- CRUD de clientes
- CRUD de fornecedores
- filtros e busca
- ativar/inativar registros
- auditoria de criação e edição

### Entrega esperada
Clientes e fornecedores prontos para uso no MVP.

---

## Sprint 4 — Cadastros mestres II

### Objetivo
Completar os cadastros-base operacionais.

### Itens
- CRUD de materiais
- CRUD de categorias de materiais
- CRUD de locais de estoque
- revisão de UX
- auditoria

### Entrega esperada
Base pronta para entradas, saídas e estoque.

---

## Sprint 5 — Cadastros estruturais internos

### Objetivo
Fechar a base administrativa da empresa cliente.

### Itens
- CRUD de unidades
- CRUD de usuários
- associação de role
- controle de ativação
- revisão de permissões por tela

### Entrega esperada
Empresa cliente passa a administrar sua própria estrutura interna.

---

## Sprint 6 — Auditoria mínima

### Objetivo
Fechar a trilha de rastreabilidade da Fase 1.

### Itens
- criar tabela `audit_logs`
- helper central de log
- log de criação
- log de edição
- log de inativação
- log de mudança de permissão

### Entrega esperada
Base com rastreabilidade mínima ativa.

---

## 3. Dependências

### Dependências críticas
- tenancy antes de CRUD real
- permissão antes de telas sensíveis
- auditoria pode começar após primeiros CRUDs, mas deve entrar ainda na Fase 1

---

## 4. Definição de pronto da Fase 1

A Fase 1 estará pronta quando houver:
- contexto multiempresa funcionando
- login e sessão protegidos
- permissões por role
- cadastros mestres operacionais
- unidades e usuários internos
- auditoria mínima

---

## 5. O que não entra na Fase 1

- entrada operacional completa
- saída operacional completa
- estoque consolidado
- contas a pagar/receber completas
- importação de XML
- relatórios finais do MVP

Esses pontos entram depois da base estrutural.

---

## 6. Status do documento

Versão: v0.4
Status: pronto para virar plano de implementação
