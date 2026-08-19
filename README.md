# Cabañas Puerta del Sol — Landing Page

Landing inmersiva para el complejo turístico **Cabañas Puerta del Sol**
(Ruta S-785, KM 1 camino a Calafquén, Loncoche, Región de La Araucanía).

**En vivo:** <https://yordyserna.github.io/cabanas-puerta-del-sol/>

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · lucide-react.
Se exporta como sitio estático y se publica solo en GitHub Pages.

---

## 1. Comandos

```bash
npm run dev
```

Desarrollo en <http://localhost:3000>, con recarga al guardar.

```bash
npm run build
```

Genera el sitio estático completo en `out/`.

```bash
npm run preview
```

Sirve `out/` en <http://localhost:4000/cabanas-puerta-del-sol/> imitando a
GitHub Pages — misma subruta, mismos 404. Úsalo para comprobar que nada se
rompió **antes** de publicar.

```bash
npm run imagenes
```

Comprime las fotos nuevas que dejes en `public/imagenes/`.

### Qué hace cada dependencia

| Paquete | Para qué |
|---|---|
| `framer-motion` | Todas las animaciones: parallax, fade-in al scroll, hover, menú móvil. |
| `tailwindcss` + `postcss` + `autoprefixer` | Sistema de estilos y la paleta personalizada. |
| `lucide-react` | Íconos de línea (ligeros, se pintan con `currentColor`). |
| `clsx` + `tailwind-merge` | El helper `cn()` que resuelve conflictos de clases (patrón shadcn/Aceternity). |
| `sharp` | Sólo lo usa `npm run imagenes` para comprimir fotos. |
| `next` / `react` / `react-dom` | El framework. |

---

## 2. Estructura

```
app/
  layout.tsx        Fuentes (Playfair + Inter), metadata SEO y JSON-LD
  page.tsx          Composición de las 6 secciones
  globals.css       Reset, tokens, utilidades (.eyebrow, .cristal, .mask-lateral…)

components/
  navbar.tsx              Nav fijo, transparente sobre el hero, menú móvil
  hero.tsx                1 · Portada con parallax y título palabra a palabra
  quienes-somos.tsx       2 · Bloque asimétrico con doble parallax
  instalaciones.tsx       3 · Bento grid de 5 tarjetas con glow
  franja-parallax.tsx     Franja de respiro entre secciones
  reservas.tsx            4 · Calendario de rango + panel de resumen
  experiencia.tsx         5 · Marquee infinito de lo que ofrece el recinto
  contacto.tsx            6 · Formulario + datos + mapa + pie
  whatsapp-flotante.tsx   Botón flotante que aparece tras el hero
  logo.tsx                Isotipo del sol en SVG (recreado del logo original)
  ui/
    reveal.tsx          <Reveal> y <TituloRevela>  (fade-in al scroll)
    marquee.tsx         <Marquee>                  (carrusel infinito, puro CSS)
    glow-card.tsx       <GlowCard>                 (spotlight que sigue al cursor)
    shine-border.tsx    <ShineBorder>              (borde cónico animado)
    shimmer-button.tsx  <BotonBrillo>              (CTA con barrido de luz)
    foto.tsx            <Foto>                     (next/image + basePath)

lib/
  site.ts   👈 Todos los datos del negocio en un solo archivo
  utils.ts  Helper cn()

scripts/
  optimizar-imagenes.mjs   npm run imagenes
  servir-export.mjs        npm run preview

.github/workflows/deploy.yml   Publica solo en cada push a main

public/imagenes/   Las fotos que sirve el sitio (comprimidas)
imagenes/          Tus originales — fuera del repo, sólo en tu disco
```

---

## 3. Dónde tocar cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Teléfono, dirección, correo, redes, horario | `lib/site.ts` |
| Textos del hero | `components/hero.tsx` |
| Historia del recinto y cifras | `components/quienes-somos.tsx` |
| Tarjetas de instalaciones (título, foto, etiquetas) | array `instalaciones` en `components/instalaciones.tsx` |
| Tipos de estadía del formulario de reserva | array `alojamientos` en `components/reservas.tsx` |
| Lo que aparece en el marquee | arrays `primeraFila` / `segundaFila` en `components/experiencia.tsx` |
| Colores, tipografías, animaciones | `tailwind.config.ts` |

---

## 4. Imágenes

Todas las rutas se escriben como **`/imagenes/...`** y el componente
[`<Foto>`](components/ui/foto.tsx) les antepone el basePath de GitHub Pages.

> **Ojo:** usa `<Foto>`, no `next/image` directamente. Como el sitio se exporta
> estático, `next/image` deja el `src` sin el prefijo `/cabanas-puerta-del-sol`
> y la foto daría 404 en producción (en `localhost` se vería bien, que es lo
> traicionero).

| Archivo publicado | Foto original | Dónde se usa |
|---|---|---|
| `piscina-principal.jpg` | `piscina.png` | **Hero** + tarjeta "Canchas" + imagen de Open Graph |
| `piscina-toldos.jpg` | `foto piscina.png` | Tarjeta "Piscina & solárium" |
| `piscina-familias.jpg` | `foto piscina 2.png` | Tarjeta "Camping" |
| `cabana-exterior.jpg` | `cabaña.png` | Tarjeta grande "Cabañas" |
| `cabana-alero.jpg` | `cabaña 2.png` | Quiénes somos (foto principal) |
| `estero-helechos.jpg` | `3.png` | Quiénes somos (foto secundaria) |
| `laguna.jpg` | `laguna.png` | Tarjeta "Estero & senderos" |
| `hortensias.jpg` | `imagen 3.png` | Franja parallax de la cita |

Los originales están en la carpeta `imagenes/` de tu disco y **no entran al
repositorio** (pesan 14 MB). Dos quedaron fuera del sitio a propósito:

