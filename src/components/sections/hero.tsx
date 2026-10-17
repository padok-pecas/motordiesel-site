import { ArrowRight, Building2, Layers, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { StoreButton } from "@/components/ui/store-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { site } from "@/content/site";

// Faixa de diferenciais na base do hero (antes era uma seção à parte).
const highlights = [
  { icon: Truck, title: "Linha leve e pesada", text: "Carros, caminhões e veículos a diesel" },
  { icon: Layers, title: "Do fusível ao motor", text: "Do componente elétrico à peça de porte" },
  {
    icon: ShieldCheck,
    title: "Compra pelo Mercado Livre",
    text: "Pagamento no ambiente da plataforma",
  },
  { icon: Building2, title: site.group, text: `${site.city} – ${site.state}` },
];

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink text-white"
    >
      {/* Grafismos: brilho vermelho e faixas no ângulo do selo */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_85%_40%,rgba(219,29,33,0.28),transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 left-[46%] -z-10 hidden h-full w-px -skew-x-12 bg-white/10 lg:block"
        aria-hidden
      />

      <Container className="grid items-center gap-10 pt-10 pb-12 lg:grid-cols-[1.2fr_1fr] lg:gap-6 lg:pt-14 lg:pb-14">
        <div>
          <p className="animate-rise flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-white/60 uppercase">
            Autopeças · {site.city} – {site.state}
          </p>

          <h1
            id="hero-title"
            className="animate-rise mt-5 font-display-wide text-[2.6rem] leading-[0.95] font-black uppercase italic [animation-delay:80ms] sm:text-6xl lg:text-[4.6rem]"
          >
            Do leve
            <br />
            ao pesado.
            <span className="mt-3 block text-[0.5em] leading-tight font-extrabold text-brand">
              Do fusível ao motor.
            </span>
          </h1>

          <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-white/75 [animation-delay:160ms]">
            Peças para carros e para caminhões, do pequeno componente elétrico à peça mecânica de
            maior porte. Compre com segurança pela nossa loja no Mercado Livre.
          </p>

          <div className="animate-rise mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 [animation-delay:240ms]">
            <StoreButton />
            <WhatsAppButton />
          </div>
          <a
            href="#categorias"
            className="animate-rise group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/80 underline-offset-4 [animation-delay:300ms] hover:text-white hover:underline"
          >
            Encontrar minha peça
            <ArrowRight
              className="size-4 text-brand transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </a>
        </div>

        {/* Composição "do fusível ao motor": o motor em destaque e o fusível em escala menor */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="animate-wipe relative aspect-[5/4] overflow-hidden bg-graphite clip-slant-left">
            <Image
              src="/images/hero-motor-diesel.webp"
              alt="Motor a diesel completo em estúdio"
              fill
              preload
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 36rem, 100vw"
              className="object-cover object-[45%_62%]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent"
              aria-hidden
            />
          </div>

          <div className="animate-rise absolute -bottom-5 left-0 flex items-center gap-3 bg-white p-2.5 pr-5 text-ink shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)] [animation-delay:600ms] sm:left-4">
            <span className="relative size-14 shrink-0 overflow-hidden bg-mist">
              <Image
                src="/images/produto-fusiveis.webp"
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
            </span>
            <span>
              <span className="flex items-center gap-2 font-display-wide text-sm font-extrabold uppercase italic">
                Do fusível ao motor
              </span>
              <span className="mt-0.5 block text-xs text-steel">
                Peças para cada parte do veículo
              </span>
            </span>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 bg-black/20">
        <Container>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-5 py-6 lg:grid-cols-4 lg:gap-8">
            {highlights.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 -skew-x-6 items-center justify-center bg-brand/15 text-brand">
                  <Icon className="size-4 skew-x-6" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-bold text-white">{title}</span>
                  <span className="block text-xs leading-snug text-white/60">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
