/**
 * Optimiza las fotos que sirve el sitio.
 *
 *   npm run imagenes
 *
 * Recorre `public/imagenes/`, convierte cada PNG a JPEG de calidad alta y lo
 * reescala a un máximo de 2400 px de ancho. Los JPEG ya existentes se dejan
 * intactos, así que puedes ejecutarlo cuantas veces quieras: sólo procesa lo
 * que falta.
 *
 * Los originales sin tocar viven en la carpeta `imagenes/` de la raíz.
 */

import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

const DIRECTORIO = "public/imagenes";
const ANCHO_MAXIMO = 2400;
const CALIDAD = 82;

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);
const kb = (bytes) => (bytes / 1024).toFixed(0);

const archivos = await readdir(DIRECTORIO);
const pendientes = archivos.filter((f) => path.extname(f).toLowerCase() === ".png");

if (pendientes.length === 0) {
  console.log("Todas las imágenes ya están optimizadas.");
  process.exit(0);
}

let antes = 0;
let despues = 0;

for (const archivo of pendientes) {
  const origen = path.join(DIRECTORIO, archivo);
  const destino = path.join(DIRECTORIO, `${path.basename(archivo, ".png")}.jpg`);

  const pesoOriginal = (await stat(origen)).size;
  const meta = await sharp(origen).metadata();

  await sharp(origen)
    .resize({ width: ANCHO_MAXIMO, withoutEnlargement: true })
    .jpeg({ quality: CALIDAD, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(destino);

  const pesoNuevo = (await stat(destino)).size;
  await unlink(origen);

  antes += pesoOriginal;
  despues += pesoNuevo;

  console.log(
    `  ${path.basename(archivo, ".png").padEnd(20)} ` +
      `${meta.width}x${meta.height}  ${mb(pesoOriginal)} MB → ${kb(pesoNuevo)} KB`,
  );
}

console.log(
  `\n${pendientes.length} imágenes: ${mb(antes)} MB → ${mb(despues)} MB ` +
    `(${Math.round((1 - despues / antes) * 100)} % menos)`,
);
console.log(
  "Recuerda actualizar las rutas .png → .jpg si agregaste referencias nuevas.",
);
