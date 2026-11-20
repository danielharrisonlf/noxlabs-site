// Vídeos do celular para revisão (fora do git): o menu (abrir, ir a uma seção,
// fechar tocando fora) e uma rolagem completa da página inicial, em 390×844 e
// 360×740. Também tira uma captura do menu aberto. Rode depois de `pnpm build`.
// Saída em docs/screenshots/local/videos/.
import { mkdirSync, renameSync } from "node:fs";
import { chromium } from "@playwright/test";
import { serveDist } from "./serve-dist.mjs";

const out = "docs/screenshots/local/videos";
mkdirSync(out, { recursive: true });
const port = 4333;
const base = `http://127.0.0.1:${port}`;
const server = await serveDist(port);
const browser = await chromium.launch();

async function record(name, [width, height], run) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    hasTouch: true,
    isMobile: true,
    recordVideo: { dir: out, size: { width, height } },
  });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await run(page);
  const video = page.video();
  await context.close();
  const file = `${out}/${name}-${width}x${height}.webm`;
  if (video) renameSync(await video.path(), file);
  console.log(file);
}

const menu = async (page) => {
  const [, height] = [0, page.viewportSize()?.height ?? 844];
  await page.tap("[data-menu-toggle]");
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${out}/menu-aberto-${page.viewportSize()?.width}x${height}.png` });
  await page.tap('#site-nav a[href="/#na-sua-empresa"]');
  await page.waitForTimeout(2200);
  await page.tap("#tab-clinica");
  await page.waitForTimeout(1400);
  await page.tap("[data-menu-toggle]");
  await page.waitForTimeout(1200);
  await page.mouse.click(40, 90);
  await page.waitForTimeout(1200);
  await page.tap("[data-menu-toggle]");
  await page.waitForTimeout(1000);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(1000);
};

const scroll = async (page) => {
  const total = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  for (let y = 0; y <= total; y += 90) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(45);
  }
  await page.waitForTimeout(600);
  // Subir um pouco mostra o cabeçalho voltando.
  for (let i = 0; i < 8; i++) {
    await page.mouse.wheel(0, -120);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(800);
};

for (const size of [
  [390, 844],
  [360, 740],
]) {
  await record("menu", size, menu);
  await record("rolagem", size, scroll);
}

await browser.close();
server.close();
