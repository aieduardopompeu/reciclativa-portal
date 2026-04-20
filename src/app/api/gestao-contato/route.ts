import { NextResponse } from "next/server";

export const runtime = "nodejs";

function cleanText(s: unknown, max = 500) {
  return (s ?? "")
    .toString()
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, max);
}

function onlyDigits(s: string) {
  return (s || "").replace(/\D/g, "");
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatContactType(value: string) {
  const v = value.trim().toLowerCase();

  if (v === "contato comercial") return "Contato comercial";
  if (v === "dúvidas sobre a plataforma" || v === "duvidas sobre a plataforma") {
    return "Dúvidas sobre a plataforma";
  }

  return "Solicitação de demonstração";
}

function formatSourceLabel(value: string) {
  const v = value.trim().toLowerCase();

  if (v === "demo") return "Solicitar demonstração";
  if (v === "comercial") return "Falar com a equipe";
  if (v === "gestao") return "Página Gestão";

  return value.trim();
}

async function sendResendEmail(params: { to: string; subject: string; html: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY || "";
  const from = process.env.RESEND_FROM || process.env.EMAIL_FROM || "";

  if (!apiKey || !from) {
    console.error("GESTAO_CONTATO: missing RESEND_API_KEY or RESEND_FROM/EMAIL_FROM");
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
      console.error("GESTAO_CONTATO RESEND ERROR:", res.status, body);
      return { ok: false as const };
    }

    return { ok: true as const };
  } catch (error) {
    console.error("GESTAO_CONTATO RESEND FETCH ERROR:", error);
    return { ok: false as const };
  }
}

function getBaseUrl(req: Request) {
  const url = new URL(req.url);

  const forwardedProto =
    req.headers.get("x-forwarded-proto") ||
    req.headers.get("x-forwarded-protocol") ||
    url.protocol.replace(":", "");

  const forwardedHost = req.headers.get("x-forwarded-host") || req.headers.get("host");

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return url.origin;
}

function redirectWith(req: Request, status: "ok" | "error", message?: string) {
  const url = new URL("/gestao/contato", getBaseUrl(req));

  if (status === "ok") {
    url.searchParams.set("ok", "1");
  } else if (message) {
    url.searchParams.set("error", message);
  }

  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();

    const honeypot = cleanText(fd.get("companyWebsite"), 200);
    if (honeypot) {
      return redirectWith(req, "error", "Não foi possível concluir o envio no momento.");
    }

    const tipoOrigem = cleanText(fd.get("tipoOrigem"), 30);
    const name = cleanText(fd.get("name"), 120);
    const company = cleanText(fd.get("company"), 160);
    const email = cleanText(fd.get("email"), 160).toLowerCase();
    const whatsapp = onlyDigits(cleanText(fd.get("whatsapp"), 30)).slice(0, 20);
    const city = cleanText(fd.get("city"), 80);
    const uf = cleanText(fd.get("uf"), 2).toUpperCase();
    const contactType = formatContactType(cleanText(fd.get("contactType"), 80));
    const sourceLabel = formatSourceLabel(tipoOrigem);
    const message = cleanText(fd.get("message"), 1800);

    if (!name || name.length < 2) {
      return redirectWith(req, "error", "Informe um nome válido.");
    }
    if (!company || company.length < 2) {
      return redirectWith(req, "error", "Informe o nome da empresa.");
    }
    if (!email || !isEmail(email)) {
      return redirectWith(req, "error", "Informe um e-mail válido.");
    }
    if (!message || message.length < 10) {
      return redirectWith(req, "error", "Escreva uma mensagem um pouco mais completa.");
    }
    if (whatsapp && whatsapp.length < 10) {
      return redirectWith(req, "error", "WhatsApp inválido. Informe DDD + número.");
    }

    const notifyTo =
      cleanText(process.env.GESTAO_NOTIFY_EMAIL, 160) ||
      cleanText(process.env.ADMIN_NOTIFY_EMAIL, 160) ||
      cleanText(process.env.CONTACT_EMAIL, 160);

    if (!notifyTo || !isEmail(notifyTo)) {
      console.error(
        "GESTAO_CONTATO: missing valid GESTAO_NOTIFY_EMAIL/ADMIN_NOTIFY_EMAIL/CONTACT_EMAIL"
      );
      return redirectWith(req, "error", "O canal de atendimento ainda não está configurado.");
    }

    const subject = `${contactType} — Reciclativa Gestão`;

    const sourceLine = sourceLabel ? `Botão de origem: ${sourceLabel}` : null;

    const summaryLines = [
      `Nome: ${name}`,
      `Empresa: ${company}`,
      `E-mail: ${email}`,
      whatsapp ? `WhatsApp: ${whatsapp}` : null,
      city ? `Cidade: ${city}` : null,
      uf ? `UF: ${uf}` : null,
      `Tipo de contato: ${contactType}`,
      sourceLine,
      "",
      "Mensagem:",
      message,
    ].filter(Boolean) as string[];

    const text = summaryLines.join("\n");

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:680px;">
        <h2 style="margin:0 0 12px 0;">${escapeHtml(subject)}</h2>
        <p style="margin:0 0 8px 0;"><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 8px 0;"><strong>Empresa:</strong> ${escapeHtml(company)}</p>
        <p style="margin:0 0 8px 0;"><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        ${whatsapp ? `<p style="margin:0 0 8px 0;"><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>` : ""}
        ${city ? `<p style="margin:0 0 8px 0;"><strong>Cidade:</strong> ${escapeHtml(city)}</p>` : ""}
        ${uf ? `<p style="margin:0 0 8px 0;"><strong>UF:</strong> ${escapeHtml(uf)}</p>` : ""}
        <p style="margin:0 0 8px 0;"><strong>Tipo de contato:</strong> ${escapeHtml(contactType)}</p>
        ${sourceLine ? `<p style="margin:0 0 8px 0;"><strong>Botão de origem:</strong> ${escapeHtml(sourceLabel)}</p>` : ""}
        <div style="margin-top:16px;padding:16px;border:1px solid #d1d5db;border-radius:12px;background:#f8fafc;">
          <p style="margin:0 0 8px 0;"><strong>Mensagem</strong></p>
          <p style="margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
        <p style="margin-top:16px;color:#64748b;font-size:12px;">Reciclativa Gestão</p>
      </div>
    `;

    const sent = await sendResendEmail({ to: notifyTo, subject, html, text });

    if (!sent.ok) {
      return redirectWith(req, "error", "Falha ao enviar o e-mail. Tente novamente em instantes.");
    }

    return redirectWith(req, "ok");
  } catch (error) {
    console.error("API /api/gestao-contato POST ERROR:", error);
    return redirectWith(req, "error", "Falha ao enviar o contato.");
  }
}

export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}
