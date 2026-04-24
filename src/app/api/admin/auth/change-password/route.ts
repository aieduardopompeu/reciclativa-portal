import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getCurrentSaaSApiUser } from "@/lib/saas/session";

export const runtime = "nodejs";

function buildRedirect(req: Request, path: string) {
  const res = NextResponse.redirect(new URL(path, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function POST(req: Request) {
  const user = await getCurrentSaaSApiUser();
  if (!user) {
    return buildRedirect(req, "/app/login");
  }

  const form = await req.formData().catch(() => null);
  const currentPassword = (form?.get("current_password") || "").toString();
  const newPassword = (form?.get("new_password") || "").toString();
  const confirmPassword = (form?.get("confirm_password") || "").toString();

  if (newPassword.length < 10) {
    return buildRedirect(req, "/app/primeiro-acesso?error=new_short");
  }

  if (newPassword !== confirmPassword) {
    return buildRedirect(req, "/app/primeiro-acesso?error=confirm_mismatch");
  }

  if (currentPassword === newPassword) {
    return buildRedirect(req, "/app/primeiro-acesso?error=new_equal_current");
  }

  const current = await sql<{ ok: boolean }>`
    select exists(
      select 1
      from saas_users
      where id = ${user.id}
        and password_hash = crypt(${currentPassword}, password_hash)
        and is_active = true
    ) as ok
  `;

  if (!current.rows[0]?.ok) {
    return buildRedirect(req, "/app/primeiro-acesso?error=current_invalid");
  }

  await sql`
    update saas_users
    set
      password_hash = crypt(${newPassword}, gen_salt('bf')),
      must_change_password = false,
      password_changed_at = now()
    where id = ${user.id}
  `;

  return buildRedirect(req, "/app/dashboard");
}
