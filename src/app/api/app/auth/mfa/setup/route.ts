import { NextResponse } from "next/server";
import { getCurrentSaaSApiUser } from "@/lib/saas/session";
import {
  enableSaaSMfaForCurrentUser,
  generateRecoveryCodes,
  getSaaSMfaSetupSecretCookie,
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
  const user = await getCurrentSaaSApiUser();
  if (!user) {
    return buildRedirect(req, "/app/login");
  }

  if (user.mfaEnabled) {
    return buildRedirect(req, "/app/dashboard");
  }

  const form = await req.formData().catch(() => null);
  const code = (form?.get("code") || "").toString();
  const secret = await getSaaSMfaSetupSecretCookie();

  if (!secret) {
    return buildRedirect(req, "/app/login?error=mfa_challenge_missing");
  }

  if (!verifyTotpCode(secret, code)) {
    return buildRedirect(req, "/app/login?error=mfa_setup_invalid");
  }

  const recoveryCodes = generateRecoveryCodes();

  await enableSaaSMfaForCurrentUser({
    userId: user.id,
    secret,
    recoveryCodes,
  });

  return buildRedirect(req, "/app/mfa/recovery");
}
