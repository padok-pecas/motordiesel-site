import { BackgroundVideo } from "@/components/ui/background-video";
import { Container } from "@/components/ui/container";
import { StoreGlowButton } from "@/components/ui/store-glow-button";
import { cn } from "@/lib/cn";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      // Ocupa a primeira dobra (descontando o cabeçalho fixo: h-18 / lg:h-22).
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-ink text-white lg:min-h-[calc(100svh-5.5rem)]"
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
            assinatura em vermelho embaixo, na Saira Condensed do layout da marca. "do"/"ao" ficam
            menores. Como no layout, as duas linhas de cada frase têm a mesma largura (Line) e a
            assinatura ocupa a largura do bloco todo. Tamanho fluido: acompanha a largura da tela,
            mas também a altura (notebooks com tela baixa), entre 2.75rem e 6rem. */}
        <h1
          id="hero-title"
          className="animate-rise inline-flex flex-col font-slogan text-[clamp(2.75rem,min(8.5vw,12svh),6rem)] leading-[0.9] font-bold uppercase [animation-delay:80ms]"
        >
          <span className="flex flex-col items-center gap-3 sm:flex-row sm:items-stretch sm:gap-[0.4em]">
            <span className="flex flex-col">
              <Line>
                <Small>do</Small> Leve <Small>ao</Small>
              </Line>{" "}
              {/* Palavras grandes mais espaçadas para igualar a largura das linhas (medido na
                  Saira Condensed); a margem negativa anula o espaço depois da última letra. */}
              <Line>
                <Wide spacing="0.045em">Pesado</Wide>
              </Line>
            </span>
            <span className="hidden w-px bg-white/70 sm:my-[0.15em] sm:block" aria-hidden />{" "}
            <span className="flex flex-col">
              <Line>
                <Small>do</Small> Fusível
              </Line>{" "}
              <Line>
                <Small>ao</Small> <Wide spacing="0.058em">Motor</Wide>
              </Line>
            </span>
          </span>{" "}
          <span className="mt-3 block text-[0.75em] leading-none text-brand sm:mt-[0.12em] sm:text-[0.78em] sm:[text-align-last:justify]">
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

        <div className="animate-rise mt-8 flex justify-center [animation-delay:240ms]">
          <StoreGlowButton label="Compre em nossa loja virtual" size="lg" arrow />
        </div>
      </Container>
    </section>
  );
}

/** Linha de uma frase: as palavras se espalham até a largura da linha mais longa da coluna. */
function Line({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("block whitespace-nowrap [text-align-last:justify]", className)}>
      {children}
    </span>
  );
}

/** Palavra com espaçamento extra entre as letras, sem sobra depois da última. */
function Wide({ spacing, children }: { spacing: string; children: React.ReactNode }) {
  return <span style={{ letterSpacing: spacing, marginRight: `-${spacing}` }}>{children}</span>;
}

/** Palavras de ligação ("do", "ao") menores, na linha de base das palavras principais. */
function Small({ children }: { children: React.ReactNode }) {
  return <span className="text-[0.5em] tracking-normal">{children}</span>;
}
