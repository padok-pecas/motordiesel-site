import { ArrowRight, Bus, Car, Truck, Van, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ShowcaseLink } from "@/components/ui/showcase-link";
import { segments } from "@/content/catalog";
import { cn } from "@/lib/cn";

const icons: Record<string, LucideIcon> = {
  automoveis: Car,
  "caminhonetes-vans": Van,
  caminhoes: Truck,
  onibus: Bus,
};

/** Quebra a linha só entre palavras: "micro-ônibus" nunca vira "micro-" / "ônibus". */
function KeepHyphenated({ text }: { text: string }) {
  return text.split(" ").map((word, index) => (
    <Fragment key={index}>
      {index > 0 && " "}
      {word.includes("-") ? <span className="whitespace-nowrap">{word}</span> : word}
    </Fragment>
  ));
}

export function Segments() {
  return (
    <section id="categorias" aria-labelledby="categorias-title" className="bg-paper section-y">
      <Container>
        <SectionHeading
          id="categorias-title"
          eyebrow="Encontre sua peça"
          title={
            <>
              Navegue por <span className="text-brand">categoria</span>
            </>
          }
          description="Do carro do dia a dia ao ônibus que não pode parar: encontre peças para automóveis, caminhonetes, vans, caminhões, ônibus e micro-ônibus."
        />

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-10 lg:grid-cols-4">
          {segments.map((segment, index) => {
            const Icon = icons[segment.id] ?? Car;
            return (
              <Reveal as="li" key={segment.id} step={index % 4}>
                <article className="group relative flex h-full flex-col bg-white ring-1 ring-line transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(18,20,23,0.5)]">
                  <div className="relative h-24 overflow-hidden bg-ink sm:h-32 lg:h-36">
                    {segment.image ? (
                      <>
                        <Image
                          src={segment.image.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 22vw, 50vw"
                          style={{ objectPosition: segment.image.position }}
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Véu leve à esquerda: legibilidade do número sem apagar a foto */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-ink/50 via-ink/5 to-transparent"
                          aria-hidden
                        />
                      </>
                    ) : (
                      <Icon
                        className="absolute bottom-3 left-4 size-12 stroke-[1.25] text-white transition-transform duration-500 ease-out group-hover:translate-x-1 sm:bottom-4 sm:left-5 sm:size-[4.5rem] lg:size-20"
                        aria-hidden
                      />
                    )}
                    {/* Faixa no ângulo do selo. Sobre a foto fica mais estreita e ganha um filete
                        preto, para não cobrir o veículo. */}
                    <span
                      className={cn(
                        "absolute inset-y-0 -skew-x-12 bg-brand transition-transform duration-500 ease-out group-hover:-translate-x-2",
                        segment.image
                          ? "-right-5 w-10 border-l-[5px] border-ink sm:w-12"
                          : "-right-6 w-16 sm:w-20",
                      )}
                      aria-hidden
                    />
                    <span
                      className="absolute top-3 left-4 font-display-wide text-xs font-extrabold tracking-wider text-white/40 italic sm:left-5"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-3.5 sm:p-5">
                    <p className="text-[0.65rem] font-semibold tracking-wider text-brand uppercase sm:text-[0.7rem]">
                      Linha {segment.line}
                    </p>
                    <h3 className="mt-1.5 font-display-wide text-[0.95rem] leading-tight font-extrabold break-words hyphens-auto text-ink uppercase italic sm:text-xl lg:text-lg xl:text-xl">
                      <KeepHyphenated text={segment.name} />
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-steel sm:text-sm">
                      {segment.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-bold text-ink uppercase italic transition-colors group-hover:text-brand sm:text-sm">
                      Ver peças
                      <ArrowRight
                        className="size-4 text-brand transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>

                  <ShowcaseLink
                    line={segment.line}
                    className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    aria-label={`Ver peças para ${segment.name.toLowerCase()} na vitrine (linha ${segment.line})`}
                  />
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
