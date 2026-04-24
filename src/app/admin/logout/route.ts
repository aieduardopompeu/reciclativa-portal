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
  const res = NextResponse.redirect(new URL("/admin/login", req.url));

  res.cookies.set(ADMIN_MASTER_SESSION_COOKIE, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
  });

  return res;
}
