# Reciclativa Gestão — Roadmap da Fase 1

## 1. Objetivo da fase

Construir a base estrutural do SaaS para permitir evolução segura.

---

## 2. Escopo da Fase 1

### Bloco A — Fundação do app
- autenticação
- sessão
- layout base
- proteção de rotas
- contexto de organização

### Bloco B — Multiempresa
- tabela de organizações
- tabela de unidades
- vínculo de usuários com organização
- isolamento de dados por tenant

### Bloco C — Permissões
- definição de roles
- middleware/guards
- controle de acesso por módulo

### Bloco D — Cadastros mestres
- clientes
- fornecedores
- materiais
- categorias de materiais
- locais de estoque

### Bloco E — Auditoria mínima
- log de criação
- log de edição
- log de cancelamento
- log de baixa financeira

---

## 3. Entregáveis técnicos da Fase 1

### Backend / banco
- schema inicial
- migrations iniciais
- seeds mínimas de apoio
- políticas de acesso por organização

### Frontend
- menu lateral base
- dashboard placeholder inicial
- telas de listagem
- telas de cadastro
- formulários com validação

### Segurança
- autenticação
- autorização
- segregação por organização

---

## 4. Sugestão de backlog técnico

## Sprint 1
- estruturar tenancy
- criar tabela organizations
- criar tabela organization_units
- adaptar users para organization_id
- criar controle de sessão

## Sprint 2
- criar tabela roles ou enum de roles
- proteger rotas
- desenhar menu do app
- criar dashboard inicial simples

## Sprint 3
- CRUD de clientes
- CRUD de fornecedores
- CRUD de materiais
- CRUD de categorias
- CRUD de locais de estoque

## Sprint 4
- criar audit_logs
- integrar logs nos módulos já prontos
- revisar UX base
- validar fluxo com dados reais

---

## 5. Critério de conclusão da Fase 1

A Fase 1 estará concluída quando:
- o app estiver operando com contexto de organização
- os usuários acessarem apenas seus dados
- os perfis principais estiverem definidos
- os cadastros mestres estiverem prontos
- a auditoria mínima estiver ativa

---

## 6. Risco principal da fase

Começar operação e financeiro sem fechar bem:
- tenancy
- permissões
- entidades mestre

Isso gera retrabalho estrutural.

---

## 7. Próxima fase após conclusão

Fase 2:
- entradas
- saídas
- movimentações
- saldo de estoque

---

## 8. Status do documento

Versão: v0.2
Status: pronto para quebrar em tarefas de implementação
