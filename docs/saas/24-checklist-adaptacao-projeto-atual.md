# Reciclativa Gestão — Checklist de Adaptação ao Projeto Atual

## 1. Objetivo

Evitar retrabalho ao encaixar a estrutura SaaS no `app.reciclativa.com` já existente.

---

## 2. Checklist

### Autenticação
- [ ] identificar onde a autenticação atual vive
- [ ] validar se existe tabela própria de usuários
- [ ] decidir se `users` será adaptada ou mantida separada
- [ ] mapear sessão atual e contexto do usuário

### Rotas
- [ ] revisar a estrutura atual de `/src/app`
- [ ] decidir se a área SaaS ficará em `/(app)/app`
- [ ] separar claramente área pública, app SaaS e admin interno

### Banco
- [ ] revisar tabelas já existentes
- [ ] evitar criar entidades duplicadas
- [ ] validar compatibilidade com Neon/Postgres atual
- [ ] revisar nomenclatura

### UI
- [ ] reaproveitar layout, tabela, modal e formulário já existentes
- [ ] definir padrão único de cabeçalho de módulo
- [ ] revisar padrão de feedback visual

### Permissões
- [ ] validar quais roles fazem sentido já na Fase 1
- [ ] mapear guardas atuais
- [ ] decidir onde a checagem server-side será centralizada

### Auditoria
- [ ] revisar se já existe algo parecido no projeto
- [ ] centralizar helper antes de espalhar logs

---

## 3. Ponto de atenção principal

O maior cuidado aqui é adaptar sem quebrar o que já existe no app.

A regra deve ser:
- reaproveitar o que já é sólido
- criar do zero apenas o que realmente precisa
- evitar refatoração estrutural grande sem necessidade

---

## 4. Status do documento

Versão: v0.7
Status: pronto para uso antes da implementação real
