import { sql } from "@vercel/postgres";

export type BlacklistKind = "email" | "whatsapp" | "domain";

export function normalizeEmail(email?: string | null) {
  const e = (email || "").trim().toLowerCase();
  return e.includes("@") ? e : "";
}

export function normalizeWhatsApp(whatsapp?: string | null) {
  return (whatsapp || "").replace(/\D/g, "");
}

export function extractDomainFromEmail(email?: string | null) {
  const e = normalizeEmail(email);
  const at = e.indexOf("@");
  if (at < 0) return "";
  return e.slice(at + 1).trim().toLowerCase();
}

export function extractDomainFromWebsite(website?: string | null) {
  const w = (website || "").trim();
  if (!w) return "";

  try {
    const url =
      w.startsWith("http://") || w.startsWith("https://")
        ? new URL(w)
        : new URL(`https://${w}`);
    return url.hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    const host = w
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split(/[\/\?#]/)[0];
    return host || "";
  }
}

export async function isBlacklisted(input: {
  email?: string | null;
  whatsapp?: string | null;
  website?: string | null;
}) {
  const email = normalizeEmail(input.email);
  const whatsapp = normalizeWhatsApp(input.whatsapp);
  const domainFromEmail = extractDomainFromEmail(email);
  const domainFromSite = extractDomainFromWebsite(input.website);

  if (!email && !whatsapp && !domainFromEmail && !domainFromSite) {
    return { blocked: false as const, match: null as any };
  }

  // Consulta “OR” simples (compatível com @vercel/postgres)
  const { rows } = await sql<{
    id: number;
    kind: BlacklistKind;
    value: string;
    note: string | null;
  }>`
    select id, kind, value, note
    from profissionais_blacklist
    where
      (${email} <> '' and kind = 'email' and value = ${email})
      or (${whatsapp} <> '' and kind = 'whatsapp' and value = ${whatsapp})
      or (${domainFromEmail} <> '' and kind = 'domain' and value = ${domainFromEmail})
      or (${domainFromSite} <> '' and kind = 'domain' and value = ${domainFromSite})
    limit 1
  `;

  if (rows.length) return { blocked: true as const, match: rows[0] };
  return { blocked: false as const, match: null as any };
}
