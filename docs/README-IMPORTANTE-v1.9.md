# Reciclativa Gestão — base de entradas v1.9

Este pacote é o próximo passo correto antes de subir o módulo operacional de Entradas.

## Por que este passo vem agora

Os cadastros-base já estão prontos, mas o banco ainda não possui as tabelas operacionais de entrada.
Antes de criar a página real de Entradas, é preciso criar a base estrutural no banco.

## Arquivos incluídos

```txt
/sql/013_create_receipts.sql
/sql/014_create_receipt_items.sql
/docs/saas/27-entradas-base-v1.9.md
```

## Ordem sugerida

1. salvar os arquivos na pasta `/sql`
2. rodar `013_create_receipts.sql`
3. rodar `014_create_receipt_items.sql`
4. confirmar sucesso no banco
5. depois subir a primeira tela real de Entradas
