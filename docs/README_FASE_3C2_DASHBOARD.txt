Fase 3C.2 - ajuste de acabamento do dashboard

Arquivo alterado:
- src/app/(app)/app/dashboard/page.tsx

Objetivo:
- Quando o usuário não tiver acesso ao módulo Financeiro, o dashboard não mostra atalhos, cards ou relatórios financeiros.
- Evita que a tela exiba botões como "Ir para pagar" e "Ir para receber" para perfis sem permissão financeira.
- Evita consulta/visualização de indicadores financeiros quando financeiro = none.

Teste recomendado:
1. Usuário custom com Financeiro = Sem acesso
   - Dashboard deve mostrar uma visão geral simples e aviso de acesso limitado.
   - Não deve mostrar "Ir para pagar", "Ir para receber", ações rápidas ou indicadores financeiros.

2. Usuário custom com Financeiro = Visualizar
   - Dashboard financeiro completo deve aparecer.
   - Páginas financeiras devem abrir em modo leitura, conforme Fase 3C.2.
