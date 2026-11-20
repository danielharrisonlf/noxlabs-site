// Gera public/og.png (1200x630), os ícones PNG e o favicon.svg a partir de
// HTML/SVG, com as mesmas fontes e ilustrações do site. Rode com `pnpm og`;
// o favicon.ico sai do PNG de 32 px via ffmpeg, se estiver instalado.
// As ilustrações vêm de src/data/illustrations.ts (Node 22.18+ lê TypeScript).
import { execFileSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";
import { illustrations } from "../src/data/illustrations.ts";

const font = (file) => `data:font/woff2;base64,${readFileSync(resolve("public/fonts", file)).toString("base64")}`;

const fonts = `
  @font-face { font-family: Parkinsans; src: url(${font("parkinsans-latin-var.woff2")}) format("woff2"); font-weight: 300 800; }
  @font-face { font-family: Onest; src: url(${font("onest-latin-var.woff2")}) format("woff2"); font-weight: 300 800; }
`;

const JABU = "#2a1430";
const GOIABA = "#ee5a6f";
const CAJU = "#ffb23e";
const PAPEL = "#fff8f6";

// Quatro azulejos que se encaixam (o mesmo desenho de Logo.astro).
const mark = (size, dark = false) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
    <rect class="a" width="15" height="15" rx="4" fill="${dark ? "#fbf3fb" : JABU}"/>
    <path d="M17 15V8.5a7.5 7.5 0 0 1 15 0V15Z" fill="${GOIABA}"/>
    <path d="M0 17h15v15H7.5A7.5 7.5 0 0 1 0 24.5Z" fill="${CAJU}"/>
    <rect class="a" x="17" y="17" width="15" height="15" rx="4" fill="${dark ? "#fbf3fb" : JABU}"/>
  </svg>`;

const illCss = `
  .f-ink { fill: ${JABU}; } .f-goi { fill: ${GOIABA}; } .f-caju { fill: ${CAJU}; } .f-lila { fill: #e8dcf2; } .f-paper { fill: #fffaf9; }
  .s-ink, .s-paper { fill: none; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; }
  .s-ink { stroke: ${JABU}; } .s-paper { stroke: #fffaf9; }
`;

const tiles = [
  ["clinica", "#e8dcf2"],
  ["loja", "#ffe1e4"],
  ["industria", "#ffecc9"],
  ["escritorio", "#ffffff"],
  ["imobiliaria", "#ffe1e4"],
  ["escola", "#e8dcf2"],
  ["agro", "#ffffff"],
  ["distribuidora", "#e8dcf2"],
  ["transportadora", "#ffecc9"],
];

const og = `<!doctype html><html><head><meta charset="utf-8"><style>
  ${fonts}
  ${illCss}
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; position: relative; overflow: hidden; color: ${JABU}; font-family: Onest; background: ${PAPEL}; }
  .l { position: absolute; left: 72px; top: 64px; bottom: 60px; width: 560px; display: flex; flex-direction: column; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 14px; font-family: Parkinsans; font-weight: 700; font-size: 40px; letter-spacing: -0.03em; }
  h1 { font-family: Parkinsans; font-weight: 700; font-size: 56px; line-height: 1.03; letter-spacing: -0.03em; }
  .sub { margin-top: 18px; font-size: 22px; line-height: 1.4; color: #57435d; }
  .url { font-size: 22px; font-weight: 700; color: #b42a40; }
  .m { position: absolute; right: 64px; top: 75px; display: grid; grid-template-columns: repeat(3, 150px); gap: 12px; }
  .t { width: 150px; height: 150px; border-radius: 30px; padding: 22px; }
  .t.w { border: 1px solid #efdfe2; }
  .t svg { width: 100%; height: 100%; display: block; }
</style></head><body>
  <div class="l">
    <div class="brand">${mark(52)}noxlabs</div>
    <div>
      <h1>Cada negócio é de um jeito. O trabalho repetitivo é igual em todos.</h1>
      <p class="sub">Automações, atendimento pelo WhatsApp com IA e sistemas sob medida, para empresas de qualquer ramo.</p>
    </div>
    <div class="url">noxlabs.tech</div>
  </div>
  <div class="m">
    ${tiles
      .map(([name, bg]) => `<div class="t ${bg === "#ffffff" ? "w" : ""}" style="background:${bg}"><svg viewBox="0 0 64 64">${illustrations[name]}</svg></div>`)
      .join("")}
  </div>
</body></html>`;

const icon = (size, pad) => `<!doctype html><html><head><style>
  * { margin: 0; } body { width: ${size}px; height: ${size}px; display: grid; place-items: center; background: ${PAPEL}; }
</style></head><body>${mark(size - pad * 2)}</body></html>`;

const favicon = `<!doctype html><html><head><style>
  * { margin: 0; } body { width: 32px; height: 32px; background: transparent; }
</style></head><body>${mark(32)}</body></html>`;

// No favicon.svg, os azulejos de tinta clareiam em abas escuras.
writeFileSync(
  "public/favicon.svg",
  `${mark(32)
    .trim()
    .replace(
      'viewBox="0 0 32 32">',
      'viewBox="0 0 32 32">\n    <style>@media (prefers-color-scheme: dark) { .a { fill: #fbf3fb; } }</style>',
    )}\n`,
);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.png" });

for (const [size, pad, file] of [
  [512, 96, "public/icon-512.png"],
  [192, 36, "public/icon-192.png"],
  [180, 30, "public/apple-touch-icon.png"],
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
