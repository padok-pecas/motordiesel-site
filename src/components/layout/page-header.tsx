import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

/** Abertura das páginas internas: trilha de navegação, título (h1) e resumo. */
export function PageHeader({
  crumb,
  title,
  description,
  compact = false,
  tone = "dark",
}: {
  /** Nome da página na trilha de navegação. */
  crumb: string;
  title: React.ReactNode;
  description?: string;
  /**
   * Só a trilha, numa faixa baixa: o título fica apenas para leitores de tela e buscadores
   * (para páginas cuja primeira seção já tem um título grande).
   */
  compact?: boolean;
  /**
   * `light`: fundo branco e textos todos em vermelho, sem faixa nem brilho (páginas
   * institucionais). Sem respiro embaixo: a seção seguinte já traz o seu (`section-y`), e a
   * margem negativa o encurta para o título não ficar longe do conteúdo.
   */
  tone?: "dark" | "light";
}) {
  if (tone === "light") {
    return (
      <div className="bg-white text-brand">
        <Container className="-mb-4 pt-10 sm:pt-12 lg:-mb-8 lg:pt-14">
          <Breadcrumb crumb={crumb} light />
          <h1 className="mt-5 max-w-3xl font-display-wide text-4xl leading-[0.98] font-extrabold uppercase sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed">{description}</p>}
        </Container>
      </div>
    );
  }

  return (
    <div className="relative isolate overflow-hidden bg-ink text-white">
      {/* Faixa no ângulo do selo e brilho vermelho, como na Hero */}
      <span
        className={cn(
          "pointer-events-none absolute -top-10 right-[6%] -z-10 hidden h-[160%] w-20 -skew-x-12 bg-brand",
          // Na faixa baixa (compact) ela viraria só um recorte solto.
          !compact && "lg:block",
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_90%_at_90%_50%,rgba(219,29,33,0.22),transparent_70%)]"
        aria-hidden
      />

      <Container className={compact ? "py-5 lg:py-6" : "py-10 sm:py-12 lg:py-16"}>
        <Breadcrumb crumb={crumb} />
        <h1
          className={
            compact
              ? "sr-only"
              : "mt-5 max-w-3xl font-display-wide text-4xl leading-[0.98] font-extrabold uppercase sm:text-5xl lg:text-6xl"
          }
        >
          {title}
        </h1>
        {description && !compact && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{description}</p>
        )}
      </Container>
    </div>
  );
}

function Breadcrumb({ crumb, light = false }: { crumb: string; light?: boolean }) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-xs font-semibold tracking-[0.18em] uppercase",
          light ? "text-brand" : "text-white/60",
        )}
      >
        <li>
          <Link
            href="/"
            className={cn(
              "transition-colors",
              light ? "hover:text-brand-strong hover:underline" : "hover:text-white",
            )}
          >
            Início
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="size-3.5 text-brand" />
        </li>
        <li aria-current="page" className={light ? "font-bold" : "text-white"}>
          {crumb}
        </li>
      </ol>
    </nav>
  );
}
