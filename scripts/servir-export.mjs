/**
 * Sirve la carpeta `out/` imitando a GitHub Pages.
 *
 *   npm run build
 *   npm run preview
 *
 * Monta el sitio bajo la misma subruta que usará GitHub Pages
 * (/cabanas-puerta-del-sol/), así compruebas que ninguna ruta quedó rota
 * ANTES de publicar. Sin dependencias: sólo módulos de Node.
 */

import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

const RAIZ = path.resolve("out");
const BASE = "/cabanas-puerta-del-sol";
const PUERTO = 4000;

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

async function resolver(rutaUrl) {
  // Fuera de la subruta base, GitHub Pages devolvería 404.
  if (rutaUrl !== BASE && !rutaUrl.startsWith(`${BASE}/`)) return null;

  const relativa = decodeURIComponent(rutaUrl.slice(BASE.length)) || "/";
  const candidatos = relativa.endsWith("/")
    ? [path.join(RAIZ, relativa, "index.html")]
    : [path.join(RAIZ, relativa), path.join(RAIZ, `${relativa}.html`), path.join(RAIZ, relativa, "index.html")];

  for (const c of candidatos) {
    // No dejar salir de out/.
    if (!c.startsWith(RAIZ)) continue;
    try {
      if ((await stat(c)).isFile()) return c;
    } catch {
      /* siguiente candidato */
    }
  }
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://localhost:${PUERTO}`);
  const archivo = await resolver(pathname);

  if (!archivo) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end(`404 — no existe ${pathname}\nEl sitio vive en http://localhost:${PUERTO}${BASE}/`);
    return;
  }

  res.writeHead(200, {
    "content-type": TIPOS[path.extname(archivo).toLowerCase()] ?? "application/octet-stream",
  });
  createReadStream(archivo).pipe(res);
}).listen(PUERTO, () => {
  console.log(`Export servido en http://localhost:${PUERTO}${BASE}/`);
  console.log("Igual que en GitHub Pages: fuera de esa subruta responde 404.");
});
