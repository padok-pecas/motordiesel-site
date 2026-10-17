import { ArrowDown } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { DemoBadge } from "@/components/ui/demo-badge";
import { Reveal } from "@/components/ui/reveal";
import { categories } from "@/content/catalog";
import { cn } from "@/lib/cn";

export function Categories() {
  return (
    <section id="categorias" aria-labelledby="categorias-title" className="bg-paper section-y">
      <Container>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {/* Painel de abertura escuro: ocupa a primeira célula da grade, sem cabeçalho solto. */}
          <li className="relative col-span-2 flex flex-col justify-between overflow-hidden bg-ink p-6 text-white sm:p-8 md:col-span-1 md:p-6 lg:p-8">
            <span
              className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-24 -skew-x-12 bg-brand"
              aria-hidden
            />
            <div className="relative">
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-brand uppercase">
                Encontre sua peça
              </p>
              <h2
                id="categorias-title"
                className="mt-4 font-display-wide text-3xl leading-[1.02] font-extrabold uppercase italic sm:text-4xl md:text-3xl lg:text-4xl"
              >
                Navegue por <span className="text-brand">categoria</span>
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-white/70">
                Escolha o sistema do veículo e encontre a peça certa na nossa loja.
              </p>
            </div>
            <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3">
              <a
                href="#destaques"
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/85 hover:text-white"
              >
                Ver a vitrine
                <ArrowDown
                  className="size-4 text-brand transition-transform group-hover:translate-y-0.5"
                  aria-hidden
                />
              </a>
              <DemoBadge tone="dark">Categorias ilustrativas</DemoBadge>
            </div>
          </li>

          {categories.map((category, index) => (
            <Reveal
              as="li"
              key={category.id}
              step={index % 3}
              className={cn(index === 0 && "col-span-2 md:col-span-1")}
            >
              <article
                className={cn(
                  "group relative flex w-full flex-col justify-end overflow-hidden bg-graphite",
                  index === 0 ? "aspect-[16/9] md:aspect-[4/3]" : "aspect-[4/5] sm:aspect-[4/3]",
                )}
              >
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 30vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-transparent"
                  aria-hidden
                />
                <div className="relative p-4 sm:p-5">
                  <h3 className="font-display-wide text-lg font-extrabold text-white uppercase italic sm:text-2xl">
                    {category.name}
                  </h3>
                  <p className="mt-1 hidden text-sm text-white/75 sm:block">
                    {category.description}
                  </p>
                  <p className="mt-2 text-[0.68rem] font-semibold tracking-wider text-white/55 uppercase">
                    {category.storeUrl ? "Ver na loja" : "Em breve na loja"}
                  </p>
                </div>
                {category.storeUrl && (
                  <a
                    href={category.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                    aria-label={`Ver ${category.name} na loja`}
                  />
                )}
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
