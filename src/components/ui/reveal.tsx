import { cn } from "@/lib/cn";

/**
 * Revela o conteúdo suavemente ao entrar na tela (animação CSS ligada à rolagem — ver
 * globals.css). Não esconde nada sem suporte, sem JavaScript ou com `prefers-reduced-motion`.
 * `step` escalona itens de uma grade (0, 1, 2…).
 */
export function Reveal({
  children,
  step = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  step?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag
      data-reveal
      className={cn(className)}
      style={step ? ({ "--reveal-stagger": `${step * 12}%` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
