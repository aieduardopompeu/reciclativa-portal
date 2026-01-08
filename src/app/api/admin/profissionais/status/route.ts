import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

function safeReturnTo(v: string) {
  const x = (v || "").toLowerCase();
  if (x === "pending" || x === "approved" || x === "rejected") return x;
  return "pending";
}

async function mustAuth() {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;

  const store = await cookies(); // Next 16: async
  const token = store.get("admin-token")?.value;

  return !!token && token === expected;
}

function escapeHtml(s: string) {
  return (s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendEmailResend(params: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY || "";
  const from = process.env.RESEND_FROM || "";

  if (!apiKey || !from) {
    console.warn("[email] RESEND_API_KEY/RESEND_FROM ausentes — e-mail não enviado.");
    return { ok: false, skipped: true as const };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("[email] Resend erro:", res.status, data);
    return { ok: false, status: res.status, data };
  }

  console.log("[email] Resend OK:", data);
  return { ok: true, data };
}

function emailTemplateBase(opts: {
  title: string;
  bodyHtml: string;
  footerHtml?: string;
}) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.reciclativa.com").replace(
    /\/$/,
    ""
  );

  // Troquei para a versão clara (recomendado para fundo escuro)
  const logoUrl = `${siteUrl}/brand/logo-email-light.png`;

  const socials = {
    instagram: "https://www.instagram.com/reciclativa/",
    youtube: "https://www.youtube.com/@Reciclativa",
    tiktok: "https://www.tiktok.com/@reciclativa",
    linkedin: "https://www.linkedin.com/in/reciclativa/",
    x: "https://x.com/ReciclativaBR",
  };

  const iconStyle = "display:inline-block; width:22px; height:22px; vertical-align:middle;";
  const iconWrapStyle = "display:inline-block; margin-left:10px; text-decoration:none;";

  const svgInstagram = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="${iconStyle}">
      <path fill="#64748b" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6zm5.5-2.2a1.1 1.1 0 1 1 0 2.2a1.1 1.1 0 0 1 0-2.2z"/>
    </svg>`;

  const svgTikTok = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="${iconStyle}">
      <path fill="#64748b" d="M16 3c.6 2.8 2.3 4.5 5 5v3.1c-2 0-3.7-.6-5-1.6V16c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.4 0 .8 0 1.2.1v3.3c-.4-.2-.8-.3-1.2-.3-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3V3h3z"/>
    </svg>`;

  const svgYouTube = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="${iconStyle}">
      <path fill="#64748b" d="M21.6 7.2s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C15.8 4 12 4 12 4h0s-3.8 0-6.7.3c-.4 0-1.3.1-2.1.9-.6.6-.8 2-.8 2S2 8.8 2 10.4v1.2c0 1.6.4 3.2.4 3.2s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.7.2 6.4.3 6.4.3s3.8 0 6.7-.3c.4 0 1.3-.1 2.1-.9.6-.6.8-2 .8-2s.4-1.6.4-3.2v-1.2c0-1.6-.4-3.2-.4-3.2zM10 14.9V9.1l5.2 2.9L10 14.9z"/>
    </svg>`;

  const svgLinkedIn = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="${iconStyle}">
      <path fill="#64748b" d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3.5 21h3V9h-3v12zM9 9h2.9v1.7h.04c.4-.8 1.4-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8V21h-3v-5.4c0-1.3 0-2.9-1.8-2.9-1.8 0-2.1 1.4-2.1 2.8V21H9V9z"/>
    </svg>`;

  const svgX = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="${iconStyle}">
      <path fill="#64748b" d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.1 7H2l8.2-9.4L1 2h7.1l4.9 6.4L18.9 2zm-1.2 18h1.7L7.2 3.9H5.4L17.7 20z"/>
    </svg>`;

  const socialIconsHtml = `
    <a href="${socials.instagram}" style="${iconWrapStyle}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${svgInstagram}</a>
    <a href="${socials.tiktok}" style="${iconWrapStyle}" target="_blank" rel="noopener noreferrer" aria-label="TikTok">${svgTikTok}</a>
    <a href="${socials.youtube}" style="${iconWrapStyle}" target="_blank" rel="noopener noreferrer" aria-label="YouTube">${svgYouTube}</a>
    <a href="${socials.linkedin}" style="${iconWrapStyle}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${svgLinkedIn}</a>
    <a href="${socials.x}" style="${iconWrapStyle}" target="_blank" rel="noopener noreferrer" aria-label="X">${svgX}</a>
  `;

  const footerHtml =
    opts.footerHtml ||
    `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <div>Se você tiver dúvidas, responda este e-mail.</div>
        <div style="white-space:nowrap;">${socialIconsHtml}</div>
      </div>
    `;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif; background:#f6f7f9; padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
      <div style="padding:18px 20px;background:#0f766e;color:#fff;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <td style="vertical-align:middle;">
              <img src="${logoUrl}" alt="Reciclativa" height="120" style="display:block;height:120px;width:auto;" />
            </td>
            <td style="vertical-align:middle;text-align:right;">
              <div style="font-size:14px;font-weight:700;opacity:.95;">
                Transforme resíduos em recursos!
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div style="padding:22px 20px;">
        <h1 style="margin:0 0 12px;font-size:18px;color:#0f172a;">${escapeHtml(opts.title)}</h1>
        <div style="font-size:14px;line-height:1.6;color:#334155;">${opts.bodyHtml}</div>
      </div>

      <div style="padding:14px 20px;border-top:1px solid #e5e7eb;font-size:12px;color:#64748b;">
        ${footerHtml}
      </div>
    </div>
  </div>`;
}

