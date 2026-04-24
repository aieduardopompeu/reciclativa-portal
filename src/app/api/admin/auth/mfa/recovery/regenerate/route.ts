import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getAdminMasterApiSession } from "@/lib/admin-master-auth";
import {
  generateRecoveryCodes,
  regenerateAdminMasterRecoveryCodes,
  verifyTotpCode,
} from "@/lib/admin-master-mfa";

export const runtime = "nodejs";

function buildRedirect(req: Request, path: string) {
  const res = NextResponse.redirect(new URL(path, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

type UserRow = {
  mfa_secret_encrypted: string | null;
};

export async function POST(req: Request) {
  const session = await getAdminMasterApiSession();
  if (!session) {
    return buildRedirect(req, "/admin/login?next=%2Fadmin%2Fmfa%2Frecovery%2Fregenerate");
  }

  const form = await req.formData().catch(() => null);
  const currentPassword = (form?.get("current_password") || "").toString();
  const mfaCode = (form?.get("mfa_code") || "").toString();

  const passwordOk = await sql<{ ok: boolean }>`
    select exists(
      select 1
      from admin_master_users
      where id = ${session.userId}
        and password_hash = crypt(${currentPassword}, password_hash)
        and is_active = true
    ) as ok
  `;

  if (!passwordOk.rows[0]?.ok) {
    return buildRedirect(req, "/admin/mfa/recovery/regenerate?error=password_invalid");
  }

  const userResult = await sql<UserRow>`
    select mfa_secret_encrypted
    from admin_master_users
    where id = ${session.userId}
    limit 1
  `;

  const secret = userResult.rows[0]?.mfa_secret_encrypted || null;

  if (!secret || !verifyTotpCode(secret, mfaCode)) {
    return buildRedirect(req, "/admin/mfa/recovery/regenerate?error=mfa_invalid");
  }

  const newCodes = generateRecoveryCodes();

  await regenerateAdminMasterRecoveryCodes({
    userId: session.userId,
    codes: newCodes,
  });

  return buildRedirect(req, "/admin/mfa/recovery");
}