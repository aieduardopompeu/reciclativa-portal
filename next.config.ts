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
};

export default nextConfig;
