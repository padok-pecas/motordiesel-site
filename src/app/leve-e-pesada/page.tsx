import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { SiteShell } from "@/components/layout/site-shell";
import { Lines } from "@/components/sections/lines";
import { site } from "@/content/site";

const description = `Linha leve e linha pesada da ${site.name}: peças para carros e para caminhões e veículos pesados a diesel, em ${site.city} – ${site.state}.`;

export const metadata: Metadata = {
  title: `Leve e Pesada | ${site.name}`,
  description,
  openGraph: { title: `Leve e Pesada | ${site.name}`, description },
};

export default function LinesPage() {
  return (
    <SiteShell>
      <PageHeader
        crumb="Leve e Pesada"
        title="Leve e Pesada"
        // A seção "Uma loja, duas linhas", logo abaixo, já apresenta a página.
        compact
      />
      <Lines />
    </SiteShell>
  );
}
