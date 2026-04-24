import { NextResponse } from "next/server";
import {
  completeSaaSMfaLogin,
  consumeRecoveryCode,
  getCurrentSaaSMfaChallenge,
  hasRecoveryCodeMatch,
  verifyTotpCode,
} from "@/lib/saas/mfa";

export const runtime = "nodejs";

function buildRedirect(req: Request, path: string) {
  const res = NextResponse.redirect(new URL(path, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function GET(req: Request) {
  return buildRedirect(req, "/app/login");
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const code = (form?.get("code") || "").toString();

  const challenge = await getCurrentSaaSMfaChallenge();

  if (!challenge || !challenge.mfa_enabled || !challenge.mfa_secret_encrypted) {
    return buildRedirect(req, "/app/login?error=mfa_challenge_missing");
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
    return buildRedirect(req, "/app/login?error=mfa_verify_invalid");
  }

  await completeSaaSMfaLogin({
    userId: challenge.user_id,
    req,
  });

  return buildRedirect(req, "/app/dashboard");
}
