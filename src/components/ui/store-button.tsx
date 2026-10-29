import { ArrowUpRight } from "lucide-react";

import { getStoreUrl } from "@/lib/store";

import type { ButtonSize, ButtonVariant } from "./button";
import { ChannelButton } from "./channel-button";

/**
 * CTA principal: loja da MotorDiesel no Mercado Livre.
 * Enquanto `site.mercadoLivre.storeUrl` for `null`, não navega — avisa que o link está em
 * configuração.
 */
export function StoreButton({
  label = "Compre em nossa Loja Virtual",
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: {
  label?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <ChannelButton
      href={getStoreUrl()}
      channel="store"
      label={label}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      pendingMessage="Link oficial da loja em configuração. Em breve!"
      icon={
        <ArrowUpRight
          className="order-last size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      }
    />
  );
}
