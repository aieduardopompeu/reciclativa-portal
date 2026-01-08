import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const password = (form?.get("password") || "").toString();
  const next = (form?.get("next") || "/admin/profissionais").toString() || "/admin/profissionais";

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

  const url = new URL(req.url);

  // se faltar env, volta pro login com erro
  if (!ADMIN_PASSWORD || !ADMIN_TOKEN) {
    const back = new URL("/admin/login", url.origin);
    back.searchParams.set("error", "env");
    return NextResponse.redirect(back);
  }

  // senha inválida, volta pro login com erro
  if (password !== ADMIN_PASSWORD) {
    const back = new URL("/admin/login", url.origin);
    back.searchParams.set("error", "badpass");
    back.searchParams.set("next", next);
    return NextResponse.redirect(back);
  }

  // ok: seta cookie e redireciona
  const res = NextResponse.redirect(new URL(next, url.origin));
  res.cookies.set("admin_token", ADMIN_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h
  });

  return res;
}
