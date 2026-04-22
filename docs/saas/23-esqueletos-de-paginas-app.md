# Reciclativa Gestão — Esqueletos de Páginas do App

## 1. Objetivo

Definir esqueletos mínimos das páginas da Fase 1 para acelerar a implementação do app.

---

## 2. Estrutura sugerida por página

Cada página deve começar com:
- título
- descrição curta
- ação principal
- filtros básicos quando fizer sentido
- tabela/listagem
- estado vazio

---

## 3. Exemplo de estrutura para `clientes`

```txt
/app/cadastros/clientes
  page.tsx
  loading.tsx
  actions.ts
  _components/
    customer-form.tsx
    customers-table.tsx
    customers-filters.tsx
    empty-state.tsx
```

### Conteúdo mínimo de `page.tsx`
- cabeçalho da página
- botão “Novo cliente”
- área de filtros
- tabela
- paginação futura

---

## 4. Módulos que já podem nascer com esqueleto

- `/app/dashboard`
- `/app/configuracoes/empresa`
- `/app/configuracoes/auditoria`
- `/app/cadastros/unidades`
- `/app/cadastros/usuarios`
- `/app/cadastros/clientes`
- `/app/cadastros/fornecedores`
- `/app/cadastros/transportadores`
- `/app/cadastros/categorias-materiais`
- `/app/cadastros/materiais`
- `/app/cadastros/locais-estoque`

---

## 5. Padrão visual inicial

### Cabeçalho
- título do módulo
- descrição curta
- botão principal à direita

### Corpo
- filtros
- tabela
- empty state
- feedback de loading/erro

### Modal ou drawer
- formulário principal
- validação
- salvar/cancelar

---

## 6. Estados mínimos

- loading
- erro
- vazio
- sucesso após salvar

---

## 7. Status do documento

Versão: v0.7
Status: pronto para servir de base de UI estrutural
