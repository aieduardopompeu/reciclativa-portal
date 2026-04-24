import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { createSaaSSession, setSaaSSessionCookie } from "@/lib/saas/session";
import { createSaaSMfaChallenge, setSaaSMfaChallengeCookie } from "@/lib/saas/mfa";

export const runtime = "nodejs";

function buildRedirect(req: Request, path: string) {
  const res = NextResponse.redirect(new URL(path, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

type UserRow = {
  id: string;
  must_change_password: boolean;
  mfa_enabled: boolean;
};

export async function GET(req: Request) {
  return buildRedirect(req, "/app/login");
}

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
      coalesce(must_change_password, false) as must_change_password,
      coalesce(mfa_enabled, false) as mfa_enabled
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

  if (user.must_change_password || !user.mfa_enabled) {
    const token = await createSaaSSession({
      userId: user.id,
      req,
    });
    await setSaaSSessionCookie(token);

    return buildRedirect(
      req,
      user.must_change_password ? "/app/primeiro-acesso" : "/app/mfa/setup"
    );
  }

  const challengeToken = await createSaaSMfaChallenge({
    userId: user.id,
    req,
  });
  await setSaaSMfaChallengeCookie(challengeToken);

  return buildRedirect(req, "/app/mfa");
}
