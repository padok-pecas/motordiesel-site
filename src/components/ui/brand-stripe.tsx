import { cn } from "@/lib/cn";

/**
 * Faixa decorativa com as cores da marca — amarelo, vermelho e azul —, com as divisões
 * inclinadas no mesmo ângulo dos selos. Use com posição e altura definidas por quem chama.
 */
export function BrandStripe({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none block bg-[linear-gradient(105deg,var(--stripe-yellow)_0_36%,var(--stripe-red)_36%_63%,var(--stripe-blue)_63%)]",
        className,
      )}
    />
  );
}
