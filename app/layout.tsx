import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { sitio } from "@/lib/site";
import "./globals.css";

/* Serif editorial para títulos. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

/* Sans geométrica y limpia para el resto. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: {
    default: `${sitio.nombre} — ${sitio.tagline}`,
    template: `%s · ${sitio.nombre}`,
  },
  description: sitio.descripcion,
  keywords: [
    "cabañas Loncoche",
    "cabañas Araucanía",
    "piscina Loncoche",
    "camping Loncoche",
    "alojamiento camino a Calafquén",
    "Cabañas Puerta del Sol",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: sitio.url,
    siteName: sitio.nombre,
    title: `${sitio.nombre} — ${sitio.tagline}`,
    description: sitio.descripcion,
    images: [
      {
        url: `${sitio.url}/imagenes/piscina-principal.jpg`,
        width: 1200,
        height: 630,
        alt: `Piscina de ${sitio.nombre} en Loncoche`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${sitio.nombre} — ${sitio.tagline}`,
    description: sitio.descripcion,
    images: [`${sitio.url}/imagenes/piscina-principal.jpg`],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0D1811",
  width: "device-width",
  initialScale: 1,
};

/* Datos estructurados: ayuda a que Google muestre dirección y teléfono. */
const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "Campground",
  name: sitio.nombre,
  description: sitio.descripcion,
  url: sitio.url,
  telephone: sitio.telefonoE164,
  email: sitio.email,
  image: [`${sitio.url}/imagenes/piscina-principal.jpg`],
  address: {
    "@type": "PostalAddress",
    streetAddress: sitio.direccion.calle,
    addressLocality: sitio.direccion.ciudad,
    addressRegion: sitio.direccion.region,
    addressCountry: "CL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: sitio.geo.lat,
    longitude: sitio.geo.lng,
  },
  amenityFeature: [
    "Piscina al aire libre",
    "Cabañas equipadas",
    "Camping",
    "Canchas deportivas",
    "Estacionamiento",
  ].map((nombre) => ({
    "@type": "LocationFeatureSpecification",
    name: nombre,
    value: true,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-crema">
        {children}
        {/* El JSON es nuestro, no viene del usuario: serializarlo es seguro. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(datosEstructurados),
          }}
        />
      </body>
    </html>
  );
}
