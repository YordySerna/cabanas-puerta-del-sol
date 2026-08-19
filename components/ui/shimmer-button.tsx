"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BotonProps {
  children: ReactNode;
  /** Si viene, el componente se renderiza como enlace en vez de botón. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  variante?: "sol" | "cristal" | "bosque";
  /** Sólo aplica cuando hay `href`. */
  nuevaPestana?: boolean;
  ariaLabel?: string;
}

const variantes = {
  /* CTA principal: degradado sol → madera, los colores del logo del recinto. */
  sol: "bg-gradient-to-r from-sol-400 via-sol-500 to-madera-500 text-white shadow-[0_18px_45px_-16px_rgba(249,128,18,0.75)] hover:shadow-[0_22px_60px_-14px_rgba(249,128,18,0.9)]",
  /* Secundario sobre fotografía oscura. */
  cristal:
    "cristal text-white hover:bg-white/20 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)]",
  /* Secundario sobre fondo claro. */
  bosque:
    "bg-bosque-900 text-crema hover:bg-bosque-800 shadow-[0_16px_40px_-18px_rgba(13,24,17,0.8)]",
} as const;

const animacionBase = {
  transition: { type: "spring" as const, stiffness: 400, damping: 22 },
};

/**
 * Botón con destello que barre la superficie (patrón Shimmer Button de Magic UI).
 * El brillo es una capa inclinada que cruza el botón al hacer hover.
 */
export function BotonBrillo({
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
  className,
  variante = "sol",
  nuevaPestana = false,
  ariaLabel,
}: BotonProps) {
  const clases = cn(
    "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full",
    "px-8 py-4 text-sm font-medium tracking-wide",
    "transition-[transform,box-shadow,background-color] duration-500 ease-suave",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sol-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variantes[variante],
    className,
  );

  const interior = (
    <>
      {/* Barrido de luz */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[900ms] ease-suave group-hover/btn:translate-x-full"
      />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
    </>
  );

  const hover = disabled ? undefined : { scale: 1.035 };
  const tap = disabled ? undefined : { scale: 0.975 };

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        target={nuevaPestana ? "_blank" : undefined}
        rel={nuevaPestana ? "noopener noreferrer" : undefined}
        className={clases}
        whileHover={hover}
        whileTap={tap}
        {...animacionBase}
      >
        {interior}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clases}
      whileHover={hover}
      whileTap={tap}
      {...animacionBase}
    >
      {interior}
    </motion.button>
  );
}
