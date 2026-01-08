import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const password = (form?.get("password") || "").toString();

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

  if (!ADMIN_PASSWORD || !ADMIN_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "Missing ADMIN_PASSWORD or ADMIN_TOKEN" },
      { status: 500 }
    );
  }

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Senha inválida" }, { status: 401 });
  }

  const url = new URL(req.url);
  const next = (form?.get("next") || "/admin/profissionais").toString() || "/admin/profissionais";

  const res = NextResponse.redirect(new URL(next, url.origin));

  // cookie HttpOnly (não aparece no JS do browser)
  res.cookies.set("admin_token", ADMIN_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h
  });

  return res;
}
