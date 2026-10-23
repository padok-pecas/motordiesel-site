import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

import { Download, ExternalLink, FileText } from "lucide-react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { SiteShell } from "@/components/layout/site-shell";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

const MANUAL_PATH = "/documentos/manual-da-marca-padok-pecas.pdf";
const MANUAL_FILE = join(process.cwd(), "public", MANUAL_PATH);

const description =
  "Padok Peças: uma marca, uma identidade. Conheça a identidade visual da Padok Peças e consulte o Manual da Marca.";

export const metadata: Metadata = {
  title: `Nossa marca | ${site.name}`,
  description,
  openGraph: { title: `Nossa marca | ${site.name}`, description },
};

/** Tamanho do PDF exibido junto aos botões (ex.: "2,4 MB"). */
function formatSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return mb >= 1
    ? `${mb.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} MB`
    : `${Math.round(bytes / 1024)} KB`;
}

export default function BrandPage() {
  // Verificado no build: sem o arquivo em public/documentos, os botões não aparecem.
  const manualSize = existsSync(MANUAL_FILE) ? statSync(MANUAL_FILE).size : null;

  return (
    <SiteShell>
      <PageHeader
        crumb="Nossa marca"
        title={
          <>
            Nossa <span className="text-brand">marca</span>
          </>
        }
        description="Padok Peças: uma marca, uma identidade."
      />

      <section aria-labelledby="manual-title" className="bg-white section-y">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-16">
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-steel">
            <p>
              A Padok Peças possui uma identidade visual própria, desenvolvida para transmitir
              dinamismo, confiança e solidez no universo automotivo.
            </p>
            <p>
              Neste espaço, disponibilizamos nosso Manual da Marca, que reúne as diretrizes de
              utilização do logotipo, as cores institucionais, a tipografia e as orientações para
              manter a consistência visual da marca em diferentes aplicações.
            </p>
            <p className="font-semibold text-ink">
              Conheça nossa identidade e consulte as diretrizes oficiais da Padok Peças.
            </p>
          </div>

          <div className="border-t-4 border-brand bg-mist p-6 sm:p-8">
            <span
              className="flex size-11 -skew-x-6 items-center justify-center bg-ink text-white"
              aria-hidden
            >
              <FileText className="size-5 skew-x-6" />
            </span>
            <h2
              id="manual-title"
              className="mt-5 font-display-wide text-2xl font-extrabold text-ink uppercase italic"
            >
              Manual da Marca Padok Peças
            </h2>

            {manualSize !== null ? (
              <>
                <p className="mt-2 text-sm text-steel">Documento PDF · {formatSize(manualSize)}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <a
                    href={MANUAL_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses("primary", "md")}
                    data-manual="view"
                  >
                    <span className="inline-flex skew-x-6 items-center gap-2">
                      <ExternalLink className="size-4" aria-hidden />
                      Visualizar manual
                      <span className="sr-only"> (PDF, abre em nova aba)</span>
                    </span>
                  </a>
                  <a
                    href={MANUAL_PATH}
                    download="manual-da-marca-padok-pecas.pdf"
                    type="application/pdf"
                    className={buttonClasses("outline", "md")}
                    data-manual="download"
                  >
                    <span className="inline-flex skew-x-6 items-center gap-2">
                      <Download className="size-4" aria-hidden />
                      Baixar manual em PDF
                    </span>
                  </a>
                </div>
              </>
            ) : (
              <p className="mt-3 border border-dashed border-steel/40 bg-white p-4 text-sm leading-relaxed text-steel">
                O Manual da Marca estará disponível para consulta e download em breve.
              </p>
            )}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
