// Gera public/og.png (1200x630), os ícones PNG e o favicon.svg a partir de
// HTML/SVG, com as mesmas fontes do site. Rode com `pnpm og`; o favicon.ico
// sai do PNG de 32 px via ffmpeg, se estiver instalado.
import { execFileSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const font = (file) => `data:font/woff2;base64,${readFileSync(resolve("public/fonts", file)).toString("base64")}`;

const fonts = `
  @font-face { font-family: Bricolage; src: url(${font("bricolage-grotesque-latin-var.woff2")}) format("woff2"); font-weight: 200 800; }
  @font-face { font-family: Figtree; src: url(${font("figtree-latin-var.woff2")}) format("woff2"); font-weight: 300 900; }
`;

const PINE = "#0d5c49";
const MARCA = "#ffe15a";

// O "n" cuja perna direita termina num visto (o mesmo desenho de Logo.astro).
const mark = (size) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="9" fill="${PINE}"/>
    <path d="M9.5 23V14.6a4.1 4.1 0 0 1 8.2 0v2" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.7 16.6V22.6L23.8 13.2" fill="none" stroke="${MARCA}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const rows = [
  ["Lembrete de vencimento enviado aos clientes", "Feito"],
  ["Extratos do banco importados e conferidos", "Feito"],
  ["Documentos que faltam pedidos pelo WhatsApp", "Feito"],
  ["Dois lançamentos separados para conferência", "Revisar"],
];

const og = `<!doctype html><html><head><meta charset="utf-8"><style>
  ${fonts}
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; position: relative; overflow: hidden; color: #0f2a22; font-family: Figtree;
    background-color: #f6f8f4;
    background-image: linear-gradient(#d6e0d7 1px, transparent 1px), linear-gradient(90deg, #d6e0d7 1px, transparent 1px);
    background-size: 32px 32px; }
  body::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, #f6f8f4 46%, rgba(246,248,244,.4)); }
  .l { position: absolute; left: 72px; top: 64px; bottom: 60px; width: 600px; display: flex; flex-direction: column; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 14px; font-family: Bricolage; font-weight: 700; font-size: 40px; letter-spacing: -0.035em; }
  h1 { font-family: Bricolage; font-weight: 650; font-size: 68px; line-height: 1.03; letter-spacing: -0.025em; }
  .url { font-size: 24px; font-weight: 700; color: ${PINE}; }
  .card { position: absolute; right: 64px; top: 96px; width: 440px; padding: 28px; border-radius: 28px; background: #fff;
    border: 1px solid #d6e0d7; box-shadow: 0 40px 80px -30px rgba(15,42,34,.38); }
  .card h2 { font-family: Bricolage; font-weight: 650; font-size: 26px; letter-spacing: -0.02em; }
  .card p.s { color: #52665d; font-size: 16px; margin-bottom: 14px; }
  .bar { height: 6px; border-radius: 6px; background: #ebf1ea; margin-bottom: 6px; }
  .bar span { display: block; height: 100%; width: 75%; border-radius: 6px; background: ${PINE}; }
  .row { display: flex; align-items: center; gap: 12px; padding: 13px 0; border-bottom: 1px solid #d6e0d7; font-size: 17px; }
  .row:last-child { border-bottom: 0; }
  .dot { flex: none; width: 26px; height: 26px; border-radius: 50%; background: ${PINE}; display: grid; place-items: center; }
  .dot.r { background: ${MARCA}; }
  .row span.t { flex: 1; }
  .tag { font-size: 14px; font-weight: 700; padding: 3px 9px; border-radius: 6px; background: #d5ece2; color: #0a4a3a; }
  .tag.r { background: #fff4b8; color: #5c4a00; }
</style></head><body>
  <div class="l">
    <div class="brand">${mark(52)}noxlabs</div>
    <h1>Sua equipe não foi contratada para copiar e colar.</h1>
    <div class="url">noxlabs.tech</div>
  </div>
  <div class="card">
    <h2>Rotina de segunda-feira</h2>
    <p class="s">Exemplo ilustrativo</p>
    <div class="bar"><span></span></div>
    ${rows
      .map(
        ([t, s]) => `<div class="row"><span class="dot ${s === "Revisar" ? "r" : ""}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${s === "Revisar" ? "#5c4a00" : "#fff"}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">${s === "Revisar" ? '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>' : '<path d="m5 12.5 4.5 4.5L19 7"/>'}</svg>
        </span><span class="t">${t}</span><span class="tag ${s === "Revisar" ? "r" : ""}">${s}</span></div>`,
      )
      .join("")}
  </div>
</body></html>`;

const icon = (size, pad) => `<!doctype html><html><head><style>
  * { margin: 0; } body { width: ${size}px; height: ${size}px; display: grid; place-items: center; background: ${PINE}; }
  svg rect { fill: ${PINE}; }
</style></head><body>${mark(size - pad * 2)}</body></html>`;

const favicon = `<!doctype html><html><head><style>
  * { margin: 0; } body { width: 32px; height: 32px; background: transparent; }
</style></head><body>${mark(32)}</body></html>`;

writeFileSync("public/favicon.svg", `${mark(32).trim()}\n`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.png" });

for (const [size, pad, file] of [
  [512, 56, "public/icon-512.png"],
  [192, 20, "public/icon-192.png"],
  [180, 18, "public/apple-touch-icon.png"],
]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(icon(size, pad));
  await page.screenshot({ path: file });
}
await page.setViewportSize({ width: 32, height: 32 });
await page.setContent(favicon);
await page.screenshot({ path: "public/favicon-32.png", omitBackground: true });
await browser.close();

try {
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", "public/favicon-32.png", "public/favicon.ico"]);
  console.log("og.png, ícones, favicon.svg e favicon.ico gerados.");
} catch {
  console.warn("ffmpeg indisponível: favicon.ico não foi regenerado.");
} finally {
  rmSync("public/favicon-32.png", { force: true });
}
