import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/cn";
import { getStoreUrl } from "@/lib/store";

import { ChannelButton } from "./channel-button";

/**
 * Botão-pílula vermelho da loja virtual (hero, vitrine e cards de produto), com o ícone da MotorDiesel
 * (o mesmo do favicon). Brilho e halo vêm de `.store-glow` (globals.css). Sem `storeUrl`, não
 * navega: mostra o aviso de "em configuração", como os demais botões da loja.
 */
export function StoreGlowButton({
  label = "Nossa loja virtual",
  size = "md",
  arrow = false,
  fullWidth,
  className,
}: {
  label?: string;
  /** `lg`: versão maior, para o hero. */
  size?: "md" | "lg";
  /** Seta de "abre em nova aba", como nos demais botões da loja. */
  arrow?: boolean;
  /** Ocupa toda a largura disponível (cards da vitrine). */
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <ChannelButton
      href={getStoreUrl()}
      channel="store"
      bare
      fullWidth={fullWidth}
      label={
        <>
          {label}
          {arrow && (
            <ArrowUpRight
              className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          )}
        </>
      }
      pendingMessage="Link oficial da loja em configuração. Em breve!"
      className={cn(
        "store-glow group relative isolate inline-flex items-center overflow-hidden rounded-full bg-brand font-extrabold tracking-wide whitespace-nowrap text-white uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [&>span]:relative [&>span]:z-10",
        size === "lg"
          ? "h-14 pr-6 pl-2 text-[0.8rem] max-[359px]:pr-4 max-[359px]:pl-1.5 max-[359px]:text-[0.66rem] max-[359px]:tracking-normal min-[400px]:text-sm sm:h-16 sm:pr-9 sm:pl-2.5 sm:text-base [&>span]:gap-3 max-[359px]:[&>span]:gap-2"
          : "h-10 pr-5 pl-1.5 text-xs",
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
          className={cn(
            "shrink-0 rounded-full ring-2 ring-white",
            size === "lg" ? "size-10 max-[359px]:size-8 sm:size-11" : "size-7",
          )}
        />
      }
    />
  );
}
