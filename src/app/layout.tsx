import type { Metadata, Viewport } from "next";
import { Archivo, Saira } from "next/font/google";

import { site } from "@/content/site";

import "./globals.css";

// Saira só é usada nos títulos (`font-display-wide`), sempre em itálico: carregar também o
// estilo normal pré-carregava ~99 KB sem uso.
const saira = Saira({
  subsets: ["latin"],
  style: ["italic"],
  axes: ["wdth"],
  variable: "--font-saira",
  display: "swap",
});

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });

const description = `Autopeças para veículos leves e pesados em ${site.city} – ${site.state}. Compre pela loja da MotorDiesel no Mercado Livre.`;

export const metadata: Metadata = {
  title: `${site.name} | Autopeças do leve ao pesado — ${site.city}, ${site.state}`,
  description,
  // Protótipo não deve ser indexado. Ao publicar, defina `site.isPrototype = false`.
  robots: site.isPrototype ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: `${site.name} — ${site.slogan}`,
    description,
  },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${saira.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
