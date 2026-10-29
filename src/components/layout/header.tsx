import { getWhatsappUrl } from "@/lib/store";
import { StoreGlowButton } from "@/components/ui/store-glow-button";
import { StoreButton } from "@/components/ui/store-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { site } from "@/content/site";

import { HeaderClient } from "./header-client";

/** Cabeçalho do site. Os dados e os botões são montados aqui, no servidor. */
export function Header() {
  return (
    <HeaderClient
      socialLinks={{
        whatsapp: getWhatsappUrl(),
        instagram: site.social.instagram,
        facebook: site.social.facebook,
      }}
      storeCta={<StoreGlowButton />}
      mobileCtas={
        <>
          <StoreButton fullWidth />
          <WhatsAppButton variant="dark" fullWidth />
        </>
      }
    />
  );
}
