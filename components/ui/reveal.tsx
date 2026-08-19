"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direccion = "arriba" | "abajo" | "izquierda" | "derecha" | "ninguna";

const desplazamiento: Record<Direccion, { x: number; y: number }> = {
  arriba: { x: 0, y: 36 },
  abajo: { x: 0, y: -36 },
  izquierda: { x: 48, y: 0 },
  derecha: { x: -48, y: 0 },
  ninguna: { x: 0, y: 0 },
};

const SUAVE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Retardo en segundos. */
  delay?: number;
  direction?: Direccion;
  /** Porción del elemento que debe verse para disparar la animación (0-1). */
  amount?: number;
  duration?: number;
  /** Añade un desenfoque de entrada, muy usado en Aceternity UI. */
  blur?: boolean;
  as?: "div" | "section" | "li" | "span" | "article";
}

/**
 * Envoltorio de fade-in al hacer scroll.
 * Se dispara una sola vez y respeta `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "arriba",
  amount = 0.25,
  duration = 0.85,
  blur = true,
  as = "div",
}: RevealProps) {
  const reducir = useReducedMotion();
  // El cast mantiene contentas las props de JSX al elegir la etiqueta en runtime.
  const Etiqueta = motion[as] as typeof motion.div;
  const { x, y } = reducir ? desplazamiento.ninguna : desplazamiento[direction];

  return (
    <Etiqueta
      className={className}
      initial={{
        opacity: 0,
        x,
        y,
        filter: blur && !reducir ? "blur(10px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: SUAVE }}
    >
      {children}
    </Etiqueta>
  );
}

/* ------------------------------------------------------------------ */

const contenedorPalabras: Variants = {
  oculto: {},
  visible: (retardo: number = 0) => ({
    transition: { staggerChildren: 0.075, delayChildren: retardo },
  }),
};

/* Sin desenfoque a propósito: cada palabra se revela tras una máscara
   (`overflow-hidden`), y un blur recortado dejaría bordes duros a la vista. */
const palabra: Variants = {
  oculto: { opacity: 0, y: "0.95em" },
  visible: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.95, ease: SUAVE },
  },
};

interface TituloRevelaProps {
  texto: string;
  className?: string;
  delay?: number;
  /** Palabras que se pintan en cursiva + color de acento. */
  acento?: string[];
  acentoClassName?: string;
}

/**
 * Título que aparece palabra por palabra, con desenfoque.
 * Es el gesto que hace que un hero se sienta "de resort de lujo".
 */
export function TituloRevela({
  texto,
  className,
  delay = 0,
  acento = [],
  acentoClassName = "italic text-sol-300",
}: TituloRevelaProps) {
  const reducir = useReducedMotion();
  const palabras = texto.split(" ");
  const normaliza = (s: string) => s.toLowerCase().replace(/[.,;:¡!¿?]/g, "");
  const acentos = acento.map(normaliza);

  if (reducir) {
    return <h1 className={className}>{texto}</h1>;
  }

  return (
    <motion.h1
      className={cn("flex flex-wrap gap-x-[0.26em]", className)}
      variants={contenedorPalabras}
      custom={delay}
      initial="oculto"
      animate="visible"
      aria-label={texto}
    >
      {palabras.map((p, i) => (
        <span key={`${p}-${i}`} className="inline-block overflow-hidden pb-[0.12em]">
          <motion.span
            variants={palabra}
            className={cn(
              "inline-block will-change-transform",
              acentos.includes(normaliza(p)) && acentoClassName,
            )}
          >
            {p}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
