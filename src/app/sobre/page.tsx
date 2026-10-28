import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { SiteShell } from "@/components/layout/site-shell";
import { About } from "@/components/sections/about";
import { site } from "@/content/site";

const description = `Conheça a ${site.name}, autopeças do leve ao pesado em ${site.city} – ${site.state}.`;

export const metadata: Metadata = {
  title: `Sobre nós | ${site.name}`,
  description,
  openGraph: { title: `Sobre nós | ${site.name}`, description },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        tone="light"
        crumb="Sobre nós"
        title={
          <>
            Sobre <span className="text-brand">nós</span>
          </>
        }
        description={`${site.slogan}. Autopeças em ${site.city} – ${site.state}.`}
      />
      <About />
    </SiteShell>
  );
}
