import { sql } from "@vercel/postgres";
import { cookies, headers } from "next/headers";
import { createHash, createHmac, randomBytes } from "crypto";
import {
  ADMIN_MASTER_SESSION_COOKIE,
  ADMIN_MASTER_SESSION_MAX_AGE,
  createAdminMasterSession,
} from "./admin-master-auth";

export const ADMIN_MASTER_MFA_CHALLENGE_COOKIE = "admin-master-mfa-challenge";
export const ADMIN_MASTER_MFA_SETUP_SECRET_COOKIE = "admin-master-mfa-setup-secret";
export const ADMIN_MASTER_MFA_RECOVERY_CODES_COOKIE = "admin-master-mfa-recovery-codes";

type ChallengeRow = {
  challenge_id: string;
  user_id: string;
  email: string;
  mfa_enabled: boolean;
  mfa_secret_encrypted: string | null;
  mfa_recovery_codes: unknown;
  expires_at: Date;
};

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function base32Encode(buffer: Buffer) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0;
  let value = 0;
  let output = "";

  for (const byte of buffer) {
    value = (value << 8) | byte;
    bits += 8;

    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }

  return output;
}

function base32Decode(input: string) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const clean = input.toUpperCase().replace(/=+$/g, "").replace(/[^A-Z2-7]/g, "");
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];

  for (const char of clean) {
    const idx = alphabet.indexOf(char);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;

    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(bytes);
}

function hotp(secretBase32: string, counter: number) {
  const secret = base32Decode(secretBase32);
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeUInt32BE(Math.floor(counter / 0x100000000), 0);
  counterBuffer.writeUInt32BE(counter >>> 0, 4);

  const digest = createHmac("sha1", secret).update(counterBuffer).digest();
  const offset = digest[digest.length - 1] & 0x0f;
  const code =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  return String(code % 1000000).padStart(6, "0");
}

export function verifyTotpCode(secretBase32: string, codeRaw: string, window = 1) {
  const code = (codeRaw || "").replace(/\D/g, "");
  if (code.length !== 6) return false;

  const currentCounter = Math.floor(Date.now() / 1000 / 30);
  for (let offset = -window; offset <= window; offset += 1) {
    if (hotp(secretBase32, currentCounter + offset) === code) {
      return true;
    }
  }
  return false;
}

export function generateTotpSecret() {
  return base32Encode(randomBytes(20));
}

export function buildOtpAuthUri(email: string, secret: string) {
  const issuer = "Reciclativa Admin";
  const label = `${issuer}:${email}`;
  const params = new URLSearchParams({
    secret,
    issuer,
    algorithm: "SHA1",
    digits: "6",
    period: "30",
  });
  return `otpauth://totp/${encodeURIComponent(label)}?${params.toString()}`;
}

export function generateRecoveryCodes() {
  return Array.from({ length: 8 }, () => randomBytes(4).toString("hex").toUpperCase());
}

function normalizeRecoveryCode(value: string) {
  return (value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
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

export async function createAdminMasterChallenge(params: { userId: string; req?: Request }) {
  const token = randomBytes(32).toString("hex");
  const tokenHash = sha256(token);
  const meta = await resolveRequestMeta(params.req);

  await sql`
    insert into admin_master_login_challenges (
      user_id,
      challenge_token_hash,
      expires_at,
      ip_address,
      user_agent
    )
    values (
      ${params.userId},
      ${tokenHash},
      now() + interval '10 minutes',
      ${meta.ip || null},
      ${meta.userAgent || null}
    )
  `;

  return token;
}

export async function getCurrentAdminMasterChallenge() {
  const store = await cookies();
  const token = store.get(ADMIN_MASTER_MFA_CHALLENGE_COOKIE)?.value;
  if (!token) return null;

  const tokenHash = sha256(token);
  const result = await sql<ChallengeRow>`
    select
      c.id::text as challenge_id,
      u.id::text as user_id,
      u.email,
      u.mfa_enabled,
      u.mfa_secret_encrypted,
      u.mfa_recovery_codes,
      c.expires_at
    from admin_master_login_challenges c
    inner join admin_master_users u
      on u.id = c.user_id
    where c.challenge_token_hash = ${tokenHash}
      and c.consumed_at is null
      and c.expires_at > now()
      and u.is_active = true
      and u.role = 'admin_master'
    limit 1
  `;

  return result.rows[0] || null;
}

export async function consumeCurrentAdminMasterChallenge() {
  const store = await cookies();
  const token = store.get(ADMIN_MASTER_MFA_CHALLENGE_COOKIE)?.value;
  if (!token) return;

  const tokenHash = sha256(token);
  await sql`
    update admin_master_login_challenges
    set consumed_at = now()
    where challenge_token_hash = ${tokenHash}
      and consumed_at is null
  `;
}

export async function clearAdminMasterMfaCookies() {
  const store = await cookies();
  const secure = process.env.NODE_ENV === "production";

  store.set(ADMIN_MASTER_MFA_CHALLENGE_COOKIE, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure,
    sameSite: "lax",
  });
  store.set(ADMIN_MASTER_MFA_SETUP_SECRET_COOKIE, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure,
    sameSite: "lax",
  });
}

