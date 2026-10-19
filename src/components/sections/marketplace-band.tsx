import { CreditCard, MessageSquareText, PackageSearch, Search } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { MotorDieselBadge } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { StoreButton } from "@/components/ui/store-button";
import { demoProducts } from "@/content/catalog";

// Fatos sobre comprar pela plataforma — sem prometer prazos, garantias ou certificações.
const practical = [
  { icon: CreditCard, text: "Pagamento no ambiente do Mercado Livre" },
  { icon: PackageSearch, text: "Acompanhe o pedido pela plataforma" },
  { icon: MessageSquareText, text: "Tire dúvidas no anúncio antes de comprar" },
];

/**
 * Ilustração de "loja online" com as peças da vitrine. Propositalmente neutra: não usa
 * logotipo, cores ou selos do Mercado Livre, para não sugerir parceria ou certificação.
 */
function PhoneMockup() {
  const items = demoProducts.slice(0, 4);
  return (
    <div
      className="relative mx-auto w-44 rotate-[-6deg] rounded-[1.75rem] border-[6px] border-graphite-soft bg-white p-2.5 shadow-[0_40px_60px_-30px_rgba(0,0,0,0.8)] sm:w-48"
      aria-hidden
    >
      <span className="mx-auto mb-2 block h-1 w-10 rounded-full bg-line" />
      <MotorDieselBadge eager className="mx-auto w-24" />
      <span className="mt-2 flex items-center gap-1.5 rounded-full bg-mist px-2.5 py-1.5 text-[0.55rem] text-steel">
        <Search className="size-3" />
        Buscar peças…
      </span>
      <span className="mt-2 grid grid-cols-2 gap-1.5">
        {items.map((product) => (
          <span key={product.id} className="block bg-mist">
            <span className="relative block aspect-square overflow-hidden">
              <Image
                src={product.image}
                alt=""
                fill
                loading="eager"
                sizes="96px"
                className="object-cover"
              />
            </span>
            <span className="block truncate px-1 py-1 text-[0.5rem] font-semibold text-ink">
              {product.name}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}

/** Faixa comercial antes do rodapé: leva à loja da MotorDiesel no Mercado Livre. */
export function MarketplaceBand() {
  return (
    <section
      id="loja"
      aria-labelledby="loja-title"
      className="relative isolate overflow-hidden bg-ink text-white"
    >
      {/* Campo vermelho em diagonal + fachada da loja ao fundo (à direita, o letreiro e o slogan) */}
      <Image
        src="/images/fachada-loja.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center opacity-60"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand to-brand-strong lg:[clip-path:polygon(0_0,62%_0,52%_100%,0_100%)]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-y-0 left-[56%] -z-10 hidden w-3 -skew-x-[12deg] bg-white/10 lg:block"
        aria-hidden
      />

      <Container className="grid items-center gap-8 py-12 sm:grid-cols-[1fr_auto] lg:grid-cols-[1.25fr_auto_0.9fr] lg:gap-12 lg:py-14">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-white/85 uppercase">
            Compre online
          </p>
          <h2
            id="loja-title"
            className="mt-3 font-display-wide text-3xl leading-[1.02] font-black uppercase italic sm:text-4xl lg:text-[2.75rem]"
          >
            Sua próxima peça pode estar aqui
          </h2>
          <p className="mt-3 max-w-md text-lg text-white/90">
            Encontre a MotorDiesel no Mercado Livre e conheça nossa loja online.
          </p>
          <div className="mt-6">
            <StoreButton label="Visitar nossa loja" variant="inverse" />
          </div>
        </Reveal>

        <div className="hidden sm:block">
          <PhoneMockup />
        </div>

        <ul className="grid gap-2.5 sm:col-span-2 lg:col-span-1">
          {practical.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 border-l-2 border-brand bg-ink/70 px-4 py-3 text-sm font-semibold backdrop-blur-sm"
            >
              <Icon className="size-5 shrink-0 text-brand" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
