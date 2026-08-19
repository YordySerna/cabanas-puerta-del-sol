"use client";

import { useState, type FormEvent } from "react";
import {
  Clock,
  Instagram,
  Facebook,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Reveal } from "@/components/ui/reveal";
import { BotonBrillo } from "@/components/ui/shimmer-button";
import {
  direccionCompleta,
  enlacesNav,
  mapsEmbedUrl,
  mapsUrl,
  sitio,
  whatsappUrl,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const datos = [
  {
    icono: MapPin,
    etiqueta: "Dónde estamos",
    valor: `${sitio.direccion.calle}\n${sitio.direccion.ciudad}, ${sitio.direccion.region}`,
    href: mapsUrl,
    externo: true,
  },
  {
    icono: Phone,
    etiqueta: "Teléfono / WhatsApp",
    valor: sitio.telefono,
    href: `tel:${sitio.telefonoE164}`,
  },
  {
    icono: Mail,
    etiqueta: "Correo",
    valor: sitio.email,
    href: `mailto:${sitio.email}`,
  },
  {
    icono: Clock,
    etiqueta: "Atención",
    valor: sitio.horario,
  },
];

export function Contacto() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    /*
     * Sin backend: la consulta se abre en WhatsApp ya redactada.
     * Si más adelante quieres guardar los mensajes, cambia este bloque por un
     * `fetch("/api/contacto", { method: "POST", body: ... })`.
     */
    const texto = [
      `¡Hola! Soy ${nombre || "un visitante"}.`,
      "",
      mensaje || "Quisiera más información sobre las cabañas.",
      "",
      telefono ? `Mi teléfono: ${telefono}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappUrl(texto), "_blank", "noopener,noreferrer");
    setEnviado(true);
  }

  return (
    <footer
      id="contacto"
      className="relative overflow-hidden bg-bosque-950 pt-28 text-crema lg:pt-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grano opacity-[0.13] mix-blend-overlay"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-agua-500/12 blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-40 h-[26rem] w-[26rem] rounded-full bg-sol-600/12 blur-[150px]"
      />

      <div className="container relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ── Columna izquierda: información ── */}
          <div>
            <Reveal>
              <span className="eyebrow text-sol-300/80">
                <span className="h-px w-8 bg-sol-400/70" />
                Consulta y contacto
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="titulo-seccion mt-6 text-crema text-balance">
                Escríbenos y armamos tu{" "}
                <span className="italic text-sol-300">escapada</span>.
              </h2>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-crema/60 text-pretty">
                Cuéntanos cuántos son, qué fechas tienes en mente y qué te
                gustaría hacer. Respondemos por WhatsApp el mismo día.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {datos.map((dato, i) => {
                const Contenido = (
                  <>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sol-300/90 transition-colors duration-500 group-hover:border-sol-300/50 group-hover:bg-sol-400/10">
                      <dato.icono className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.6} />
                    </span>
                    <span className="mt-4 block text-[0.68rem] font-medium uppercase tracking-widest2 text-crema/40">
                      {dato.etiqueta}
                    </span>
                    <span className="mt-2 block whitespace-pre-line text-[0.95rem] leading-relaxed text-crema/85 transition-colors duration-300 group-hover:text-white">
                      {dato.valor}
                    </span>
                  </>
                );

                return (
                  <Reveal key={dato.etiqueta} delay={0.24 + i * 0.07}>
                    {dato.href ? (
                      <a
                        href={dato.href}
                        target={dato.externo ? "_blank" : undefined}
                        rel={dato.externo ? "noopener noreferrer" : undefined}
                        className="group block"
                      >
                        {Contenido}
                      </a>
                    ) : (
                      <div className="group">{Contenido}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>

            {/* Mapa */}
            <Reveal delay={0.5}>
              <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-white/10">
                <iframe
                  src={mapsEmbedUrl}
                  title={`Ubicación de ${sitio.nombre} en Loncoche`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full grayscale-[0.35] contrast-[1.05] transition-all duration-700 hover:grayscale-0"
                />
              </div>
            </Reveal>
          </div>

          {/* ── Columna derecha: formulario ── */}
          <Reveal direction="izquierda" delay={0.15} amount={0.15}>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-7 backdrop-blur-xl sm:p-9">
              <h3 className="font-serif text-2xl text-crema">
                Envíanos tu consulta
              </h3>
              <p className="mt-2 text-sm text-crema/50">
                Toma menos de un minuto.
              </p>

              <form onSubmit={enviar} className="mt-8 space-y-5">
                <Campo
                  id="nombre"
                  etiqueta="Tu nombre"
                  valor={nombre}
                  onChange={setNombre}
                  placeholder="Ej: María González"
                  requerido
                />
                <Campo
                  id="telefono"
                  etiqueta="Teléfono"
                  tipo="tel"
                  valor={telefono}
                  onChange={setTelefono}
                  placeholder="+56 9 ..."
                />
                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-[0.68rem] font-medium uppercase tracking-widest2 text-crema/45"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    rows={4}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Somos 4 adultos y 2 niños, buscamos cabaña para el fin de semana largo…"
                    className={campoClases}
                  />
                </div>

                <BotonBrillo type="submit" className="w-full">
                  {enviado ? "Consulta enviada" : "Enviar por WhatsApp"}
                  <Send className="h-4 w-4" strokeWidth={1.9} />
                </BotonBrillo>

                <p className="text-center text-[0.7rem] leading-relaxed text-crema/35">
                  Al enviar se abre WhatsApp con tu mensaje ya escrito. No
                  guardamos tus datos en este sitio.
                </p>
              </form>
            </div>
          </Reveal>
        </div>

        {/* ── Barra inferior ── */}
        <div className="mt-24 border-t border-white/10 py-10">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <Logo tono="claro" compacto />

            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {enlacesNav.map((enlace) => (
                <li key={enlace.href}>
                  <a
                    href={enlace.href}
                    className="text-sm text-crema/50 transition-colors duration-300 hover:text-sol-300"
                  >
                    {enlace.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <EnlaceRed href={sitio.redes.instagram} etiqueta="Instagram">
                <Instagram className="h-4 w-4" strokeWidth={1.7} />
              </EnlaceRed>
              <EnlaceRed href={sitio.redes.facebook} etiqueta="Facebook">
                <Facebook className="h-4 w-4" strokeWidth={1.7} />
              </EnlaceRed>
            </div>
          </div>

          <p className="mt-10 text-center text-xs leading-relaxed text-crema/30">
            © {new Date().getFullYear()} {sitio.nombre} · {direccionCompleta}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────── subcomponentes ──────────────────────────── */

const campoClases = cn(
  "mt-2.5 w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3.5",
  "text-[0.95rem] text-crema placeholder:text-crema/25",
  "outline-none transition-all duration-300",
  "focus:border-sol-300/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-sol-400/20",
);

function Campo({
  id,
  etiqueta,
  valor,
  onChange,
  placeholder,
  tipo = "text",
  requerido,
}: {
  id: string;
  etiqueta: string;
  valor: string;
  onChange: (v: string) => void;
  placeholder?: string;
  tipo?: string;
  requerido?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[0.68rem] font-medium uppercase tracking-widest2 text-crema/45"
      >
        {etiqueta}
      </label>
      <input
        id={id}
        type={tipo}
        value={valor}
        required={requerido}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={campoClases}
      />
    </div>
  );
}

function EnlaceRed({
  href,
  etiqueta,
  children,
}: {
  href: string;
  etiqueta: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={etiqueta}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-crema/60 transition-all duration-500 ease-suave hover:-translate-y-0.5 hover:border-sol-300/60 hover:text-sol-300"
    >
      {children}
    </a>
  );
}
