import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: {
    default: "Imobiliária Todescatt | Imóveis de Alto Padrão",
    template: "%s | Imobiliária Todescatt",
  },
  description:
    "Encontre os melhores imóveis da região com a Imobiliária Todescatt. Apartamentos, casas, terrenos e salas comerciais de alto padrão. Atendimento exclusivo.",
  keywords: [
    "imobiliária",
    "imóveis",
    "luxo",
    "alto padrão",
    "apartamentos",
    "casas",
    "venda",
    "Erechim",
    "RS",
    "Todescatt",
  ],
  openGraph: {
    title: "Imobiliária Todescatt | Imóveis de Alto Padrão",
    description:
      "A sua melhor escolha no mercado imobiliário. Experiência premium e atendimento exclusivo.",
    type: "website",
    locale: "pt_BR",
    siteName: "Imobiliária Todescatt",
  },
  icons: {
    icon: "/logo-white.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface-50 text-surface-900 font-sans selection:bg-accent-200 selection:text-primary-900">
        <CustomCursor />
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
