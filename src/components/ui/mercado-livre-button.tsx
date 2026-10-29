import { cn } from "@/lib/cn";
import { getStoreUrl } from "@/lib/store";

import { ChannelButton } from "./channel-button";

/**
 * Selo-botão amarelo do Mercado Livre (vitrine e cabeçalho). Ícone oficial: o favicon publicado pelo
 * próprio Mercado Livre (http2.mlstatic.com), salvo em public/brand/mercado-livre.svg.
 * Brilho e halo vêm de `.ml-glow` (globals.css). Sem `storeUrl`, não navega: mostra o aviso
 * de "em configuração", como os demais botões da loja.
 */
export function MercadoLivreButton({
  label = "Ver no Mercado Livre",
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
        "ml-glow group relative isolate inline-flex h-10 items-center overflow-hidden rounded-full bg-[#ffe600] pr-5 pl-2.5 text-xs font-extrabold tracking-wide whitespace-nowrap text-[#2d3277] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d3277] [&>span]:relative [&>span]:z-10",
        className,
      )}
      icon={
        // eslint-disable-next-line @next/next/no-img-element -- SVG estático, sem otimização
        <img
          // Elemento criado no servidor e repassado ao ChannelButton (cliente): sem `key`, o React
          // acusa "unique key" no modo de desenvolvimento.
          key="icon"
          src="/brand/mercado-livre.svg"
          alt=""
          width={28}
          height={28}
          className="size-7 shrink-0"
        />
      }
    />
  );
}
