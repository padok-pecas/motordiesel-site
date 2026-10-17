import { ArrowUpRight, Building2, Quote, ShieldCheck, Star, Wrench } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const formatNumber = (value: number) => value.toLocaleString("pt-BR");
const formatDate = (iso: string) => iso.split("-").reverse().join("/");

/** Estrelas com preenchimento proporcional à nota (ex.: 4,5 → quatro e meia). */
function Stars({
  rating,
  tone = "dark",
  className,
}: {
  rating: number;
  /** Cor da estrela vazia: clara sobre fundo escuro/vermelho, cinza sobre cartão branco. */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-hidden>
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, rating - index)) * 100;
        return (
          <span key={index} className="relative size-4">
            <Star
              className={cn(
                "absolute inset-0 size-4",
                tone === "dark" ? "text-white/30" : "text-line",
              )}
              fill="currentColor"
            />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
              <Star className="size-4 text-amber-400" fill="currentColor" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

// Conteúdo institucional: aparece enquanto não houver depoimentos reais cadastrados.
const pillars = [
  {
    icon: Building2,
    title: `Empresa do ${site.group}`,
    text: `Atuação em ${site.city} – ${site.state}, atendendo a linha leve e a linha pesada.`,
  },
  {
    icon: Wrench,
    title: "Ajuda para escolher",
    text: "Em dúvida sobre a peça? Pergunte antes de comprar, pelo anúncio ou pelos nossos canais.",
  },
  {
    icon: ShieldCheck,
    title: "Compra pelo Mercado Livre",
    text: "Pagamento e acompanhamento do pedido no ambiente da plataforma.",
  },
];

/**
 * Faixa de confiança. Mostra apenas o que foi conferido no perfil oficial do Google
 * (`site.reviews`): a nota, a quantidade (se disponível) e depoimentos copiados fielmente.
 * Sem depoimentos, os cartões trazem conteúdo institucional — nunca avaliações inventadas.
 */
export function Trust() {
  const { reviews } = site;
  const verifiedAt = reviews.verifiedAt;
  const score =
    verifiedAt && reviews.rating !== null
      ? { rating: reviews.rating, count: reviews.count, verifiedAt }
      : null;
  // Seleção inicial: até 3 depoimentos; os demais ficam no Google.
  const testimonials = verifiedAt ? reviews.testimonials.slice(0, 3) : [];

  return (
    <section id="confianca" aria-labelledby="confianca-title" className="bg-white pb-14 lg:pb-20">
      <Container>
        <div className="relative isolate overflow-hidden bg-ink">
          <Image
            src="/images/cat-motor.webp"
            alt=""
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="-z-10 object-cover opacity-30 grayscale"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/60"
            aria-hidden
          />

          <div className="grid lg:grid-cols-[0.9fr_1.6fr]">
            {/* Painel vermelho com o título */}
            <div className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-brand to-brand-strong p-6 text-white sm:p-8 lg:pr-16 lg:[clip-path:polygon(0_0,100%_0,90%_100%,0_100%)]">
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-white/85 uppercase">
                Por que a MotorDiesel
              </p>
              <h2
                id="confianca-title"
                className="mt-3 font-display-wide text-3xl leading-[1.02] font-black uppercase italic sm:text-4xl"
              >
                {score || testimonials.length > 0 ? (
                  <>
                    Clientes que <span className="text-ink">confiam</span>
                  </>
                ) : (
                  <>
                    Confiança do leve <span className="text-ink">ao pesado</span>
                  </>
                )}
              </h2>

              {score ? (
                <div className="mt-4">
                  <p className="flex items-center gap-3">
                    <span className="font-display-wide text-3xl font-black italic">
                      {formatNumber(score.rating)}
                    </span>
                    <Stars rating={score.rating} />
                    <span className="sr-only">Nota {formatNumber(score.rating)} de 5</span>
                  </p>
                  <p className="mt-1 text-sm text-white/85">
                    {score.count !== null
                      ? `${formatNumber(score.count)} avaliações no Google`
                      : "Nota no Google"}{" "}
                    · conferida em {formatDate(score.verifiedAt)}
                  </p>
                </div>
              ) : (
                <p className="mt-4 max-w-sm leading-relaxed text-white/90">
                  Do carro do dia a dia ao caminhão que não pode parar: atendimento de quem conhece
                  a peça, do fusível ao motor.
                </p>
              )}

              {reviews.profileUrl && (
                <a
                  href={reviews.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-12 w-fit -skew-x-6 items-center gap-2 bg-white px-4 py-2 font-display-wide text-[0.78rem] leading-tight font-bold text-brand uppercase italic shadow-[0_12px_30px_-14px_rgba(0,0,0,0.6)] transition-colors hover:bg-ink hover:text-white sm:whitespace-nowrap"
                >
                  <span className="inline-flex skew-x-6 items-center gap-2">
                    Ver todas as avaliações no Google
                    <span className="sr-only"> (abre em nova aba)</span>
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </a>
              )}
            </div>

            {/* Cartões claros: depoimentos reais (quando cadastrados) ou pilares institucionais */}
            <div className="p-4 sm:p-6 lg:py-8 lg:pr-8 lg:pl-4">
              <ul className="grid gap-3 sm:grid-cols-3">
                {testimonials.length > 0
                  ? testimonials.map((review, index) => (
                      <Reveal as="li" key={review.text} step={index}>
                        <figure className="flex h-full flex-col bg-white p-5 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)]">
                          <div className="flex items-center justify-between gap-3">
                            {review.stars !== null ? (
                              <>
                                <Stars rating={review.stars} tone="light" />
                                <span className="sr-only">{review.stars} de 5 estrelas</span>
                              </>
                            ) : (
                              <span />
                            )}
                            <Quote className="size-5 text-brand/30" aria-hidden />
                          </div>
                          <blockquote className="mt-3 flex-1 leading-relaxed text-ink">
                            “{review.text}”
                          </blockquote>
                          <figcaption className="mt-4 border-t border-line pt-3 text-xs text-steel">
                            {review.author && (
                              <span className="block font-semibold text-ink">{review.author}</span>
                            )}
                            Avaliação no Google{review.date && <> · {review.date}</>}
                          </figcaption>
                        </figure>
                      </Reveal>
                    ))
                  : pillars.map(({ icon: Icon, title, text }, index) => (
                      <Reveal as="li" key={title} step={index}>
                        <div className="grid h-full grid-cols-[auto_1fr] gap-x-4 bg-white p-4 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)] sm:flex sm:flex-col sm:p-5">
                          <span className="row-span-2 flex size-9 -skew-x-6 items-center justify-center bg-brand-soft text-brand">
                            <Icon className="size-4 skew-x-6" aria-hidden />
                          </span>
                          <h3 className="font-display-wide text-base leading-tight font-extrabold text-ink uppercase italic sm:mt-4">
                            {title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-steel sm:mt-2">{text}</p>
                        </div>
                      </Reveal>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
