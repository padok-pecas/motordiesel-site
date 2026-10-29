import { cn } from "@/lib/cn";
import { getStoreUrl } from "@/lib/store";

import { ChannelButton } from "./channel-button";

/**
 * Botão-pílula vermelho "Nossa loja virtual" (cabeçalho e vitrine), com o ícone da MotorDiesel
 * (o mesmo do favicon). Brilho e halo vêm de `.store-glow` (globals.css). Sem `storeUrl`, não
 * navega: mostra o aviso de "em configuração", como os demais botões da loja.
 */
export function StoreGlowButton({
  label = "Nossa loja virtual",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <ChannelButton
      href={getStoreUrl()}
      channel="store"
      bare
      label={label}
      pendingMessage="Link oficial da loja em configuração. Em breve!"
      className={cn(
        "store-glow group relative isolate inline-flex h-10 items-center overflow-hidden rounded-full bg-brand pr-5 pl-1.5 text-xs font-extrabold tracking-wide whitespace-nowrap text-white uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [&>span]:relative [&>span]:z-10",
        className,
      )}
      icon={
        // eslint-disable-next-line @next/next/no-img-element -- ícone estático, sem otimização
        <img
          // Elemento criado no servidor e repassado ao ChannelButton (cliente): sem `key`, o React
          // acusa "unique key" no modo de desenvolvimento.
          key="icon"
          src="/brand/motordiesel-icone.png"
          alt=""
          width={28}
          height={28}
          // Anel branco: o círculo vermelho do ícone se destaca sobre o fundo vermelho do botão.
          className="size-7 shrink-0 rounded-full ring-2 ring-white"
        />
      }
    />
  );
}
