import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { SiteShell } from "@/components/layout/site-shell";
import { HowToBuy } from "@/components/sections/how-to-buy";
import { site } from "@/content/site";

const description = `Como comprar peças da ${site.name}: encontre a peça, confirme a compatibilidade e finalize a compra com segurança no Mercado Livre.`;

export const metadata: Metadata = {
  title: `Como comprar | ${site.name}`,
  description,
  openGraph: { title: `Como comprar | ${site.name}`, description },
};

export default function HowToBuyPage() {
  return (
    <SiteShell>
      <PageHeader
        tone="light"
        crumb="Como comprar"
        title={
          <>
            Como <span className="text-brand">comprar</span>
          </>
        }
        description="As vendas da MotorDiesel acontecem na nossa loja no Mercado Livre. Veja o passo a passo e fale com a gente se tiver dúvidas."
      />
      <HowToBuy />
    </SiteShell>
  );
}
