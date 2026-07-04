// src/lib/radar-search.ts
//
// Busca de notícias reais na web via Tavily (API de busca feita para uso
// com LLMs). Usado pelo botão "Buscar notícias" do /admin/radar.
export type RadarSearchResult = {
  title: string;
  url: string;
  content: string;
  imageUrl: string | null;
};

type TavilyImage = {
  url?: string;
  description_source?: string | null;
  score?: number;
};

type TavilyRawResult = {
  title?: string;
  url?: string;
  content?: string;
  images?: TavilyImage[];
};

function pickBestImage(images: TavilyImage[] | undefined): string | null {
  if (!Array.isArray(images) || images.length === 0) return null;
  // A imagem og:image da própria página é a mais confiável (score mais alto);
  // como fallback, usa a primeira imagem retornada (já vem ordenada por score).
  const ogImage = images.find((img) => img.description_source === "og:image");
  return (ogImage ?? images[0])?.url ?? null;
}

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
      include_images: true,
      include_image_descriptions: true,
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
      imageUrl: pickBestImage(r.images),
    }));
}
