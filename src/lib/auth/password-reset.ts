import { createHash, randomBytes } from "crypto";
import { sql } from "@vercel/postgres";

export type ResetUserType = "admin_master" | "saas_user";

export type PasswordResetUser = {
  userType: ResetUserType;
  userId: string;
  email: string;
  name: string | null;
};

type ResetTokenRow = {
  id: string;
  user_type: ResetUserType;
  user_id: string;
  email: string;
  expires_at: Date;
  used_at: Date | null;
};

export function createPasswordResetToken() {
  return randomBytes(32).toString("hex");
}

export function hashPasswordResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function safeAuthNextPath(nextRaw: string | null | undefined) {
  const next = (nextRaw || "").trim();
  if (next.startsWith("/admin")) return next;
  if (next.startsWith("/app")) return next;
  return "/app/dashboard";
}

export function resolveBaseUrl(req: Request) {
  const configured =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    "";

  if (configured) {
    const normalized = configured.replace(/\/$/, "");
    return normalized.startsWith("http") ? normalized : `https://${normalized}`;
  }

  const url = new URL(req.url);

  if (url.hostname === "www.reciclativa.com" || url.hostname === "reciclativa.com") {
    return "https://app.reciclativa.com";
  }

  return url.origin;
}

export async function findPasswordResetUser(params: {
  email: string;
  next: string;
}): Promise<PasswordResetUser | null> {
  const preferredOrder: ResetUserType[] = params.next.startsWith("/admin")
    ? ["admin_master", "saas_user"]
    : ["saas_user", "admin_master"];

  for (const userType of preferredOrder) {
    if (userType === "admin_master") {
      const result = await sql<{ id: string; email: string }>`
        select id::text, email
        from admin_master_users
        where lower(email) = ${params.email}
          and is_active = true
          and role = 'admin_master'
        limit 1
      `;

      const row = result.rows[0];
      if (row) {
        return {
          userType,
          userId: row.id,
          email: row.email,
          name: "Admin master",
        };
      }
    }

    if (userType === "saas_user") {
      const result = await sql<{ id: string; email: string; name: string | null }>`
        select id::text, email, name
        from saas_users
        where lower(email) = ${params.email}
          and is_active = true
        limit 1
      `;

      const row = result.rows[0];
      if (row) {
        return {
          userType,
          userId: row.id,
          email: row.email,
          name: row.name,
        };
      }
    }
  }

  return null;
}

export async function createPasswordResetRequest(params: {
  user: PasswordResetUser;
  req: Request;
}) {
  const token = createPasswordResetToken();
  const tokenHash = hashPasswordResetToken(token);
  const ip =
    params.req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    params.req.headers.get("x-real-ip") ||
    null;
  const userAgent = params.req.headers.get("user-agent") || null;

  await sql`
    update auth_password_reset_tokens
    set used_at = now()
    where user_type = ${params.user.userType}
      and user_id = ${params.user.userId}
      and used_at is null
  `;

  await sql`
    insert into auth_password_reset_tokens (
      user_type,
      user_id,
      email,
      token_hash,
      expires_at,
      requested_ip,
      user_agent
    ) values (
      ${params.user.userType},
      ${params.user.userId},
      ${params.user.email.toLowerCase()},
      ${tokenHash},
      now() + interval '30 minutes',
      ${ip},
      ${userAgent}
    )
  `;

  return token;
}

export async function getValidPasswordResetToken(token: string) {
  const tokenHash = hashPasswordResetToken(token);

  const result = await sql<ResetTokenRow>`
    select
      id::text,
      user_type as "user_type",
      user_id::text,
      email,
      expires_at,
      used_at
    from auth_password_reset_tokens
    where token_hash = ${tokenHash}
      and used_at is null
      and expires_at > now()
    limit 1
  `;

  return result.rows[0] || null;
}

export async function markPasswordResetTokenUsed(tokenId: string) {
  await sql`
    update auth_password_reset_tokens
    set used_at = now()
    where id::text = ${tokenId}
      and used_at is null
  `;
}

export async function updateUserPassword(params: {
  userType: ResetUserType;
  userId: string;
  newPassword: string;
}) {
  if (params.userType === "admin_master") {
    await sql`
      update admin_master_users
      set
        password_hash = crypt(${params.newPassword}, gen_salt('bf')),
        must_change_password = false,
        password_changed_at = now(),
        updated_at = now()
      where id::text = ${params.userId}
        and is_active = true
    `;

    await sql`
      update admin_master_sessions
      set revoked_at = now()
      where user_id::text = ${params.userId}
        and revoked_at is null
    `;

    return;
  }

  await sql`
    update saas_users
    set
      password_hash = crypt(${params.newPassword}, gen_salt('bf')),
      must_change_password = false,
      password_changed_at = now(),
      updated_at = now()
    where id::text = ${params.userId}
      and is_active = true
  `;

  await sql`
    update saas_user_sessions
    set revoked_at = now()
    where user_id::text = ${params.userId}
      and revoked_at is null
  `;
}
