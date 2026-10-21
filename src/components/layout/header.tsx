import { StoreButton } from "@/components/ui/store-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { site } from "@/content/site";

import { HeaderClient } from "./header-client";

/** Cabeçalho do site. Os dados e os botões são montados aqui, no servidor. */
export function Header() {
  return (
    <HeaderClient
      instagramUrl={site.social.instagram}
      storeCta={<StoreButton label="Loja no Mercado Livre" size="sm" />}
      mobileCtas={
        <>
          <StoreButton fullWidth />
          <WhatsAppButton variant="dark" fullWidth />
        </>
      }
    />
  );
}
