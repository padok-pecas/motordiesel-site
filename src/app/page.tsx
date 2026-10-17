import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { About } from "@/components/sections/about";
import { Categories } from "@/components/sections/categories";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Hero } from "@/components/sections/hero";
import { HowToBuy } from "@/components/sections/how-to-buy";
import { Lines } from "@/components/sections/lines";
import { MarketplaceBand } from "@/components/sections/marketplace-band";
import { Trust } from "@/components/sections/trust";
import { WhatsAppFloat } from "@/components/ui/whatsapp-button";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Categories />
        <Lines />
        <FeaturedProducts />
        <HowToBuy />
        <About />
        <Trust />
        <MarketplaceBand />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