export async function POST(req: Request) {
  const ok = await mustAuth();
  if (!ok) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const form = await req.formData();

  const idRaw = (form.get("id") || "").toString();
  const action = (form.get("action") || "").toString(); // approve | reject
  const reason = (form.get("reason") || "").toString().slice(0, 1000);
  const addToBlacklist = (form.get("addToBlacklist") || "").toString() === "1";
  const returnTo = safeReturnTo((form.get("returnTo") || "").toString());

  const id = Number(idRaw);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }

  if (action !== "approve" && action !== "reject") {
    return NextResponse.json({ ok: false, error: "invalid_action" }, { status: 400 });
  }

  const newStatus = action === "approve" ? "approved" : "rejected";

  // Atualiza status e pega dados para e-mail/blacklist
  const updated = await sql<{
    id: number;
    email: string | null;
    whatsapp: string | null;
    website: string | null;
    name: string | null;
  }>`
    update profissionais
    set status = ${newStatus}
    where id = ${id}
    returning id, email, whatsapp, website, name
  `;

  if (updated.rowCount === 0) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  const row = updated.rows[0];
  const email = (row.email || "").trim().toLowerCase();
  const name = (row.name || "").trim();

  // Blacklist (opcional): não quebra se tabela não existir
  if (action === "reject" && addToBlacklist) {
    const whatsapp = (row.whatsapp || "").toString().trim();
    const website = (row.website || "").toString().trim().toLowerCase();

    try {
      const inserts: Array<Promise<any>> = [];

      if (email) {
        inserts.push(sql`
          insert into admin_blacklist (type, value, reason)
          values ('email', ${email}, ${reason})
          on conflict do nothing
        `);
      }
      if (whatsapp) {
        inserts.push(sql`
          insert into admin_blacklist (type, value, reason)
          values ('whatsapp', ${whatsapp}, ${reason})
          on conflict do nothing
        `);
      }
      if (website) {
        inserts.push(sql`
          insert into admin_blacklist (type, value, reason)
          values ('website', ${website}, ${reason})
          on conflict do nothing
        `);
      }

      if (inserts.length) await Promise.all(inserts);
    } catch {
      // Se a tabela não existir ainda, não interrompe o fluxo.
    }
  }

  // Envio de e-mail (não bloqueia o painel se falhar)
  try {
    if (!email) {
      console.warn("[email] Profissional sem e-mail — não enviado. id:", id);
    } else if (action === "approve") {
      const subject = "Seu cadastro foi aprovado na Reciclativa";
      const bodyHtml = `
        <p>Olá${name ? `, <strong>${escapeHtml(name)}</strong>` : ""}.</p>
        <p>Boa notícia: seu cadastro de profissional foi <strong>aprovado</strong> e já pode aparecer no diretório da Reciclativa.</p>
        <p>Obrigado por contribuir com a economia circular.</p>
        <p style="margin-top:16px;">
          <a href="https://www.reciclativa.com/profissionais" style="display:inline-block;background:#16a34a;color:#fff;text-decoration:none;padding:10px 14px;border-radius:10px;font-weight:700;">
            Ver profissionais
          </a>
        </p>
      `;

      await sendEmailResend({
        to: email,
        subject,
        html: emailTemplateBase({ title: "Cadastro aprovado", bodyHtml }),
        text: `Olá${name ? `, ${name}` : ""}. Seu cadastro foi aprovado e já pode aparecer no diretório da Reciclativa.`,
      });
    } else {
      const subject = "Atualização sobre seu cadastro na Reciclativa";
      const bodyHtml = `
        <p>Olá${name ? `, <strong>${escapeHtml(name)}</strong>` : ""}.</p>
        <p>Obrigado pelo seu envio. No momento, não foi possível aprovar seu cadastro.</p>
        ${
          reason
            ? `<p><strong>Motivo informado:</strong><br/>${escapeHtml(reason).replaceAll(
                "\n",
                "<br/>"
              )}</p>`
            : ""
        }
        <p>Você pode ajustar as informações e tentar novamente mais tarde.</p>
      `;

      await sendEmailResend({
        to: email,
        subject,
        html: emailTemplateBase({ title: "Cadastro não aprovado", bodyHtml }),
        text: `Olá${name ? `, ${name}` : ""}. No momento não foi possível aprovar seu cadastro.${reason ? ` Motivo: ${reason}` : ""}`,
      });
    }
  } catch (e) {
    console.error("[email] Falha ao enviar e-mail (não bloqueante):", e);
  }

  // PRG correto: 303 força GET
  const redirectUrl = new URL(`/admin/profissionais?status=${returnTo}`, req.url);
  return NextResponse.redirect(redirectUrl, 303);
}