- `presentacion.png` — el flyer con el logo. De ahí salió el isotipo del sol y
  la paleta naranja. No se usa como foto.
- `entrada.png` — es una captura de Google Street View, con marca de agua
  "© Google". Reemplázala por una foto propia si quieres usarla.

### Compresión

Las 8 fotos pasaron de **11,9 MB a 1,6 MB** (87 % menos) sin pérdida visible.
Como el sitio es estático, no hay optimizador en el servidor: lo que está en
`public/imagenes/` es exactamente lo que descarga el visitante. Por eso importa
pasar siempre por el script:

```bash
npm run imagenes
```

Reescala a 2400 px máximo, convierte a JPEG de calidad 82 y borra el PNG. Los
JPEG ya existentes los deja intactos, así que puedes ejecutarlo cuantas veces
quieras. Después actualiza la ruta `.png` → `.jpg` donde corresponda.

### Pendientes de fotografía

- **Camping real** (carpas en los sitios) → reemplaza `piscina-familias.jpg` en la tarjeta "Camping".
- **Multicancha** → reemplaza `piscina-principal.jpg` en la tarjeta "Canchas".
- **Portada en alta resolución.** `piscina-principal.jpg` mide 1211×614 px. Se ve
  bien en notebook y celular, pero en un monitor grande queda justa. Si consigues
  esa misma toma en resolución completa desde el teléfono, la portada gana mucho.

---

## 5. Cómo funcionan las animaciones

Cuatro patrones de Framer Motion; con estos cuatro puedes replicar el estilo en
cualquier sección nueva.

**a) Fade-in al hacer scroll** — [components/ui/reveal.tsx](components/ui/reveal.tsx)

```tsx
<Reveal delay={0.1} direction="arriba">
  <h2>Aparezco al entrar en pantalla</h2>
</Reveal>
```

Usa `whileInView` con `viewport={{ once: true }}`: ocurre una sola vez, con
opacidad + desplazamiento + desenfoque.

**b) Parallax** — `hero.tsx`, `quienes-somos.tsx`, `franja-parallax.tsx`

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
<motion.div style={{ y }}>…</motion.div>
```

La profundidad la da usar **velocidades distintas** por capa (el fondo se mueve
28 %, el contenido 55 %).

**c) Glow en hover** — [components/ui/glow-card.tsx](components/ui/glow-card.tsx)

Las coordenadas del mouse van a `useMotionValue` y arman un `radial-gradient`
con `useMotionTemplate`. Una capa hace el halo interior y otra, recortada con
`mask-composite`, enciende un filo de 1 px en el borde.

**d) Marquee infinito** — [components/ui/marquee.tsx](components/ui/marquee.tsx)

**CSS puro** (`animation: marquee var(--duration) linear infinite`): el contenido
se clona 4 veces y se desplaza `-100% - gap`. Sin librerías de carrusel, sin
saltos. La velocidad se cambia por clase:

```tsx
<Marquee pauseOnHover className="[--duration:52s]">…</Marquee>
```

Todas respetan `prefers-reduced-motion`.

---

## 6. Reservas y formulario de contacto

Ninguno usa backend: **ambos abren WhatsApp con el mensaje ya redactado**
(`https://wa.me/56974762567?text=…`). Es lo que mejor convierte para un recinto
turístico y no requiere servidor ni pasarela de pago — y es lo único posible en
un sitio estático.

El calendario bloquea los días pasados, pero **no conoce la ocupación real**.
Para eso habría que conectar un origen de datos (Google Calendar, iCal de
Airbnb o una tabla propia), lo que implicaría dejar de ser un sitio estático.

---

## 7. Publicación

El sitio se publica solo. Cada push a `main` dispara
[.github/workflows/deploy.yml](.github/workflows/deploy.yml), que instala,
exporta y sube el resultado a GitHub Pages:

```bash
git add -A && git commit -m "Describe el cambio" && git push
```

En ~2 minutos está en línea. Puedes seguir la ejecución con:

```bash
gh run watch
```

Detalles del montaje, por si algún día hay que tocarlo:

- `output: "export"` en `next.config.mjs` genera HTML estático en `out/`.
- `basePath` y `assetPrefix` valen `/cabanas-puerta-del-sol` **sólo en
  producción**, por eso en `npm run dev` el sitio sigue en la raíz.
- `postbuild` escribe `out/.nojekyll`; sin ese archivo GitHub Pages ignora la
  carpeta `_next` y el sitio queda sin CSS ni JavaScript.
- `images.unoptimized: true` porque el optimizador de Next necesita un servidor.

---

## 8. Pendientes de contenido

- [ ] **Valoraciones reales.** La sección de opiniones se reemplazó por el
      marquee "Qué encuentras aquí" con atributos verificables. Cuando el
      recinto tenga reseñas reales de Google o Facebook, se puede volver a un
      marquee de citas usando el mismo `<Marquee>`.
- [ ] **Cifras de "Quiénes somos".** `+15 años`, `4 ha`, `25 m` y `Desde 2009`
      son estimaciones de maqueta, publicadas a la espera de los datos reales.
      Están en el array `cifras` de `components/quienes-somos.tsx` y en el sello
      de la misma sección.
- [ ] **Teléfono.** El flyer original dice **+56 9 649 526 28** y el sitio usa
      **+56 9 7476 2567** (el que indicaste). Confirma cuál va y ajusta
      `lib/site.ts`.
- [ ] **Coordenadas.** `sitio.geo` apunta al centro de Loncoche. Con el punto
      exacto del recinto, el mapa y el SEO local quedan finos.
- [ ] **Dominio y correo.** `sitio.url` y `sitio.email` son provisorios.
