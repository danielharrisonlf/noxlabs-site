// Gera public/og.png (1200x630) e os ícones PNG a partir de HTML/SVG,
// com as mesmas fontes do site. Rode com `pnpm og`; o favicon.ico sai do
// PNG de 32 px via ffmpeg, se estiver instalado.
import { execFileSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const font = (file) => `data:font/woff2;base64,${readFileSync(resolve("public/fonts", file)).toString("base64")}`;

const fonts = `
  @font-face { font-family: Funnel; src: url(${font("funnel-display-latin-var.woff2")}) format("woff2"); font-weight: 300 800; }
  @font-face { font-family: Atkinson; src: url(${font("atkinson-next-latin-var.woff2")}) format("woff2"); font-weight: 200 800; }
`;

// O "n" de rastro de luz, com a fonte acesa na ponta.
const mark = (size, { tile = false } = {}) => `
  <svg width="${size}" height="${size}" viewBox="0 0 32 32">
    <defs>
      <linearGradient id="t${size}" x1="7" y1="26" x2="25" y2="8" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ffb547"/><stop offset="1" stop-color="#ff7a5c"/>
      </linearGradient>
    </defs>
    ${tile ? '<rect width="32" height="32" rx="8" fill="#0d1438"/>' : ""}
    <path d="${tile ? "M10 25V16a6 6 0 0 1 12 0v8" : "M8 26V15.5a8 8 0 0 1 16 0V24"}" fill="none" stroke="url(#t${size})"
      stroke-width="${tile ? 3.4 : 3.6}" stroke-linecap="round"/>
    <circle cx="${tile ? 22 : 24}" cy="${tile ? 24.6 : 25}" r="${tile ? 2.3 : 2.6}" fill="#eef0ff"/>
  </svg>`;

// Rastros que sobem da borda de baixo e terminam em três pontos de luz.
const trail = (d, color, w = 2) => `
  <path d="${d}" stroke="${color}" stroke-width="${w * 8}" opacity=".08" fill="none" stroke-linecap="round"/>
  <path d="${d}" stroke="${color}" stroke-width="${w * 3}" opacity=".22" fill="none" stroke-linecap="round"/>
  <path d="${d}" stroke="${color}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;

const trails = [
  ["M 640 700 C 760 470, 840 230, 1010 150", "#ffb547"],
  ["M 690 700 C 790 470, 870 250, 1010 150", "#ff7a5c"],
  ["M 600 700 C 740 520, 820 360, 950 300", "#8fd3ff"],
  ["M 670 700 C 780 520, 860 370, 950 300", "#ffb547"],
  ["M 760 700 C 850 590, 930 480, 1030 450", "#ff7a5c"],
  ["M 560 700 C 730 600, 880 480, 1030 450", "#8fd3ff"],
]
  .map(([d, c]) => trail(d, c))
  .join("");

const nodes = [
  [1010, 150, "#ff7a5c"],
  [950, 300, "#8fd3ff"],
  [1030, 450, "#ffb547"],
]
  .map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="20" fill="${c}" opacity=".2"/><circle cx="${x}" cy="${y}" r="7" fill="${c}" stroke="#141c4b" stroke-width="3"/>`)
  .join("");

const og = `<!doctype html><html><head><meta charset="utf-8"><style>
  ${fonts}
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; position: relative; overflow: hidden; color: #eef0ff; font-family: Atkinson;
    background:
      radial-gradient(110% 80% at 0% 110%, rgba(255,150,70,.22), transparent 62%),
      radial-gradient(70% 60% at 100% 0%, rgba(110,140,255,.2), transparent 60%),
      linear-gradient(180deg, #060b26, #0d1540 55%, #1d1d55); }
  svg.sky { position: absolute; inset: 0; }
  .l { position: absolute; left: 72px; top: 64px; bottom: 60px; width: 640px; display: flex; flex-direction: column; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 12px; font-family: Funnel; font-weight: 600; font-size: 38px; letter-spacing: -0.03em; }
  h1 { font-family: Funnel; font-weight: 500; font-size: 82px; line-height: .98; letter-spacing: -0.04em; }
  .url { font-size: 24px; font-weight: 700; color: #ffc56e; }
  .p { position: absolute; font-family: Funnel; font-weight: 600; font-size: 28px; letter-spacing: -0.02em; }
  .p small { display: block; font-family: Atkinson; font-weight: 400; font-size: 18px; color: #b8bfe8; letter-spacing: 0; }
</style></head><body>
  <svg class="sky" viewBox="0 0 1200 630" width="1200" height="630">${trails}${nodes}</svg>
  <div class="l">
    <div class="brand">${mark(46)}noxlabs</div>
    <h1>Software e IA que saem do papel e ficam no ar.</h1>
    <div class="url">noxlabs.tech</div>
  </div>
  <div class="p" style="left:1040px;top:130px">Kairos<small>no ar</small></div>
  <div class="p" style="left:980px;top:280px">MCP<small>49 ferramentas</small></div>
  <div class="p" style="left:1060px;top:430px">27 ms<small>p50, A/B local</small></div>
</body></html>`;

const icon = (size, pad) => `<!doctype html><html><head><style>
  * { margin: 0; } body { width: ${size}px; height: ${size}px; display: grid; place-items: center; background: #0d1438; }
</style></head><body>${mark(size - pad * 2)}</body></html>`;

const favicon = `<!doctype html><html><head><style>
  * { margin: 0; } body { width: 32px; height: 32px; background: transparent; }
</style></head><body>${mark(32, { tile: true })}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.png" });

for (const [size, pad, file] of [
  [512, 72, "public/icon-512.png"],
  [192, 26, "public/icon-192.png"],
  [180, 24, "public/apple-touch-icon.png"],
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
  console.log("og.png, ícones e favicon.ico gerados.");
} catch {
  console.warn("ffmpeg indisponível: favicon.ico não foi regenerado.");
} finally {
  rmSync("public/favicon-32.png", { force: true });
}
