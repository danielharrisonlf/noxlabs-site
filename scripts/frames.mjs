// Sequências de quadros do movimento, para revisão sem navegador:
// - a exposição do topo se formando (rastros, pacotes de luz, provas);
// - o caminho de um pedido no Kairos, passo a passo, em 1440 e 390 px;
// - o rastro do processo se desenhando com a rolagem.
// Rode depois de `pnpm build`. Saída em docs/screenshots/frames/.
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";
import { serveDist } from "./serve-dist.mjs";

const out = "docs/screenshots/frames";
mkdirSync(out, { recursive: true });

const port = 4333;
const base = `http://127.0.0.1:${port}`;
const server = await serveDist(port);
const browser = await chromium.launch();

// 1. A exposição do topo, em instantes fixos desde o carregamento.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  const start = Date.now();
  for (const ms of [250, 900, 1600, 2400, 3400, 4600]) {
    await page.waitForTimeout(Math.max(0, ms - (Date.now() - start)));
    await page.screenshot({ path: `${out}/hero-dark-${String(ms).padStart(4, "0")}ms.png` });
  }
  await context.close();
}

// 2. O caminho do Kairos, um quadro por passo (controle manual, sem autoplay).
for (const [width, theme] of [
  [1440, "light"],
  [390, "dark"],
]) {
  const context = await browser.newContext({
    viewport: { width, height: width < 600 ? 844 : 900 },
    deviceScaleFactor: width < 600 ? 2 : 1,
    colorScheme: theme,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: ".header{visibility:hidden!important}" });
  const flow = page.locator("[data-flow]").first();
  await flow.scrollIntoViewIfNeeded();
  for (let step = 1; step <= 6; step++) {
    await page.locator(`[data-flow] [role="tab"]`).nth(step - 1).click();
    await page.waitForTimeout(250);
    await flow.screenshot({ path: `${out}/kairos-${width}-${theme}-passo-${step}.png` });
  }
  await context.close();
}

// 3. Um pacote de luz em trânsito no passo 2 (movimento ligado), em três instantes.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: ".header{visibility:hidden!important}" });
  const flow = page.locator("[data-flow]").first();
  await flow.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const play = flow.locator("[data-play]");
  if ((await play.getAttribute("data-state")) === "playing") await play.click();
  await flow.locator('[role="tab"]').nth(1).click();
  // Esperas acumuladas: cerca de 120, 380 e 700 ms depois do clique.
  for (const [i, wait] of [
    [1, 120],
    [2, 260],
    [3, 320],
  ]) {
    await page.waitForTimeout(wait);
    await flow.locator(".kf-canvas").screenshot({ path: `${out}/kairos-pacote-${i}.png` });
  }
  await context.close();
}

// 4. O rastro do processo, em posições de rolagem.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: ".header{visibility:hidden!important}" });
  const top = await page.evaluate(() => document.getElementById("processo").getBoundingClientRect().top + window.scrollY);
  for (const [i, offset] of [
    [1, -700],
    [2, -450],
    [3, -200],
    [4, 100],
  ]) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), top + offset);
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${out}/processo-rolagem-${i}.png` });
  }
  await context.close();
}

await browser.close();
server.close();
console.log(`Quadros em ${out}/.`);
