import { cn } from "@/lib/utils";

interface ShineBorderProps {
  className?: string;
  /** Grosor del borde en píxeles. */
  grosor?: number;
  /** Duración de una vuelta completa. */
  duracion?: string;
  /** Color del destello que recorre el contorno. */
  color?: string;
}

/**
 * Borde animado estilo Magic UI: un gradiente cónico gira alrededor de la caja.
 * El padre debe tener `position: relative` y su propio `rounded-*`
 * (este componente hereda el radio con `rounded-[inherit]`).
 *
 * Usa la propiedad registrada `--angulo` definida en `globals.css`.
 */
export function ShineBorder({
  className,
  grosor = 1,
  duracion = "6s",
  color = "rgb(253 193 113)",
}: ShineBorderProps) {
  return (
    <div
      aria-hidden
      style={
        {
          padding: `${grosor}px`,
          animationDuration: duracion,
          "--brillo": color,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 z-10 animate-spin-border rounded-[inherit]",
        "[background:conic-gradient(from_var(--angulo),transparent_0%,var(--brillo)_12%,transparent_28%,transparent_50%,var(--brillo)_62%,transparent_78%)]",
        "[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
        "[mask-composite:exclude] [-webkit-mask-composite:xor]",
        className,
      )}
    />
  );
}
