import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getAdminMasterApiSession } from "../../../../../lib/admin-master-auth";

export const runtime = "nodejs";

const ALLOWED_STATUS = new Set([
  "pending",
  "under_review",
  "approved",
  "rejected",
  "needs_adjustment",
  "cancelled",
]);

type SignupRow = {
  id: string;
  status: string | null;
  legal_name: string | null;
  trade_name: string | null;
  cnpj: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_whatsapp: string | null;
  official_email: string | null;
  official_phone: string | null;
  official_street: string | null;
  official_number: string | null;
  official_complement: string | null;
  official_district: string | null;
  official_city: string | null;
  official_state: string | null;
  official_zip_code: string | null;
  requested_modules: unknown;
  converted_organization_id: string | null;
  converted_user_id: string | null;
};

function normalizeStatus(value: string) {
  const v = (value || "").trim();
  return ALLOWED_STATUS.has(v) ? v : null;
}

function safeText(value: FormDataEntryValue | null, max = 2000) {
  return (value || "").toString().trim().slice(0, max);
}

function parseRequestedModules(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      return value.split(",").map((item) => item.trim()).filter(Boolean);
    }
  }
  return [];
}

function buildProvisionalPassword(cnpj: string) {
  const digits = (cnpj || "").replace(/\D/g, "");
  const suffix = digits.slice(-4) || "0000";
  return `Reciclativa@${suffix}#Tmp`;
}

function getBaseUrl(req: Request) {
  const url = new URL(req.url);
  const proto = req.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  return host ? `${proto}://${host}` : url.origin;
}

function redirectWithParams(req: Request, params: Record<string, string>) {
  const url = new URL("/admin/cadastros-empresas", req.url);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return NextResponse.redirect(url, 303);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendResendEmail(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY || "";
  const from = process.env.RESEND_FROM || process.env.EMAIL_FROM || "";

  if (!apiKey || !from) {
    console.error("COMPANY_SIGNUP_APPROVAL: missing RESEND_API_KEY or RESEND_FROM/EMAIL_FROM");
    return { ok: false as const };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("COMPANY_SIGNUP_APPROVAL RESEND ERROR:", res.status, body);
      return { ok: false as const };
    }

    return { ok: true as const };
  } catch (error) {
    console.error("COMPANY_SIGNUP_APPROVAL RESEND FETCH ERROR:", error);
    return { ok: false as const };
  }
}

