import { NextResponse } from "next/server";
import { getCurrentSaaSApiUser } from "@/lib/saas/session";
import { generateTotpSecret, setSaaSMfaSetupSecretCookie } from "@/lib/saas/mfa";

export const runtime = "nodejs";

function buildRedirect(req: Request, path: string) {
  const res = NextResponse.redirect(new URL(path, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function GET(req: Request) {
  const user = await getCurrentSaaSApiUser();
  if (!user) {
    return buildRedirect(req, "/app/login");
  }

  if (user.mfaEnabled) {
    return buildRedirect(req, "/app/dashboard");
  }

  const secret = generateTotpSecret();
  await setSaaSMfaSetupSecretCookie(secret);

  return buildRedirect(req, "/app/mfa/setup");
}
