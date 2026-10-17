import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { MotorDieselBadge } from "@/components/ui/logo";
import { imageCredits } from "@/content/credits";

export const metadata: Metadata = { title: "Créditos das imagens | MotorDiesel" };

export default function CreditsPage() {
  return (
    <main className="min-h-svh bg-white py-12">
      <Container className="max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-steel hover:text-ink"
        >
          <ArrowLeft className="size-4" aria-hidden /> Voltar
        </Link>
        <MotorDieselBadge className="mt-8 w-40" />
        <h1 className="mt-8 font-display-wide text-3xl font-black text-ink uppercase italic">
          Créditos das imagens
        </h1>
        <p className="mt-3 text-steel">
          Fotos do acervo da MotorDiesel e fotografias provisórias, usadas conforme a licença de
          cada uma. Todas foram recortadas, redimensionadas e convertidas para WebP; as adaptações
          de fotos sob CC BY-SA seguem disponíveis sob a mesma licença.
        </p>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {imageCredits.map((credit) => (
            <li
              key={credit.file}
              className="flex flex-col gap-1 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <span>
                <span className="text-ink">{credit.author}</span>
                <span className="block text-xs text-steel">
                  {credit.file} ·{" "}
                  {credit.licenseUrl ? (
                    <a
                      href={credit.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-ink"
                    >
                      {credit.license}
                    </a>
                  ) : (
                    credit.license
                  )}
                </span>
              </span>
              {credit.url ? (
                <a
                  href={credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand underline-offset-4 hover:underline"
                >
                  Ver no {credit.source}
                </a>
              ) : (
                <span className="text-steel">{credit.source}</span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
