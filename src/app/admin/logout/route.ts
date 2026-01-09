import { NextResponse } from "next/server";

const CANONICAL_ORIGIN =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://www.reciclativa.com").replace(
    /\/$/,
    ""
  );

export async function GET() {
  const res = NextResponse.redirect(new URL("/admin/login", CANONICAL_ORIGIN));

  // remove cookie
  res.cookies.set("admin-token", "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}
