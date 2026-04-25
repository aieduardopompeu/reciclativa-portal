import { sql } from "@vercel/postgres";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_MASTER_SESSION_COOKIE = "admin-master-session";
export const ADMIN_MASTER_SESSION_MAX_AGE = 60 * 60 * 8;

export type AdminMasterSession = {
  sessionId: string;
  userId: string;
  email: string;
  role: "admin_master";
  mfaEnabled: boolean;
  mfaVerifiedAt: Date | null;
  expiresAt: Date;
  mustChangePassword: boolean;
  passwordChangedAt: Date | null;
};

type SessionRow = {
  session_id: string;
  user_id: string;
  email: string;
  role: "admin_master";
  mfa_enabled: boolean;
  mfa_verified_at: Date | null;
  expires_at: Date;
  must_change_password: boolean;
  password_changed_at: Date | null;
};

export function safeAdminNextPath(nextRaw: string | null | undefined) {
  const next = (nextRaw || "").trim();
  if (!next.startsWith("/admin")) return "/admin";
  if (next === "/admin/login" || next === "/admin-login") return "/admin";
  if (next.startsWith("/admin/mfa")) return "/admin";
  return next;
}

async function resolveRequestMeta(req?: Request) {
  if (req) {
    return {
      ip:
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        "",
      userAgent: req.headers.get("user-agent") || "",
    };
  }

  const hdrs = await headers();
  return {
    ip:
      hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      hdrs.get("x-real-ip") ||
      "",
    userAgent: hdrs.get("user-agent") || "",
  };
}

export async function createAdminMasterSession(params: {
  userId: string;
  mfaVerified: boolean;
  req?: Request;
}) {
  const meta = await resolveRequestMeta(params.req);
  const mfaVerifiedAtIso = params.mfaVerified ? new Date().toISOString() : null;

  const inserted = await sql<{ id: string }>`
    insert into admin_master_sessions (
      user_id,
      session_token_hash,
      ip_address,
      user_agent,
      mfa_verified_at,
      expires_at
    )
    values (
      ${params.userId},
      gen_random_uuid()::text,
      ${meta.ip || null},
      ${meta.userAgent || null},
      ${mfaVerifiedAtIso},
      now() + interval '8 hours'
    )
    returning id::text
  `;

  const sessionId = inserted.rows[0]?.id;
  if (!sessionId) {
    throw new Error("admin_master_session_not_created");
  }

  return sessionId;
}

export async function revokeCurrentAdminMasterSession() {
  const store = await cookies();
  const sessionId = store.get(ADMIN_MASTER_SESSION_COOKIE)?.value;
  if (!sessionId) return;

  await sql`
    update admin_master_sessions
    set revoked_at = now()
    where id::text = ${sessionId}
      and revoked_at is null
  `;
}

export async function getCurrentAdminMasterSession(): Promise<AdminMasterSession | null> {
  const store = await cookies();
  const sessionId = store.get(ADMIN_MASTER_SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const result = await sql<SessionRow>`
    select
      s.id::text as session_id,
      u.id::text as user_id,
      u.email,
      u.role,
      u.mfa_enabled,
      s.mfa_verified_at,
      s.expires_at,
      coalesce(u.must_change_password, false) as must_change_password,
      u.password_changed_at
    from admin_master_sessions s
    inner join admin_master_users u
      on u.id = s.user_id
    where s.id::text = ${sessionId}
      and s.revoked_at is null
      and s.expires_at > now()
      and u.is_active = true
      and u.role = 'admin_master'
    limit 1
  `;

  const row = result.rows[0];
  if (!row) {
    console.warn("[admin/auth] sessão não encontrada para cookie atual", {
      hasCookie: true,
      sessionId,
    });
    return null;
  }

  return {
    sessionId: row.session_id,
    userId: row.user_id,
    email: row.email,
    role: row.role,
    mfaEnabled: Boolean(row.mfa_enabled),
    mfaVerifiedAt: row.mfa_verified_at,
    expiresAt: row.expires_at,
    mustChangePassword: Boolean(row.must_change_password),
    passwordChangedAt: row.password_changed_at,
  };
}

export async function requireAdminMasterReady(nextPath = "/admin") {
  const session = await requireAdminMasterSession(nextPath);

  if (
    session.mustChangePassword &&
    nextPath !== "/admin/change-password"
  ) {
    redirect(`/admin/change-password?next=${encodeURIComponent(nextPath)}`);
  }

  return session;
}

export async function requireAdminMasterSession(nextPath = "/admin") {
  const session = await getCurrentAdminMasterSession();
  if (!session) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  return session;
}

export async function getAdminMasterApiSession() {
  return getCurrentAdminMasterSession();
}
