/**
 * El sitio se publica en GitHub Pages, que sólo sirve archivos estáticos.
 * Por eso `output: "export"`: `next build` deja todo el HTML ya generado
 * en la carpeta `out/`, sin necesidad de un servidor Node.
 *
 * En desarrollo (`npm run dev`) no se aplica ni el basePath ni la exportación,
 * así que sigues trabajando cómodo en http://localhost:3000.
 */

const enProduccion = process.env.NODE_ENV === "production";

/** Nombre del repositorio: GitHub Pages sirve el sitio bajo esta subruta. */
const REPO = "/cabanas-puerta-del-sol";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: "export",

  // Sin esto, el CSS, el JS y las fotos apuntarían a la raíz del dominio
  // (yordyserna.github.io/...) y darían 404.
  basePath: enProduccion ? REPO : "",
  assetPrefix: enProduccion ? REPO : "",

  // GitHub Pages sirve carpetas, no rutas sin extensión.
  trailingSlash: true,

  images: {
    // El optimizador de Next necesita un servidor. En un sitio estático las
    // fotos se sirven tal cual — por eso ya las comprimimos con `npm run imagenes`.
    unoptimized: true,
  },

  // Con `unoptimized`, next/image NO antepone el basePath al src. El componente
  // <Foto> (components/ui/foto.tsx) lo hace usando esta variable.
  env: {
    NEXT_PUBLIC_BASE_PATH: enProduccion ? REPO : "",
  },
};

export default nextConfig;
