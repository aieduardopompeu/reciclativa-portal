import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checklist AdSense — Reciclativa (Interno)",
  robots: {
    index: false,
    follow: false,
  },
};

type Item = {
  id: string;
  title: string;
  status: "OK" | "PENDENTE" | "CRÍTICO";
  description: string;
  notes?: string;
};

const CHECKLIST: Item[] = [
  {
    id: "domain",
    title: "Domínio canônico (www)",
    status: "OK",
    description:
      "reciclativa.com redireciona permanentemente (308) para www.reciclativa.com. Evita conteúdo duplicado e rastreamento inconsistente.",
  },
  {
    id: "home",
    title: "Página inicial com conteúdo editorial",
    status: "OK",
    description:
      "Home possui texto claro, proposta do site, navegação interna e contexto suficiente para o AdSense.",
  },
  {
    id: "profissionais",
    title: "/profissionais com conteúdo SSR (sem depender de JS)",
    status: "CRÍTICO",
    description:
      "Hoje a página depende de JS e pode exibir 'Carregando...' no HTML inicial. O crawler do AdSense pode interpretar como página vazia.",
    notes: "Implementar fallback SSR com texto editorial + lista de UFs + CTA.",
  },
  {
    id: "anuncie-noindex",
    title: "/anuncie com noindex e sem anúncios",
    status: "CRÍTICO",
    description:
      "Página de formulário não deve ser indexada nem exibir anúncios. Alto risco de reprovação por 'thin content'.",
  },
  {
    id: "diretorio",
    title: "/diretorio sem linguagem de placeholder",
    status: "PENDENTE",
    description:
      "Evitar tom de 'site incompleto'. Reforçar utilidade do diretório e orientar o usuário.",
  },
  {
    id: "sobre",
    title: "Página Sobre (confiança editorial)",
    status: "OK",
    description:
      "Explica missão, propósito e contexto do projeto. Importante para E-E-A-T.",
  },
  {
    id: "contato",
    title: "Página Contato funcional",
    status: "OK",
    description:
      "Existe canal de contato claro e acessível. Item essencial para AdSense.",
  },
  {
    id: "privacidade",
    title: "Política de Privacidade",
    status: "OK",
    description:
      "Documento presente e contextualizado ao site, incluindo cookies/analytics/publicidade.",
  },
  {
    id: "cookies",
    title: "Política de Cookies",
    status: "OK",
    description:
      "Explica uso de cookies e consentimento. Relevante para anúncios e GA4.",
  },
  {
    id: "termos",
    title: "Termos de Uso completos",
    status: "PENDENTE",
    description:
      "Reforçar regras do diretório, responsabilidade dos cadastros e transparência de anúncios.",
  },
  {
    id: "conteudo",
    title: "Conteúdo editorial suficiente (Guias / Blog)",
    status: "OK",
    description:
      "Guias e artigos com texto real, educativo e sem sensacionalismo.",
  },
  {
    id: "ads-thin",
    title: "Anúncios bloqueados em páginas finas",
    status: "PENDENTE",
    description:
      "Formulários, páginas vazias ou diretórios sem conteúdo não devem exibir anúncios.",
  },
];

function badge(status: Item["status"]) {
  if (status === "OK") return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (status === "CRÍTICO") return "bg-red-100 text-red-800 border-red-200";
  return "bg-yellow-100 text-yellow-800 border-yellow-200";
}

export default function AdSenseChecklistPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Checklist AdSense — Reciclativa</h1>
      <p className="mt-2 text-slate-600">
        Página interna de acompanhamento para aprovação no Google AdSense.
      </p>

      <div className="mt-8 space-y-4">
        {CHECKLIST.map((item) => (
          <div key={item.id} className="rounded-xl border border-black/10 bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                {item.notes && (
                  <p className="mt-2 text-sm text-slate-500">
                    <strong>Observação:</strong> {item.notes}
                  </p>
                )}
              </div>

              <span
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${badge(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-xs text-slate-500">
        Última revisão: {new Date().toLocaleDateString("pt-BR")}
      </p>
    </main>
  );
}
