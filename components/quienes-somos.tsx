"use client";

import { useRef } from "react";
import { Foto } from "@/components/ui/foto";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Sparkles, Waves } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const cifras = [
  { valor: "+15", etiqueta: "años recibiendo familias" },
  { valor: "4 ha", etiqueta: "de parque y bosque nativo" },
  { valor: "25 m", etiqueta: "de piscina al aire libre" },
];

const pilares = [
  {
    icono: Leaf,
    titulo: "Bosque nativo",
    texto: "Senderos, helechos y un estero que cruza el terreno.",
  },
  {
    icono: Waves,
    titulo: "Agua todo el día",
    texto: "Piscina grande, sector infantil y quinchos alrededor.",
  },
  {
    icono: Sparkles,
    titulo: "Silencio real",
    texto: "Sin ruido de ciudad. Sólo pájaros y viento entre los árboles.",
  },
];

export function QuienesSomos() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Dos velocidades distintas: eso es lo que crea la profundidad. */
  const imgPrincipalY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const imgSecundariaY = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);

  return (
    <section
      id="nosotros"
      ref={ref}
      className="relative overflow-hidden bg-crema py-28 lg:py-40"
    >
      {/* Marca de agua tipográfica, apenas perceptible */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 top-16 select-none font-serif text-[14rem] leading-none text-madera-200/25 lg:text-[20rem]"
      >
        Sur
      </span>

      <div className="container relative">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          {/* ── Columna de imágenes, deliberadamente asimétrica ── */}
          <div className="relative lg:col-span-6">
            <Reveal direction="derecha" amount={0.2}>
              <motion.div
                style={{ y: imgPrincipalY }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-premium lg:w-[86%]"
              >
                <Foto
                  src="/imagenes/cabana-alero.jpg"
                  alt="Cabaña de madera bajo los árboles en Puerta del Sol"
                  fill
                  quality={85}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bosque-950/35 to-transparent" />
              </motion.div>
            </Reveal>

            <Reveal direction="arriba" delay={0.18} amount={0.2}>
              <motion.div
                style={{ y: imgSecundariaY }}
                className="absolute -bottom-12 right-0 aspect-square w-[46%] overflow-hidden rounded-[1.5rem] border-[6px] border-crema shadow-premium"
              >
                <Foto
                  src="/imagenes/estero-helechos.jpg"
                  alt="Estero con helechos en el bosque nativo del recinto"
                  fill
                  quality={85}
                  sizes="25vw"
                  className="object-cover"
                />
              </motion.div>
            </Reveal>

            {/* Sello circular giratorio */}
            <div className="absolute -left-4 -top-6 hidden h-28 w-28 items-center justify-center rounded-full border border-madera-300/70 bg-crema/80 backdrop-blur-sm lg:flex">
              <span className="text-center font-serif text-sm leading-tight text-bosque-800">
                Desde
                <br />
                <span className="text-2xl">2009</span>
              </span>
            </div>
          </div>

          {/* ── Columna de texto ── */}
          <div className="lg:col-span-6 lg:pl-6">
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-8 bg-madera-400" />
                Quiénes somos
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="titulo-seccion mt-6 text-balance">
                Un pedazo de sur que decidimos{" "}
                <span className="italic text-madera-600">no urbanizar</span>.
              </h2>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 space-y-5">
                <p className="parrafo">
                  Puerta del Sol nació como el terreno familiar donde se pasaban
                  los veranos. Con los años levantamos cabañas de madera nativa,
                  abrimos la piscina y despejamos el sector de camping — pero
                  cuidando que el bosque siguiera mandando.
                </p>
                <p className="parrafo">
                  Hoy recibimos familias, grupos de amigos y viajeros que van
                  camino al lago Calafquén. Aquí no hay lobby ni tarjetas de
                  acceso: hay una puerta de madera, olor a leña y un estero que
                  se escucha de noche.
                </p>
              </div>
            </Reveal>

            {/* Pilares */}
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {pilares.map((pilar, i) => (
                <Reveal key={pilar.titulo} delay={0.26 + i * 0.09}>
                  <div className="group">
                    <pilar.icono
                      className="h-5 w-5 text-madera-500 transition-transform duration-500 ease-suave group-hover:-translate-y-1"
                      strokeWidth={1.6}
                    />
                    <h3 className="mt-4 font-serif text-lg text-bosque-900">
                      {pilar.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-bosque-700/75">
                      {pilar.texto}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Cifras */}
            <Reveal delay={0.5}>
              <div className="mt-14 flex flex-wrap items-end gap-x-12 gap-y-8 border-t border-madera-200 pt-10">
                {cifras.map((cifra) => (
                  <div key={cifra.etiqueta}>
                    <p className="font-serif text-4xl text-bosque-900">
                      {cifra.valor}
                    </p>
                    <p className="mt-1.5 max-w-[10rem] text-[0.8rem] leading-snug text-bosque-600/80">
                      {cifra.etiqueta}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
