import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/cn";

export const buttonStyles = {
  base: "group inline-flex items-center whitespace-nowrap justify-center gap-2 font-display-wide font-bold uppercase tracking-wide transition-[background-color,color,border-color,box-shadow,transform] duration-200 active:translate-y-px -skew-x-6",
  size: {
    md: "min-h-12 px-6 text-[0.95rem]",
    sm: "min-h-11 px-4 text-[0.8rem]",
  },
  variant: {
    primary:
      "bg-brand text-white shadow-[0_10px_30px_-12px_var(--brand-red)] hover:bg-brand-strong hover:shadow-[0_14px_34px_-12px_var(--brand-red)]",
    /** Para fundos vermelhos: o CTA principal vira branco. */
    inverse: "bg-white text-brand hover:bg-ink hover:text-white",
    outline: "border-2 border-ink/85 text-ink hover:bg-ink hover:text-white",
    light: "border-2 border-white/80 text-white hover:bg-white hover:text-ink",
    dark: "bg-ink text-white hover:bg-graphite-soft",
    /** Botão discreto dos cards da vitrine. */
    subtle: "border border-line bg-white text-ink hover:border-brand hover:text-brand",
  },
};

export type ButtonVariant = keyof typeof buttonStyles.variant;
export type ButtonSize = keyof typeof buttonStyles.size;

export function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(buttonStyles.base, buttonStyles.size[size], buttonStyles.variant[variant], className);
}

/** Link interno (âncoras da página). */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={buttonClasses(variant, size, className)}>
      <span className="inline-flex skew-x-6 items-center gap-2">
        {children}
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden
        />
      </span>
    </a>
  );
}
