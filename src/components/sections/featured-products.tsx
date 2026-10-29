import { Container } from "@/components/ui/container";
import { DemoBadge } from "@/components/ui/demo-badge";
import { MercadoLivreButton } from "@/components/ui/mercado-livre-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StoreButton } from "@/components/ui/store-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { demoProducts } from "@/content/catalog";
import { showcaseLines } from "@/content/schema";
import { showcaseAnchor } from "@/lib/showcase-filter";

import { ProductGrid } from "./product-grid";

export function FeaturedProducts() {
  return (
    <section
      id="destaques"
      aria-labelledby="destaques-title"
      className="relative bg-mist section-y"
    >
      {/* Destinos dos cards de categoria: a vitrine já filtrada pela linha */}
      {showcaseLines.map((line) => (
        <span key={line} id={showcaseAnchor(line)} className="absolute top-0" aria-hidden />
      ))}
      <Container>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="destaques-title"
            eyebrow="Vitrine"
            title={
              <>
                Do fusível <span className="text-brand">ao motor</span>
              </>
            }
            description="Uma prévia da vitrine, das peças menores às maiores. Preço, disponibilidade e compatibilidade você confere no anúncio da loja."
          />
          <DemoBadge>Produtos demonstrativos</DemoBadge>
        </div>

        {/* Régua decorativa: a vitrine está ordenada da peça menor para a maior */}
        <div
          className="mt-8 flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.2em] text-steel uppercase"
          aria-hidden
        >
          <span>Fusível</span>
          <span className="relative h-1 flex-1 -skew-x-12 bg-gradient-to-r from-line via-brand/50 to-brand">
            <span className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_22px,var(--mist)_22px_25px)]" />
          </span>
          <span className="text-ink">Motor</span>
        </div>

        <ProductGrid
          products={demoProducts}
          storeButton={<MercadoLivreButton />}
          buyButton={
            <StoreButton
              label={
                <>
                  <span className="lg:hidden">Ver na loja</span>
                  <span className="hidden lg:inline">Ver no Mercado Livre</span>
                </>
              }
              variant="subtle"
              size="sm"
              fullWidth
              className="px-2 text-[0.7rem] sm:text-[0.8rem]"
            />
          }
        />

        {/* Faixa comercial: os dois canais lado a lado, sem repetir botões gigantes */}
        <div className="mt-10 flex flex-col gap-5 bg-white p-5 ring-1 ring-line sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display-wide text-lg font-extrabold text-ink uppercase">
              Não achou a peça que procura?
            </p>
            <p className="mt-1 text-sm text-steel">
              Veja o catálogo completo na loja ou peça ajuda para encontrar a peça certa.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <StoreButton label="Ver todos na loja" />
            <WhatsAppButton label="Pedir ajuda" variant="outline" />
          </div>
        </div>
      </Container>
    </section>
  );
}
