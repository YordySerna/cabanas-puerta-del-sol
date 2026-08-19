"use client";

import { useRef } from "react";
import { Foto } from "@/components/ui/foto";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";

/**
 * Franja de respiro entre secciones: una segunda dosis de parallax,
 * más lenta y silenciosa que la del hero.
 */
export function FranjaParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const escala = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.12]);

  return (
    <div
      ref={ref}
      className="relative isolate flex h-[24rem] items-center justify-center overflow-hidden bg-bosque-950 lg:h-[30rem]"
    >
      <motion.div
        style={{ y, scale: escala }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <Foto
          src="/imagenes/hortensias.jpg"
          alt="Hortensias en flor en los jardines del recinto"
          fill
          quality={80}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-bosque-950/65" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grano opacity-[0.15] mix-blend-overlay"
      />

      <div className="container text-center">
        <Reveal>
          <p className="mx-auto max-w-3xl font-serif text-[1.7rem] leading-snug text-crema text-balance sm:text-4xl lg:text-[2.75rem]">
            “Aquí el plan del día lo decide el clima, y eso ya es{" "}
            <span className="italic text-sol-300">un lujo</span>.”
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <span className="mt-7 inline-block text-[0.68rem] font-medium uppercase tracking-widest2 text-crema/45">
            Loncoche · Camino a Calafquén
          </span>
        </Reveal>
      </div>
    </div>
  );
}
