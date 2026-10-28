import { BackgroundVideo } from "@/components/ui/background-video";
import { Container } from "@/components/ui/container";
import { StoreButton } from "@/components/ui/store-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      // Ocupa a primeira dobra (descontando o cabeçalho fixo: h-16 / lg:h-18).
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-ink text-white lg:min-h-[calc(100svh-4.5rem)]"
    >
      {/* Vídeo de fundo sobre a capa (o primeiro quadro do vídeo, já no HTML): a capa aparece
          de imediato e o vídeo surge por cima quando começa a tocar, no mesmo enquadramento.
          Sem vídeo (movimento reduzido, economia de dados, falha ou autoplay bloqueado), a capa
          fica como imagem estática. */}
      {/* O arquivo (1280×720) traz faixas pretas de 40px em cima e embaixo. A caixa da capa e do
          vídeo é 12,5% mais alta (720/640) e centralizada: o `object-cover` cobre a área só com
          a imagem útil (1280×640) e as faixas ficam sempre fora da tela. */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element -- site estático sem otimização de imagem; o srcSet é montado à mão */}
        <img
          src="/videos/motor-diesel-hero-poster-1280.webp"
          srcSet="/videos/motor-diesel-hero-poster-640.webp 640w, /videos/motor-diesel-hero-poster-1280.webp 1280w"
          sizes="100vw"
          alt=""
          width={1280}
          height={720}
          fetchPriority="high"
          className="absolute inset-x-0 top-[-6.25%] h-[112.5%] w-full object-cover object-center"
        />
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
        {/* Duas frases lado a lado (empilhadas no celular), separadas por um filete, e a
            assinatura em vermelho embaixo. "do"/"ao" ficam menores, como no layout da marca. */}
        <h1
          id="hero-title"
          className="animate-rise flex flex-col items-center font-display-wide text-[2.6rem] leading-[0.95] font-extrabold tracking-tight uppercase [animation-delay:80ms] sm:text-6xl lg:text-[5.25rem]"
        >
          <span className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch sm:gap-8 lg:gap-12">
            <span className="block">
              <span className="block">
                <Small>do</Small> Leve <Small>ao</Small>
              </span>{" "}
              <span className="block">Pesado</span>
            </span>
            <span className="hidden w-px bg-white/70 sm:my-[0.35em] sm:block" aria-hidden />{" "}
            <span className="block">
              <span className="block">
                <Small>do</Small> Fusível
              </span>{" "}
              <span className="block">
                <Small>ao</Small> Motor
              </span>
            </span>
          </span>{" "}
          <span className="mt-4 block text-[0.62em] leading-none text-brand sm:mt-5 sm:text-[0.7em]">
            {/* No celular quebra em "Simplesmente / a melhor", sem sobrar uma palavra sozinha. */}
            Simplesmente <br className="sm:hidden" />a melhor
          </span>
        </h1>

        <p className="animate-rise mt-7 max-w-3xl text-base leading-relaxed text-white/90 [animation-delay:160ms] sm:text-lg">
          Peças para automóveis, caminhonetes, vans, caminhões, ônibus e micro-ônibus.{" "}
          <strong className="block font-bold text-white">
            Compre com segurança pela nossa loja no Mercado Livre.
          </strong>
        </p>

        <div className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 [animation-delay:240ms]">
          {/* Abaixo de 360px os botões não cabiam inteiros numa área de 288px. */}
          <StoreButton className="max-[359px]:px-4 max-[359px]:text-[0.8rem]" />
          <WhatsAppButton
            label="Chama no Zap"
            className="max-[359px]:px-4 max-[359px]:text-[0.8rem]"
          />
        </div>
      </Container>
    </section>
  );
}

/** Palavras de ligação ("do", "ao") menores, na linha de base das palavras principais. */
function Small({ children }: { children: React.ReactNode }) {
  return <span className="text-[0.5em] tracking-normal">{children}</span>;
}
