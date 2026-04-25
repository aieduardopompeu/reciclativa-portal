import { NextResponse } from "next/server";
import {
  ADMIN_MASTER_SESSION_COOKIE,
  revokeCurrentAdminMasterSession,
} from "../../../lib/admin-master-auth";
import { clearAdminMasterMfaCookies } from "../../../lib/admin-master-mfa";

export async function GET(req: Request) {
  await revokeCurrentAdminMasterSession();
  await clearAdminMasterMfaCookies();

  const isProd = process.env.NODE_ENV === "production";
  const url = new URL(req.url);
  const params = new URLSearchParams({ next: "/admin" });

  if (url.searchParams.get("reason") === "idle") {
    params.set("status", "idle_logout");
  }

  const res = NextResponse.redirect(new URL(`/login?${params.toString()}`, req.url), 303);

  res.cookies.set(ADMIN_MASTER_SESSION_COOKIE, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
  });

  res.headers.set("Cache-Control", "no-store");
  return res;
}