async function sendInitialAccessEmail(params: {
  req: Request;
  companyName: string;
  contactName: string;
  contactEmail: string;
  provisionalPassword: string;
}) {
  const appUrl = `${getBaseUrl(params.req)}/app/dashboard`;
  const subject = `Acesso inicial liberado — ${params.companyName}`;

  const text = [
    `Olá, ${params.contactName}.`,
    "",
    `O acesso inicial da empresa ${params.companyName} foi liberado na Reciclativa Gestão.`,
    "",
    `Login: ${params.contactEmail}`,
    `Senha provisória: ${params.provisionalPassword}`,
    `Acesso: ${appUrl}`,
    "",
    "No primeiro acesso, altere sua senha provisória para uma senha pessoal.",
    "",
    "Equipe Reciclativa Gestão",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:680px;">
      <h2 style="margin:0 0 12px 0;">Acesso inicial liberado</h2>
      <p style="margin:0 0 8px 0;">Olá, <strong>${escapeHtml(params.contactName)}</strong>.</p>
      <p style="margin:0 0 8px 0;">O acesso inicial da empresa <strong>${escapeHtml(params.companyName)}</strong> foi liberado na Reciclativa Gestão.</p>
      <div style="margin:16px 0;padding:16px;border:1px solid #d1d5db;border-radius:12px;background:#f8fafc;">
        <p style="margin:0 0 8px 0;"><strong>Login:</strong> ${escapeHtml(params.contactEmail)}</p>
        <p style="margin:0 0 8px 0;"><strong>Senha provisória:</strong> ${escapeHtml(params.provisionalPassword)}</p>
        <p style="margin:0;"><strong>Acesso:</strong> ${escapeHtml(appUrl)}</p>
      </div>
      <p style="margin:0 0 8px 0;">No primeiro acesso, altere sua senha provisória para uma senha pessoal.</p>
      <p style="margin-top:16px;color:#64748b;font-size:12px;">Equipe Reciclativa Gestão</p>
    </div>
  `;

  return sendResendEmail({
    to: params.contactEmail,
    subject,
    html,
    text,
  });
}

export async function POST(req: Request) {
  const session = await getAdminMasterApiSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const id = safeText(form.get("id"), 100);
  const nextStatus = normalizeStatus(safeText(form.get("status"), 50));
  const note = safeText(form.get("note"), 2000);

  if (!id) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  if (!nextStatus) {
    return redirectWithParams(req, { error: "invalid_status", status: "pending" });
  }

  const current = await sql<SignupRow>`
    select
      id::text,
      status,
      legal_name,
      trade_name,
      cnpj,
      contact_name,
      contact_email,
      contact_whatsapp,
      official_email,
      official_phone,
      official_street,
      official_number,
      official_complement,
      official_district,
      official_city,
      official_state,
      official_zip_code,
      requested_modules,
      converted_organization_id::text,
      converted_user_id::text
    from company_signups
    where id = ${id}
    limit 1
  `;

  if (current.rowCount === 0) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  const row = current.rows[0];
  const previousStatus = row.status || null;

  if (nextStatus !== "approved") {
    await sql`
      update company_signups
      set
        status = ${nextStatus},
        reviewed_by_user_id = ${session.userId},
        admin_notes = case
          when ${note} <> '' then coalesce(admin_notes, '') ||
            case when coalesce(admin_notes, '') = '' then '' else E'\n\n' end ||
            ${note}
          else admin_notes
        end,
        approved_at = case when ${nextStatus} = 'approved' then now() else approved_at end,
        rejected_at = case when ${nextStatus} = 'rejected' then now() else rejected_at end,
        last_status_change_at = now()
      where id = ${id}
    `;

    await sql`
      insert into company_signup_history (
        signup_id,
        from_status,
        to_status,
        action,
        note,
        acted_by_user_id
      )
      values (
        ${id},
        ${previousStatus},
        ${nextStatus},
        ${`status_changed_to_${nextStatus}`},
        ${note || null},
        ${session.userId}
      )
    `;

    return redirectWithParams(req, { status: nextStatus });
  }

  const legalName = safeText(row.legal_name, 255);
  const companyName = safeText(row.trade_name, 255) || legalName;
  const cnpj = (row.cnpj || "").replace(/\D/g, "");
  const contactName = safeText(row.contact_name, 255);
  const contactEmail = safeText(row.contact_email, 255).toLowerCase();
  const requestedModules = parseRequestedModules(row.requested_modules);

  if (!legalName || !cnpj || !contactName || !contactEmail) {
    return redirectWithParams(req, {
      status: "pending",
      error: "missing_required",
    });
  }

  const existingUserInAnotherOrg = await sql<{ id: string }>`
    select id::text
    from saas_users
    where lower(email) = ${contactEmail}
      and (
        ${row.converted_organization_id || ""} = ''
        or organization_id::text <> ${row.converted_organization_id || ""}
      )
    limit 1
  `;

  if (existingUserInAnotherOrg.rows[0] && !row.converted_user_id) {
    return redirectWithParams(req, {
      status: "pending",
      error: "user_email_exists",
    });
  }

  let organizationId = row.converted_organization_id || "";
  let userId = row.converted_user_id || "";
  let resultType = "approved_and_converted";
  const provisionalPassword = buildProvisionalPassword(cnpj);

  const existingOrg = await sql<{ id: string }>`
    select id::text
    from organizations
    where cnpj = ${cnpj}
    limit 1
  `;

  if (existingOrg.rows[0]) {
    organizationId = existingOrg.rows[0].id;
    resultType = "reconciled_existing_org";
  } else {
    organizationId = randomUUID();
    await sql`
      insert into organizations (
        id,
        legal_name,
        trade_name,
        cnpj,
        email,
        phone,
        whatsapp,
        plan_code,
        status
      ) values (
        ${organizationId},
        ${legalName},
        ${row.trade_name || null},
        ${cnpj},
        ${contactEmail || row.official_email || null},
        ${row.official_phone || null},
        ${row.contact_whatsapp || null},
        'trial',
        'active'
      )
    `;
  }

  const existingMirror = await sql<{ id: string }>`
    select id::text
    from saas_organizations
    where id::text = ${organizationId}
    limit 1
  `;

  if (!existingMirror.rows[0]) {
    await sql`
      insert into saas_organizations (
        id,
        signup_id,
        legal_name,
        trade_name,
        cnpj,
        email,
        phone,
        whatsapp,
        official_street,
        official_number,
        official_complement,
        official_district,
        official_city,
        official_state,
        official_zip_code,
        status
      ) values (
        ${organizationId},
        ${id},
        ${legalName},
        ${row.trade_name || null},
        ${cnpj},
        ${contactEmail || row.official_email || null},
        ${row.official_phone || null},
        ${row.contact_whatsapp || null},
        ${row.official_street || null},
        ${row.official_number || null},
        ${row.official_complement || null},
        ${row.official_district || null},
        ${row.official_city || null},
        ${row.official_state || null},
        ${row.official_zip_code || null},
        'active'
      )
    `;
  } else {
    await sql`
      update saas_organizations
      set
        signup_id = coalesce(signup_id, ${id}),
        legal_name = ${legalName},
        trade_name = ${row.trade_name || null},
        email = ${contactEmail || row.official_email || null},
        phone = ${row.official_phone || null},
        whatsapp = ${row.contact_whatsapp || null},
        official_street = ${row.official_street || null},
        official_number = ${row.official_number || null},
        official_complement = ${row.official_complement || null},
        official_district = ${row.official_district || null},
        official_city = ${row.official_city || null},
        official_state = ${row.official_state || null},
        official_zip_code = ${row.official_zip_code || null},
        status = 'active'
      where id = ${organizationId}
    `;
  }

  const existingHeadquarters = await sql<{ id: string }>`
    select id::text
    from organization_units
    where organization_id = ${organizationId}
      and is_headquarters = true
    order by created_at asc
    limit 1
  `;

  const unitId = existingHeadquarters.rows[0]?.id || randomUUID();

  if (!existingHeadquarters.rows[0]) {
    await sql`
      insert into organization_units (
        id,
        organization_id,
        name,
        code,
        phone,
        whatsapp,
        email,
        zip_code,
        address,
        number,
        complement,
        neighborhood,
        city,
        state,
        is_headquarters,
        is_active
      ) values (
        ${unitId},
        ${organizationId},
        ${`${row.trade_name || legalName} - Matriz`},
        'MATRIZ',
        ${row.official_phone || null},
        ${row.contact_whatsapp || null},
        ${contactEmail || row.official_email || null},
        ${row.official_zip_code || null},
        ${row.official_street || null},
        ${row.official_number || null},
        ${row.official_complement || null},
        ${row.official_district || null},
        ${row.official_city || null},
        ${row.official_state || null},
        true,
        true
      )
    `;
  }

  const existingUser = await sql<{ id: string }>`
    select id::text
    from saas_users
    where organization_id = ${organizationId}
      and lower(email) = ${contactEmail}
    limit 1
  `;

  if (existingUser.rows[0]) {
    userId = existingUser.rows[0].id;
  } else {
    userId = randomUUID();

    await sql`
      insert into saas_users (
        id,
        organization_id,
        unit_id,
        name,
        email,
        password_hash,
        role,
        is_active,
        must_change_password
      ) values (
        ${userId},
        ${organizationId},
        ${unitId},
        ${contactName},
        ${contactEmail},
        crypt(${provisionalPassword}, gen_salt('bf')),
        'org_admin',
        true,
        true
      )
    `;
  }

  for (const moduleKey of requestedModules) {
    await sql`
      insert into saas_organization_modules (
        organization_id,
        module_key,
        is_enabled
      ) values (
        ${organizationId},
        ${moduleKey},
        true
      )
      on conflict (organization_id, module_key) do update
      set is_enabled = excluded.is_enabled
    `;
  }

  await sql`
    update company_signups
    set
      status = 'approved',
      reviewed_by_user_id = ${session.userId},
      approved_at = coalesce(approved_at, now()),
      last_status_change_at = now(),
      converted_organization_id = ${organizationId},
      converted_user_id = ${userId},
      converted_at = coalesce(converted_at, now()),
      admin_notes = coalesce(admin_notes, '') ||
        case when coalesce(admin_notes, '') = '' then '' else E'\n\n' end ||
        ${resultType === "reconciled_existing_org"
          ? `Reconciliação concluída com organização já existente. Usuário principal: ${contactEmail}.`
          : `Conversão concluída. Usuário principal: ${contactEmail}. Senha provisória aplicada com padrão temporário.`}
    where id = ${id}
  `;

  await sql`
    insert into company_signup_history (
      signup_id,
      from_status,
      to_status,
      action,
      note,
      acted_by_user_id
    )
    values (
      ${id},
      ${previousStatus},
      'approved',
      ${resultType},
      ${note || `Organização pronta e usuário principal disponível: ${contactEmail}`},
      ${session.userId}
    )
  `;

  const emailSent = await sendInitialAccessEmail({
    req,
    companyName,
    contactName,
    contactEmail,
    provisionalPassword,
  });

  await sql`
    insert into company_signup_history (
      signup_id,
      from_status,
      to_status,
      action,
      note,
      acted_by_user_id
    )
    values (
      ${id},
      'approved',
      'approved',
      ${emailSent.ok ? 'initial_access_email_sent' : 'initial_access_email_failed'},
      ${emailSent.ok
        ? `E-mail de acesso inicial enviado para ${contactEmail}.`
        : `Falha ao enviar e-mail de acesso inicial para ${contactEmail}.`},
      ${session.userId}
    )
  `;

  return redirectWithParams(req, {
    status: "approved",
    result: resultType,
    created_email: contactEmail,
    email_status: emailSent.ok ? "sent" : "failed",
  });
}
