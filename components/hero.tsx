"use client";

import { useRef } from "react";
import { Foto } from "@/components/ui/foto";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { TituloRevela } from "@/components/ui/reveal";
import { BotonBrillo } from "@/components/ui/shimmer-button";
import { sitio } from "@/lib/site";

const SUAVE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  /* El parallax nace del avance del scroll dentro del propio hero. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const fondoY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const fondoEscala = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const contenidoY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const contenidoOpacidad = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const velo = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  /*
   * `isolate` crea el contexto de apilamiento del hero: sin él, las capas
   * con `-z-10` se pintarían por debajo del fondo de la sección y la
   * fotografía no se vería.
   */
  return (
    <section
      id="inicio"
      ref={ref}
      className="grano-sutil relative isolate flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden bg-bosque-950"
    >
      {/* ── Capa 1 · Fotografía con parallax ── */}
      <motion.div
        style={{ y: fondoY, scale: fondoEscala }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <Foto
          src="/imagenes/piscina-principal.jpg"
          alt="Piscina de Cabañas Puerta del Sol rodeada de bosque en Loncoche"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* ── Capa 2 · Velo oscuro elegante ── */}
      <motion.div
        style={{ opacity: velo }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-bosque-950/85 via-bosque-950/45 to-bosque-950/95"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(13,24,17,0.75)_100%)]" />

      {/* ── Capa 3 · Aurora sutil en tonos agua ── */}
      <div
        aria-hidden
        className="absolute -left-40 top-1/4 -z-10 h-[38rem] w-[38rem] animate-aurora-drift rounded-full bg-agua-400/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-0 -z-10 h-[30rem] w-[30rem] animate-aurora-drift rounded-full bg-sol-500/15 blur-[130px] [animation-delay:-6s]"
      />

      {/* ── Capa 4 · Contenido ── */}
      <motion.div
        style={{ y: contenidoY, opacity: contenidoOpacidad }}
        className="container relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: SUAVE }}
          className="cristal mb-8 inline-flex items-center gap-3 rounded-full px-5 py-2.5"
        >
          <span className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-sol-300 text-sol-300"
                strokeWidth={0}
              />
            ))}
          </span>
          <span className="h-3.5 w-px bg-white/25" />
          <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium uppercase tracking-widest2 text-white/85">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
            Loncoche · Araucanía
          </span>
        </motion.div>

        <TituloRevela
          texto="Tu refugio en la naturaleza"
          acento={["naturaleza"]}
          delay={0.35}
          className="max-w-5xl justify-center font-serif text-[3.1rem] font-normal leading-[0.98] tracking-tight text-white text-balance sm:text-7xl lg:text-[6.2rem]"
        />

        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.05, ease: SUAVE }}
          className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-white/80 text-pretty sm:text-lg"
        >
          Cabañas de madera, piscina bajo el sol del sur y bosque nativo a un
          paso. En el kilómetro 1 del camino a Calafquén, donde el ruido
          simplemente se apaga.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.25, ease: SUAVE }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <BotonBrillo href="#reservas" className="px-10 py-[1.15rem] text-base">
            Reservar ahora
            <ArrowRight
              className="h-4 w-4 transition-transform duration-500 ease-suave group-hover/btn:translate-x-1"
              strokeWidth={2}
            />
          </BotonBrillo>
          <BotonBrillo
            href="#instalaciones"
            variante="cristal"
            className="px-10 py-[1.15rem] text-base"
          >
            Ver instalaciones
          </BotonBrillo>
        </motion.div>
      </motion.div>

      {/* ── Capa 5 · Indicador de scroll ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.9 }}
        className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[0.62rem] font-medium uppercase tracking-widest2 text-white/45">
          Descubre
        </span>
        <span className="relative flex h-11 w-[26px] justify-center rounded-full border border-white/25">
          <span className="mt-2 h-2 w-[3px] animate-scroll-hint rounded-full bg-white/70" />
        </span>
      </motion.div>

      {/* Transición suave hacia la sección siguiente */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-crema to-transparent" />

      {/* Datos ocultos para lectores de pantalla / SEO */}
      <span className="sr-only">
        {sitio.nombre} — {sitio.direccion.calle}, {sitio.direccion.ciudad}.
      </span>
    </section>
  );
}
