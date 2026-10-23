import { SiteShell } from "@/components/layout/site-shell";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Hero } from "@/components/sections/hero";
import { MarketplaceBand } from "@/components/sections/marketplace-band";
import { Segments } from "@/components/sections/segments";
import { Trust } from "@/components/sections/trust";

// "Leve e Pesada", "Como comprar" e "Sobre" ficam em páginas próprias
// (/leve-e-pesada, /como-comprar e /sobre).
export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <FeaturedProducts />
      <Segments />
      <Trust />
      <MarketplaceBand />
    </SiteShell>
  );
}
