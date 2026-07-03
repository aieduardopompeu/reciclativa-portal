import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { isUuid } from "@/lib/radar";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const url = new URL(request.url);

  if (!isUuid(token)) {
    return NextResponse.redirect(new URL("/admin/radar?erro=token_invalido", url.origin), 303);
  }

  const found = await sql<{ id: number; status: string }>`
    select id, status
    from radar_noticias
    where token_aprovacao = ${token}
    limit 1
  `;

  const row = found.rows[0];
  if (!row) {
    return NextResponse.redirect(new URL("/admin/radar?erro=token_invalido", url.origin), 303);
  }

  if (row.status !== "pendente") {
    return NextResponse.redirect(
      new URL(`/admin/radar/${row.id}?erro=ja_processado`, url.origin),
      303
    );
  }

  await sql`
    update radar_noticias
    set status = 'rejeitado', atualizado_em = now()
    where id = ${row.id}
  `;

  const redirectUrl = new URL(`/admin/radar/${row.id}`, url.origin);
  redirectUrl.searchParams.set("rejeitado", "1");
  return NextResponse.redirect(redirectUrl, 303);
}
