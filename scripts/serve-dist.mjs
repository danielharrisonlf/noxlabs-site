// Servidor estático mínimo para o dist/, usado pelos scripts de verificação.
// Imita o try_files do nginx: /rota -> /rota/index.html, senão 404.html.
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.cwd(), "dist");

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".json": "application/json",
};

function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^([/\\])+/, "");
  const candidates = [join(root, clean), join(root, clean, "index.html"), join(root, `${clean}.html`)];
  for (const file of candidates) {
    if (!file.startsWith(root)) continue;
    if (existsSync(file) && statSync(file).isFile()) return { file, status: 200 };
  }
  return { file: join(root, "404.html"), status: 404 };
}

export function serveDist(port = 4329) {
  const server = createServer((req, res) => {
    const { file, status } = resolveFile(req.url ?? "/");
    res.writeHead(status, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(res);
  });
  return new Promise((ok) => server.listen(port, "127.0.0.1", () => ok(server)));
}

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  const port = Number(process.env.PORT ?? 4329);
  await serveDist(port);
  console.log(`dist/ em http://127.0.0.1:${port}`);
}
