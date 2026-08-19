import Image, { type ImageProps } from "next/image";

/**
 * Envoltorio de `next/image` que antepone el basePath a las rutas locales.
 *
 * Hace falta porque el sitio se publica en una subruta de GitHub Pages
 * (`/cabanas-puerta-del-sol/`) y, cuando las imágenes van `unoptimized`,
 * `next/image` deja el `src` tal cual: `/imagenes/foo.jpg` terminaría
 * apuntando a la raíz del dominio y daría 404.
 *
 * Gracias a esto, en los componentes se sigue escribiendo la ruta natural:
 *
 *   <Foto src="/imagenes/hero.jpg" alt="…" fill />
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Foto({ src, ...props }: ImageProps) {
  const ruta =
    typeof src === "string" && src.startsWith("/") ? `${BASE}${src}` : src;

  return <Image src={ruta} {...props} />;
}
