import { Check, Compass, Target } from "lucide-react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

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
        crumb="Missão, Visão e Valores"
        title={
          <>
            Missão, Visão <span className="text-brand">e Valores</span>
          </>
        }
      />

      <section aria-label="Missão e visão" className="bg-white section-y">
        <Container className="grid gap-4 md:grid-cols-2 md:gap-6">
          {statements.map(({ id, icon: Icon, title, text }) => (
            <article
              key={id}
              aria-labelledby={`${id}-title`}
              className="border-t-4 border-brand bg-mist p-6 sm:p-8"
            >
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
              <p className="mt-3 text-lg leading-relaxed text-steel">{text}</p>
            </article>
          ))}
        </Container>
      </section>

      <section aria-labelledby="valores-title" className="bg-ink section-y text-white">
        <Container>
          <h2
            id="valores-title"
            className="font-display-wide text-2xl font-extrabold uppercase sm:text-3xl"
          >
            Nossos <span className="text-brand-on-dark">valores</span>
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value) => (
              <li
                key={value}
                className="flex items-start gap-3 border-l-2 border-brand bg-white/5 p-4 leading-snug font-semibold"
              >
                <Check className="mt-0.5 size-5 shrink-0 text-brand-on-dark" aria-hidden />
                {value}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </SiteShell>
  );
}
