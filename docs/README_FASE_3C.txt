Fase 3C.1 — aplicação inicial de permissões

Objetivo:
- Carregar permissões personalizadas na sessão SaaS quando o usuário tem role = custom.
- Filtrar o menu lateral usando a matriz personalizada do usuário.
- Bloquear acesso direto a páginas/módulos quando o nível do módulo for "none".
- Mostrar tela amigável de "Acesso restrito" em vez de deixar a página abrir.

Nesta fase ainda não foi aplicada a regra fina de ações internas por nível:
- read: visualizar sem criar/editar
- write: criar/editar
- admin: gerenciar/excluir/configurar

Essa camada fica para a Fase 3C.2/3C.3, para reduzir risco.

Teste recomendado:
1. Criar ou alterar um usuário para perfil Personalizado.
2. Definir alguns módulos como "Sem acesso".
3. Fazer login com esse usuário.
4. Confirmar que módulos sem acesso não aparecem no menu.
5. Acessar uma URL direta de módulo sem acesso e confirmar tela "Acesso restrito".
6. Confirmar que org_admin continua vendo todos os módulos.
