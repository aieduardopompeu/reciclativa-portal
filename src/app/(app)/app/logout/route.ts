import { NextResponse } from "next/server";
import { clearSaaSSessionCookie, revokeCurrentSaaSSession } from "@/lib/saas/session";

export const runtime = "nodejs";

export async function GET(req: Request) {
  await revokeCurrentSaaSSession();
  await clearSaaSSessionCookie();

  const url = new URL(req.url);
  const params = new URLSearchParams({ next: "/app/dashboard" });

  if (url.searchParams.get("reason") === "idle") {
    params.set("status", "idle_logout");
  }

  const res = NextResponse.redirect(new URL(`/login?${params.toString()}`, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
