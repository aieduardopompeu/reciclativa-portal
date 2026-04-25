Fase 2C - Logoff por inatividade

Arquivos incluídos:
- src/components/auth/IdleLogout.tsx
- src/components/saas/saas-shell.tsx
- src/app/admin/layout.tsx
- src/app/(app)/app/logout/route.ts
- src/app/admin/logout/route.ts
- src/app/login/page.tsx

Comportamento:
- 30 minutos de inatividade encerram a sessão.
- 2 minutos antes, aparece aviso com contagem regressiva.
- O botão "Continuar conectado" renova o contador.
- O botão "Sair agora" faz logoff manual.
- Ao expirar por inatividade, a sessão é revogada no servidor e o usuário volta para /login com status=idle_logout.
- O logout por inatividade sincroniza entre abas do mesmo navegador.

Teste local:
1. Substitua os arquivos.
2. Rode: npm run build
3. Rode: npm run dev
4. Entre em /login e acesse /app/dashboard.
5. Para teste rápido, altere temporariamente em IdleLogout.tsx:
   DEFAULT_IDLE_TIMEOUT_MS = 60 * 1000
   DEFAULT_WARNING_MS = 15 * 1000
6. Valide o aviso, o botão "Continuar conectado" e o encerramento automático.
7. Volte os tempos para 30min/2min antes do commit.
