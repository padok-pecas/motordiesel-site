"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { DemoProduct } from "@/content/schema";
import { cn } from "@/lib/cn";
import { onShowcaseFilter } from "@/lib/showcase-filter";

const filters = [
  { id: "todas", label: "Todas" },
  { id: "leve", label: "Linha leve" },
  { id: "pesada", label: "Linha pesada" },
] as const;

type Filter = (typeof filters)[number]["id"];

function matches(product: DemoProduct, filter: Filter) {
  if (filter === "todas" || product.line === "Leve e pesada") return true;
  return product.line.toLowerCase() === filter;
}

/**
 * Vitrine com filtro por linha. O botão "Ver na loja" chega pronto do servidor (`buyButton`),
 * para que a configuração do site e o zod não entrem no JavaScript do navegador.
 */
export function ProductGrid({
  products,
  buyButton,
}: {
  products: DemoProduct[];
  buyButton: React.ReactNode;
}) {
  const [filter, setFilter] = useState<Filter>("todas");
  // Os cards de "Navegue por segmento" abrem a vitrine já filtrada.
  useEffect(() => onShowcaseFilter(setFilter), []);
  const visible = products.filter((product) => matches(product, filter));

  return (
    <>
      <div role="group" aria-label="Filtrar por linha" className="mt-8 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              "min-h-11 -skew-x-6 border px-4 text-sm font-semibold transition-colors",
              filter === item.id
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-ink/75 hover:border-ink/40 hover:text-ink",
            )}
          >
            <span className="inline-block skew-x-6">{item.label}</span>
          </button>
        ))}
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {visible.map((product) => (
          <li key={product.id} data-reveal>
            <article className="group flex h-full flex-col bg-white shadow-[0_1px_0_rgba(18,20,23,0.06)] ring-1 ring-line transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(18,20,23,0.5)]">
              <div className="relative aspect-square overflow-hidden bg-mist">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(min-width: 768px) 22vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-5">
                <p className="text-[0.65rem] font-semibold tracking-wider text-brand uppercase sm:text-[0.7rem]">
                  {product.category}
                  <span className="text-steel"> · Linha {product.line.toLowerCase()}</span>
                </p>
                <h3 className="mt-1.5 font-display-wide text-[0.95rem] leading-tight font-extrabold break-words hyphens-auto text-ink uppercase italic sm:text-lg">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs text-steel">Imagem ilustrativa</p>
                <div className="mt-auto pt-4">{buyButton}</div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
