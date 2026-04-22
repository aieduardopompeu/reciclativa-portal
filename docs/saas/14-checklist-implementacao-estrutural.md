# Reciclativa Gestão — Checklist de Implementação Estrutural

## 1. Objetivo

Registrar a sequência mínima para começar a implementação real da Fase 1.

---

## 2. Checklist

### Banco
- [ ] revisar compatibilidade do schema com o projeto atual
- [ ] confirmar estratégia de autenticação antes de mexer em `users`
- [ ] criar migrations 001 a 012
- [ ] rodar migrations em ambiente local
- [ ] validar seeds básicas
- [ ] testar isolamento por `organization_id`

### App
- [ ] organizar área SaaS em estrutura de rotas consistente
- [ ] criar layout interno do app
- [ ] criar menu lateral do SaaS
- [ ] criar helpers de usuário atual e organização atual
- [ ] criar guardas de autenticação
- [ ] criar guardas de autorização

### Cadastros-base
- [ ] subir tela de empresa
- [ ] subir CRUD de unidades
- [ ] subir CRUD de usuários
- [ ] subir CRUD de clientes
- [ ] subir CRUD de fornecedores
- [ ] subir CRUD de transportadores
- [ ] subir CRUD de categorias de materiais
- [ ] subir CRUD de materiais
- [ ] subir CRUD de locais de estoque

### Auditoria
- [ ] criar helper central de audit log
- [ ] registrar criação
- [ ] registrar edição
- [ ] registrar inativação
- [ ] validar consulta de auditoria

### Validação técnica
- [ ] testar acesso com perfis diferentes
- [ ] testar bloqueio entre empresas
- [ ] testar edição e inativação
- [ ] revisar índices principais
- [ ] revisar nomenclatura e convenções

---

## 3. Critério de conclusão

A base estrutural estará pronta quando:
- tenancy funcionar
- permissões funcionarem
- cadastros-base funcionarem
- auditoria mínima estiver ativa
- organização de teste conseguir operar o núcleo administrativo

---

## 4. Status do documento

Versão: v0.5
Status: pronto para acompanhamento da execução
