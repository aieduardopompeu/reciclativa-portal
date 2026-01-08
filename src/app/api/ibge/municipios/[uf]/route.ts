import { NextResponse } from "next/server";

type Ctx = { params: Promise<{ uf: string }> };

export async function GET(_req: Request, context: Ctx) {
  const { uf: ufParam } = await context.params;

  const uf = (ufParam || "").trim().slice(0, 2).toUpperCase();

  // valida UF minimamente
  if (!/^[A-Z]{2}$/.test(uf)) {
    return NextResponse.json({ ok: false, error: "UF inválida." }, { status: 400 });
  }

  // IBGE: municípios por UF, ordenados por nome
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 }, // 24h
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `IBGE respondeu ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();

    const cities = Array.isArray(data)
      ? data.map((m: any) => ({ id: m?.id, name: m?.nome }))
      : [];

    return NextResponse.json(
      { ok: true, uf, cities },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Falha ao consultar IBGE." },
      { status: 502 }
    );
  }
}
