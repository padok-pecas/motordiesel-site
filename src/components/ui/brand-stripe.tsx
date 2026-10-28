import { cn } from "@/lib/cn";

/** Degradê com as três cores da marca. Também serve de moldura fina: aplique num contêiner com
 * `p-[3px]` e um fundo sólido no conteúdo de dentro (quadros de Missão e Como comprar). */
export const brandGradient =
  "bg-[linear-gradient(105deg,var(--stripe-yellow)_0_36%,var(--stripe-red)_36%_63%,var(--stripe-blue)_63%)]";

/**
 * Faixa decorativa com as cores da marca — amarelo, vermelho e azul —, com as divisões
 * inclinadas no mesmo ângulo dos selos. Use com posição e altura definidas por quem chama.
 */
export function BrandStripe({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none block",
        brandGradient,
        className,
      )}
    />
  );
}
