import { NextResponse } from "next/server";

export const runtime = "nodejs";

function safeNextPath(nextRaw: string) {
  if (!nextRaw) return "/admin/profissionais";
  if (!nextRaw.startsWith("/admin")) return "/admin/profissionais";
  return nextRaw;
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);

  const password = (form?.get("password") || "").toString();
  const nextRaw = (form?.get("next") || "/admin/profissionais").toString();
  const next = safeNextPath(nextRaw);

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

  const origin = new URL(req.url).origin;

  // Sempre 303 para garantir PRG (Post/Redirect/Get)
  const redirect303 = (to: string) => NextResponse.redirect(new URL(to, origin), 303);

  if (!ADMIN_PASSWORD || !ADMIN_TOKEN) {
    const back = new URL("/admin/login", origin);
    back.searchParams.set("error", "env");
    back.searchParams.set("next", next);
    return NextResponse.redirect(back, 303);
  }

  if (password !== ADMIN_PASSWORD) {
    const back = new URL("/admin/login", origin);
    back.searchParams.set("error", "badpass");
    back.searchParams.set("next", next);
    return NextResponse.redirect(back, 303);
  }

  const res = redirect303(next);

  // Nome do cookie deve bater com o middleware
  res.cookies.set("admin-token", ADMIN_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h
  });

  return res;
}