export async function setAdminMasterMfaChallengeCookie(token: string) {
  const store = await cookies();
  store.set(ADMIN_MASTER_MFA_CHALLENGE_COOKIE, token, {
    path: "/",
    maxAge: 60 * 10,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export async function setAdminMasterSetupSecretCookie(secret: string) {
  const store = await cookies();
  store.set(ADMIN_MASTER_MFA_SETUP_SECRET_COOKIE, secret, {
    path: "/",
    maxAge: 60 * 10,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export async function getAdminMasterSetupSecretCookie() {
  const store = await cookies();
  return store.get(ADMIN_MASTER_MFA_SETUP_SECRET_COOKIE)?.value || null;
}

export async function setAdminMasterRecoveryCodesCookie(codes: string[]) {
  const store = await cookies();
  store.set(ADMIN_MASTER_MFA_RECOVERY_CODES_COOKIE, JSON.stringify(codes), {
    path: "/",
    maxAge: 60 * 10,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export async function getAdminMasterRecoveryCodesCookie() {
  const store = await cookies();
  const raw = store.get(ADMIN_MASTER_MFA_RECOVERY_CODES_COOKIE)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((item) => String(item)) : [];
  } catch {
    return [];
  }
}

export async function clearAdminMasterRecoveryCodesCookie() {
  const store = await cookies();
  store.set(ADMIN_MASTER_MFA_RECOVERY_CODES_COOKIE, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export async function enableAdminMasterMfaAndCreateSession(params: {
  userId: string;
  secret: string;
  recoveryCodes: string[];
  req?: Request;
}) {
  await sql`
    update admin_master_users
    set
      mfa_secret_encrypted = ${params.secret},
      mfa_recovery_codes = ${JSON.stringify(params.recoveryCodes)}::jsonb,
      mfa_enabled = true
    where id = ${params.userId}
  `;

  await consumeCurrentAdminMasterChallenge();
  const sessionId = await createAdminMasterSession({
    userId: params.userId,
    mfaVerified: true,
    req: params.req,
  });

  const store = await cookies();
  store.set(ADMIN_MASTER_SESSION_COOKIE, sessionId, {
    path: "/",
    maxAge: ADMIN_MASTER_SESSION_MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  await setAdminMasterRecoveryCodesCookie(params.recoveryCodes);
  await clearAdminMasterMfaCookies();
}

export async function completeAdminMasterMfaLogin(params: {
  userId: string;
  req?: Request;
}) {
  await consumeCurrentAdminMasterChallenge();
  const sessionId = await createAdminMasterSession({
    userId: params.userId,
    mfaVerified: true,
    req: params.req,
  });

  const store = await cookies();
  store.set(ADMIN_MASTER_SESSION_COOKIE, sessionId, {
    path: "/",
    maxAge: ADMIN_MASTER_SESSION_MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  await clearAdminMasterMfaCookies();
}

export function hasRecoveryCodeMatch(codes: unknown, submittedRaw: string) {
  const submitted = normalizeRecoveryCode(submittedRaw);
  if (!submitted) return false;
  if (!Array.isArray(codes)) return false;
  return codes.some((item) => normalizeRecoveryCode(String(item)) === submitted);
}

export async function consumeRecoveryCode(params: {
  userId: string;
  codes: unknown;
  submittedRaw: string;
}) {
  const submitted = normalizeRecoveryCode(params.submittedRaw);
  if (!Array.isArray(params.codes) || !submitted) return false;

  const nextCodes = params.codes
    .map((item) => String(item))
    .filter((item) => normalizeRecoveryCode(item) !== submitted);

  if (nextCodes.length === params.codes.length) return false;

  await sql`
    update admin_master_users
    set mfa_recovery_codes = ${JSON.stringify(nextCodes)}::jsonb
    where id = ${params.userId}
  `;
  return true;
}

export async function regenerateAdminMasterRecoveryCodes(params: {
  userId: string;
  codes: string[];
}) {
  await sql`
    update admin_master_users
    set mfa_recovery_codes = ${JSON.stringify(params.codes)}::jsonb
    where id = ${params.userId}
  `;

  await setAdminMasterRecoveryCodesCookie(params.codes);
}
