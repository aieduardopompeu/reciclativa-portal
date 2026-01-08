import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs";

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function onlyDigits(s: string) {
  return (s || "").replace(/\D/g, "");
}

function normalizeUF(uf: string) {
  return (uf || "").trim().slice(0, 2).toLowerCase();
}

function cleanText(s: unknown, max = 500) {
  return (s ?? "")
    .toString()
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, max);
}

async function readPayload(req: Request) {
  const ct = (req.headers.get("content-type") || "").toLowerCase();

  if (ct.includes("application/json")) {
    const json = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    return json;
  }

  const fd = await req.formData().catch(() => null);
  const obj: Record<string, unknown> = {};
  if (fd) for (const [k, v] of fd.entries()) obj[k] = v;
  return obj;
}

async function sendResendEmail(params: { to: string; subject: string; html: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY || "";
  const from = process.env.RESEND_FROM || process.env.EMAIL_FROM || "";

  if (!apiKey || !from) {
    console.error("RESEND: missing RESEND_API_KEY or RESEND_FROM/EMAIL_FROM");
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
      console.error("RESEND ERROR:", res.status, body);
      return { ok: false as const };
    }

    return { ok: true as const };
  } catch (e) {
    console.error("RESEND FETCH ERROR:", e);
    return { ok: false as const };
  }
}

export async function POST(req: Request) {
  try {
    const payload = await readPayload(req);

    // Campos vindos do seu formulário /anuncie
    const name = cleanText(payload.name ?? payload.nome ?? payload.empresa, 120);
    const uf = normalizeUF(cleanText(payload.uf, 2));
    const city = cleanText(payload.city ?? payload.cidade, 80);

    const category = cleanText(payload.category ?? payload.categoria, 80) || null;
    const service = cleanText(payload.service ?? payload.servico, 160) || null;
    const description = cleanText(payload.description ?? payload.descricao, 1200) || null;

    const whatsappRaw = cleanText(payload.whatsapp, 40);
    const whatsapp = whatsappRaw ? onlyDigits(whatsappRaw).slice(0, 20) : null;

    const emailRaw = cleanText(payload.email, 160);
    const email = emailRaw ? emailRaw.toLowerCase() : null;

    const website = cleanText(payload.website ?? payload.site, 200) || null;

    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: "Nome inválido" }, { status: 400 });
    }
    if (!uf || uf.length !== 2) {
      return NextResponse.json({ ok: false, error: "UF inválida" }, { status: 400 });
    }
    if (!city || city.length < 2) {
      return NextResponse.json({ ok: false, error: "Cidade inválida" }, { status: 400 });
    }
    if (email && !isEmail(email)) {
      return NextResponse.json({ ok: false, error: "E-mail inválido" }, { status: 400 });
    }

    // Salva pendente
    const { rows } = await sql<{ id: number }>`
      insert into profissionais
        (name, uf, city, category, service, description, whatsapp, email, website, status)
      values
        (${name}, ${uf}, ${city}, ${category}, ${service}, ${description}, ${whatsapp}, ${email}, ${website}, 'pending')
      returning id
    `;

    const newId = rows?.[0]?.id;

    // Notifica admin por e-mail (opcional)
    const notifyTo = (process.env.ADMIN_NOTIFY_EMAIL || "").trim();
    if (notifyTo && isEmail(notifyTo)) {
      const subject = `Novo cadastro pendente (#${newId ?? "novo"}) — Reciclativa`;

      const text =
        `Novo cadastro pendente:\n\n` +
        `Nome/Empresa: ${name}\nUF: ${uf}\nCidade: ${city}\n` +
        (category ? `Categoria: ${category}\n` : "") +
        (service ? `Serviço: ${service}\n` : "") +
        (email ? `E-mail: ${email}\n` : "") +
        (whatsapp ? `WhatsApp: ${whatsapp}\n` : "") +
        (website ? `Site: ${website}\n` : "") +
        `\n\nAcesse o painel para aprovar/rejeitar.`;

      const html = `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
          <h2 style="margin:0 0 10px 0;">Novo cadastro pendente</h2>
          <p style="margin:0 0 6px 0;"><strong>Nome/Empresa:</strong> ${name}</p>
          <p style="margin:0 0 6px 0;"><strong>UF:</strong> ${uf} <strong>Cidade:</strong> ${city}</p>
          ${category ? `<p style="margin:0 0 6px 0;"><strong>Categoria:</strong> ${category}</p>` : ""}
          ${service ? `<p style="margin:0 0 6px 0;"><strong>Serviço:</strong> ${service}</p>` : ""}
          ${email ? `<p style="margin:0 0 6px 0;"><strong>E-mail:</strong> ${email}</p>` : ""}
          ${whatsapp ? `<p style="margin:0 0 6px 0;"><strong>WhatsApp:</strong> ${whatsapp}</p>` : ""}
          ${website ? `<p style="margin:0 0 6px 0;"><strong>Site:</strong> ${website}</p>` : ""}
          <p style="margin:14px 0 0 0;color:#64748b;font-size:12px;">Reciclativa</p>
        </div>
      `;

      // não bloqueia cadastro se e-mail falhar
      await sendResendEmail({ to: notifyTo, subject, html, text });
    }

    return NextResponse.json({ ok: true, id: newId }, { status: 200 });
  } catch (e) {
    console.error("API /api/profissionais POST ERROR:", e);
    return NextResponse.json({ ok: false, error: "Falha ao enviar." }, { status: 500 });
  }
}

// opcional: evita 405 em GET
export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}
