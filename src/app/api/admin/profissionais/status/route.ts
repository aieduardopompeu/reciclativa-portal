import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs";

type Action = "approve" | "reject";

function isAdmin(req: Request) {
  const url = new URL(req.url);

  const tokenFromQuery = url.searchParams.get("token") || "";

  const cookieHeader = req.headers.get("cookie") || "";
  const tokenFromCookie =
    cookieHeader
      .split(";")
      .map((s) => s.trim())
      .find((s) => s.startsWith("admin_token="))
      ?.split("=")[1] || "";

  const adminToken = process.env.ADMIN_TOKEN || "";

  return Boolean(
    adminToken && (tokenFromQuery === adminToken || tokenFromCookie === adminToken)
  );
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s: unknown) {
  return (s ?? "")
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function readPayload(req: Request) {
  const ct = (req.headers.get("content-type") || "").toLowerCase();

  if (ct.includes("application/json")) {
    const json = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    return json;
  }

  const fd = await req.formData().catch(() => null);
  const obj: Record<string, unknown> = {};
  if (fd) {
    for (const [k, v] of fd.entries()) obj[k] = v;
  }
  return obj;
}

async function sendResendEmail(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY || "";
  const from =
    process.env.RESEND_FROM ||
    process.env.EMAIL_FROM || // compatibilidade com sua Vercel
    "";

  if (!apiKey || !from) {
    console.error("RESEND: missing RESEND_API_KEY or RESEND_FROM/EMAIL_FROM");
    return { ok: false as const, reason: "missing_env" as const };
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
      console.error("RESEND ERROR:", res.status, body);
      return { ok: false as const, reason: "resend_error" as const };
    }

    return { ok: true as const };
  } catch (e) {
    console.error("RESEND FETCH ERROR:", e);
    return { ok: false as const, reason: "fetch_error" as const };
  }
}

function approvalTemplate(name: string) {
  const safeName = escapeHtml(name || "profissional");

  const subject = "Cadastro aprovado — Reciclativa";

  const text =
    `Olá, ${name || "profissional"}.\n\n` +
    "Informamos que seu cadastro foi aprovado. Em breve, seu perfil estará disponível na área de Profissionais do Reciclativa.\n\n" +
    "Atenciosamente,\nEquipe Reciclativa\nhttps://www.reciclativa.com";

  const LOGO_URL = "https://www.reciclativa.com/brand/logo-email.png";
  const SITE_URL = "https://www.reciclativa.com";

  const html = `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f8fb;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border:1px solid #e6e8ee;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:18px 22px;border-bottom:1px solid #eef1f6;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="${LOGO_URL}" width="56" height="56" alt="Reciclativa" style="display:block;border:0;outline:none;text-decoration:none;">
                  </td>
                  <td align="right" style="vertical-align:middle;font-family:Arial, sans-serif;color:#64748b;font-size:12px;">
                    Profissionais • Reciclativa
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:22px;font-family:Arial, sans-serif;color:#0f172a;">
              <div style="font-size:18px;font-weight:700;margin:0 0 10px 0;">Cadastro aprovado</div>

              <p style="margin:0 0 12px 0;font-size:14px;line-height:1.7;">
                Olá, <strong>${safeName}</strong>.
              </p>

              <p style="margin:0 0 12px 0;font-size:14px;line-height:1.7;">
                Informamos que seu cadastro foi <strong>aprovado</strong>. Em breve, seu perfil estará disponível na área de Profissionais do Reciclativa.
              </p>

              <p style="margin:0 0 18px 0;font-size:14px;line-height:1.7;color:#334155;">
                Caso queira atualizar alguma informação, basta responder este e-mail ou entrar em contato pelo site.
              </p>

              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 6px 0;">
                <tr>
                  <td style="background:#16a34a;border-radius:10px;">
                    <a href="${SITE_URL}/profissionais" style="display:inline-block;padding:12px 16px;font-family:Arial, sans-serif;font-size:14px;color:#ffffff;text-decoration:none;font-weight:700;">
                      Acessar Profissionais
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:18px 0 0 0;font-size:14px;line-height:1.7;">
                Atenciosamente,<br>
                <strong>Equipe Reciclativa</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 22px;background:#f8fafc;border-top:1px solid #eef1f6;font-family:Arial, sans-serif;color:#64748b;font-size:12px;line-height:1.5;">
              <div>Este é um e-mail automático. Se você não solicitou este cadastro, desconsidere esta mensagem.</div>
              <div style="margin-top:6px;">
                <a href="${SITE_URL}" style="color:#16a34a;text-decoration:none;">${SITE_URL}</a>
                <span style="color:#cbd5e1;"> • </span>
                <span>Transforme resíduos em recursos!</span>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;

  return { subject, text, html };
}

function rejectionTemplate(name: string, reason?: string | null) {
  const safeName = escapeHtml(name || "profissional");
  const safeReason = reason ? escapeHtml(reason) : null;

  const subject = "Cadastro não aprovado — Reciclativa";

  const text =
    `Olá, ${name || "profissional"}.\n\n` +
    "Neste momento, não foi possível aprovar o seu cadastro.\n" +
    (reason ? `Motivo: ${reason}\n` : "") +
    "\nVocê pode tentar novamente mais tarde, revisando as informações enviadas.\n\n" +
    "Atenciosamente,\nEquipe Reciclativa\nhttps://www.reciclativa.com";

  const LOGO_URL = "https://www.reciclativa.com/brand/logo-email.png";
  const SITE_URL = "https://www.reciclativa.com";

  const html = `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f8fb;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border:1px solid #e6e8ee;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:18px 22px;border-bottom:1px solid #eef1f6;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <img src="${LOGO_URL}" width="56" height="56" alt="Reciclativa" style="display:block;border:0;outline:none;text-decoration:none;">
                  </td>
                  <td align="right" style="vertical-align:middle;font-family:Arial, sans-serif;color:#64748b;font-size:12px;">
                    Profissionais • Reciclativa
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:22px;font-family:Arial, sans-serif;color:#0f172a;">
              <div style="font-size:18px;font-weight:700;margin:0 0 10px 0;">Cadastro não aprovado</div>

              <p style="margin:0 0 12px 0;font-size:14px;line-height:1.7;">
                Olá, <strong>${safeName}</strong>.
              </p>

              <p style="margin:0 0 12px 0;font-size:14px;line-height:1.7;">
                Neste momento, não foi possível aprovar o seu cadastro.
              </p>

              ${
                safeReason
                  ? `<div style="margin:0 0 14px 0;padding:12px 14px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;color:#7c2d12;font-size:13px;line-height:1.7;">
                       <strong>Motivo:</strong> ${safeReason}
                     </div>`
                  : ""
              }

              <p style="margin:0 0 18px 0;font-size:14px;line-height:1.7;color:#334155;">
                Você pode tentar novamente mais tarde, revisando as informações enviadas.
              </p>

              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 6px 0;">
                <tr>
                  <td style="background:#0f172a;border-radius:10px;">
                    <a href="${SITE_URL}/profissionais" style="display:inline-block;padding:12px 16px;font-family:Arial, sans-serif;font-size:14px;color:#ffffff;text-decoration:none;font-weight:700;">
                      Acessar Profissionais
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:18px 0 0 0;font-size:14px;line-height:1.7;">
                Atenciosamente,<br>
                <strong>Equipe Reciclativa</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 22px;background:#f8fafc;border-top:1px solid #eef1f6;font-family:Arial, sans-serif;color:#64748b;font-size:12px;line-height:1.5;">
              <div>Este é um e-mail automático. Se você não solicitou este cadastro, desconsidere esta mensagem.</div>
              <div style="margin-top:6px;">
                <a href="${SITE_URL}" style="color:#16a34a;text-decoration:none;">${SITE_URL}</a>
                <span style="color:#cbd5e1;"> • </span>
                <span>Transforme resíduos em recursos!</span>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;

  return { subject, text, html };
}

