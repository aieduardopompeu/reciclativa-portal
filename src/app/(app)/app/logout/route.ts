import { NextResponse } from "next/server";
import { clearSaaSSessionCookie, revokeCurrentSaaSSession } from "@/lib/saas/session";

export const runtime = "nodejs";

export async function GET(req: Request) {
  await revokeCurrentSaaSSession();
  await clearSaaSSessionCookie();

  const res = NextResponse.redirect(new URL("/app/login", req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
