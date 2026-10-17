import { site } from "@/content/site";

/** Link da loja da MotorDiesel no Mercado Livre, ou `null` enquanto não estiver configurado. */
export function getStoreUrl(): string | null {
  return site.mercadoLivre.storeUrl;
}

/**
 * Link do WhatsApp (wa.me) com a mensagem inicial, ou `null` enquanto o número oficial não for
 * informado — nunca gera um link para um número inexistente.
 */
export function getWhatsappUrl(): string | null {
  const number = site.contact.whatsapp;
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(site.whatsappMessage)}`;
}
