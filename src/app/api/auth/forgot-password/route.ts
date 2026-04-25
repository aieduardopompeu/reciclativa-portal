import { NextResponse } from "next/server";
import {
  createPasswordResetRequest,
  findPasswordResetUser,
  isValidEmail,
  resolveBaseUrl,
  safeAuthNextPath,
} from "@/lib/auth/password-reset";

export const runtime = "nodejs";

function buildRedirect(req: Request, path: string) {
  const res = NextResponse.redirect(new URL(path, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

function recoverPath(params: {
  status?: string;
  error?: string;
  email?: string;
  next: string;
}) {
  const query = new URLSearchParams({ next: params.next });

  if (params.email) query.set("email", params.email);
  if (params.status) query.set("status", params.status);
  if (params.error) query.set("error", params.error);

  return `/recuperar-senha?${query.toString()}`;
}

async function sendPasswordResetEmail(params: {
  to: string;
  name: string | null;
  resetUrl: string;
}) {
  const apiKey = process.env.RESEND_API_KEY || "";
  const from = process.env.RESEND_FROM || process.env.EMAIL_FROM || "";

  if (!apiKey || !from) {
    console.error("PASSWORD_RESET: missing RESEND_API_KEY or RESEND_FROM/EMAIL_FROM");
    return false;
  }

  const displayName = params.name || "";
  const subject = "Recuperação de senha - Reciclativa Gestão";
  const text = [
    displayName ? `Olá, ${displayName}.` : "Olá.",
    "",
    "Recebemos uma solicitação para redefinir sua senha na Reciclativa Gestão.",
    "Acesse o link abaixo para criar uma nova senha. O link expira em 30 minutos:",
    "",
    params.resetUrl,
    "",
    "Se você não solicitou essa recuperação, ignore este e-mail.",
    "",
    "Alta Cloud",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.55">
      <p>${displayName ? `Olá, <strong>${displayName}</strong>.` : "Olá."}</p>
      <p>Recebemos uma solicitação para redefinir sua senha na <strong>Reciclativa Gestão</strong>.</p>
      <p>Use o botão abaixo para criar uma nova senha. O link expira em <strong>30 minutos</strong>.</p>
      <p style="margin:24px 0">
        <a href="${params.resetUrl}" style="display:inline-block;background:#059669;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:10px">
          Redefinir senha
        </a>
      </p>
      <p>Se você não solicitou essa recuperação, ignore este e-mail.</p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0" />
      <p style="font-size:12px;color:#64748b">Desenvolvido no Brasil por Alta Cloud.</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: params.to,
        subject,
        html,
        text,
      }),
    });

    const body = await response.text().catch(() => "");

    if (!response.ok) {
      console.error("PASSWORD_RESET RESEND ERROR:", response.status, body);
      return false;
    }

    console.info("PASSWORD_RESET RESEND OK:", body);
    return true;
  } catch (error) {
    console.error("PASSWORD_RESET RESEND FETCH ERROR:", error);
    return false;
  }
}

export async function GET(req: Request) {
  return buildRedirect(req, "/recuperar-senha");
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const email = (form?.get("email") || "").toString().trim().toLowerCase();
  const next = safeAuthNextPath((form?.get("next") || "/app/dashboard").toString());

  if (!isValidEmail(email)) {
    return buildRedirect(req, recoverPath({ error: "invalid_email", email, next }));
  }

  const user = await findPasswordResetUser({ email, next });

  // Resposta neutra: não revela se o e-mail existe ou não.
  if (!user) {
    return buildRedirect(req, recoverPath({ status: "sent", email, next }));
  }

  const token = await createPasswordResetRequest({ user, req });
  const baseUrl = resolveBaseUrl(req);
  const resetUrl = `${baseUrl}/redefinir-senha?token=${encodeURIComponent(token)}&next=${encodeURIComponent(next)}`;
  
  if (process.env.NODE_ENV !== "production") {
  console.info("PASSWORD_RESET DEV URL:", resetUrl);
}

  await sendPasswordResetEmail({
    to: user.email,
    name: user.name,
    resetUrl,
  });

  return buildRedirect(req, recoverPath({ status: "sent", email, next }));
}
