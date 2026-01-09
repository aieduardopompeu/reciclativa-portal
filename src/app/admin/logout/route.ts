import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const isProd = process.env.NODE_ENV === "production";
  const res = NextResponse.redirect(new URL("/admin/login", req.url));

  // logout = remove o cookie (não precisa ADMIN_TOKEN)
  res.cookies.set("admin-token", "", {
    path: "/",
    maxAge: 0,
    ...(isProd ? { domain: ".reciclativa.com" } : {}),
  });

  return res;
}