function redirectBack(url: URL, returnTo: string, extra?: string) {
  // Compatibilidade: se ainda vier token na URL, mantém; senão, não coloca.
  const token = url.searchParams.get("token") || "";
  const base =
    `${url.origin}/admin/profissionais` +
    (token ? `?token=${encodeURIComponent(token)}` : `?`) +
    (token ? `&` : ``) +
    `status=${encodeURIComponent(returnTo || "pending")}`;

  return NextResponse.redirect(extra ? `${base}&${extra}` : base);
}

export async function POST(req: Request) {
  const url = new URL(req.url);

  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const payload = await readPayload(req);

    const id = Number(payload.id);
    const action = (payload.action ?? "").toString().toLowerCase() as Action;
    const returnTo = (payload.returnTo ?? "pending").toString();
    const reason = (payload.reason ?? "").toString().trim() || null;

    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
    }
    if (action !== "approve" && action !== "reject") {
      return NextResponse.json({ ok: false, error: "invalid_action" }, { status: 400 });
    }

    const { rows } = await sql<{
      id: number;
      name: string | null;
      email: string | null;
    }>`
      select id, name, email
      from profissionais
      where id = ${id}
      limit 1
    `;
    const p = rows[0];
    if (!p) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

    if (action === "approve") {
      await sql`update profissionais set status='approved' where id=${id}`;

      let mailFail = false;
      const to = (p.email || "").trim().toLowerCase();

      if (to && isEmail(to)) {
        const t = approvalTemplate(p.name || "profissional");
        const sent = await sendResendEmail({
          to,
          subject: t.subject,
          html: t.html,
          text: t.text,
        });
        if (!sent.ok) mailFail = true;
      } else {
        mailFail = true;
      }

      return redirectBack(url, returnTo, mailFail ? "mail=fail" : "mail=ok");
    }

    await sql`
      update profissionais
      set status='rejected',
          rejection_reason=${reason}
      where id=${id}
    `;

    let mailFail = false;
    const to = (p.email || "").trim().toLowerCase();

    if (to && isEmail(to)) {
      const t = rejectionTemplate(p.name || "profissional", reason);
      const sent = await sendResendEmail({
        to,
        subject: t.subject,
        html: t.html,
        text: t.text,
      });
      if (!sent.ok) mailFail = true;
    } else {
      mailFail = true;
    }

    return redirectBack(url, returnTo, mailFail ? "mail=fail" : "mail=ok");
  } catch (e) {
    console.error("STATUS ROUTE ERROR:", e);
    return NextResponse.json(
      { ok: false, error: "Falha ao enviar. Tente novamente." },
      { status: 500 }
    );
  }
}
