import { NextResponse } from "next/server";
import { safeAdminNextPath } from "../../../../../../lib/admin-master-auth";
import {
  completeAdminMasterMfaLogin,
  consumeRecoveryCode,
  getCurrentAdminMasterChallenge,
  hasRecoveryCodeMatch,
  verifyTotpCode,
} from "../../../../../../lib/admin-master-mfa";

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

  if (!challenge || !challenge.mfa_enabled || !challenge.mfa_secret_encrypted) {
    return buildRedirect(
      req,
      `/admin/login?error=mfa_challenge_missing&next=${encodeURIComponent(next)}`
    );
  }

  const totpOk = verifyTotpCode(challenge.mfa_secret_encrypted, code);
  let recoveryOk = false;

  if (!totpOk && hasRecoveryCodeMatch(challenge.mfa_recovery_codes, code)) {
    recoveryOk = await consumeRecoveryCode({
      userId: challenge.user_id,
      codes: challenge.mfa_recovery_codes,
      submittedRaw: code,
    });
  }

  if (!totpOk && !recoveryOk) {
    return buildRedirect(
      req,
      `/admin/login?error=mfa_verify_invalid&next=${encodeURIComponent(next)}`
    );
  }

  await completeAdminMasterMfaLogin({
    userId: challenge.user_id,
    req,
  });

  return buildRedirect(req, next);
}
