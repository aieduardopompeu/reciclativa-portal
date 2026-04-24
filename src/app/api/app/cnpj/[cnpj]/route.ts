import { NextResponse } from "next/server";

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
  message?: string;
  type?: string;
  errors?: unknown;
};

function onlyDigits(value: string) {
  return (value || "").replace(/\D/g, "");
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

function clean(value: unknown, max = 240) {
  return (value ?? "").toString().trim().replace(/\s+/g, " ").slice(0, max);
}

function normalizeCompany(data: BrasilApiCompany) {
  const cnpjDigits = onlyDigits(data.cnpj || "");

  return {
    provider: "brasilapi",
    cnpj: formatCnpj(cnpjDigits),
    cnpjDigits,
    legalName: clean(data.razao_social, 180),
    tradeName: clean(data.nome_fantasia, 180),
    taxStatus: clean(data.descricao_situacao_cadastral, 80),
    openedAt: clean(data.data_inicio_atividade, 20),
    mainActivity: clean(data.cnae_fiscal_descricao, 220),
    email: clean(data.email, 180).toLowerCase(),
    phone: clean(data.ddd_telefone_1, 40),
    address: {
      street: clean(data.logradouro, 180),
      number: clean(data.numero, 40),
      complement: clean(data.complemento, 120),
      district: clean(data.bairro, 120),
      city: clean(data.municipio, 120),
      state: clean(data.uf, 2).toUpperCase(),
      zipCode: clean(data.cep, 20),
    },
  };
}

function manualLookupResponse(
  cnpjDigits: string,
  message: string,
  status = 200,
  reason: "invalid" | "not_found" | "unavailable" | "incomplete_data" = "unavailable",
) {
  return NextResponse.json(
    {
      ok: false,
      manualAllowed: true,
      reason,
      message,
      company: {
        cnpj: formatCnpj(cnpjDigits),
        cnpjDigits,
      },
    },
    { status },
  );
}

async function readErrorBody(response: Response) {
  const text = await response.text().catch(() => "");

  if (!text) return null;

  try {
    return JSON.parse(text) as BrasilApiCompany;
  } catch {
    return { message: text } as BrasilApiCompany;
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cnpj: string }> },
) {
  const { cnpj: rawCnpj } = await params;
  const cnpj = onlyDigits(rawCnpj);

  if (!isValidCnpj(cnpj)) {
    return NextResponse.json(
      {
        ok: false,
        manualAllowed: false,
        reason: "invalid",
        message: "Informe um CNPJ válido.",
      },
      { status: 400 },
    );
  }

  let response: Response | null = null;

  try {
    response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Reciclativa-Gestao/1.0",
      },
      cache: "no-store",
    });
  } catch (error) {
    console.error("CNPJ_LOOKUP_FETCH_ERROR", error);
  }

  if (!response) {
    return manualLookupResponse(
      cnpj,
      "Não conseguimos consultar esse CNPJ agora. Você pode continuar para análise manual.",
      503,
      "unavailable",
    );
  }

  if (response.status === 404) {
    return manualLookupResponse(
      cnpj,
      "Não encontramos esse CNPJ na consulta pública. Você pode continuar para análise manual.",
      404,
      "not_found",
    );
  }

  if (response.status === 429 || response.status >= 500) {
    const errorBody = await readErrorBody(response);
    console.error("CNPJ_LOOKUP_PROVIDER_UNAVAILABLE", {
      status: response.status,
      body: errorBody,
      cnpj,
    });

    return manualLookupResponse(
      cnpj,
      "A consulta pública do CNPJ está temporariamente indisponível. Você pode continuar para análise manual.",
      503,
      "unavailable",
    );
  }

  if (!response.ok) {
    const errorBody = await readErrorBody(response);
    console.error("CNPJ_LOOKUP_PROVIDER_ERROR", {
      status: response.status,
      body: errorBody,
      cnpj,
    });

    return manualLookupResponse(
      cnpj,
      "Não foi possível concluir a consulta pública deste CNPJ agora. Você pode continuar para análise manual.",
      502,
      "unavailable",
    );
  }

  const data = (await response.json()) as BrasilApiCompany;
  const company = normalizeCompany(data);

  if (!company.legalName || company.cnpjDigits !== cnpj) {
    console.error("CNPJ_LOOKUP_INCOMPLETE_DATA", { cnpj, data });

    return manualLookupResponse(
      cnpj,
      "A consulta retornou dados incompletos. Você pode continuar para análise manual.",
      502,
      "incomplete_data",
    );
  }

  return NextResponse.json({ ok: true, manualAllowed: false, company });
}
