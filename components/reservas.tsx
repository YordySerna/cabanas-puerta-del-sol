"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Minus,
  MoonStar,
  Plus,
  ShieldCheck,
  Tent,
  Users,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ShineBorder } from "@/components/ui/shine-border";
import { BotonBrillo } from "@/components/ui/shimmer-button";
import { sitio, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ────────────────────────── utilidades de fecha ────────────────────────── */

const DIA_MS = 86_400_000;
const DIAS_SEMANA = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

const fmtMes = new Intl.DateTimeFormat("es-CL", {
  month: "long",
  year: "numeric",
});
const fmtLargo = new Intl.DateTimeFormat("es-CL", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
const fmtCorto = new Intl.DateTimeFormat("es-CL", {
  day: "2-digit",
  month: "short",
});

function inicioDelDia(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function sumaMeses(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function mismoDia(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Devuelve la grilla del mes con huecos al inicio, empezando en lunes. */
function grillaDelMes(base: Date): (Date | null)[] {
  const anio = base.getFullYear();
  const mes = base.getMonth();
  const primero = new Date(anio, mes, 1);
  const totalDias = new Date(anio, mes + 1, 0).getDate();
  const hueco = (primero.getDay() + 6) % 7; // lunes = 0

  const celdas: (Date | null)[] = Array.from({ length: hueco }, () => null);
  for (let d = 1; d <= totalDias; d++) celdas.push(new Date(anio, mes, d));
  while (celdas.length % 7 !== 0) celdas.push(null);
  return celdas;
}

function capitaliza(texto: string) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/* ────────────────────────────── tipos de estadía ───────────────────────── */

interface Alojamiento {
  id: string;
  nombre: string;
  descripcion: string;
  icono: LucideIcon;
}

const alojamientos: Alojamiento[] = [
  {
    id: "cabana",
    nombre: "Cabaña",
    descripcion: "Equipada, 2 a 6 personas",
    icono: MoonStar,
  },
  {
    id: "camping",
    nombre: "Camping",
    descripcion: "Sitio con sombra y servicios",
    icono: Tent,
  },
  {
    id: "piscina",
    nombre: "Día de piscina",
    descripcion: "Acceso por el día",
    icono: Waves,
  },
];

const garantias = [
  { icono: ShieldCheck, texto: "Sin pago online: reservas por WhatsApp." },
  { icono: Clock, texto: "Respondemos el mismo día, de 09:00 a 21:00." },
  { icono: Check, texto: "Confirmación con abono del 30%." },
];

/* ──────────────────────────────── componente ───────────────────────────── */

export function Reservas() {
  const [montado, setMontado] = useState(false);
  const [hoy, setHoy] = useState<Date | null>(null);
  const [mesBase, setMesBase] = useState<Date | null>(null);

  const [llegada, setLlegada] = useState<Date | null>(null);
  const [salida, setSalida] = useState<Date | null>(null);
  const [hover, setHover] = useState<Date | null>(null);

  const [personas, setPersonas] = useState(2);
  const [tipo, setTipo] = useState(alojamientos[0].id);

  /* El calendario se arma en el cliente: evita cualquier desajuste de
     hidratación por diferencia de zona horaria entre servidor y navegador. */
  useEffect(() => {
    const ahora = inicioDelDia(new Date());
    setHoy(ahora);
    setMesBase(new Date(ahora.getFullYear(), ahora.getMonth(), 1));
    setMontado(true);
  }, []);

  const soloPorElDia = tipo === "piscina";

  const noches = useMemo(() => {
    if (!llegada || !salida) return 0;
    return Math.round((salida.getTime() - llegada.getTime()) / DIA_MS);
  }, [llegada, salida]);

  function seleccionar(dia: Date) {
    if (soloPorElDia) {
      setLlegada(dia);
      setSalida(null);
      return;
    }
    if (!llegada || (llegada && salida)) {
      setLlegada(dia);
      setSalida(null);
      return;
    }
    if (dia.getTime() <= llegada.getTime()) {
      setLlegada(dia);
      setSalida(null);
      return;
    }
    setSalida(dia);
  }

  function limpiar() {
    setLlegada(null);
    setSalida(null);
    setHover(null);
  }

  const finProvisional = salida ?? (llegada && hover ? hover : null);

  function estadoDelDia(dia: Date) {
    if (!llegada) return "libre" as const;
    const t = dia.getTime();
    const ini = llegada.getTime();
    /* Un hover anterior a la llegada no debe invertir el rango. */
    const fin = Math.max(ini, finProvisional?.getTime() ?? ini);

    if (t === ini && t === fin) return "unico" as const;
    if (t === ini) return "inicio" as const;
    if (t === fin) return "fin" as const;
    if (t > ini && t < fin) return "medio" as const;
    return "libre" as const;
  }

  const mensaje = useMemo(() => {
    const etiquetaTipo =
      alojamientos.find((a) => a.id === tipo)?.nombre ?? "Estadía";
    const lineas = [
      `¡Hola! Quiero consultar disponibilidad en ${sitio.nombre}.`,
      "",
      `• Alojamiento: ${etiquetaTipo}`,
      llegada
        ? `• ${soloPorElDia ? "Fecha" : "Llegada"}: ${capitaliza(fmtLargo.format(llegada))}`
        : "• Fecha: por definir",
    ];
    if (!soloPorElDia && salida) {
      lineas.push(`• Salida: ${capitaliza(fmtLargo.format(salida))}`);
      lineas.push(`• Noches: ${noches}`);
    }
    lineas.push(`• Personas: ${personas}`);
    lineas.push("", "Quedo atento(a). ¡Gracias!");
    return lineas.join("\n");
  }, [tipo, llegada, salida, noches, personas, soloPorElDia]);

  const listoParaEnviar = soloPorElDia ? !!llegada : !!llegada && !!salida;

  return (
    <section
      id="reservas"
      className="relative overflow-hidden bg-arena/70 py-28 lg:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-agua-300/25 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-[22rem] w-[22rem] rounded-full bg-sol-300/20 blur-[120px]"
      />

      <div className="container relative">
        {/* Encabezado */}
        <div className="mx-auto mb-14 max-w-2xl text-center lg:mb-20">
          <Reveal>
            <span className="eyebrow justify-center">
              <span className="h-px w-8 bg-madera-400" />
              Agenda tu estadía
              <span className="h-px w-8 bg-madera-400" />
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="titulo-seccion mt-6 text-balance">
              Elige tus fechas y te{" "}
              <span className="italic text-agua-600">confirmamos hoy</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="parrafo mx-auto mt-6 max-w-xl">
              Marca los días en el calendario, dinos cuántos son y envía la
              consulta directo a nuestro WhatsApp. Sin formularios eternos.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ── Calendario ── */}
          <Reveal direction="derecha" amount={0.15} className="lg:col-span-7">
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-madera-200/80 bg-white/80 p-6 shadow-premium-sm backdrop-blur-xl sm:p-8">
              <div className="mb-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-bosque-900 text-crema">
                    <CalendarDays className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="font-serif text-lg leading-none text-bosque-900">
                      Disponibilidad
                    </p>
                    <p className="mt-1.5 text-xs text-bosque-600/70">
                      {soloPorElDia
                        ? "Selecciona el día de tu visita"
                        : "Selecciona llegada y salida"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <BotonNav
                    etiqueta="Mes anterior"
                    onClick={() =>
                      setMesBase((m) => (m ? sumaMeses(m, -1) : m))
                    }
                    disabled={
                      !mesBase ||
                      !hoy ||
                      (mesBase.getFullYear() === hoy.getFullYear() &&
                        mesBase.getMonth() === hoy.getMonth())
                    }
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                  </BotonNav>
                  <BotonNav
                    etiqueta="Mes siguiente"
                    onClick={() => setMesBase((m) => (m ? sumaMeses(m, 1) : m))}
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={2} />
                  </BotonNav>
                </div>
              </div>

              {montado && hoy && mesBase ? (
                <div className="grid gap-8 md:grid-cols-2">
                  <Mes
                    base={mesBase}
                    hoy={hoy}
                    estadoDelDia={estadoDelDia}
                    onSeleccionar={seleccionar}
                    onHover={setHover}
                  />
                  <div className="hidden md:block">
                    <Mes
                      base={sumaMeses(mesBase, 1)}
                      hoy={hoy}
                      estadoDelDia={estadoDelDia}
                      onSeleccionar={seleccionar}
                      onHover={setHover}
                    />
                  </div>
                </div>
              ) : (
                <EsqueletoCalendario />
              )}

              {/* Leyenda */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-madera-200/70 pt-6 text-[0.72rem] text-bosque-600/70">
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-bosque-900" />
                  Fecha elegida
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-madera-200" />
                  Rango de estadía
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-madera-100 ring-1 ring-inset ring-madera-300" />
                  Disponible
                </span>
                {(llegada || salida) && (
                  <button
                    onClick={limpiar}
                    className="ml-auto text-[0.72rem] font-medium text-madera-600 underline underline-offset-4 transition-colors hover:text-madera-800"
                  >
                    Limpiar selección
                  </button>
                )}
              </div>
            </div>
          </Reveal>

          {/* ── Panel de resumen ── */}
          <Reveal direction="izquierda" delay={0.12} amount={0.15} className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-bosque-950 p-6 shadow-premium sm:p-8">
              <ShineBorder duracion="7s" color="rgb(253 193 113)" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-grano opacity-[0.15] mix-blend-overlay"
              />

              <div className="relative z-20">
                {/* Tipo de alojamiento */}
                <p className="text-[0.7rem] font-medium uppercase tracking-widest2 text-crema/50">
                  Tipo de estadía
                </p>
                <div className="mt-4 grid gap-2.5">
                  {alojamientos.map((a) => {
                    const activo = tipo === a.id;
                    return (
                      <button
                        key={a.id}
                        onClick={() => {
                          setTipo(a.id);
                          if (a.id === "piscina") setSalida(null);
                        }}
                        className={cn(
                          "group flex items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-500 ease-suave",
                          activo
                            ? "border-sol-300/60 bg-white/10"
                            : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.07]",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-500",
                            activo
                              ? "bg-sol-400 text-bosque-950"
                              : "bg-white/10 text-crema/70",
                          )}
                        >
                          <a.icono className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.7} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-crema">
                            {a.nombre}
                          </span>
                          <span className="block text-xs text-crema/50">
                            {a.descripcion}
                          </span>
                        </span>
                        {activo && (
                          <motion.span
                            layoutId="check-alojamiento"
                            className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-sol-400 text-bosque-950"
                          >
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </motion.span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Huéspedes */}
                <div className="mt-7 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="inline-flex items-center gap-3 text-sm text-crema/80">
                    <Users className="h-4 w-4 text-crema/50" strokeWidth={1.7} />
                    Personas
                  </span>
                  <span className="flex items-center gap-3">
                    <BotonContador
                      etiqueta="Quitar una persona"
                      onClick={() => setPersonas((p) => Math.max(1, p - 1))}
                      disabled={personas <= 1}
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </BotonContador>
                    <span className="w-7 text-center font-serif text-xl text-crema">
                      {personas}
                    </span>
                    <BotonContador
                      etiqueta="Agregar una persona"
                      onClick={() => setPersonas((p) => Math.min(20, p + 1))}
                      disabled={personas >= 20}
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </BotonContador>
                  </span>
                </div>

                {/* Resumen de fechas */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <CajaFecha
                    etiqueta={soloPorElDia ? "Día de visita" : "Llegada"}
                    valor={llegada ? capitaliza(fmtCorto.format(llegada)) : "—"}
                  />
                  <CajaFecha
                    etiqueta="Salida"
                    valor={salida ? capitaliza(fmtCorto.format(salida)) : "—"}
                    atenuada={soloPorElDia}
                  />
                </div>

                {!soloPorElDia && (
                  <p className="mt-4 flex items-center justify-between border-b border-t border-white/10 py-3.5 text-sm">
                    <span className="text-crema/55">Noches</span>
                    <span className="font-serif text-xl text-crema">
                      {noches || "—"}
                    </span>
                  </p>
                )}

                {/* CTA */}
                <div className="mt-7">
                  <BotonBrillo
                    href={listoParaEnviar ? whatsappUrl(mensaje) : undefined}
                    nuevaPestana={listoParaEnviar}
                    disabled={!listoParaEnviar}
                    className={cn(
                      "w-full",
                      !listoParaEnviar && "saturate-[0.35]",
                    )}
                  >
                    {listoParaEnviar
                      ? "Consultar disponibilidad"
                      : soloPorElDia
                        ? "Elige un día"
                        : "Elige tus fechas"}
                  </BotonBrillo>
                  <p className="mt-3.5 text-center text-[0.7rem] leading-relaxed text-crema/40">
                    Se abre WhatsApp con tu consulta ya escrita. No se cobra
                    nada en este paso.
                  </p>
                </div>

                {/* Garantías */}
                <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
                  {garantias.map((g) => (
                    <li
                      key={g.texto}
                      className="flex items-start gap-3 text-[0.8rem] leading-relaxed text-crema/60"
                    >
                      <g.icono
                        className="mt-0.5 h-4 w-4 shrink-0 text-sol-300/80"
                        strokeWidth={1.7}
                      />
                      {g.texto}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── subcomponentes ──────────────────────────── */

interface MesProps {
  base: Date;
  hoy: Date;
  estadoDelDia: (d: Date) => "libre" | "inicio" | "fin" | "medio" | "unico";
  onSeleccionar: (d: Date) => void;
  onHover: (d: Date | null) => void;
}

function Mes({ base, hoy, estadoDelDia, onSeleccionar, onHover }: MesProps) {
  const celdas = grillaDelMes(base);

  return (
    <div>
      <p className="mb-4 text-center font-serif text-[1.05rem] text-bosque-900">
        {capitaliza(fmtMes.format(base))}
      </p>

      <div className="grid grid-cols-7 gap-1">
        {DIAS_SEMANA.map((d) => (
          <span
            key={d}
            className="pb-2 text-center text-[0.65rem] font-medium uppercase tracking-wider text-bosque-500/60"
          >
            {d}
          </span>
        ))}

        {celdas.map((dia, i) => {
          if (!dia) return <span key={`v-${i}`} />;

          const pasado = dia.getTime() < hoy.getTime();
          const estado = pasado ? "libre" : estadoDelDia(dia);
          const esHoy = mismoDia(dia, hoy);
          const seleccionado =
            estado === "inicio" || estado === "fin" || estado === "unico";

          return (
            <button
              key={dia.toISOString()}
              disabled={pasado}
              onClick={() => onSeleccionar(dia)}
              onMouseEnter={() => onHover(dia)}
              onMouseLeave={() => onHover(null)}
              className={cn(
                "relative aspect-square text-[0.82rem] font-medium transition-all duration-300 ease-suave",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bosque-500",
                pasado && "cursor-not-allowed text-bosque-300/50 line-through",
                !pasado && !seleccionado && estado !== "medio" &&
                  "text-bosque-800 hover:bg-madera-100 rounded-xl",
                estado === "medio" && "bg-madera-200/70 text-bosque-900",
                estado === "inicio" && "rounded-l-xl bg-bosque-900 text-crema",
                estado === "fin" && "rounded-r-xl bg-bosque-900 text-crema",
                estado === "unico" && "rounded-xl bg-bosque-900 text-crema",
              )}
            >
              {dia.getDate()}
              {esHoy && !seleccionado && (
                <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-sol-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EsqueletoCalendario() {
  return (
    <div className="grid gap-8 md:grid-cols-2" aria-hidden>
      {[0, 1].map((m) => (
        <div key={m} className={m === 1 ? "hidden md:block" : undefined}>
          <div className="mx-auto mb-5 h-4 w-28 rounded-full bg-madera-200/70" />
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-madera-100/70"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BotonNav({
  children,
  onClick,
  disabled,
  etiqueta,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  etiqueta: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={etiqueta}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-madera-300/80 text-bosque-700 transition-colors duration-300 hover:border-bosque-800 hover:bg-bosque-900 hover:text-crema disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-madera-300/80 disabled:hover:bg-transparent disabled:hover:text-bosque-700"
    >
      {children}
    </button>
  );
}

function BotonContador({
  children,
  onClick,
  disabled,
  etiqueta,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  etiqueta: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={etiqueta}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-crema/80 transition-colors duration-300 hover:border-sol-300/70 hover:text-sol-200 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function CajaFecha({
  etiqueta,
  valor,
  atenuada,
}: {
  etiqueta: string;
  valor: string;
  atenuada?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.03] p-4",
        atenuada && "opacity-35",
      )}
    >
      <p className="text-[0.65rem] uppercase tracking-wider text-crema/45">
        {etiqueta}
      </p>
      <p className="mt-1.5 font-serif text-lg text-crema">{valor}</p>
    </div>
  );
}
