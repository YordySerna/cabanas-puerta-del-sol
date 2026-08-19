"use client";

import {
  Baby,
  Car,
  Flame,
  Leaf,
  Lightbulb,
  MapPin,
  Sun,
  Tent,
  Trees,
  Trophy,
  Utensils,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Marquee de lo que el recinto ofrece de verdad.
 *
 * Ocupa el lugar donde normalmente irían las valoraciones. Cuando el recinto
 * tenga reseñas reales de Google o Facebook, esta sección se puede reemplazar
 * por un marquee de citas con el mismo <Marquee> — el patrón es idéntico,
 * sólo cambia el contenido de las tarjetas.
 */
interface Atributo {
  icono: LucideIcon;
  titulo: string;
  detalle: string;
  /** Acento de color: agua, bosque o sol. */
  tono: "agua" | "bosque" | "sol";
}

const primeraFila: Atributo[] = [
  {
    icono: Waves,
    titulo: "Piscina al aire libre",
    detalle: "De gran formato, rodeada de pasto y árboles",
    tono: "agua",
  },
  {
    icono: Baby,
    titulo: "Sector infantil",
    detalle: "Zona de menor profundidad para los más chicos",
    tono: "agua",
  },
  {
    icono: Sun,
    titulo: "Reposeras y toldos",
    detalle: "Sombra y solárium a orilla de piscina",
    tono: "sol",
  },
  {
    icono: Flame,
    titulo: "Cabañas de madera",
    detalle: "Independientes, para 2 a 6 personas",
    tono: "sol",
  },
  {
    icono: Utensils,
    titulo: "Cocina equipada",
    detalle: "Baño privado y todo lo necesario adentro",
    tono: "bosque",
  },
  {
    icono: Car,
    titulo: "Estacionamiento propio",
    detalle: "En la puerta de tu cabaña",
    tono: "bosque",
  },
];

const segundaFila: Atributo[] = [
  {
    icono: Tent,
    titulo: "Camping con sombra",
    detalle: "Sitios amplios sobre pasto natural",
    tono: "bosque",
  },
  {
    icono: Lightbulb,
    titulo: "Agua y luz en los sitios",
    detalle: "Baños cerca del sector de camping",
    tono: "sol",
  },
  {
    icono: Flame,
    titulo: "Quinchos y parrillas",
    detalle: "Para el asado de la tarde",
    tono: "sol",
  },
  {
    icono: Trophy,
    titulo: "Multicancha",
    detalle: "Básquetbol, fútbol y explanada de pasto",
    tono: "agua",
  },
  {
    icono: Trees,
    titulo: "Bosque nativo",
    detalle: "Senderos y áreas de descanso entre árboles",
    tono: "bosque",
  },
  {
    icono: Leaf,
    titulo: "Estero propio",
    detalle: "Helechos y agua corriendo dentro del terreno",
    tono: "agua",
  },
];

const tonos = {
  agua: {
    chip: "bg-agua-100 text-agua-700",
    halo: "group-hover:bg-agua-300/40",
    borde: "hover:border-agua-300",
  },
  bosque: {
    chip: "bg-bosque-100 text-bosque-700",
    halo: "group-hover:bg-bosque-300/40",
    borde: "hover:border-bosque-300",
  },
  sol: {
    chip: "bg-sol-100 text-sol-700",
    halo: "group-hover:bg-sol-300/40",
    borde: "hover:border-sol-300",
  },
} as const;

export function Experiencia() {
  return (
    <section
      id="experiencia"
      className="relative overflow-hidden bg-crema py-28 lg:py-36"
    >
      <div className="container relative">
        <div className="mx-auto mb-14 max-w-2xl text-center lg:mb-20">
          <Reveal>
            <span className="eyebrow justify-center">
              <span className="h-px w-8 bg-madera-400" />
              Qué encuentras aquí
              <span className="h-px w-8 bg-madera-400" />
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="titulo-seccion mt-6 text-balance">
              Todo lo que necesitas para{" "}
              <span className="italic text-madera-600">no salir en dos días</span>.
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="parrafo mx-auto mt-6 max-w-xl">
              Duermes, nadas, cocinas al aire libre y caminas entre árboles sin
              mover el auto de la puerta.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Marquee infinito, dos filas en sentidos opuestos ── */}
      <Reveal amount={0.1} blur={false}>
        <div className="mask-lateral relative flex flex-col gap-5">
          <Marquee pauseOnHover className="[--duration:54s] [--gap:1.25rem]">
            {primeraFila.map((a) => (
              <TarjetaAtributo key={a.titulo} atributo={a} />
            ))}
          </Marquee>

          <Marquee
            reverse
            pauseOnHover
            className="[--duration:64s] [--gap:1.25rem]"
          >
            {segundaFila.map((a) => (
              <TarjetaAtributo key={a.titulo} atributo={a} />
            ))}
          </Marquee>
        </div>
      </Reveal>

      {/* Cierre con la ubicación */}
      <div className="container">
        <Reveal delay={0.15}>
          <p className="mt-16 flex flex-wrap items-center justify-center gap-2.5 text-center text-sm text-bosque-600/70">
            <MapPin className="h-4 w-4 text-madera-500" strokeWidth={1.7} />
            Ruta S-785, KM 1 camino a Calafquén — a minutos de Loncoche, en
            plena ruta hacia el lago.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function TarjetaAtributo({ atributo }: { atributo: Atributo }) {
  const Icono = atributo.icono;
  const tono = tonos[atributo.tono];

  return (
    <article
      className={cn(
        "group relative w-[19rem] shrink-0 overflow-hidden rounded-[1.5rem] border border-madera-200/80 bg-white/75 p-6 backdrop-blur-sm sm:w-[21rem]",
        "transition-all duration-700 ease-suave hover:-translate-y-1 hover:bg-white hover:shadow-premium-sm",
        tono.borde,
      )}
    >
      {/* Resplandor al pasar el cursor */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition-colors duration-700",
          tono.halo,
        )}
      />

      <span
        className={cn(
          "relative inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 ease-suave group-hover:-translate-y-0.5",
          tono.chip,
        )}
      >
        <Icono className="h-5 w-5" strokeWidth={1.6} />
      </span>

      <h3 className="relative mt-5 font-serif text-xl leading-tight text-bosque-900">
        {atributo.titulo}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-bosque-700/75">
        {atributo.detalle}
      </p>
    </article>
  );
}
