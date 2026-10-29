"use client";

import { Clock } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { cn } from "@/lib/cn";

import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button";

export type ChannelButtonProps = {
  /** Endereço oficial do canal; `null` enquanto não for configurado. */
  href: string | null;
  label: React.ReactNode;
  icon: React.ReactNode;
  /** Identifica o canal nos testes e no HTML (ex.: "store", "whatsapp"). */
  channel: string;
  /** Aviso exibido ao clicar enquanto o endereço não existe. */
  pendingMessage: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Ocupa toda a largura disponível (menu mobile, cards). */
  fullWidth?: boolean;
  /** Sem o estilo padrão de botão (inclinado): a aparência vem toda de `className`. */
  bare?: boolean;
  className?: string;
};

/**
 * CTA para um canal externo (Mercado Livre, WhatsApp).
 * Com `href`, é um link comum que abre em nova aba. Sem `href`, NÃO navega nem simula
 * integração: vira um botão que mostra um aviso de "em configuração".
 */
export function ChannelButton({
  href,
  label,
  icon,
  channel,
  pendingMessage,
  variant = "primary",
  size = "md",
  fullWidth = false,
  bare = false,
  className,
}: ChannelButtonProps) {
  const [notice, setNotice] = useState(false);
  const noticeId = useId();

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(false), 4000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const classes = bare
    ? cn(fullWidth && "w-full", className)
    : buttonClasses(variant, size, cn(fullWidth && "w-full", className));
  const content = (
    <span className={cn("inline-flex items-center gap-2", !bare && "skew-x-6")}>
      {icon}
      {label}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        data-channel={channel}
        data-cta-state="live"
      >
        {content}
      </a>
    );
  }

  return (
    <span className={cn("relative max-w-full", fullWidth ? "flex w-full" : "inline-flex")}>
      <button
        type="button"
        className={classes}
        data-channel={channel}
        data-cta-state="placeholder"
        aria-describedby={noticeId}
        onClick={() => setNotice(true)}
      >
        {content}
      </button>
      {/* Aviso flutuante: não empurra o layout. Fica no DOM para leitores de tela. */}
      <span
        id={noticeId}
        role="status"
        className={cn(
          "pointer-events-none absolute top-full left-0 z-20 mt-2 w-max max-w-[16rem]",
          notice ? "animate-toast" : "sr-only",
        )}
      >
        {notice ? (
          <span className="flex items-start gap-1.5 bg-ink px-3 py-2 text-xs leading-snug font-semibold text-white shadow-lg">
            <Clock className="mt-px size-3.5 shrink-0 text-brand" aria-hidden />
            {pendingMessage}
          </span>
        ) : (
          "Em configuração"
        )}
      </span>
    </span>
  );
}
