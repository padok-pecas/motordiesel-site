import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { SiteShell } from "@/components/layout/site-shell";
import { About } from "@/components/sections/about";
import { site } from "@/content/site";

const description = `Conheça a ${site.name}, autopeças do leve ao pesado em ${site.city} – ${site.state}.`;

export const metadata: Metadata = {
  title: `Sobre | ${site.name}`,
  description,
  openGraph: { title: `Sobre a ${site.name}`, description },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        crumb="Sobre"
        title={
          <>
            Sobre a <span className="text-brand">{site.name}</span>
          </>
        }
        description={`${site.slogan}. Autopeças em ${site.city} – ${site.state}.`}
      />
      <About />
    </SiteShell>
  );
}
