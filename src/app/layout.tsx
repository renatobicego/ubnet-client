import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsappButton from "@/components/buttons/WhatsappButton";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

const Eurostile = localFont({
  src: [
    {
      path: "./fonts/eurostile.otf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-eurostile",
});
const HelveticaNeue = localFont({
  src: [
    {
      path: "./fonts/HelveticaNeueLight.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNeueMedium.otf",
      weight: "500",
      style: "medium",
    },
  ],
  display: "swap",
  variable: "--font-helvetica-neue",
  preload: true,
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Ubnet",
  description: "La internet más rápida de la región patagónica",
  keywords: [
    "internet",
    "fibra óptica",
    "cámaras de seguridad",
    "antenas",
    "antenas wifi",
    "wifi",
    "conexión",
    "velocidad",
    "patagonia",
    "servicio de internet",
    "Ubnet",
    "fibra",
    "conexión a internet",
    "internet Patagonia",
    "internet de alta velocidad",
    "internet confiable",
    "internet para empresas",
    "internet para hogares",
    "internet para negocios",
    "internet para comunidades",
    "internet para zonas rurales",
    "internet para zonas urbanas",
    "internet para zonas suburbanas",
    "internet para zonas remotas",
    "internet para zonas aisladas",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Ubnet - Creando Conexiones",
    url: "https://ubnet-client.vercel.app/",
    siteName: "Ubnet",
    locale: "es",
    type: "website",
    description: "La internet más rápida de la región patagónica",
    images: "https://ubnet-client.vercel.app/thumbnail.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ubnet - Creando Conexiones",
    description: "La internet más rápida de la región patagónica",
    images: ["https://ubnet-client.vercel.app/thumbnail.jpg"], // Must be an absolute URL
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    notranslate: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.ubnet.com.ar/",
    name: "Ubnet",
    image: ["https://ubnet-client.vercel.app/thumbnail.jpg"],
    description: "La internet más rápida de la región patagónica",
    url: "https://www.ubnet.com.ar/",
    telephone: "+542974738886",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Coronel Francisco Seguí 906",
      addressLocality: "Rada Tilly",
      addressRegion: "Chubut",
      postalCode: "U9001",
      addressCountry: "AR",
    },
    areaServed: "Región Patagónica",
    sameAs: [
      "https://www.facebook.com/ubnetcaletaolivia",
      "https://www.instagram.com/ubnet_oficial",
    ],
  };
  return (
    <html lang="es">
      <body
        className={`${HelveticaNeue.variable} ${Eurostile.variable} layout relative w-screen overflow-x-hidden antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Header />
          {children}
          <WhatsappButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
