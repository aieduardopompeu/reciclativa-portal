import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  experimental: {
    optimizeCss: true,
  },

  images: {
    // Inclui 70 para eliminar o warning do next/image
    qualities: [70, 75],
  },

  async redirects() {
    return [
      // Legado WP / placeholders -> rotas reais do portal
      { source: "/about", destination: "/sobre", permanent: true },
      { source: "/contact", destination: "/contato", permanent: true },
      { source: "/services", destination: "/profissionais", permanent: true },
      { source: "/sample-page", destination: "/blog", permanent: true },

      // Consolidação de páginas legais (duplicadas -> canônicas)
      { source: "/privacidade", destination: "/politica-de-privacidade", permanent: true },
      { source: "/cookies", destination: "/politica-de-cookies", permanent: true },
      { source: "/termos", destination: "/termos-de-uso", permanent: true },

      // GSC 404 (URLs antigas) -> destinos atuais
      { source: "/compostagem", destination: "/residuos-solidos", permanent: true },
      { source: "/links-ateis", destination: "/guias", permanent: true },

      // Você disse que EXISTE página real /meio-ambiente e /educacao-ambiental
      // Então: ecologia (antigo) -> educacao-ambiental
      { source: "/ecologia", destination: "/educacao-ambiental", permanent: true },

      // Observação importante:
      // NÃO vou redirecionar /meio-ambiente porque você afirmou que essa rota existe.
      // Se o GSC mostra /meio-ambiente como 404, isso é um problema diferente (vamos checar no Passo 2).
    ];
  },
};

export default nextConfig;
