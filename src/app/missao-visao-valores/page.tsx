import { Check, Compass, Gem, Target, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { SiteShell } from "@/components/layout/site-shell";
import { brandGradient } from "@/components/ui/brand-stripe";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const description = `Missão, visão e valores da ${site.name}: soluções automotivas com tecnologia e segurança, crescimento sólido e atendimento próximo.`;

export const metadata: Metadata = {
  title: `Missão, Visão e Valores | ${site.name}`,
  description,
  openGraph: { title: `Missão, Visão e Valores | ${site.name}`, description },
};

// Texto oficial informado pela empresa.
const statements = [
  {
    id: "missao",
    icon: Target,
    title: "Nossa missão",
    text: "Nossa missão é oferecer soluções automotivas com tecnologia e segurança, para impulsionar a mobilidade, fortalecer negócios e gerar impacto positivo nas regiões onde atuamos. Construir relações duradouras com quem compartilha nosso propósito e crescer com responsabilidade, inovação e visão de futuro.",
  },
  {
    id: "visao",
    icon: Compass,
    title: "Nossa visão",
    text: "Nossa visão é continuar crescendo de forma sólida e sustentável, ampliando nossas unidades nas regiões Norte e Nordeste, mantendo o compromisso com o atendimento próximo, ágil e de confiança.",
  },
] as const;

const values = [
  "Integridade em cada situação.",
  "Proximidade que gera valor.",
  "Crescimento com responsabilidade.",
  "Excelência operacional.",
  "Valorização das pessoas.",
];

export default function MissionPage() {
  return (
    <SiteShell>
      <PageHeader
        tone="light"
        crumb="Missão, Visão e Valores"
        title={
          <>
            Missão, Visão <span className="text-brand">e Valores</span>
          </>
        }
      />

      {/* Missão, visão e valores lado a lado, em três quadros do mesmo tamanho. No tablet os
          valores descem e ocupam a largura toda; no celular os três ficam empilhados. */}
      <section aria-label="Missão, visão e valores" className="bg-white section-y">
        <Container className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {statements.map(({ id, icon, title, text }) => (
            <Card key={id} id={id} icon={icon} title={title}>
              <p className="mt-3 text-lg leading-relaxed text-ink">{text}</p>
            </Card>
          ))}
          <Card
            id="valores"
            icon={Gem}
            title="Nossos valores"
            className="md:col-span-2 lg:col-span-1"
          >
            <ul className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-1">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-3 text-lg leading-snug text-ink">
                  <Check className="mt-1 size-5 shrink-0 text-brand" aria-hidden />
                  {value}
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </section>
    </SiteShell>
  );
}

/** Quadro com moldura fina nas cores da marca (amarelo, vermelho e azul). */
function Card({
  id,
  icon: Icon,
  title,
  className,
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      aria-labelledby={`${id}-title`}
      className={cn(
        "flex p-[3px]",
        brandGradient,
        className,
      )}
    >
      <div className="w-full bg-mist p-6 sm:p-8">
        <span
          className="flex size-11 -skew-x-6 items-center justify-center bg-brand text-white"
          aria-hidden
        >
          <Icon className="size-5 skew-x-6" />
        </span>
        <h2
          id={`${id}-title`}
          className="mt-5 font-display-wide text-2xl font-extrabold text-ink uppercase sm:text-3xl"
        >
          {title}
        </h2>
        {children}
      </div>
    </article>
  );
}
