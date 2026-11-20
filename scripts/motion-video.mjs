// Vídeos do movimento (Playwright recordVideo) e quadros extraídos com ffmpeg:
//   scroll-1440   rolagem completa da home em 1440 (escuro): entradas, fio condutor, menu
//   scroll-390    rolagem completa da home em 390 (claro), com CTA da base
//   hero-1440     carregamento do topo e resposta ao ponteiro
//   seletor-1440  troca de respostas no seletor de problemas (desktop)
//   seletor-390   chips e gesto de deslizar no celular
//   kairos-390    o caminho do Kairos tocando sozinho e avançado com o polegar
//   menu-390      menu em tela cheia abrindo e fechando
//   tema-1440     troca de tema com o círculo a partir do botão
// Rode depois de `pnpm build`. Saída em docs/screenshots/video/.
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import { serveDist } from "./serve-dist.mjs";

const out = "docs/screenshots/video";
const tmp = `${out}/.tmp`;
mkdirSync(`${out}/frames`, { recursive: true });

const port = 4334;
const base = `http://127.0.0.1:${port}`;
const server = await serveDist(port);
const browser = await chromium.launch();

async function record(name, { width, height, theme = "dark", mobile = false }, script) {
  rmSync(tmp, { recursive: true, force: true });
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme: theme,
    hasTouch: mobile,
    isMobile: mobile,
    deviceScaleFactor: 1,
    recordVideo: { dir: tmp, size: { width, height } },
  });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await script(page);
  await context.close();
  const [file] = readdirSync(tmp).filter((f) => f.endsWith(".webm"));
  const target = join(out, `${name}.webm`);
  renameSync(join(tmp, file), target);
  try {
    execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", target, "-vf", "fps=1", "-q:v", "4", join(out, "frames", `${name}-%02d.jpg`)]);
  } catch {
    console.warn(`ffmpeg indisponível: sem quadros para ${name}.`);
  }
}

// Rolagem suave por roda do mouse, em passos curtos.
async function scrollThrough(page, step = 120, pause = 45) {
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (let y = 0; y < total; y += step) {
    await page.mouse.wheel(0, step);
    await page.waitForTimeout(pause);
  }
  await page.waitForTimeout(1200);
}

await record("hero-1440", { width: 1440, height: 900 }, async (page) => {
  await page.waitForTimeout(4500);
  for (const [x, y] of [
    [900, 300],
    [1100, 420],
    [1000, 600],
    [700, 500],
  ]) {
    await page.mouse.move(x, y, { steps: 25 });
    await page.waitForTimeout(700);
  }
  await page.waitForTimeout(6000);
});

await record("scroll-1440", { width: 1440, height: 900 }, async (page) => {
  await page.waitForTimeout(1500);
  await scrollThrough(page, 110, 40);
});

await record("scroll-390", { width: 390, height: 844, theme: "light", mobile: true }, async (page) => {
  await page.waitForTimeout(1500);
  await scrollThrough(page, 90, 40);
});

await record("seletor-1440", { width: 1440, height: 900, theme: "light" }, async (page) => {
  await page.evaluate(() => document.getElementById("servicos").scrollIntoView());
  await page.waitForTimeout(1200);
  const tabs = page.locator("#servicos [role='tab']");
  for (const i of [1, 2, 3, 5, 4, 0]) {
    await tabs.nth(i).click();
    await page.waitForTimeout(1300);
  }
});

await record("seletor-390", { width: 390, height: 844, theme: "dark", mobile: true }, async (page) => {
  await page.evaluate(() => document.querySelector("[data-svc]").scrollIntoView());
  await page.waitForTimeout(1000);
  const tabs = page.locator("#servicos [role='tab']");
  await tabs.nth(1).tap();
  await page.waitForTimeout(1200);
  await tabs.nth(3).tap();
  await page.waitForTimeout(1200);
  for (let i = 0; i < 2; i++) {
    await page.evaluate(() => {
      const el = document.querySelector(".svc-panels");
      const r = el.getBoundingClientRect();
      const fire = (type, x) =>
        el.dispatchEvent(new PointerEvent(type, { pointerType: "touch", pointerId: 3, clientX: x, clientY: r.top + 120, bubbles: true }));
      fire("pointerdown", r.right - 40);
      fire("pointerup", r.left + 40);
    });
    await page.waitForTimeout(1300);
  }
});

await record("kairos-390", { width: 390, height: 844, theme: "dark", mobile: true }, async (page) => {
  await page.evaluate(() => document.querySelector("[data-flow] .kf-canvas").scrollIntoView({ block: "start" }));
  await page.waitForTimeout(11000);
  const play = page.locator("[data-flow] [data-play]").first();
  if ((await play.getAttribute("data-state")) === "playing") await play.tap();
  await page.locator("[data-flow] [role='tab']").first().tap();
  await page.waitForTimeout(800);
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => {
      const el = document.querySelector("[data-flow]");
      const r = el.getBoundingClientRect();
      const fire = (type, x) =>
        el.dispatchEvent(new PointerEvent(type, { pointerType: "touch", pointerId: 4, clientX: x, clientY: 300, bubbles: true }));
      fire("pointerdown", r.right - 40);
      fire("pointerup", r.left + 40);
    });
    await page.waitForTimeout(1600);
  }
});

await record("menu-390", { width: 390, height: 844, theme: "light", mobile: true }, async (page) => {
  await page.waitForTimeout(1200);
  await page.locator("[data-menu-toggle]").tap();
  await page.waitForTimeout(1800);
  await page.locator("[data-menu-toggle]").tap();
  await page.waitForTimeout(1200);
});

await record("tema-1440", { width: 1440, height: 900, theme: "light" }, async (page) => {
  await page.waitForTimeout(4200);
  await page.locator(".header-theme").click();
  await page.waitForTimeout(1600);
  await page.locator(".header-theme").click();
  await page.waitForTimeout(1600);
});

rmSync(tmp, { recursive: true, force: true });
await browser.close();
server.close();
console.log(`Vídeos e quadros em ${out}/.`);
