import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "nodejs";

type BrasilApiCompany = {
  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string | null;
  descricao_situacao_cadastral?: string;
  data_inicio_atividade?: string;
  cnae_fiscal_descricao?: string;
  email?: string | null;
  ddd_telefone_1?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  municipio?: string | null;
  uf?: string | null;
  cep?: string | null;
};

type CompanyLookup = {
  provider: string;
  cnpj: string;
  cnpjDigits: string;
  legalName: string;
  tradeName: string;
  taxStatus: string;
  openedAt: string;
  mainActivity: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
  payload: BrasilApiCompany;
};

const allowedModules = new Set([
  "operation",
  "inventory",
  "finance",
  "customers_suppliers",
  "reports",
  "multiunit",
]);

function cleanText(value: unknown, max = 500) {
  return (value ?? "").toString().trim().replace(/\s+/g, " ").slice(0, max);
}

function onlyDigits(value: string) {
  return (value || "").replace(/\D/g, "");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidCnpj(value: string) {
  const cnpj = onlyDigits(value);
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  const calcDigit = (base: string, weights: number[]) => {
    const sum = base
      .split("")
      .reduce((acc, digit, index) => acc + Number(digit) * weights[index], 0);
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const first = calcDigit(cnpj.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const second = calcDigit(cnpj.slice(0, 13), [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  return first === Number(cnpj[12]) && second === Number(cnpj[13]);
}

function formatCnpj(value: string) {
  const cnpj = onlyDigits(value);
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

function normalizeCompany(data: BrasilApiCompany): CompanyLookup {
  const cnpjDigits = onlyDigits(data.cnpj || "");

  return {
    provider: "brasilapi",
    cnpj: formatCnpj(cnpjDigits),
    cnpjDigits,
    legalName: cleanText(data.razao_social, 180),
    tradeName: cleanText(data.nome_fantasia, 180),
    taxStatus: cleanText(data.descricao_situacao_cadastral, 80),
    openedAt: cleanText(data.data_inicio_atividade, 20),
    mainActivity: cleanText(data.cnae_fiscal_descricao, 220),
    email: cleanText(data.email, 180).toLowerCase(),
    phone: cleanText(data.ddd_telefone_1, 40),
    address: {
      street: cleanText(data.logradouro, 180),
      number: cleanText(data.numero, 40),
      complement: cleanText(data.complemento, 120),
      district: cleanText(data.bairro, 120),
      city: cleanText(data.municipio, 120),
      state: cleanText(data.uf, 2).toUpperCase(),
      zipCode: cleanText(data.cep, 20),
    },
    payload: data,
  };
}

async function lookupCnpj(cnpjDigits: string): Promise<CompanyLookup | null> {
  const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjDigits}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  }).catch((error) => {
    console.error("SIGNUP_CNPJ_LOOKUP_FETCH_ERROR", error);
    return null;
  });

  if (!response?.ok) {
    if (response) {
      console.error("SIGNUP_CNPJ_LOOKUP_HTTP_ERROR", {
        status: response.status,
        cnpjDigits,
      });
    }
    return null;
  }

  const data = (await response.json()) as BrasilApiCompany;
  const company = normalizeCompany(data);

  if (!company.legalName || company.cnpjDigits !== cnpjDigits) {
    console.error("SIGNUP_CNPJ_LOOKUP_INVALID_PAYLOAD", { cnpjDigits });
    return null;
  }

  return company;
}

function getBaseUrl(req: Request) {
  const url = new URL(req.url);
  const proto = req.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  return host ? `${proto}://${host}` : url.origin;
}

function redirectWith(req: Request, status: "ok" | "error", message?: string) {
  const url = new URL("/app/cadastre-se", getBaseUrl(req));

  if (status === "ok") {
    url.searchParams.set("ok", "1");
  } else if (message) {
    url.searchParams.set("error", message);
  }

  return NextResponse.redirect(url, { status: 303 });
}

function buildSubmittedCompany(formData: FormData, cnpjDigits: string): CompanyLookup | null {
  const legalName = cleanText(formData.get("legal_name"), 180);
  if (!legalName || legalName.length < 3) return null;

  const tradeName = cleanText(formData.get("trade_name"), 180);
  const taxStatus = cleanText(formData.get("tax_status"), 80);
  const openedAt = cleanText(formData.get("opened_at"), 20);
  const mainActivity = cleanText(formData.get("main_activity"), 220);
  const officialEmail = cleanText(formData.get("official_email"), 180).toLowerCase();
  const officialPhone = cleanText(formData.get("official_phone"), 40);
  const officialStreet = cleanText(formData.get("official_street"), 180);
  const officialNumber = cleanText(formData.get("official_number"), 40);
  const officialComplement = cleanText(formData.get("official_complement"), 120);
  const officialDistrict = cleanText(formData.get("official_district"), 120);
  const officialCity = cleanText(formData.get("official_city"), 120);
  const officialState = cleanText(formData.get("official_state"), 2).toUpperCase();
  const officialZipCode = cleanText(formData.get("official_zip_code"), 20);

  return {
    provider: "form",
    cnpj: formatCnpj(cnpjDigits),
    cnpjDigits,
    legalName,
    tradeName,
    taxStatus,
    openedAt,
    mainActivity,
    email: officialEmail,
    phone: officialPhone,
    address: {
      street: officialStreet,
      number: officialNumber,
      complement: officialComplement,
      district: officialDistrict,
      city: officialCity,
      state: officialState,
      zipCode: officialZipCode,
    },
    payload: {
      cnpj: formatCnpj(cnpjDigits),
      razao_social: legalName,
      nome_fantasia: tradeName || null,
      descricao_situacao_cadastral: taxStatus,
      data_inicio_atividade: openedAt,
      cnae_fiscal_descricao: mainActivity,
      email: officialEmail || null,
      ddd_telefone_1: officialPhone || null,
      logradouro: officialStreet || null,
      numero: officialNumber || null,
      complemento: officialComplement || null,
      bairro: officialDistrict || null,
      municipio: officialCity || null,
      uf: officialState || null,
      cep: officialZipCode || null,
    },
  };
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const honeypot = cleanText(formData.get("companyWebsite"), 200);
    if (honeypot) {
      return redirectWith(req, "error", "Não foi possível concluir o cadastro agora.");
    }

    const cnpjDigits = onlyDigits(cleanText(formData.get("cnpj"), 24));
    const manualLegalName = cleanText(formData.get("legal_name"), 180);
    const responsibleName = cleanText(formData.get("responsible_name"), 140);
    const responsibleEmail = cleanText(formData.get("responsible_email"), 180).toLowerCase();
    const responsibleWhatsapp = onlyDigits(cleanText(formData.get("responsible_whatsapp"), 40)).slice(0, 20);
    const operationalCity = cleanText(formData.get("operational_city"), 120);
    const operationalState = cleanText(formData.get("operational_state"), 2).toUpperCase();
    const operationType = cleanText(formData.get("operation_type"), 120);
    const message = cleanText(formData.get("message"), 1800);
    const expectedModules = formData
      .getAll("expected_modules")
      .map((value) => cleanText(value, 40))
      .filter((value) => allowedModules.has(value));
    const modulesCsv = Array.from(new Set(expectedModules)).join(",");

    if (!isValidCnpj(cnpjDigits)) {
      return redirectWith(req, "error", "Informe um CNPJ válido antes de enviar.");
    }

    if (!responsibleName || responsibleName.length < 2) {
      return redirectWith(req, "error", "Informe o nome do responsável.");
    }

    if (!responsibleEmail || !isEmail(responsibleEmail)) {
      return redirectWith(req, "error", "Informe um e-mail válido para o responsável.");
    }

    if (!responsibleWhatsapp || responsibleWhatsapp.length < 10) {
      return redirectWith(req, "error", "Informe um WhatsApp válido com DDD.");
    }

    if (!operationalCity || operationalCity.length < 2 || operationalState.length !== 2) {
      return redirectWith(req, "error", "Informe cidade e UF operacional.");
    }

    if (!operationType) {
      return redirectWith(req, "error", "Informe o tipo de operação da empresa.");
    }

    if (expectedModules.length === 0) {
      return redirectWith(req, "error", "Selecione ao menos um módulo de interesse.");
    }

    const existingOrganization = await sql<{ id: string }>`
      select id::text
      from organizations
      where regexp_replace(cnpj, '\\D', '', 'g') = ${cnpjDigits}
      limit 1
    `;

    if (existingOrganization.rows[0]) {
      return redirectWith(
        req,
        "error",
        "Este CNPJ já possui empresa cadastrada na Reciclativa Gestão.",
      );
    }

    const submittedCompany = buildSubmittedCompany(formData, cnpjDigits);
    const lookedUpCompany = await lookupCnpj(cnpjDigits);
    const company = lookedUpCompany || submittedCompany;
    const isManualLookup = !company;

    if (isManualLookup && (!manualLegalName || manualLegalName.length < 3)) {
      return redirectWith(req, "error", "Informe a razão social para análise manual.");
    }

    const duplicate = await sql<{ id: string; status: string }>`
      select id, status
      from company_signups
      where regexp_replace(cnpj, '\\D', '', 'g') = ${cnpjDigits}
        and status in ('pending', 'under_review', 'approved', 'needs_adjustment')
      order by created_at desc
      limit 1
    `;

    if (duplicate.rows[0]) {
      return redirectWith(
        req,
        "error",
        duplicate.rows[0].status === "approved"
          ? "Este CNPJ já possui solicitação aprovada. Entre em contato com o suporte."
          : "Já existe uma solicitação em andamento para este CNPJ.",
      );
    }

    await sql`
      insert into company_signups (
        cnpj,
        legal_name,
        trade_name,
        lookup_mode,
        tax_status,
        opened_at,
        main_activity,
        official_email,
        official_phone,
        official_street,
        official_number,
        official_complement,
        official_district,
        official_city,
        official_state,
        official_zip_code,
        contact_name,
        contact_role,
        contact_email,
        contact_phone,
        contact_whatsapp,
        requested_modules,
        notes_from_applicant,
        status
      ) values (
        ${company?.cnpj || formatCnpj(cnpjDigits)},
        ${company?.legalName || manualLegalName},
        ${company?.tradeName || null},
        ${lookedUpCompany ? "public_lookup" : "manual"},
        ${company?.taxStatus || null},
        ${company?.openedAt || null},
        ${company?.mainActivity || null},
        ${company?.email || null},
        ${company?.phone || null},
        ${company?.address.street || null},
        ${company?.address.number || null},
        ${company?.address.complement || null},
        ${company?.address.district || null},
        ${company?.address.city || operationalCity || null},
        ${company?.address.state || operationalState || null},
        ${company?.address.zipCode || null},
        ${responsibleName},
        ${operationType || null},
        ${responsibleEmail},
        ${null},
        ${responsibleWhatsapp},
        case when ${modulesCsv} = '' then '[]'::jsonb else to_jsonb(string_to_array(${modulesCsv}, ',')) end,
        ${message || null},
        ${'pending'}
      )
    `;

    return redirectWith(req, "ok");
  } catch (error) {
    console.error("API /api/app/signup POST ERROR:", error);
    return redirectWith(req, "error", "Falha ao enviar o cadastro.");
  }
}
