import { NextResponse } from "next/server";
import { safeAdminNextPath } from "../../../../../../../lib/admin-master-auth";
import { clearAdminMasterRecoveryCodesCookie } from "../../../../../../../lib/admin-master-mfa";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const next = safeAdminNextPath((form?.get("next") || "/admin").toString());

  await clearAdminMasterRecoveryCodesCookie();

  const res = NextResponse.redirect(new URL(next, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
