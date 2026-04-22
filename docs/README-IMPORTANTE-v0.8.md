# Reciclativa Gestão — starter v0.8

Este pacote entrega a base de código inicial para começar a Sprint 1 do SaaS no app.

## Arquivos incluídos

```txt
/src/types/saas.ts
/src/lib/saas/permissions.ts
/src/lib/saas/session.ts
/src/lib/saas/navigation.ts
/src/components/saas/saas-shell.tsx
/src/app/(app)/app/layout.tsx
/src/app/(app)/app/dashboard/page.tsx
/src/app/(app)/app/cadastros/clientes/page.tsx
/src/app/(app)/app/configuracoes/empresa/page.tsx
/docs/saas/26-starter-codigo-v0.8.md
```

## Observação importante

Esta base está em modo de integração progressiva:
- não substitui a autenticação atual do `/admin`
- não conecta no banco ainda
- cria a estrutura inicial do app SaaS
- já deixa preparado o menu, permissões e sessão SaaS simulada

## Ordem sugerida

1. salvar os arquivos nas pastas correspondentes
2. abrir `/app/dashboard`
3. validar layout e navegação
4. depois substituir a sessão simulada por leitura real do banco
