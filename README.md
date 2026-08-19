# Cabañas Puerta del Sol — Landing Page

Landing para el complejo turístico **Cabañas Puerta del Sol**
(Ruta S-785, KM 1 camino a Calafquén, Loncoche, Región de La Araucanía).

**En vivo:** <https://yordyserna.github.io/cabanas-puerta-del-sol/>

HTML + CSS + JavaScript clásico. **Sin build, sin npm, sin frameworks.**
Lo que está en el repositorio es exactamente lo que se sirve.

---

## 1. Cómo trabajar en él

Abre `index.html` con doble clic. Eso es todo — no hay que instalar nada ni
levantar nada. Guardas y recargas.

Si necesitas verlo servido por HTTP (para probar el mapa o los enlaces
absolutos como los ve GitHub Pages):

```bash
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Queda en <http://localhost:8765/>.

Para comprimir fotos nuevas que dejes en `assets/img/`:

```bash
powershell -ExecutionPolicy Bypass -File optimizar-imagenes.ps1
```

Reescala a 2400 px de lado mayor, convierte a JPEG de calidad 82 y borra el
original. Los `.jpg` que ya existen los deja intactos, así que puedes
ejecutarlo cuantas veces quieras. Después actualiza la ruta `.png` → `.jpg`
en `index.html`.

> Este script reemplaza al viejo `npm run imagenes`: usa .NET (WIC) en vez de
> Node + sharp, porque esta máquina no tiene Node. En Windows 11 lee PNG,
> HEIC y WebP. Rinde lo mismo: la foto de prueba pasó de 757 KB a 96 KB.

---

## 2. Estructura

```
index.html                Todo el contenido del sitio, escrito a mano
assets/
  css/estilos.css         Tokens, secciones y movimiento, en una sola hoja
  js/app.js               Un IIFE: nav, calendario, formulario, animaciones
  img/                    Las 8 fotos que sirve el sitio (comprimidas)

serve.ps1                 Servidor local para revisar por HTTP
optimizar-imagenes.ps1    Compresión de fotos nuevas
imagenes/                 Tus originales — fuera del repo, sólo en tu disco
.github/workflows/deploy.yml   Publica en cada push a main
```

Sólo tres archivos importan. El HTML lleva el contenido, el CSS lleva el
aspecto y el JS lleva el comportamiento. No hay nada generado.

---

## 3. Dónde tocar cada cosa

| Quiero cambiar… | Dónde |
|---|---|
| Teléfono, dirección, horario | Búscalos en `index.html` — están escritos, no vienen de un archivo de datos |
| Textos de cualquier sección | La sección correspondiente en `index.html`, marcada con un comentario `═══` |
| Colores y sombras | Bloque `:root` al inicio de `assets/css/estilos.css` |
| Tipos de estadía del calendario | Los tres `<button class="opcion">` en la sección de reservas |
| Lo que aparece en la cinta | Los `<li class="ficha">` de la sección Experiencia (van duplicados a propósito: ver §6) |
| Velocidad de las animaciones | Los `animation:` del CSS. Nada de esto vive en el JS |

El número de WhatsApp aparece en varios enlaces `wa.me/56974762567`. Si cambia,
reemplázalo en todo el archivo de una vez.

---

## 4. Las cuatro reglas que sostienen el diseño

Son decisiones deliberadas. Si las rompes, el sitio empieza a parecerse a
cualquier plantilla.

**a) Ningún borde de 1 px.** No hay una sola declaración `border` decorativa en
todo el CSS (compruébalo: `grep border assets/css/estilos.css`). Los bloques se
separan por **contraste de fondo** — hueso, arena, verde noche alternándose — y
por **sombra larga y baja**. Los divisores internos son `box-shadow: 0 -1px 0`,
nunca `border-top`. Los campos del formulario se definen por su relleno.

**b) Un solo énfasis en toda la página.** La palabra "piscina" del titular lleva
el agua de la piscina recortada dentro de las letras (`background-clip: text`).
Es el único recurso de énfasis del sitio y no se repite en ninguna sección. La
regla no es evitar la técnica, es no gastarla.

**c) Radios asimétricos y alternados.** `--r-a: 44px 10px 44px 10px` y su espejo
`--r-b`. Las tarjetas vecinas alternan entre los dos. Nada de 16 px iguales en
todos lados.

**d) Que se mueva poco.** La referencia es linear.app, no una plantilla de
Envato. Las manchas del fondo tardan entre 38 y 82 segundos en dar una vuelta:
la idea es que no se note mirándolas.

---

## 5. Contraste — los números

Todo el texto se midió sobre la página renderizada, no sobre la paleta teórica.
**191 elementos con texto revisados, 190 cumplen** el mínimo de 4,5:1.

Los tokens de color, con su ratio:

| Token | Sobre | Ratio |
|---|---|---|
| `--tinta` `#1B2E22` | hueso | 13,06 |
| `--tinta-suave` `#41544A` | hueso | 7,36 |
| `--naranja-hondo` `#9A3B0F` | hueso | 6,35 |
| `--agua-honda` `#17707F` | hueso | 5,21 |
| `--crema` `#F2EFE7` | verde noche | 15,13 |
| `--crema-2` `#C9D2C8` | verde noche | 11,21 |
| `--crema-3` `#A9B6AC` | verde noche | 8,26 |
| `--sol-pal` `#FDC171` | verde noche | 10,80 |
| `--sol` `#FB9C38` | verde noche | 8,21 |

Texto sobre fotografía, midiendo los píxeles reales de cada imagen con el velo
aplicado encima:

