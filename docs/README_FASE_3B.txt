Fase 3B — Editor de permissões personalizadas

Arquivos alterados:
- src/app/(app)/app/cadastros/usuarios/page.tsx
- src/app/(app)/app/cadastros/usuarios/actions.ts

O que esta fase adiciona:
1. Seção "Permissões personalizadas" na tela /app/cadastros/usuarios.
2. Editor por usuário com perfil Personalizado.
3. Níveis por módulo: Sem acesso, Visualizar, Criar/editar, Gerenciar.
4. Ação server-side para salvar permissões em saas_user_permissions.
5. Ao criar usuário com perfil custom, permissões padrão são inicializadas.
6. Ao alterar perfil para custom, permissões padrão são inicializadas.
7. Ao alterar de custom para perfil padrão, permissões customizadas são removidas.

Pré-requisito:
- Executar o SQL da Fase 3A: _patch_sql/022_create_saas_user_permissions.sql

Observação importante:
- Esta fase cria e edita a matriz personalizada.
- A aplicação dessas permissões em cada página/rota será feita na próxima fase, para reduzir risco.
