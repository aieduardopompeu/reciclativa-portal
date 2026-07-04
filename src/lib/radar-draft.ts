// src/lib/radar-draft.ts
//
// Redação automática do rascunho da matéria a partir de um resultado de
// busca (radar-search.ts), usando a API da OpenAI em modo JSON estruturado.
import { RADAR_TAGS, type RadarTag } from "@/lib/radar";
import type { RadarSearchResult } from "@/lib/radar-search";

export type RadarDraft = {
  titulo: string;
  resumo: string;
  conteudo: string;
  tag: RadarTag;
  cidade_uf: string | null;
  relevancia: number;
  risco: number;
};

const SYSTEM_PROMPT = `Você é um editor do "Radar Ambiental", seção do portal brasileiro Reciclativa sobre reciclagem, sustentabilidade e descarte de eletrônicos.

Você recebe o conteúdo bruto de uma notícia real e deve transformá-la em uma matéria editorial estruturada.

Responda ESTRITAMENTE em JSON (sem markdown, sem comentários), neste formato:
{
  "titulo": "direto e informativo, até 120 caracteres",
  "resumo": "1-2 frases, até 240 caracteres",
  "conteudo": "HTML simples (parágrafos <p>, subtítulos <h2>/<h3>, listas <ul>/<li> quando fizer sentido), 3 a 6 parágrafos, reescrito com suas próprias palavras a partir da fonte, sem plágio. NUNCA inclua <h1> nem repita o título — a página já exibe o título separadamente, o conteúdo deve começar direto por um parágrafo ou, no máximo, um <h2>",
  "tag": "uma destas: oportunidade | legislacao | educativo | parceria | esg | tendencia",
  "cidade_uf": "ex: 'Rio de Janeiro · RJ' se for uma notícia de cidade/estado específico do Brasil, ou null se for nacional/genérica",
  "relevancia": numero de 1 a 5 (5 = muito relevante/urgente pro setor de reciclagem e descarte no Brasil),
  "risco": numero de 1 a 5 (1 = baixo risco editorial/factual, 5 = informação não confirmada ou sensível)
}

Se a notícia não tiver relação real com reciclagem, sustentabilidade, descarte de eletrônicos, economia circular ou legislação ambiental brasileira, responda apenas: {"skip": true}`;

export async function draftRadarNoticia(
  result: RadarSearchResult
): Promise<RadarDraft | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY não configurada");
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      response_format: { type: "json_object" },
      temperature: 0.4,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Título original: ${result.title}\nURL: ${result.url}\nConteúdo bruto:\n${result.content.slice(0, 6000)}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI falhou (${res.status}): ${text}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) return null;

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (parsed.skip) return null;

  const tagRaw = String(parsed.tag ?? "");
  const tag = (RADAR_TAGS as string[]).includes(tagRaw) ? (tagRaw as RadarTag) : "tendencia";
  const relevancia = Math.min(5, Math.max(1, Math.round(Number(parsed.relevancia) || 3)));
  const risco = Math.min(5, Math.max(1, Math.round(Number(parsed.risco) || 2)));
  const titulo = String(parsed.titulo ?? "").trim().slice(0, 200) || result.title;
  const resumo = String(parsed.resumo ?? "").trim().slice(0, 500);
  const conteudo = String(parsed.conteudo ?? "").trim();

  if (!titulo || !resumo) return null;

  return {
    titulo,
    resumo,
    conteudo,
    tag,
    cidade_uf: parsed.cidade_uf ? String(parsed.cidade_uf) : null,
    relevancia,
    risco,
  };
}
