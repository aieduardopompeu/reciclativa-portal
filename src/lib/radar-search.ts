// src/lib/radar-search.ts
//
// Busca de notícias reais na web via Tavily (API de busca feita para uso
// com LLMs). Usado pelo botão "Buscar notícias" do /admin/radar.
export type RadarSearchResult = {
  title: string;
  url: string;
  content: string;
};

type TavilyRawResult = {
  title?: string;
  url?: string;
  content?: string;
};

export async function searchRadarNews(
  query: string,
  maxResults = 5
): Promise<RadarSearchResult[]> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    throw new Error("TAVILY_API_KEY não configurada");
  }

  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      search_depth: "basic",
      max_results: maxResults,
      // "topic: news" na Tavily prioriza fontes internacionais em inglês e
      // ignora o filtro de país — resultados bem piores pra pauta nacional.
      // "general" + country "brazil" traz fontes brasileiras de verdade.
      topic: "general",
      country: "brazil",
      include_answer: false,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Tavily search falhou (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { results?: TavilyRawResult[] };
  const results = Array.isArray(data.results) ? data.results : [];

  return results
    .filter((r) => r.url && r.title)
    .map((r) => ({
      title: String(r.title),
      url: String(r.url),
      content: String(r.content ?? ""),
    }));
}
