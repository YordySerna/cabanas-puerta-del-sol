"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { BotonBrillo } from "@/components/ui/shimmer-button";
import { enlacesNav, sitio } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [compacto, setCompacto] = useState(false);
  const [abierto, setAbierto] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progreso = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (valor) => {
    setCompacto(valor > 60);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-suave",
          compacto
            ? "border-b border-madera-200/60 bg-crema/85 py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-6",
        )}
      >
        <nav className="container flex items-center justify-between">
          <a href="#inicio" aria-label={`${sitio.nombre} — inicio`}>
            <Logo tono={compacto ? "oscuro" : "claro"} compacto={compacto} />
          </a>

          {/* Enlaces de escritorio */}
          <ul className="hidden items-center gap-1 lg:flex">
            {enlacesNav.map((enlace) => (
              <li key={enlace.href}>
                <a
                  href={enlace.href}
                  className={cn(
                    "group relative px-4 py-2 text-sm font-medium transition-colors duration-300",
                    compacto
                      ? "text-bosque-700 hover:text-bosque-950"
                      : "text-white/80 hover:text-white",
                  )}
                >
                  {enlace.label}
                  <span
                    className={cn(
                      "absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 transition-transform duration-500 ease-suave group-hover:scale-x-100",
                      compacto ? "bg-madera-500" : "bg-sol-300",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${sitio.telefonoE164}`}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300",
                compacto
                  ? "text-bosque-700 hover:text-bosque-950"
                  : "text-white/80 hover:text-white",
              )}
            >
              <Phone className="h-4 w-4" strokeWidth={1.75} />
              {sitio.telefono}
            </a>
            <BotonBrillo href="#reservas" className="px-6 py-3 text-[0.82rem]">
              Reservar ahora
            </BotonBrillo>
          </div>

          {/* Botón hamburguesa */}
          <button
            onClick={() => setAbierto(true)}
            aria-label="Abrir menú"
            className={cn(
              "rounded-full border p-2.5 transition-colors duration-300 lg:hidden",
              compacto
                ? "border-madera-300 text-bosque-800"
                : "border-white/30 text-white",
            )}
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </nav>

        {/* Barra de progreso de lectura */}
        <motion.div
          style={{ scaleX: progreso }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-sol-400 via-madera-400 to-agua-400"
        />
      </motion.header>

      {/* Menú móvil a pantalla completa */}
      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-bosque-950/97 backdrop-blur-2xl lg:hidden"
          >
            <div className="container flex h-full flex-col">
              <div className="flex items-center justify-between py-6">
                <Logo tono="claro" compacto />
                <button
                  onClick={() => setAbierto(false)}
                  aria-label="Cerrar menú"
                  className="rounded-full border border-white/25 p-2.5 text-white"
                >
                  <X className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>

              <ul className="flex flex-1 flex-col justify-center gap-2">
                {enlacesNav.map((enlace, i) => (
                  <motion.li
                    key={enlace.href}
                    initial={{ opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 * i + 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={enlace.href}
                      onClick={() => setAbierto(false)}
                      className="block border-b border-white/10 py-5 font-serif text-3xl text-white/90 transition-colors hover:text-sol-300"
                    >
                      {enlace.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 pb-12">
                <BotonBrillo
                  href="#reservas"
                  onClick={() => setAbierto(false)}
                  className="w-full"
                >
                  Reservar ahora
                </BotonBrillo>
                <a
                  href={`tel:${sitio.telefonoE164}`}
                  className="inline-flex items-center justify-center gap-2 text-sm text-white/70"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.75} />
                  {sitio.telefono}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
