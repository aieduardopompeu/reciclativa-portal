Fase 3C.3 — Proteção de server actions

Este patch adiciona validações de permissão no lado servidor.
Mesmo que alguém tente enviar formulários manualmente, as actions agora validam a sessão e a permissão do módulo antes de alterar dados.

Cobertura inicial:
- Financeiro: contas a pagar e contas a receber
- Operação: entradas e saídas
- Cadastros: clientes, fornecedores, transportadores, categorias, materiais e locais de estoque
- Usuários: criação, alteração de perfil, reset de senha, ativação/desativação e permissões customizadas

Regras aplicadas:
- create exige write ou admin
- update exige write ou admin
- archive exige admin, reservado para fases futuras

Depois de aplicar:
npm run build

Teste sugerido:
1. Usuário custom com Financeiro = Visualizar.
2. Tentar criar conta a pagar/receber por interface deve estar oculto.
3. Se forçar POST/server action, deve receber erro de permissão.
4. Mudar Financeiro para Criar/editar e testar criação normal.
