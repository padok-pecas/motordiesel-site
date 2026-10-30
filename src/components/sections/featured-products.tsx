import { Container } from "@/components/ui/container";
import { DemoBadge } from "@/components/ui/demo-badge";
import { StoreGlowButton } from "@/components/ui/store-glow-button";
import { SectionHeading } from "@/components/ui/section-heading";
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

        {/* Régua decorativa "do fusível ao motor" */}
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
          storeButton={<StoreGlowButton />}
          buyButton={
            <StoreGlowButton
              // Versão compacta, centralizada no card. Nos cards estreitos (celular e 1024–1279px)
              // fica ainda menor; no celular o texto pode quebrar em duas linhas dentro da pílula.
              className="h-9! pr-4! pl-1! text-[0.68rem]! max-sm:h-auto! max-sm:min-h-8 max-sm:py-1 max-sm:pr-3! max-sm:text-[0.62rem]! max-sm:leading-tight max-sm:whitespace-normal lg:max-xl:pr-3! lg:max-xl:text-[0.62rem]! [&_img]:size-6! max-sm:[&_img]:size-5!"
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
          <div className="flex flex-wrap items-center gap-3">
            <StoreGlowButton
              label="Ver todos na loja"
              arrow
              // Mesma altura do botão "Pedir ajuda" ao lado.
              className="h-12! pr-6! pl-1.5! text-sm! [&_img]:size-9!"
            />
            <WhatsAppButton label="Pedir ajuda" variant="outline" />
          </div>
        </div>
      </Container>
    </section>
  );
}
