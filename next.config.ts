import type { NextConfig } from "next";

// Site 100% estático (`next build` gera a pasta `out/`), publicável em qualquer hospedagem.
// Sem servidor não há otimização de imagem em tempo real: as fotos em `public/images`
// já são entregues dimensionadas e em WebP.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Oculta o indicador de desenvolvimento ("N" no canto da tela) do `next dev`.
  // Erros de compilação e de execução continuam aparecendo normalmente.
  devIndicators: false,
};

export default nextConfig;
