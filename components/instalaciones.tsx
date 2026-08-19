"use client";

import { Foto } from "@/components/ui/foto";
import { ArrowUpRight, Flame, Tent, Trees, Trophy, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";
import { Reveal } from "@/components/ui/reveal";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

interface Instalacion {
  titulo: string;
  bajada: string;
  detalle: string;
  imagen: string;
  alt: string;
  icono: LucideIcon;
  etiquetas: string[];
  /* Clases de posición dentro del bento. */
  celda: string;
  destacada?: boolean;
  glow: string;
}

const instalaciones: Instalacion[] = [
  {
    titulo: "Cabañas",
    bajada: "Madera, leña y living con vista al parque",
    detalle:
      "Cabañas independientes para 2 a 6 personas, totalmente equipadas: cocina, baño privado, estacionamiento propio y terraza con parrilla mirando al jardín.",
    imagen: "/imagenes/cabana-exterior.jpg",
    alt: "Cabaña de madera con jardín en Puerta del Sol, Loncoche",
    icono: Flame,
    etiquetas: ["2 a 6 personas", "Cocina equipada", "Parrilla propia"],
    celda: "lg:col-span-2 lg:row-span-2",
    destacada: true,
    glow: "rgba(253,193,113,0.34)",
  },
  {
    titulo: "Piscina & solárium",
    bajada: "25 metros de agua bajo el sol del sur",
    detalle:
      "Piscina de gran formato con sector de menor profundidad, reposeras, toldos y pasto para tenderse toda la tarde.",
    imagen: "/imagenes/piscina-toldos.jpg",
    alt: "Piscina con toldos y reposeras en Cabañas Puerta del Sol",
    icono: Waves,
    etiquetas: ["Sector infantil", "Toldos y reposeras"],
    celda: "lg:col-span-2",
    glow: "rgba(123,209,222,0.38)",
  },
  {
    titulo: "Camping",
    bajada: "Sitios con sombra natural",
    detalle:
      "Sitios amplios sobre pasto, con acceso a agua, luz, baños y quinchos compartidos.",
    imagen: "/imagenes/piscina-familias.jpg",
    alt: "Sector de camping con toldos y familias en el recinto",
    icono: Tent,
    etiquetas: ["Agua y luz", "Baños cerca"],
    celda: "lg:col-span-1",
    glow: "rgba(103,149,118,0.42)",
  },
  {
    titulo: "Canchas",
    bajada: "Básquetbol, fútbol y juegos",
    detalle:
      "Multicancha y explanada de pasto para el partido de la tarde, entre la piscina y el bosque.",
    imagen: "/imagenes/piscina-principal.jpg",
    alt: "Multicancha junto a la piscina del recinto",
    icono: Trophy,
    etiquetas: ["Multicancha", "Explanada"],
    celda: "lg:col-span-1",
    glow: "rgba(249,128,18,0.32)",
  },
  {
    titulo: "Estero & senderos",
    bajada: "El bosque nativo que rodea todo el recinto",
    detalle:
      "Un estero cruza el terreno entre helechos y árboles nativos. Senderos cortos, sombra permanente y áreas de descanso para desaparecer un rato.",
    imagen: "/imagenes/laguna.jpg",
    alt: "Estero y bosque nativo en los alrededores de Puerta del Sol",
    icono: Trees,
    etiquetas: ["Senderos", "Áreas de descanso", "Pesca cercana"],
    celda: "lg:col-span-4",
    glow: "rgba(65,180,200,0.30)",
  },
];

export function Instalaciones() {
  return (
    <section
      id="instalaciones"
      className="relative overflow-hidden bg-bosque-950 py-28 lg:py-36"
    >
      {/* Textura de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grano opacity-[0.14] mix-blend-overlay"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-agua-500/10 blur-[150px]"
      />

      <div className="container relative">
        {/* Encabezado */}
        <div className="mb-16 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow text-sol-300/80">
                <span className="h-px w-8 bg-sol-400/70" />
                Nuestras instalaciones
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="titulo-seccion mt-6 text-crema text-balance">
                Todo lo que hay dentro de la{" "}
                <span className="italic text-sol-300">puerta</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-[1.02rem] leading-relaxed text-crema/60 text-pretty">
              Cinco espacios pensados para que el día se arme solo: dormir,
              nadar, acampar, jugar y caminar entre árboles.
            </p>
          </Reveal>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid auto-rows-[15rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[17rem]">
          {instalaciones.map((item, i) => (
            <Reveal
              key={item.titulo}
              delay={i * 0.08}
              amount={0.15}
              className={cn("min-h-[15rem]", item.celda)}
            >
              <TarjetaInstalacion item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TarjetaInstalacion({ item }: { item: Instalacion }) {
  const Icono = item.icono;

  return (
    <GlowCard glow={item.glow} className="h-full">
      <a
        href={whatsappUrl(
          `Hola, quiero información sobre "${item.titulo}" en Cabañas Puerta del Sol.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-full flex-col justify-end p-6 sm:p-7"
      >
        {/* Fotografía */}
        <Foto
          src={item.imagen}
          alt={item.alt}
          fill
          quality={82}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
          className="absolute inset-0 -z-10 object-cover transition-transform duration-[1200ms] ease-suave group-hover:scale-[1.07]"
        />
        {/* Velo para que el texto siempre se lea */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-bosque-950 via-bosque-950/55 to-bosque-950/10 transition-opacity duration-700 group-hover:from-bosque-950/95"
        />

        {/* Chip del ícono */}
        <span className="absolute left-6 top-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors duration-500 group-hover:border-sol-300/50 group-hover:text-sol-200 sm:left-7 sm:top-7">
          <Icono className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />
        </span>

        {/* Flecha */}
        <span className="absolute right-6 top-6 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 opacity-0 transition-all duration-500 ease-suave group-hover:opacity-100 sm:right-7 sm:top-7">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
        </span>

        {/* Texto */}
        <div className="relative z-10">
          <h3
            className={cn(
              "font-serif leading-tight text-white",
              item.destacada ? "text-4xl sm:text-[2.6rem]" : "text-2xl",
            )}
          >
            {item.titulo}
          </h3>
          <p className="mt-2 text-sm text-white/65">{item.bajada}</p>

          {/* Detalle que se despliega en hover */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-suave group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="pt-4 text-sm leading-relaxed text-white/75">
                {item.detalle}
              </p>
              <ul className="flex flex-wrap gap-2 pt-4">
                {item.etiquetas.map((etiqueta) => (
                  <li
                    key={etiqueta}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white/70 backdrop-blur-sm"
                  >
                    {etiqueta}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </a>
    </GlowCard>
  );
}
