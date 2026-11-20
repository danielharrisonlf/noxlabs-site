// Gera a diretiva `set $csp` do nginx com o hash SHA-256 de cada <script>
// inline executável do dist/. Assim a CSP não precisa de 'unsafe-inline'.
// Uso: node scripts/csp.mjs > dist-csp.conf (o Dockerfile faz isso no build).
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith(".html") ? [path] : [];
  });
}

const hashes = new Set();
const scriptTag = /<script(\s[^>]*)?>([\s\S]*?)<\/script>/g;

for (const file of htmlFiles("dist")) {
  const html = readFileSync(file, "utf8");
  for (const [, attrs = "", body] of html.matchAll(scriptTag)) {
    if (/\bsrc=/.test(attrs) || /type="application\/ld\+json"/.test(attrs) || body.length === 0) continue;
    hashes.add(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
  }
}

const policy = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].join(" ")}`.trim(),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

process.stdout.write(`set $csp "${policy}";\n`);
