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
      { source: "/about", destination: "/sobre", permanent: true },
      { source: "/contact", destination: "/contato", permanent: true },
      { source: "/services", destination: "/profissionais", permanent: true },
      { source: "/sample-page", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
