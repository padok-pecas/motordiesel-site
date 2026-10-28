import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";

import { site } from "@/content/site";

import "./globals.css";

// Montserrat é a fonte da identidade visual (manual da marca): títulos em Bold/ExtraBold e
// textos corridos em Regular. Fonte variável, então um único arquivo cobre todos os pesos.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

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
    <html lang="pt-BR" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
