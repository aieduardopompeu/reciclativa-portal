import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CANONICAL_ORIGIN =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://www.reciclativa.com").replace(
    /\/$/,
    ""
  );

// Garante que sempre fica em /admin/... (evita open redirect)
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

  // ⚠️ IMPORTANTE: redireciona sempre usando o domínio canônico (www)
  const redirect303 = (to: string) =>
    NextResponse.redirect(new URL(to, CANONICAL_ORIGIN), 303);

  if (!ADMIN_PASSWORD || !ADMIN_TOKEN) {
    const back = new URL("/admin/login", CANONICAL_ORIGIN);
    back.searchParams.set("error", "env");
    back.searchParams.set("next", next);
    return NextResponse.redirect(back, 303);
  }

  if (password !== ADMIN_PASSWORD) {
    const back = new URL("/admin/login", CANONICAL_ORIGIN);
    back.searchParams.set("error", "badpass");
    back.searchParams.set("next", next);
    return NextResponse.redirect(back, 303);
  }

  const res = redirect303(next);

  // ✅ Cookie sem domain (host-only), mas como o host é sempre www, fica estável
  res.cookies.set("admin-token", ADMIN_TOKEN, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h
  });

  return res;
}
