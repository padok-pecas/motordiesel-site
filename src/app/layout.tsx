import type { Metadata, Viewport } from "next";
import { Montserrat, Saira_Condensed } from "next/font/google";

import { site } from "@/content/site";

import "./globals.css";

// Montserrat é a fonte da identidade visual (manual da marca): títulos em Bold/ExtraBold e
// textos corridos em Regular. Fonte variável: um arquivo por estilo cobre todos os pesos. O
// itálico é usado só nos títulos da faixa da loja, como no layout aprovado.
const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

// Saira Condensed: só no título do hero ("do leve ao pesado..."), como no layout da marca.
const sairaCondensed = Saira_Condensed({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-saira-condensed",
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
    <html lang="pt-BR" className={`${montserrat.variable} ${sairaCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
