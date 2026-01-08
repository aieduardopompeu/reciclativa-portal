import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

function isAuthorized(token: string | null) {
  const expected = process.env.ADMIN_TOKEN;
  return Boolean(expected && token && token === expected);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!isAuthorized(token)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 404 });
  }

  const profId = Number(id);
  if (!Number.isFinite(profId)) {
    return NextResponse.json({ ok: false, error: "invalid id" }, { status: 400 });
  }

  await sql`
    update profissionais
    set status = 'rejected'
    where id = ${profId}
  `;

  const redirectUrl = new URL(`/admin/profissionais`, url.origin);
  redirectUrl.searchParams.set("token", token!);
  redirectUrl.searchParams.set("status", "pending");
  return NextResponse.redirect(redirectUrl, 303);
}
