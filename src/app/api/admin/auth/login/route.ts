import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { safeAdminNextPath } from "@/lib/admin-master-auth";
import {
  ADMIN_MASTER_MFA_CHALLENGE_COOKIE,
  ADMIN_MASTER_MFA_SETUP_SECRET_COOKIE,
  createAdminMasterChallenge,
  generateTotpSecret,
} from "@/lib/admin-master-mfa";

export const runtime = "nodejs";

function buildRedirectResponse(req: Request, path: string) {
  const res = NextResponse.redirect(new URL(path, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

type AdminMasterUserRow = {
  id: string;
  is_active: boolean;
  mfa_enabled: boolean;
};

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const next = safeAdminNextPath((form?.get("next") || "/admin").toString());
  const email = (form?.get("email") || "").toString().trim().toLowerCase();
  const password = (form?.get("password") || "").toString();

  if (!email || !password) {
    return buildRedirectResponse(
      req,
      `/admin/login?error=badcreds&next=${encodeURIComponent(next)}`
    );
  }

  const result = await sql<AdminMasterUserRow>`
    select
      id::text,
      is_active,
      coalesce(mfa_enabled, false) as mfa_enabled
    from admin_master_users
    where lower(email) = ${email}
      and password_hash = crypt(${password}, password_hash)
      and role = 'admin_master'
    limit 1
  `;

  const user = result.rows[0];
  if (!user) {
    return buildRedirectResponse(
      req,
      `/admin/login?error=badcreds&next=${encodeURIComponent(next)}`
    );
  }

  if (!user.is_active) {
    return buildRedirectResponse(
      req,
      `/admin/login?error=inactive&next=${encodeURIComponent(next)}`
    );
  }

  const challengeToken = await createAdminMasterChallenge({
    userId: user.id,
    req,
  });

  if (!user.mfa_enabled) {
    const secret = generateTotpSecret();
    const res = buildRedirectResponse(
      req,
      `/admin/mfa/setup?next=${encodeURIComponent(next)}`
    );

    res.cookies.set(ADMIN_MASTER_MFA_CHALLENGE_COOKIE, challengeToken, {
      path: "/",
      maxAge: 60 * 10,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.cookies.set(ADMIN_MASTER_MFA_SETUP_SECRET_COOKIE, secret, {
      path: "/",
      maxAge: 60 * 10,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res;
  }

  const res = buildRedirectResponse(
    req,
    `/admin/mfa?next=${encodeURIComponent(next)}`
  );

  res.cookies.set(ADMIN_MASTER_MFA_CHALLENGE_COOKIE, challengeToken, {
    path: "/",
    maxAge: 60 * 10,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res;
}
