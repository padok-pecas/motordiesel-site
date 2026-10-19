import { ArrowRight } from "lucide-react";

import { BackgroundVideo } from "@/components/ui/background-video";
import { Container } from "@/components/ui/container";
import { StoreButton } from "@/components/ui/store-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      // Ocupa a primeira dobra (descontando o cabeçalho fixo: h-16 / lg:h-18).
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-ink text-white lg:min-h-[calc(100svh-4.5rem)]"
    >
      {/* Vídeo de fundo. Sem vídeo (movimento reduzido, economia de dados, falha ou
          autoplay bloqueado), fica o fundo grafite com o brilho vermelho abaixo. */}
      {/* O arquivo (1280×720) traz faixas pretas de 40px em cima e embaixo. A caixa do vídeo
          é 12,5% mais alta (720/640) e centralizada: o `object-cover` passa a cobrir a área
          só com a imagem útil (1280×640) e as faixas ficam sempre fora da tela. */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden>
        <BackgroundVideo
          src="/videos/motor-diesel-hero.mp4"
          className="absolute inset-x-0 top-[-6.25%] h-[112.5%] w-full object-center"
        />
      </div>
      {/* Véu para contraste: uniforme, mais denso no centro, atrás do texto */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-ink/70 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(18,20,23,0.6),transparent_75%)]"
        aria-hidden
      />
      {/* Grafismo: brilho vermelho discreto na base */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_45%_at_50%_100%,rgba(219,29,33,0.22),transparent_70%)]"
        aria-hidden
      />

      <Container className="flex flex-col items-center py-16 text-center sm:py-20">
        <p className="animate-rise text-xs font-semibold tracking-[0.22em] text-white/60 uppercase">
          Autopeças · {site.city} – {site.state}
        </p>

        <h1
          id="hero-title"
          className="animate-rise mt-5 font-display-wide text-[2.6rem] leading-[0.95] font-black uppercase italic [animation-delay:80ms] sm:text-6xl lg:text-[5rem]"
        >
          Do leve
          <br />
          ao pesado.
          <span className="mt-3 block text-[0.5em] leading-tight font-extrabold text-brand">
            Do fusível ao motor.
          </span>
        </h1>

        <p className="animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-white/80 [animation-delay:160ms]">
          Peças para carros e para caminhões, do pequeno componente elétrico à peça mecânica de
          maior porte. Compre com segurança pela nossa loja no Mercado Livre.
        </p>

        <div className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 [animation-delay:240ms]">
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
      </Container>
    </section>
  );
}
