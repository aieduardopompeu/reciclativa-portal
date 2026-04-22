# Reciclativa Gestão — Arquitetura da Fase 1

## 1. Objetivo

Definir a arquitetura inicial da Fase 1 do SaaS, com foco em:
- tenancy
- autenticação
- autorização
- cadastros mestres
- auditoria mínima

---

## 2. Camadas da solução

## 2.1. Frontend
Responsável por:
- páginas
- formulários
- tabelas
- filtros
- navegação
- feedback visual

## 2.2. Backend / camada de aplicação
Responsável por:
- validação de entrada
- regras de negócio
- autorização
- gravação no banco
- escrita em audit log

## 2.3. Banco
Responsável por:
- persistência
- relacionamentos
- integridade dos dados
- isolamento por `organization_id`

---

## 3. Blocos técnicos da Fase 1

## 3.1. Tenancy
O núcleo da Fase 1 é o contexto de organização.

Toda leitura e escrita deve respeitar:
- `organization_id`
- `unit_id` quando aplicável

### Regras
- usuário autenticado deve carregar contexto da organização
- queries devem sempre filtrar organização
- não pode existir listagem global de dados operacionais entre empresas

## 3.2. Autenticação
Objetivo:
- garantir acesso somente a usuários válidos

Mínimos da fase:
- login
- sessão
- logout
- proteção de rota

## 3.3. Autorização
Objetivo:
- controlar o que cada perfil pode acessar

Mínimos da fase:
- role por usuário
- guardas por módulo
- checagem server-side

## 3.4. Cadastros mestres
Objetivo:
- preparar a base para operação e financeiro

Módulos:
- unidades
- usuários
- clientes
- fornecedores
- materiais
- categorias
- locais de estoque

## 3.5. Auditoria mínima
Objetivo:
- rastrear as ações críticas desde o início

Eventos mínimos:
- criação
- edição
- inativação
- cancelamento
- baixa financeira futura

---

## 4. Fluxo técnico sugerido

### Passo 1
Resolver tenancy.

### Passo 2
Resolver autenticação e contexto do usuário.

### Passo 3
Resolver autorização por role.

### Passo 4
Subir os cadastros mestres.

### Passo 5
Integrar auditoria.

Essa ordem reduz retrabalho.

---

## 5. Estrutura sugerida de aplicação

```txt
/src
  /app
  /components
  /lib
    /auth
    /permissions
    /db
    /audit
    /validators
  /server
    /services
    /repositories
```

### Responsabilidade sugerida

- `lib/auth`: sessão, usuário atual, contexto da organização
- `lib/permissions`: regras por role
- `lib/db`: conexão e helpers
- `lib/audit`: escrita em trilha de auditoria
- `lib/validators`: schemas de formulário e API
- `server/services`: regras de negócio
- `server/repositories`: acesso ao banco

---

## 6. Padrão recomendado para CRUDs

Cada CRUD da Fase 1 deve ter:
- schema de validação
- serviço de criação
- serviço de atualização
- listagem filtrada por organização
- inativação em vez de exclusão dura
- escrita no `audit_logs`

---

## 7. Riscos que precisam ser evitados

- usar filtro por organização só no front
- deixar checagem de permissão apenas na interface
- misturar lógica de negócio diretamente em componentes
- criar tabelas sem pensar no vínculo da organização
- crescer sem convenção de estrutura

---

## 8. Status do documento

Versão: v0.4
Status: base técnica da Fase 1
