import Image from "next/image";

import { FacebookIcon, InstagramIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { StoreButton } from "@/components/ui/store-button";
import { site } from "@/content/site";

// Só entram as redes com endereço oficial configurado em site.ts.
const socials = [
  { label: "Instagram", href: site.social.instagram, icon: InstagramIcon },
  { label: "Facebook", href: site.social.facebook, icon: FacebookIcon },
].flatMap((social) => (social.href ? [{ ...social, href: social.href }] : []));

/**
 * iPhone com a captura real do perfil da MotorDiesel no Instagram. Corpo na proporção de um
 * iPhone atual (71,6 × 147,6 mm): moldura fina de titânio, borda preta e Dynamic Island. A
 * captura ocupa a tela entre a faixa de status e a barra de início, sem distorção. O aparelho
 * fica reto de propósito: girar a imagem borra o texto pequeno da captura.
 */
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[10.5rem] lg:w-[12rem]" data-phone>
      {/* Botões laterais */}
      <span className="absolute top-[18%] -left-[2px] h-[4%] w-[3px] rounded-l-sm bg-graphite-soft" />
      <span className="absolute top-[25%] -left-[2px] h-[7%] w-[3px] rounded-l-sm bg-graphite-soft" />
      <span className="absolute top-[34%] -left-[2px] h-[7%] w-[3px] rounded-l-sm bg-graphite-soft" />
      <span className="absolute top-[28%] -right-[2px] h-[10%] w-[3px] rounded-r-sm bg-graphite-soft" />

      <div className="relative aspect-[716/1476] rounded-[1.9rem] bg-gradient-to-br from-[#3a3d42] via-[#1d2024] to-[#2a2e33] p-[3px] shadow-[0_40px_60px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/15">
        <div className="size-full rounded-[1.78rem] bg-black p-[4px]">
          <div className="relative flex size-full flex-col overflow-hidden rounded-[1.5rem] bg-white">
            <div className="h-[6.5%] shrink-0" />
            <div className="relative flex-1">
              {/* Versões já reduzidas em alta qualidade para cada densidade de tela: reduzir a
                  captura no navegador (589px → ~187px) deixava o texto pixelado. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- site estático sem otimização de imagem; o srcSet é montado à mão */}
              <img
                src="/brand/instagram-perfil-380.webp"
                srcSet={[190, 285, 380, 589]
                  .map((width) => `/brand/instagram-perfil-${width}.webp ${width}w`)
                  .join(", ")}
                sizes="(min-width: 1024px) 188px, 165px"
                alt="Perfil @motordieselauto no Instagram"
                width={589}
                height={1075}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover object-top"
              />
            </div>
            <div className="flex h-[4%] shrink-0 items-center justify-center" aria-hidden>
              <span className="h-[3px] w-1/3 rounded-full bg-ink/80" />
            </div>
            {/* Dynamic Island */}
            <span
              className="absolute top-[2%] left-1/2 h-[3.4%] w-[32%] -translate-x-1/2 rounded-full bg-black"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Faixa comercial antes do rodapé: leva à loja da MotorDiesel no Mercado Livre. */
export function MarketplaceBand() {
  return (
    <section
      id="loja"
      aria-labelledby="loja-title"
      className="relative isolate overflow-hidden bg-brand text-white"
    >
      {/* Campo vermelho em diagonal + fachada da loja à direita, separados por uma faixa amarela
          no mesmo ângulo. No desktop a foto ocupa só a área livre depois da diagonal,
          centralizada nos letreiros; no celular o campo vermelho cobre a faixa inteira. */}
      <div className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[46.5%]">
        <Image
          src="/images/fachada-loja.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 47vw, 100vw"
          className="object-cover object-[0%_40%]"
        />
      </div>
      {/* Faixa amarela: mesmo recorte do campo vermelho, só um pouco mais largo. */}
      <div
        className="absolute inset-0 -z-10 hidden bg-stripe-yellow [clip-path:polygon(0_0,62.8%_0,53.5%_100%,0_100%)] lg:block"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-brand lg:[clip-path:polygon(0_0,62%_0,52.7%_100%,0_100%)]"
        aria-hidden
      />

      {/* A terceira coluna fica vazia no desktop: é o espaço da fachada. */}
      <Container className="grid items-center gap-8 py-12 sm:grid-cols-[1fr_auto] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.05fr)] lg:gap-10 lg:py-14">
        <Reveal>
          <h2
            id="loja-title"
            className="font-display-wide text-3xl leading-[1.05] font-extrabold text-balance uppercase italic sm:text-4xl lg:text-[2.1rem] xl:text-[2.5rem]"
          >
            Sua próxima peça pode estar aqui!
          </h2>
          <p className="mt-4 max-w-md text-lg text-white">
            Encontre a MotorDiesel no Mercado Livre e conheça nossa loja online.
          </p>
          <div className="mt-6">
            <StoreButton label="Visite nossa loja" variant="inverse" />
          </div>
          {socials.length > 0 && (
            <div className="mt-6 max-w-md border-t border-white/40 pt-5">
              <h3 className="font-display-wide text-lg leading-tight font-extrabold uppercase italic sm:text-xl">
                Fique por dentro da MotorDiesel
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white sm:text-base">
                Acompanhe nossas novidades, produtos e dicas para as linhas leve e pesada. Siga-nos
                nas redes sociais!
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Redes sociais da MotorDiesel">
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} da MotorDiesel (abre em nova aba)`}
                      className="group inline-flex min-h-11 items-center gap-2.5 border border-white/70 bg-white/25 px-4 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Icon className="size-5 shrink-0" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>

        <div className="hidden sm:block">
          <PhoneMockup />
        </div>
      </Container>
    </section>
  );
}
