import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { createSaaSSession, setSaaSSessionCookie } from "@/lib/saas/session";

export const runtime = "nodejs";

function buildRedirect(req: Request, path: string) {
  const res = NextResponse.redirect(new URL(path, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

type UserRow = {
  id: string;
  must_change_password: boolean;
};

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const email = (form?.get("email") || "").toString().trim().toLowerCase();
  const password = (form?.get("password") || "").toString();

  if (!email || !password) {
    return buildRedirect(req, "/app/login?error=invalid_credentials");
  }

  const result = await sql<UserRow>`
    select
      id::text,
      coalesce(must_change_password, false) as must_change_password
    from saas_users
    where lower(email) = ${email}
      and password_hash = crypt(${password}, password_hash)
      and is_active = true
    limit 1
  `;

  const user = result.rows[0];
  if (!user) {
    return buildRedirect(req, "/app/login?error=invalid_credentials");
  }

  const token = await createSaaSSession({
    userId: user.id,
    req,
  });
  await setSaaSSessionCookie(token);

  return buildRedirect(req, user.must_change_password ? "/app/primeiro-acesso" : "/app/dashboard");
}
