import { ArrowDown, MapPin } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { GrupoPadokLogo } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

// Endereço sem o CEP (o CEP fica no rodapé); sem endereço, só a cidade.
const location = site.contact.address
  ? site.contact.address.replace(/,\s*\d{5}-?\d{3}$/, "")
  : `${site.city} – Maranhão`;

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="bg-white section-y">
      <Container className="grid items-center gap-10 md:grid-cols-2 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-graphite clip-slant-left sm:aspect-square">
            <Image
              src="/images/sobre-balcao.webp"
              alt="Equipe da MotorDiesel atendendo no balcão de vendas da loja"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-[50%_42%]"
            />
          </div>
          <div className="absolute right-0 -bottom-5 bg-white px-5 py-4 shadow-[0_24px_50px_-24px_rgba(18,20,23,0.45)]">
            <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-steel uppercase">
              Uma empresa do
            </p>
            <GrupoPadokLogo className="mt-2 w-32" />
          </div>
        </Reveal>

        <div className="pt-4 lg:pt-0">
          <SectionHeading
            id="sobre-title"
            eyebrow="Sobre a MotorDiesel"
            title={
              <>
                Confiança de quem <span className="text-brand">vive o motor</span>
              </>
            }
          />

          {site.about ? (
            <p className="mt-5 text-lg leading-relaxed text-steel">{site.about}</p>
          ) : (
            <div className="mt-5 border border-dashed border-steel/40 bg-mist p-5 text-sm leading-relaxed text-steel">
              <p className="font-semibold text-ink">Texto institucional em preparação</p>
              <p className="mt-1">
                A história, a estrutura e os diferenciais da MotorDiesel serão inseridos aqui com as
                informações oficiais da empresa.
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="flex items-center gap-2 text-steel">
              <MapPin className="size-4 text-brand" aria-hidden />
              <span>
                <span className="font-semibold text-ink">Onde estamos:</span> {location}
              </span>
            </p>
            <a
              href="#contato"
              className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand uppercase"
            >
              Ver contatos
              <ArrowDown
                className="size-4 transition-transform group-hover:translate-y-0.5"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
