import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

const lines = [
  {
    id: "leve",
    title: "Linha leve",
    kicker: "Para o dia a dia",
    text: "Peças para carros de passeio e veículos leves: da manutenção preventiva ao reparo.",
    image: "/images/linha-leve.webp",
    alt: "Carro de passeio escuro em movimento numa rodovia",
    position: "object-[70%_100%]",
    tone: "light",
  },
  {
    id: "pesada",
    title: "Linha pesada",
    kicker: "Para quem não pode parar",
    text: "Peças para caminhões e veículos pesados a diesel, pensadas para o trabalho na estrada.",
    image: "/images/linha-pesada.webp",
    alt: "Caminhões de carga em rodovia ao entardecer",
    position: "object-[30%_75%]",
    tone: "dark",
  },
] as const;

export function Lines() {
  return (
    <section id="linhas" aria-labelledby="linhas-title" className="bg-ink text-white">
      <Container className="flex flex-col gap-4 pt-12 pb-8 md:flex-row md:items-end md:justify-between lg:pt-16">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-brand-on-dark uppercase">
            Do leve ao pesado
          </p>
          <h2
            id="linhas-title"
            className="mt-4 font-display-wide text-3xl leading-[1.05] font-extrabold uppercase italic sm:text-4xl lg:text-5xl"
          >
            Uma loja, <span className="text-brand">duas linhas</span>
          </h2>
        </div>
        <p className="max-w-md leading-relaxed text-white/70">
          Do carro do dia a dia ao caminhão que não pode parar: a MotorDiesel atende as duas
          frentes, do fusível ao motor.
        </p>
      </Container>

      <div className="relative grid md:grid-cols-2">
        {lines.map((line) => (
          <article
            key={line.id}
            aria-labelledby={`linha-${line.id}`}
            className={cn(
              "group relative isolate flex min-h-[28rem] items-start overflow-hidden lg:min-h-[32rem]",
              line.tone === "dark" && "md:justify-end",
            )}
          >
            <Image
              src={line.image}
              alt={line.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={cn(
                "-z-10 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]",
                line.position,
              )}
            />
            <div
              className={cn(
                "absolute inset-0 -z-10",
                line.tone === "light"
                  ? "bg-gradient-to-b from-ink/40 via-transparent to-transparent"
                  : "bg-gradient-to-b from-ink/80 via-ink/20 to-transparent",
              )}
              aria-hidden
            />

            <Reveal
              className={cn(
                "relative m-4 w-full max-w-sm p-5 sm:m-8 sm:p-7",
                // Leve = bloco claro; pesada = bloco escuro com borda vermelha. O contraste
                // entre os dois painéis comunica as duas frentes.
                line.tone === "light"
                  ? "bg-white text-ink"
                  : "border-l-4 border-brand bg-ink/80 text-white backdrop-blur-sm",
              )}
            >
              <p
                className={cn(
                  "text-xs font-semibold tracking-[0.2em] uppercase",
                  line.tone === "light" ? "text-steel" : "text-white/60",
                )}
              >
                {line.kicker}
              </p>
              <h3
                id={`linha-${line.id}`}
                className="mt-2 font-display-wide text-3xl font-black uppercase italic sm:text-4xl"
              >
                {line.title}
              </h3>
              <p
                className={cn(
                  "mt-3 leading-relaxed",
                  line.tone === "light" ? "text-steel" : "text-white/75",
                )}
              >
                {line.text}
              </p>
              <Link
                href="/#destaques"
                className={cn(
                  "group/link mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase italic",
                  line.tone === "light" ? "text-brand" : "text-white",
                )}
              >
                Ver peças em destaque
                <ArrowRight
                  className="size-4 text-brand transition-transform group-hover/link:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
