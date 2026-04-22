# Reciclativa Gestão — Mapa de Rotas do App

## 1. Objetivo

Definir uma estrutura inicial de rotas para o `app.reciclativa.com`, alinhada com:
- multiempresa
- permissões
- módulos do MVP
- crescimento futuro do SaaS

---

## 2. Princípios

1. As rotas devem refletir módulos de negócio.
2. A navegação deve ser simples no MVP.
3. A base deve permitir expansão sem reestruturar tudo depois.
4. Áreas administrativas da plataforma devem ficar separadas da área operacional do cliente SaaS.

---

## 3. Estrutura sugerida

```txt
/src/app
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
      /operacao
        /entradas
        /entradas/importar-xml
        /saidas
        /movimentacoes
      /estoque
      /financeiro
        /contas-a-pagar
        /contas-a-receber
        /caixa
        /bancos
      /documentos
      /relatorios
      /configuracoes
        /empresa
        /permissoes
        /auditoria
```

---

## 4. Rotas prioritárias da Fase 1

## 4.1. Base do app
- `/app/dashboard`
- `/app/configuracoes/empresa`
- `/app/cadastros/unidades`
- `/app/cadastros/usuarios`

## 4.2. Cadastros mestres
- `/app/cadastros/clientes`
- `/app/cadastros/fornecedores`
- `/app/cadastros/materiais`
- `/app/cadastros/categorias-materiais`
- `/app/cadastros/locais-estoque`

## 4.3. Rotas que podem entrar já desenhadas, mas ainda vazias
- `/app/operacao/entradas`
- `/app/operacao/saidas`
- `/app/financeiro/contas-a-pagar`
- `/app/financeiro/contas-a-receber`
- `/app/relatorios`

---

## 5. Estrutura recomendada de cada módulo

Exemplo para `clientes`:

```txt
/app/cadastros/clientes
  page.tsx
  loading.tsx
  actions.ts
  _components/
    clients-table.tsx
    client-form.tsx
    client-filters.tsx
```

Exemplo para `materiais`:

```txt
/app/cadastros/materiais
  page.tsx
  actions.ts
  _components/
    materials-table.tsx
    material-form.tsx
```

---

## 6. Rotas por nível de permissão

### Acesso geral autenticado
- dashboard
- listagens básicas permitidas

### Admin da empresa
- configurações
- usuários
- unidades
- permissões
- auditoria

### Operacional
- entradas
- saídas
- movimentações
- estoque

### Financeiro
- contas a pagar
- contas a receber
- caixa
- bancos

---

## 7. Observação estrutural importante

Se o projeto atual ainda não tiver um agrupamento claro como `/(app)/app/...`, vale adotar uma convenção consistente antes de crescer, para não misturar:
- rotas públicas
- rotas internas do SaaS
- rotas administrativas da plataforma

---

## 8. Status do documento

Versão: v0.4
Status: pronto para orientar a estrutura inicial de páginas
