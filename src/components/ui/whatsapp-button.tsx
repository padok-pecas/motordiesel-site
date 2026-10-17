import { getWhatsappUrl } from "@/lib/store";

import { WhatsAppIcon } from "./brand-icons";
import type { ButtonSize, ButtonVariant } from "./button";
import { ChannelButton } from "./channel-button";

/** Verde convencional do WhatsApp — usado só no ícone e no botão flutuante. */
const WHATSAPP_GREEN = "#25d366";

/**
 * Canal secundário: conversa no WhatsApp para tirar dúvidas e achar a peça certa.
 * Enquanto `site.contact.whatsapp` for `null`, não abre conversa — avisa que o número está
 * em configuração.
 */
export function WhatsAppButton({
  label = "Falar no WhatsApp",
  variant = "light",
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
      href={getWhatsappUrl()}
      channel="whatsapp"
      label={label}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      pendingMessage="Número oficial do WhatsApp em configuração. Em breve!"
      icon={<WhatsAppIcon className="size-4 text-[#25d366]" />}
    />
  );
}

/** Botão circular fixo no canto inferior direito, apontando para `href`. */
export function WhatsAppFloatLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-channel="whatsapp-float"
      aria-label="Conversar com a MotorDiesel no WhatsApp (abre em nova aba)"
      title="Conversar no WhatsApp"
      style={{ backgroundColor: WHATSAPP_GREEN }}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex size-12 items-center justify-center rounded-full text-white shadow-[0_8px_20px_-8px_rgba(18,20,23,0.55)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-offset-4 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}

/** Só aparece quando o número oficial estiver configurado — nunca gera link falso. */
export function WhatsAppFloat() {
  const href = getWhatsappUrl();
  return href ? <WhatsAppFloatLink href={href} /> : null;
}
