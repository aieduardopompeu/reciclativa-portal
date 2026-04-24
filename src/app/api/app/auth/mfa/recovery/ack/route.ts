import { NextResponse } from "next/server";
import { clearSaaSRecoveryCodesCookie } from "@/lib/saas/mfa";

export const runtime = "nodejs";

export async function POST(req: Request) {
  await clearSaaSRecoveryCodesCookie();

  const res = NextResponse.redirect(new URL("/app/dashboard", req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
