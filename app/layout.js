import { Poppins, Fraunces } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { SITE } from "@/lib/data";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Defina NEXT_PUBLIC_SITE_URL nas variáveis de ambiente do deploy (ex: Vercel)
// com o domínio final do site, para o link compartilhado sair correto.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = `${SITE.nome} — Doces Finos e Personalizados`;
const description =
  "Doces finos e personalizados para casamentos, aniversários, festas e comemorações. Consulte disponibilidade pelo WhatsApp.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "doces finos",
    "brigadeiros gourmet",
    "doces para casamento",
    "doces para festa",
    "doces personalizados",
  ],
  openGraph: {
    title,
    description,
    url: "/",
    siteName: SITE.nome,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/img/brigadeiro-hero.png",
        width: 1448,
        height: 1086,
        alt: "Brigadeiro gourmet da Fer Soares",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/img/brigadeiro-hero.png"],
  },
};

export const viewport = {
  themeColor: "#1c3a2e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${fraunces.variable}`}>
      <body className="min-h-full bg-creme text-verde font-sans antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
