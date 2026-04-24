import { cookies, headers } from "next/headers";
import { sql } from "@vercel/postgres";
import { createHash, randomBytes } from "crypto";
import { redirect } from "next/navigation";
import type { SaaSRole, SaaSSessionUser } from "@/types/saas";

export const SAAS_SESSION_COOKIE = "saas-session";
export const SAAS_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

type SaaSUserRow = {
  session_id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  user_role: SaaSRole;
  must_change_password: boolean;
  password_changed_at: Date | null;
  mfa_enabled: boolean;
  organization_id: string;
  organization_legal_name: string;
  organization_trade_name: string | null;
  unit_id: string | null;
  unit_name: string | null;
};

const allowedRoles: SaaSRole[] = [
  "super_admin",
  "org_admin",
  "org_admin_full",
  "manager_operational",
  "manager_financial",
  "manager_commercial",
  "operator",
  "viewer",
];

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeRole(value: unknown): SaaSRole {
  return allowedRoles.includes(value as SaaSRole)
    ? (value as SaaSRole)
    : "org_admin";
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

function mapRow(row: SaaSUserRow): SaaSSessionUser {
  return {
    id: row.user_id,
    name: row.user_name,
    email: row.user_email,
    role: normalizeRole(row.user_role),
    mustChangePassword: Boolean(row.must_change_password),
    passwordChangedAt: row.password_changed_at,
    mfaEnabled: Boolean(row.mfa_enabled),
    organization: {
      id: row.organization_id,
      legalName: row.organization_legal_name,
      tradeName: row.organization_trade_name,
    },
    unit: row.unit_id
      ? {
          id: row.unit_id,
          name: row.unit_name || "Unidade",
        }
      : null,
  };
}

async function findUserBySessionToken(token: string): Promise<SaaSSessionUser | null> {
  const tokenHash = sha256(token);

  const { rows } = await sql<SaaSUserRow>`
    select
      sus.id::text as session_id,
      su.id::text as user_id,
      su.name as user_name,
      su.email as user_email,
      su.role as user_role,
      coalesce(su.must_change_password, false) as must_change_password,
      su.password_changed_at,
      coalesce(su.mfa_enabled, false) as mfa_enabled,
      o.id::text as organization_id,
      o.legal_name as organization_legal_name,
      o.trade_name as organization_trade_name,
      ou.id::text as unit_id,
      ou.name as unit_name
    from saas_user_sessions sus
    inner join saas_users su
      on su.id = sus.user_id
    inner join organizations o
      on o.id = su.organization_id
    left join organization_units ou
      on ou.id = su.unit_id
    where sus.session_token_hash = ${tokenHash}
      and sus.revoked_at is null
      and sus.expires_at > now()
      and su.is_active = true
    limit 1
  `;

  return rows[0] ? mapRow(rows[0]) : null;
}

export async function createSaaSSession(params: {
  userId: string;
  req?: Request;
}) {
  const token = randomBytes(32).toString("hex");
  const tokenHash = sha256(token);
  const meta = await resolveRequestMeta(params.req);

  await sql`
    insert into saas_user_sessions (
      user_id,
      session_token_hash,
      expires_at,
      ip_address,
      user_agent
    )
    values (
      ${params.userId},
      ${tokenHash},
      now() + interval '7 days',
      ${meta.ip || null},
      ${meta.userAgent || null}
    )
  `;

  return token;
}

export async function setSaaSSessionCookie(token: string) {
  const store = await cookies();
  store.set(SAAS_SESSION_COOKIE, token, {
    path: "/",
    maxAge: SAAS_SESSION_MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export async function clearSaaSSessionCookie() {
  const store = await cookies();
  store.set(SAAS_SESSION_COOKIE, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export async function getCurrentSaaSApiUser(): Promise<SaaSSessionUser | null> {
  const store = await cookies();
  const token = store.get(SAAS_SESSION_COOKIE)?.value || "";
  if (!token) return null;

  return findUserBySessionToken(token);
}

export async function getCurrentSaaSUser(): Promise<SaaSSessionUser> {
  const user = await getCurrentSaaSApiUser();

  if (!user) {
    redirect("/app/login");
  }

  if (user.mustChangePassword) {
    redirect("/app/primeiro-acesso");
  }

  if (!user.mfaEnabled) {
    redirect("/app/mfa/setup");
  }

  return user;
}

export async function requireSaaSAppReady() {
  return getCurrentSaaSUser();
}

export async function revokeCurrentSaaSSession() {
  const store = await cookies();
  const token = store.get(SAAS_SESSION_COOKIE)?.value || "";
  if (!token) return;

  const tokenHash = sha256(token);
  await sql`
    update saas_user_sessions
    set revoked_at = now()
    where session_token_hash = ${tokenHash}
      and revoked_at is null
  `;
}
