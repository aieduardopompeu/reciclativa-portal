import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getAdminMasterApiSession } from "../../../../../lib/admin-master-auth";

export const runtime = "nodejs";

function safeReturnTo(v: string) {
  const x = (v || "").toLowerCase();
  if (x === "pending" || x === "approved" || x === "rejected") return x;
  return "pending";
}

export async function POST(req: Request) {
  const session = await getAdminMasterApiSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const form = await req.formData();

  const idRaw = (form.get("id") || "").toString();
  const action = (form.get("action") || "").toString();
  const returnTo = safeReturnTo((form.get("returnTo") || "").toString());

  const id = Number(idRaw);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  if (action !== "approve" && action !== "reject") {
    return NextResponse.json({ ok: false, error: "invalid_action" }, { status: 400 });
  }

  const newStatus = action === "approve" ? "approved" : "rejected";

  const updated = await sql`
    update profissionais
    set status = ${newStatus}
    where id = ${id}
    returning id
  `;

  if (updated.rowCount === 0) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  return NextResponse.redirect(
    new URL(`/admin/profissionais?status=${returnTo}`, req.url),
    303
  );
}
