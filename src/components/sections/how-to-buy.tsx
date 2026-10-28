import { brandGradient } from "@/components/ui/brand-stripe";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StoreButton } from "@/components/ui/store-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const steps = [
  {
    title: "Encontre a peça",
    text: "Navegue pelas categorias ou busque pelo nome, código ou aplicação na loja.",
  },
  {
    title: "Confirme a compatibilidade",
    text: "Leia a descrição do anúncio. Ficou em dúvida? Pergunte no anúncio ou fale com a gente.",
  },
  {
    title: "Compre com segurança",
    text: "Finalize o pagamento no Mercado Livre e acompanhe o pedido pela plataforma.",
  },
];

export function HowToBuy() {
  return (
    <section
      id="como-comprar"
      aria-labelledby="como-comprar-title"
      className="bg-white section-y"
    >
      <Container>
        <SectionHeading
          id="como-comprar-title"
          eyebrow="Como comprar"
          title={
            <>
              <span className="text-royal">Três passos até</span>{" "}
              <span className="text-brand">a sua peça</span>
            </>
          }
          description="As vendas acontecem na loja da MotorDiesel no Mercado Livre."
        />

        {/* Passos em quadros com a moldura fina nas cores da marca. */}
        <ol className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              step={index}
              className={`flex p-[3px] ${brandGradient}`}
            >
              <div className="w-full bg-mist p-6 md:p-7">
                <span
                  className="inline-flex size-9 -skew-x-6 items-center justify-center bg-brand font-display-wide text-sm font-extrabold text-white"
                  aria-hidden
                >
                  <span className="skew-x-6">0{index + 1}</span>
                </span>
                <h3 className="mt-4 font-display-wide text-xl font-extrabold text-ink uppercase">
                  <span className="sr-only">Passo {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <StoreButton label="Ir para a loja" />
          <WhatsAppButton label="Tirar dúvidas no WhatsApp" variant="outline" />
        </div>
      </Container>
    </section>
  );
}
