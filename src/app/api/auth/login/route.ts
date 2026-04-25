import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { safeAdminNextPath } from "@/lib/admin-master-auth";
import {
  ADMIN_MASTER_MFA_CHALLENGE_COOKIE,
  ADMIN_MASTER_MFA_SETUP_SECRET_COOKIE,
  createAdminMasterChallenge,
  generateTotpSecret,
} from "@/lib/admin-master-mfa";
import { createSaaSSession, setSaaSSessionCookie } from "@/lib/saas/session";
import { createSaaSMfaChallenge, setSaaSMfaChallengeCookie } from "@/lib/saas/mfa";

export const runtime = "nodejs";

type AuthKind = "admin" | "saas";

type AdminUserRow = {
  id: string;
  is_active: boolean;
  must_change_password: boolean;
  mfa_enabled: boolean;
};

type SaaSUserRow = {
  id: string;
  is_active: boolean;
  must_change_password: boolean;
  mfa_enabled: boolean;
};

function buildRedirect(req: Request, path: string) {
  const res = NextResponse.redirect(new URL(path, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

function safeUnifiedNextPath(nextRaw: string | null | undefined) {
  const next = (nextRaw || "").trim();

  if (next.startsWith("/admin")) {
    return safeAdminNextPath(next);
  }

  if (next.startsWith("/app")) {
    return next;
  }

  return "/app/dashboard";
}

function loginErrorPath(error: string, email: string, next: string) {
  const params = new URLSearchParams({ error, next });

  if (email) {
    params.set("email", email);
  }

  return `/login?${params.toString()}`;
}

async function findAdminUser(email: string, password: string) {
  const result = await sql<AdminUserRow>`
    select
      id::text,
      is_active,
      coalesce(must_change_password, false) as must_change_password,
      coalesce(mfa_enabled, false) as mfa_enabled
    from admin_master_users
    where lower(email) = ${email}
      and password_hash = crypt(${password}, password_hash)
      and role = 'admin_master'
    limit 1
  `;

  return result.rows[0] || null;
}

async function findSaaSUser(email: string, password: string) {
  const result = await sql<SaaSUserRow>`
    select
      id::text,
      is_active,
      coalesce(must_change_password, false) as must_change_password,
      coalesce(mfa_enabled, false) as mfa_enabled
    from saas_users
    where lower(email) = ${email}
      and password_hash = crypt(${password}, password_hash)
    limit 1
  `;

  return result.rows[0] || null;
}

async function resolveUser(params: {
  email: string;
  password: string;
  next: string;
}): Promise<
  | { kind: "admin"; user: AdminUserRow }
  | { kind: "saas"; user: SaaSUserRow }
  | null
> {
  const preferredOrder: AuthKind[] = params.next.startsWith("/admin")
    ? ["admin", "saas"]
    : ["saas", "admin"];

  for (const kind of preferredOrder) {
    const user =
      kind === "admin"
        ? await findAdminUser(params.email, params.password)
        : await findSaaSUser(params.email, params.password);

    if (user) {
      return { kind, user } as const;
    }
  }

  return null;
}

async function continueAsAdmin(req: Request, user: AdminUserRow, next: string) {
  if (!user.is_active) {
    return null;
  }

  const challengeToken = await createAdminMasterChallenge({
    userId: user.id,
    req,
  });

  if (!user.mfa_enabled) {
    const secret = generateTotpSecret();
    const res = buildRedirect(
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

  const res = buildRedirect(req, `/admin/mfa?next=${encodeURIComponent(next)}`);

  res.cookies.set(ADMIN_MASTER_MFA_CHALLENGE_COOKIE, challengeToken, {
    path: "/",
    maxAge: 60 * 10,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res;
}

async function continueAsSaaS(req: Request, user: SaaSUserRow) {
  if (!user.is_active) {
    return null;
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

export async function GET(req: Request) {
  return buildRedirect(req, "/login");
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);

  const next = safeUnifiedNextPath(
    (form?.get("next") || "/app/dashboard").toString()
  );

  const email = (form?.get("email") || "").toString().trim().toLowerCase();
  const password = (form?.get("password") || "").toString();

  if (!email || !password) {
    return buildRedirect(req, loginErrorPath("invalid_credentials", email, next));
  }

  const resolved = await resolveUser({ email, password, next });

  if (!resolved) {
    return buildRedirect(req, loginErrorPath("invalid_credentials", email, next));
  }

  const response =
    resolved.kind === "admin"
      ? await continueAsAdmin(
          req,
          resolved.user,
          next.startsWith("/admin") ? next : "/admin"
        )
      : await continueAsSaaS(req, resolved.user);

  if (!response) {
    return buildRedirect(req, loginErrorPath("inactive", email, next));
  }

  return response;
}