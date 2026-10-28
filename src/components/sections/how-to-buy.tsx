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
      className="relative overflow-hidden bg-graphite section-y text-white"
    >
      <span
        className="pointer-events-none absolute -top-10 right-[8%] hidden h-[140%] w-24 -skew-x-12 bg-white/[0.03] lg:block"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeading
          id="como-comprar-title"
          tone="dark"
          eyebrow="Como comprar"
          title={
            <>
              Três passos até <span className="text-brand">a sua peça</span>
            </>
          }
          description="As vendas acontecem na loja da MotorDiesel no Mercado Livre."
        />

        <ol className="mt-10 grid gap-px bg-white/10 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.title} step={index} className="bg-graphite">
              <div className="group h-full border-t-2 border-brand/0 p-6 pt-5 transition-colors duration-300 hover:border-brand md:p-7">
                <span
                  className="inline-flex size-9 -skew-x-6 items-center justify-center bg-brand font-display-wide text-sm font-extrabold text-white"
                  aria-hidden
                >
                  <span className="skew-x-6">0{index + 1}</span>
                </span>
                <h3 className="mt-4 font-display-wide text-xl font-extrabold uppercase">
                  <span className="sr-only">Passo {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-white/70">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <StoreButton label="Ir para a loja" />
          <WhatsAppButton label="Tirar dúvidas no WhatsApp" />
        </div>
      </Container>
    </section>
  );
}
