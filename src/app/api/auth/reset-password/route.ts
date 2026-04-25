import { NextResponse } from "next/server";
import {
  getValidPasswordResetToken,
  markPasswordResetTokenUsed,
  safeAuthNextPath,
  updateUserPassword,
} from "@/lib/auth/password-reset";

export const runtime = "nodejs";

function buildRedirect(req: Request, path: string) {
  const res = NextResponse.redirect(new URL(path, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

function resetPath(params: {
  token?: string;
  next: string;
  error?: string;
  status?: string;
}) {
  const query = new URLSearchParams({ next: params.next });

  if (params.token) query.set("token", params.token);
  if (params.error) query.set("error", params.error);
  if (params.status) query.set("status", params.status);

  return `/redefinir-senha?${query.toString()}`;
}

export async function GET(req: Request) {
  return buildRedirect(req, "/redefinir-senha");
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const token = (form?.get("token") || "").toString().trim();
  const next = safeAuthNextPath((form?.get("next") || "/app/dashboard").toString());
  const newPassword = (form?.get("new_password") || "").toString();
  const confirmPassword = (form?.get("confirm_password") || "").toString();

  if (!token) {
    return buildRedirect(req, resetPath({ next, error: "missing_token" }));
  }

  if (newPassword.length < 10) {
    return buildRedirect(req, resetPath({ token, next, error: "new_short" }));
  }

  if (newPassword !== confirmPassword) {
    return buildRedirect(req, resetPath({ token, next, error: "confirm_mismatch" }));
  }

  const resetToken = await getValidPasswordResetToken(token);

  if (!resetToken) {
    return buildRedirect(req, resetPath({ next, error: "invalid_or_expired" }));
  }

  await updateUserPassword({
    userType: resetToken.user_type,
    userId: resetToken.user_id,
    newPassword,
  });

  await markPasswordResetTokenUsed(resetToken.id);

  return buildRedirect(req, `/login?status=password_reset&next=${encodeURIComponent(next)}&email=${encodeURIComponent(resetToken.email)}`);
}
