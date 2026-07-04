This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Radar Ambiental

Seção editorial de curadoria automatizada: matérias entram via API (geradas por
um pipeline externo Make → Claude), passam por aprovação humana via Telegram e,
uma vez aprovadas, são publicadas manualmente pelo admin. Aparecem na home,
em `/radar` (listagem pública) e em `/radar/:id` (matéria individual).

### Banco de dados

Rode a migration `sql/036_create_radar_noticias.sql` no Neon (não há runner de
migrations no projeto — as migrations em `sql/` são aplicadas manualmente, uma
a uma, direto no console SQL do Neon, na ordem numérica dos arquivos).

### Variáveis de ambiente

Copie os valores de `.env.example` (seção "Radar Ambiental") para `.env.local`:

- `RADAR_API_KEY` — chave exigida no header `X-API-Key` de `POST /api/radar/ingest`.
- `RADAR_TELEGRAM_BOT_TOKEN` — token do bot, gerado com o [@BotFather](https://t.me/BotFather)
  no Telegram (`/newbot`). Enquanto não configurado, a notificação apenas é
  logada no console do servidor (nada quebra).
- `RADAR_TELEGRAM_CHAT_ID` — chat_id de quem recebe os alertas (uma pessoa ou
  um grupo). Para descobrir o seu: inicie uma conversa com o bot, mande
  qualquer mensagem, depois abra `https://api.telegram.org/bot<TOKEN>/getUpdates`
  no navegador — o `chat.id` aparece na resposta JSON.
- `RADAR_CACHE_TTL` — TTL em segundos do cache em memória de `GET /api/radar/home` (padrão: 900).
- `RADAR_AUTO_PUBLISH` — `true` publica direto no ingest, sem aprovação humana (não recomendado).
- `RADAR_MIN_RELEVANCIA` — relevância mínima (1-5) para disparar a notificação de aprovação (padrão: 4).
- `TAVILY_API_KEY` — usada pelo botão "Buscar notícias" em `/admin/radar` para
  pesquisar notícias reais na web ([tavily.com](https://tavily.com), plano
  grátis de 1.000 buscas/mês).
- `OPENAI_API_KEY` / `OPENAI_MODEL` — usadas pelo mesmo botão para redigir o
  rascunho estruturado a partir do resultado da busca (padrão: `gpt-4o-mini`).
  Sem essas duas chaves, o botão de busca retorna um erro amigável, sem afetar
  o resto do fluxo (ingest manual via API continua funcionando normalmente).

### Endpoints

- `POST /api/radar/ingest` — recebe a matéria gerada pela IA (autenticado por `X-API-Key`).
- `GET /api/radar/aprovar/:token` — aprova via link do Telegram (sem login; token é UUID v4).
- `GET /api/radar/rejeitar/:token` — rejeita via link do Telegram.
- `POST /api/radar/publicar/:id` — publica uma matéria aprovada (requer sessão admin).
- `GET /api/radar/home` — dados para a seção da home (cacheado em memória por `RADAR_CACHE_TTL`).
- `POST /api/admin/radar/status` — ações do painel admin (aprovar/rejeitar/publicar/destaque/excluir).
- `POST /api/admin/radar/:id/edit` — edita título/resumo/tag/cidade e opcionalmente publica.
- `POST /api/admin/radar/buscar` — busca notícias reais (Tavily) e redige rascunhos (OpenAI),
  inserindo cada uma como pendente (requer sessão admin).

### Páginas

- `/radar` — listagem pública com filtro por tag e UF, paginada.
- `/radar/:id` — matéria individual, com `NewsArticle` JSON-LD.
- `/admin/radar` e `/admin/radar/:id` — painel de aprovação/publicação (protegido pelo login admin existente).

### Testando o fluxo localmente

```bash
curl -X POST http://localhost:3000/api/radar/ingest \
  -H "Content-Type: application/json" \
  -H "X-API-Key: SEU_RADAR_API_KEY" \
  -d '{
    "titulo": "Prefeitura do Rio lança campanha de coleta de lixo eletrônico",
    "resumo": "A prefeitura anunciou pontos de coleta em 12 bairros da Zona Norte...",
    "conteudo": "<p>Matéria completa em HTML...</p>",
    "fonte_url": "https://exemplo.com/noticia",
    "fonte_nome": "O Globo",
    "tag": "oportunidade",
    "cidade_uf": "Rio de Janeiro · RJ",
    "relevancia": 5,
    "risco": 1
  }'
```

A resposta traz `token_aprovacao`. Se o bot do Telegram ainda não estiver
configurado, a mensagem de aprovação é apenas logada no terminal do `next dev`
— copie o link `APROVAR` de lá (ou monte manualmente
`http://localhost:3000/api/radar/aprovar/<token>`) e abra no navegador. Isso
redireciona para `/admin/radar/:id` (pede login admin), de onde é só clicar em
**Publicar** para a matéria aparecer na home e em `/radar`.

### Decisões técnicas

- Sem Redis no projeto: o cache de `GET /api/radar/home` é em memória do
  processo (module-level), com TTL de `RADAR_CACHE_TTL`. É suficiente para o
  volume esperado; se o app rodar em múltiplas instâncias serverless, cada uma
  mantém seu próprio cache (staleness máxima = TTL, sem inconsistência grave).
- `conteudo` é renderizado como HTML confiável (`dangerouslySetInnerHTML`) em
  `/radar/:id`: só chega ali o que o pipeline autenticado por `RADAR_API_KEY`
  enviar, ou o que o botão "Buscar notícias" gerar via OpenAI (acionado só por
  sessão admin) — nunca input de usuário final. Por isso não há sanitização
  adicional; o checkpoint de segurança real é a aprovação humana antes de
  publicar (por isso `RADAR_AUTO_PUBLISH=true` não é recomendado).
- `POST /api/admin/radar/buscar` evita duplicar notícia já existente checando
  `fonte_url` antes de inserir; resultados sem relação real com o tema (o
  próprio modelo decide) são ignorados, não inseridos.
- Busca (Tavily) e redação (OpenAI) usam `fetch` direto contra a API REST de
  cada serviço, sem adicionar SDK como dependência nova — mesmo padrão já
  usado no envio via Telegram.
- Paginação de `/radar` é por página (`?page=`), não infinite scroll: mais
  simples e alinhado ao resto do site, que é 100% Server Components sem
  client-side state.
- Sem framework de testes configurado no projeto (não havia nenhum antes desta
  feature); os endpoints foram testados manualmente pelo fluxo acima.