| Dónde | Peor caso |
|---|---|
| Titular del hero | 9,59 |
| Bajada del hero | 7,10 |
| Palabra "piscina" (2 % más oscuro del relleno) | 4,54 |
| Cita de la franja | 7,38 |
| Títulos del bento | 11,36 |
| Nav sobre la foto | 10,10 |

**Tres colores quedaron descartados por número, no por gusto:**

- `#C24A09` sobre hueso da **4,46** — falla por cuatro centésimas. Por eso el
  naranja de texto es `#9A3B0F`.
- `#1E7F91` sobre hueso da **4,24**. Por eso el agua de texto es `#17707F`.
- Blanco sobre el verde de WhatsApp `#25D366` da **1,98**. El glifo del botón
  flotante queda blanco porque es la marca (los logotipos están exentos), pero
  la etiqueta "Escríbenos" va en verde noche, que da 8,77.

**La única excepción deliberada:** la marca de agua "Sur" de la sección Nosotros
da 1,13. Es decoración pura — 181 px, `aria-hidden`, no dice nada que no esté
escrito al lado. WCAG exime el texto puramente decorativo. Si algún día te
molesta, bórrala: es un solo `<span class="marca-agua">`.

Para volver a medir, pega el auditor en la consola del navegador — recorre el
DOM, resuelve el fondo real de cada elemento y reporta lo que no llega al
mínimo.

---

## 6. Detalles que costaron un bug

Si vas a tocar el CSS o el JS, lee esto antes.

**El contenido está escrito en el HTML.** Si el script no carga, la página se
lee igual. Hay un temporizador en el `<head>` que quita la clase `.js` a los
2,2 segundos; `app.js` lo cancela al arrancar. Probado con `app.js` devolviendo
404: la página aparece completa.

**El nav arranca sólido, no transparente.** Sin JS, un nav transparente deja los
enlaces cruzados sobre el texto de la sección. Por eso el estado sólido es el
de partida y `.js .nav` lo vuelve transparente sobre el hero.

**El detalle de las tarjetas va envuelto en un solo hijo.** `grid-template-rows:
0fr` sólo controla la fila que declara. Con dos hijos, el segundo cae en una
fila implícita `auto` y el bloque queda siempre abierto.

**Las olas necesitan `max-width: none`.** El reset capa los `svg` al 100 % del
contenedor y dejaría el mosaico a media escala, con un escalón visible.

**Una ola lleva el color del bloque vecino, no el suyo.** Una ola superior
pintada del color de su propia sección es invisible.

**El trazo de la ola tiene que cerrar al mismo alto** con el que empieza
(`y=58` en x=0 y en x=1440). Si no, el bucle deja un escalón.

**El hover no pisa un día ya elegido** en el calendario. Si lo hace, queda texto
crema sobre beige: 1,4:1.

**La cinta duplica sus tarjetas a propósito.** El segundo grupo va
`aria-hidden` y existe sólo para que el bucle no salte. Con
`prefers-reduced-motion` se esconde el duplicado, no la fila entera — esconder
la fila borraría seis servicios que sólo se nombran ahí.

---

## 7. Reservas y formulario

Ninguno usa backend: **ambos abren WhatsApp con el mensaje ya redactado**. Es lo
único posible en un sitio estático y es lo que mejor convierte para un recinto
turístico.

El calendario bloquea los días pasados, pero **no conoce la ocupación real**.
Para eso habría que conectar un origen de datos (Google Calendar, iCal de
Airbnb), lo que implicaría dejar de ser un sitio estático.

Comportamiento del rango: el primer clic fija la llegada, el segundo la salida.
Un clic anterior a la llegada mueve la llegada en vez de invertir el rango. Con
"Día de piscina" el calendario pasa a un solo día y la caja de salida se apaga.

---

## 8. Publicación

Cada push a `main` dispara
[.github/workflows/deploy.yml](.github/workflows/deploy.yml), que sube el
repositorio tal cual a GitHub Pages. No compila nada.

```bash
git add -A && git commit -m "Describe el cambio" && git push
```

En menos de un minuto está en línea. Puedes seguir la ejecución con
`gh run watch`.

---

## 9. Pendientes de contenido

- [ ] **Teléfono.** El flyer original dice **+56 9 649 526 28** y el sitio usa
      **+56 9 7476 2567**. Confirma cuál va.
- [ ] **Cifras de "Quiénes somos".** `+15 años`, `4 ha`, `25 m` y `Desde 2009`
      son estimaciones de maqueta. Por eso ninguna aparece en el titular.
- [ ] **Redes sociales.** Los enlaces del pie apuntan a `instagram.com` y
      `facebook.com` sin cuenta.
- [ ] **Coordenadas.** El mapa apunta a la dirección escrita, no al punto exacto
      del recinto.
- [ ] **Correo y dominio.** No hay correo publicado; todo el contacto pasa por
      WhatsApp.
- [ ] **Valoraciones reales.** Cuando el recinto tenga reseñas de Google o
      Facebook, la cinta de "Qué encuentras acá" puede volverse una de citas
      usando el mismo marcado.

### Pendientes de fotografía

- **Camping real** (carpas en los sitios) → hoy la tarjeta "Camping" usa una
  foto del sector de piscina.
- **Multicancha** → la tarjeta "Canchas" usa también una foto de la piscina.
- **Portada en alta resolución.** `piscina-principal.jpg` mide 1211×614 px. Se
  ve bien en notebook y celular; en un monitor grande queda justa. Es la misma
  foto que rellena la palabra "piscina" del titular, así que una versión en
  resolución completa mejora las dos cosas a la vez.

Dos originales quedaron fuera a propósito: `presentacion.png` (el flyer con el
logo, de ahí salió el isotipo del sol y la paleta naranja) y `entrada.png` (es
una captura de Google Street View, con marca de agua).
