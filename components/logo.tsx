import { cn } from "@/lib/utils";

/**
 * Reinterpretación en SVG del sol en espiral del logo original de Puerta del Sol.
 * Al ser vectorial se ve nítido en cualquier tamaño y hereda el color por CSS.
 */
export function IsotipoSol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("h-9 w-9", className)}
      aria-hidden
    >
      <circle cx="24" cy="24" r="21" className="fill-sol-500" />
      <path
        d="M24 8.5c8.56 0 15.5 6.94 15.5 15.5S32.56 39.5 24 39.5 8.5 32.56 8.5 24c0-6.35 5.15-11.5 11.5-11.5S31.5 17.65 31.5 24c0 4.14-3.36 7.5-7.5 7.5s-7.5-3.36-7.5-7.5c0-1.93 1.57-3.5 3.5-3.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="text-white/95"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** `claro` para fondos oscuros (hero, footer). */
  tono?: "claro" | "oscuro";
  compacto?: boolean;
}

export function Logo({ className, tono = "claro", compacto = false }: LogoProps) {
  const texto = tono === "claro" ? "text-white" : "text-bosque-900";
  const sub = tono === "claro" ? "text-white/60" : "text-madera-600";

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <IsotipoSol className={compacto ? "h-8 w-8" : "h-10 w-10"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif tracking-tight",
            compacto ? "text-lg" : "text-xl",
            texto,
          )}
        >
          Puerta del Sol
        </span>
        <span
          className={cn(
            "mt-1 text-[0.58rem] font-medium uppercase tracking-widest2",
            sub,
          )}
        >
          Cabañas &amp; Piscina
        </span>
      </span>
    </span>
  );
}
