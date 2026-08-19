import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /** Invierte el sentido del desplazamiento. */
  reverse?: boolean;
  /** Detiene la animación mientras el cursor está encima. */
  pauseOnHover?: boolean;
  vertical?: boolean;
  /** Cuántas veces se clona el contenido para que el loop sea infinito. */
  repeat?: number;
  children: ReactNode;
}

/**
 * Carrusel infinito estilo Magic UI: puro CSS, sin JS ni librerías de slider.
 * La velocidad se controla con la variable `--duration`
 * (ej. `className="[--duration:50s]"`) y el espacio con `--gap`.
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1.5rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical
              ? "animate-marquee-vertical flex-col"
              : "animate-marquee flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
