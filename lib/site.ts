/**
 * Fuente única de verdad del negocio.
 * Cambia un dato aquí y se actualiza en toda la landing (SEO incluido).
 */

export const sitio = {
  nombre: "Cabañas Puerta del Sol",
  nombreCorto: "Puerta del Sol",
  tagline: "Cabañas, piscina y camping en Loncoche",
  descripcion:
    "Cabañas de madera, piscina temperada por el sol, camping y áreas de descanso a orillas del bosque nativo, en la ruta hacia el lago Calafquén.",
  /* Cambia esto por el dominio propio cuando lo tengan. */
  url: "https://yordyserna.github.io/cabanas-puerta-del-sol",

  telefono: "+56 9 7476 2567",
  telefonoE164: "+56974762567",
  whatsapp: "56974762567",
  email: "contacto@cabanaspuertadelsol.cl",

  direccion: {
    calle: "Ruta S-785, KM 1 camino a Calafquén",
    ciudad: "Loncoche",
    region: "Región de La Araucanía",
    pais: "Chile",
  },
  /** Coordenadas aproximadas de Loncoche — ajústalas al punto exacto del recinto. */
  geo: { lat: -39.3712, lng: -72.6316 },

  horario: "Todos los días · 09:00 a 21:00 hrs",

  redes: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
} as const;

/** Dirección completa en una línea. */
export const direccionCompleta = `${sitio.direccion.calle}, ${sitio.direccion.ciudad}, ${sitio.direccion.region}, ${sitio.direccion.pais}`;

/** Enlace a Google Maps con la dirección del recinto. */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  direccionCompleta,
)}`;

/** Embed de Google Maps sin API key. */
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  direccionCompleta,
)}&z=13&output=embed`;

/** Construye un enlace de WhatsApp con mensaje prellenado. */
export function whatsappUrl(mensaje: string) {
  return `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export const enlacesNav = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#instalaciones", label: "Instalaciones" },
  { href: "#reservas", label: "Reservas" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#contacto", label: "Contacto" },
] as const;
