// Capturas do estado final (movimento reduzido) para revisão visual.
// Rode depois de `pnpm build`. Saída em docs/screenshots/local/ (fora do git):
//   fold/   primeira tela (PNG) de cada tamanho
//   full/   página inteira (JPEG) de cada tamanho e rota
//   home-<390|1440>-NN-secao.png   seções da home
// O repositório não guarda capturas: elas pesam e envelhecem a cada mudança.
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";
import { serveDist } from "./serve-dist.mjs";

const out = "docs/screenshots/local";
for (const dir of [out, `${out}/fold`, `${out}/full`]) mkdirSync(dir, { recursive: true });

const port = 4329;
const base = `http://127.0.0.1:${port}`;
const server = await serveDist(port);

const sizes = [
  [320, 640],
  [360, 740],
  [390, 844],
  [430, 932],
  [600, 900],
  [768, 1024],
  [1024, 768],
  [1280, 800],
  [1440, 900],
  [1920, 1080],
  [2560, 1440],
  [844, 390],
  [1366, 768],
  [1280, 600],
];
const sections = [
  ["01-topo", ".hero"],
  ["02-ramos", ".strip"],
  ["03-numeros", "#numeros"],
  ["04-solucoes", "#solucoes"],
  ["05-na-sua-empresa", "#na-sua-empresa"],
  ["06-como-funciona", "#como-funciona"],
  ["07-casos", "#casos"],
  ["08-estimativa", "#estimativa"],
  ["09-sobre", "#sobre"],
  ["10-seguranca", "#seguranca"],
  ["11-perguntas", "#perguntas"],
  ["12-contato", "#contato"],
  ["13-rodape", "footer"],
];
const pages = [
  ["caso-clinicflow", "/casos/clinicflow/"],
  ["caso-whatsapp", "/casos/whatsapp-control-center/"],
  ["caso-kairos", "/casos/kairos/"],
  ["404", "/nao-existe/"],
];

const browser = await chromium.launch();
const problems = [];

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(300);
}

async function overflow(page, label) {
  const result = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, inner: window.innerWidth }));
  if (result.scroll > result.inner) problems.push(`${label}: scrollWidth ${result.scroll} > ${result.inner}`);
}

const only = process.env.SIZES?.split(",");

for (const [width, height] of sizes) {
  const tag = `${width}x${height}`;
  if (only && !only.includes(tag)) continue;
  const mobile = width < 600;
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: mobile ? 2 : 1,
    colorScheme: "light",
    reducedMotion: "reduce",
    hasTouch: mobile,
  });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await settle(page);
  await overflow(page, `/ ${tag}`);
  await page.screenshot({ path: `${out}/fold/home-${tag}.png` });
  await page.screenshot({ path: `${out}/full/home-${tag}.jpg`, fullPage: true, type: "jpeg", quality: 72 });

  if ((width === 390 && height === 844) || (width === 1440 && height === 900)) {
    await page.addStyleTag({ content: ".header,.dock,.skip-link{visibility:hidden!important}" });
    for (const [name, selector] of sections) {
      const el = page.locator(selector).first();
      await el.scrollIntoViewIfNeeded();
      await el.screenshot({ path: `${out}/home-${width}-${name}.png` });
    }
  }

  if ([390, 768, 1440].includes(width) && height !== 390) {
    for (const [name, path] of pages) {
      await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
      await settle(page);
      await overflow(page, `${path} ${tag}`);
      await page.screenshot({ path: `${out}/fold/${name}-${tag}.png` });
      await page.screenshot({ path: `${out}/full/${name}-${tag}.jpg`, fullPage: true, type: "jpeg", quality: 72 });
    }
  }
  await context.close();
}

await browser.close();
server.close();

if (problems.length) {
  console.error("Transbordo horizontal:\n" + problems.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Capturas em ${out}/. Sem transbordo horizontal.`);
}
