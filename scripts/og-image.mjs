// Gera public/og.png (1200x630) e os ícones PNG a partir de HTML/SVG,
// com as mesmas fontes do site. Rode com `pnpm og`; o favicon.ico sai do
// PNG de 32 px via ffmpeg, se estiver instalado.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const font = (file) => `data:font/woff2;base64,${readFileSync(resolve("public/fonts", file)).toString("base64")}`;

const fonts = `
  @font-face { font-family: Jost; src: url(${font("jost-latin-var.woff2")}) format("woff2"); font-weight: 100 900; }
  @font-face { font-family: Archivo; src: url(${font("archivo-latin-var.woff2")}) format("woff2"); font-weight: 100 900; }
`;

const mark = (size) => `
  <svg width="${size}" height="${size}" viewBox="0 0 32 32">
    <rect x="1" y="11" width="20" height="20" fill="#0e0f12"/>
    <circle cx="21" cy="11" r="10" fill="#2433c9" style="mix-blend-mode:multiply"/>
  </svg>`;

const poem = ["diagnóstico", "proposta", "entrega", "entrega", "entrega", "operação"];

const og = `<!doctype html><html><head><meta charset="utf-8"><style>
  ${fonts}
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; display: grid; grid-template-columns: 700px 500px; background: #fff; color: #0e0f12; font-family: Archivo; }
  .l { padding: 64px 64px 56px 72px; display: flex; flex-direction: column; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 14px; font-family: Jost; font-weight: 500; font-size: 34px; }
  h1 { font-family: Jost; font-weight: 500; font-size: 84px; line-height: .98; letter-spacing: -0.035em; }
  .url { font-size: 22px; font-weight: 600; color: #4a4e57; }
  .r { background: #2433c9; color: #fff; padding: 70px 56px; display: grid; align-content: center; gap: 6px; }
  .p { display: grid; grid-template-columns: 26px auto 1fr; align-items: center; gap: 18px; font-family: Jost; font-weight: 500; font-size: 46px; line-height: 1.12; }
  .s { width: 18px; height: 18px; justify-self: center; }
  .ring { border: 3px solid #fff; border-radius: 50%; }
  .sq { background: #fff; }
  .dot { width: 9px; height: 9px; background: #fff; }
  .live { width: 22px; height: 22px; border-radius: 50%; background: radial-gradient(circle, #e2401c 0 34%, #fff 36%); }
  .bar { height: 14px; background: #fff; }
</style></head><body>
  <div class="l">
    <div class="brand">${mark(40)}noxlabs</div>
    <h1>Software e IA que entram em produção.</h1>
    <div class="url">noxlabs.tech</div>
  </div>
  <div class="r">
    ${poem
      .map((w, i) => {
        const shape = i === 0 ? "ring" : i === 1 ? "sq" : i === 5 ? "live" : "dot";
        const bar = i >= 2 && i <= 4 ? `<span class="bar" style="width:${((i - 1) / 3) * 100}%"></span>` : "<span></span>";
        return `<div class="p"><span class="s ${shape}"></span><span>${w}</span>${bar}</div>`;
      })
      .join("")}
  </div>
</body></html>`;

const icon = (size, pad) => `<!doctype html><html><head><style>
  * { margin: 0; } body { width: ${size}px; height: ${size}px; display: grid; place-items: center; background: #fff; }
</style></head><body>${mark(size - pad * 2)}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.png" });

for (const [size, pad, file] of [
  [512, 64, "public/icon-512.png"],
  [192, 24, "public/icon-192.png"],
  [180, 22, "public/apple-touch-icon.png"],
  [32, 1, "public/favicon-32.png"],
]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(icon(size, pad));
  await page.screenshot({ path: file });
}
await browser.close();

try {
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", "public/favicon-32.png", "public/favicon.ico"]);
  console.log("og.png, ícones e favicon.ico gerados.");
} catch {
  console.warn("ffmpeg indisponível: favicon.ico não foi regenerado.");
}
