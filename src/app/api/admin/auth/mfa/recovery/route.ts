import { NextResponse } from "next/server";
import {
  enableAdminMasterMfaAndCreateSession,
  generateRecoveryCodes,
  getAdminMasterSetupSecretCookie,
  getCurrentAdminMasterChallenge,
  verifyTotpCode,
} from "../../../../../../lib/admin-master-mfa";
import { safeAdminNextPath } from "../../../../../../lib/admin-master-auth";

export const runtime = "nodejs";

function buildRedirect(req: Request, path: string) {
  const res = NextResponse.redirect(new URL(path, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const next = safeAdminNextPath((form?.get("next") || "/admin").toString());
  const code = (form?.get("code") || "").toString();

  const challenge = await getCurrentAdminMasterChallenge();
  const secret = await getAdminMasterSetupSecretCookie();

  if (!challenge || challenge.mfa_enabled || !secret) {
    return buildRedirect(
      req,
      `/admin/login?error=mfa_challenge_missing&next=${encodeURIComponent(next)}`
    );
  }

  if (!verifyTotpCode(secret, code)) {
    return buildRedirect(
      req,
      `/admin/login?error=mfa_setup_invalid&next=${encodeURIComponent(next)}`
    );
  }

  const recoveryCodes = generateRecoveryCodes();

  await enableAdminMasterMfaAndCreateSession({
    userId: challenge.user_id,
    secret,
    recoveryCodes,
    req,
  });

  return buildRedirect(req, `/admin/mfa/recovery?next=${encodeURIComponent(next)}`);
}
