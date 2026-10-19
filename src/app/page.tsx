import { SiteShell } from "@/components/layout/site-shell";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Hero } from "@/components/sections/hero";
import { Lines } from "@/components/sections/lines";
import { MarketplaceBand } from "@/components/sections/marketplace-band";
import { Segments } from "@/components/sections/segments";
import { Trust } from "@/components/sections/trust";

// "Como comprar" e "Sobre" ficam em páginas próprias (/como-comprar e /sobre).
export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <Segments />
      <Lines />
      <FeaturedProducts />
      <Trust />
      <MarketplaceBand />
    </SiteShell>
  );
}
