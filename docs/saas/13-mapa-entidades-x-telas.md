# Reciclativa Gestão — Mapa de Entidades x Telas

## 1. Objetivo

Mapear quais entidades sustentam cada tela principal da Fase 1.

---

## 2. Mapa

## 2.1. /app/dashboard
Entidades:
- organizations
- organization_units
- users

Uso inicial:
- resumo simples da organização
- dados básicos da conta
- atalhos para módulos

## 2.2. /app/configuracoes/empresa
Entidades:
- organizations

Ações:
- editar dados cadastrais da empresa
- visualizar plano e status
- atualizar contatos principais

## 2.3. /app/cadastros/unidades
Entidades:
- organization_units

Ações:
- listar
- criar
- editar
- ativar/inativar

## 2.4. /app/cadastros/usuarios
Entidades:
- users
- organization_units

Ações:
- listar
- criar
- editar
- definir role
- ativar/inativar

## 2.5. /app/cadastros/clientes
Entidades:
- customers

Ações:
- listar
- buscar
- criar
- editar
- ativar/inativar

## 2.6. /app/cadastros/fornecedores
Entidades:
- suppliers

Ações:
- listar
- buscar
- criar
- editar
- ativar/inativar

## 2.7. /app/cadastros/transportadores
Entidades:
- carriers

Ações:
- listar
- criar
- editar
- ativar/inativar

## 2.8. /app/cadastros/categorias-materiais
Entidades:
- material_categories

Ações:
- listar
- criar
- editar
- ativar/inativar

## 2.9. /app/cadastros/materiais
Entidades:
- materials
- material_categories

Ações:
- listar
- buscar
- criar
- editar
- ativar/inativar

## 2.10. /app/cadastros/locais-estoque
Entidades:
- inventory_locations
- organization_units

Ações:
- listar
- criar
- editar
- ativar/inativar

## 2.11. /app/configuracoes/auditoria
Entidades:
- audit_logs
- users

Ações:
- listar logs
- filtrar por módulo
- filtrar por ação
- filtrar por período

---

## 3. Relação resumida

```txt
Tela                                 Entidades principais
/app/dashboard                       organizations, organization_units, users
/app/configuracoes/empresa           organizations
/app/cadastros/unidades              organization_units
/app/cadastros/usuarios              users, organization_units
/app/cadastros/clientes              customers
/app/cadastros/fornecedores          suppliers
/app/cadastros/transportadores       carriers
/app/cadastros/categorias-materiais  material_categories
/app/cadastros/materiais             materials, material_categories
/app/cadastros/locais-estoque        inventory_locations, organization_units
/app/configuracoes/auditoria         audit_logs, users
```

---

## 4. Uso prático deste documento

Este mapa ajuda a:
- priorizar criação de tabelas
- planejar páginas
- definir serviços
- prever dependências de formulário
- reduzir retrabalho entre banco e front

---

## 5. Status do documento

Versão: v0.5
Status: pronto para planejamento de implementação
