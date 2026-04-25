import { NextResponse } from "next/server";

export const runtime = "nodejs";

function buildRedirect(req: Request, path: string) {
  const res = NextResponse.redirect(new URL(path, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

function safeNextPath(nextRaw: string | null | undefined) {
  const next = (nextRaw || "").trim();
  if (next.startsWith("/admin")) return next;
  if (next.startsWith("/app")) return next;
  return "/app/dashboard";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET(req: Request) {
  return buildRedirect(req, "/recuperar-senha");
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const email = (form?.get("email") || "").toString().trim().toLowerCase();
  const next = safeNextPath((form?.get("next") || "/app/dashboard").toString());

  const params = new URLSearchParams({ next });

  if (email) {
    params.set("email", email);
  }

  if (!isValidEmail(email)) {
    params.set("error", "invalid_email");
    return buildRedirect(req, `/recuperar-senha?${params.toString()}`);
  }

  // Fase 2A: endpoint neutro para preparar a UX de recuperação.
  // A Fase 2B deve gerar token, salvar expiração e enviar e-mail via Resend.
  params.set("status", "received");
  return buildRedirect(req, `/recuperar-senha?${params.toString()}`);
}
