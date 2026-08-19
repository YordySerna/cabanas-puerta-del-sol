"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  /** Color del halo que sigue al cursor. */
  glow?: string;
  /** Radio del foco de luz, en píxeles. */
  radio?: number;
  /** Añade una inclinación 3D muy sutil al mover el mouse. */
  tilt?: boolean;
}

/**
 * Tarjeta con foco de luz que sigue al cursor (patrón spotlight de Aceternity UI).
 *
 * Dos capas hacen el efecto:
 *  1. `halo`  → resplandor interior que ilumina la foto y el texto.
 *  2. `filo`  → el mismo gradiente recortado a 1px de borde con `mask-composite`,
 *               así el contorno se enciende justo donde está el cursor.
 */
export function GlowCard({
  children,
  className,
  glow = "rgba(253,193,113,0.32)",
  radio = 380,
  tilt = false,
}: GlowCardProps) {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 26 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 26 });

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);

    if (tilt) {
      rotateY.set(((x - width / 2) / width) * 7);
      rotateX.set(((height / 2 - y) / height) * 7);
    }
  }

  function onMouseLeave() {
    mouseX.set(-9999);
    mouseY.set(-9999);
    rotateX.set(0);
    rotateY.set(0);
  }

  const halo = useMotionTemplate`radial-gradient(${radio}px circle at ${mouseX}px ${mouseY}px, ${glow}, transparent 72%)`;
  const filo = useMotionTemplate`radial-gradient(${radio}px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.75), transparent 70%)`;

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 1200 } : undefined}
      className={cn(
        "group relative isolate overflow-hidden rounded-[1.75rem] border border-madera-200/50 bg-bosque-950",
        "shadow-premium-sm transition-shadow duration-700 ease-suave hover:shadow-premium",
        className,
      )}
    >
      {/* Halo interior que sigue al cursor */}
      <motion.div
        aria-hidden
        style={{ background: halo }}
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* El mismo gradiente, recortado a un filo de 1px */}
      <motion.div
        aria-hidden
        style={{ background: filo }}
        className={cn(
          "pointer-events-none absolute inset-0 z-30 rounded-[inherit] p-px opacity-0",
          "transition-opacity duration-500 group-hover:opacity-100",
          "[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
          "[mask-composite:exclude] [-webkit-mask-composite:xor]",
        )}
      />

      {children}
    </motion.div>
  );
}
