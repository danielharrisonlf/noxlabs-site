// Desempenho das animações com a CPU 4x mais lenta (CDP), em 1440 e 390:
// - quadros durante a rolagem completa e durante as interações (p50, p95,
//   % acima de 33 ms) medidos por requestAnimationFrame;
// - tarefas longas (PerformanceObserver "longtask");
// - pior duração de evento de interação (PerformanceObserver "event", proxy de INP);
// - CLS acumulado.
// Rode depois de `pnpm build` (ou com BASE_URL para o contêiner).
import { chromium } from "@playwright/test";
import { serveDist } from "./serve-dist.mjs";

let server;
let base = process.env.BASE_URL;
if (!base) {
  server = await serveDist(4335);
  base = "http://127.0.0.1:4335";
}

const browser = await chromium.launch();
const results = [];

const instrument = () => {
  window.__perf = { frames: [], long: [], events: [], cls: 0 };
  let last = performance.now();
  const loop = (now) => {
    window.__perf.frames.push(now - last);
    last = now;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) window.__perf.long.push(e.duration);
  }).observe({ type: "longtask", buffered: true });
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) if (e.interactionId) window.__perf.events.push(e.duration);
  }).observe({ type: "event", buffered: true, durationThreshold: 16 });
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) if (!e.hadRecentInput) window.__perf.cls += e.value;
  }).observe({ type: "layout-shift", buffered: true });
};

for (const [width, height, mobile] of [
  [1440, 900, false],
  [390, 844, true],
]) {
  const context = await browser.newContext({ viewport: { width, height }, hasTouch: mobile, isMobile: mobile });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(instrument);
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(5000);
  // O que aconteceu no carregamento fica separado do que acontece durante o uso.
  const loadLong = await page.evaluate(() => {
    const l = window.__perf.long.splice(0);
    window.__perf.frames = [];
    return l;
  });

  // Rolagem completa.
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (let y = 0; y < total; y += 100) {
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(30);
  }
  await page.waitForTimeout(800);
  const scrollFrames = await page.evaluate(() => window.__perf.frames.splice(0));

  // Interações: seletor, Kairos, FAQ.
  await page.evaluate(() => document.getElementById("servicos").scrollIntoView());
  await page.waitForTimeout(500);
  const tabs = page.locator("#servicos [role='tab']");
  for (const i of [1, 3, 2]) {
    await tabs.nth(i).click();
    await page.waitForTimeout(700);
  }
  await page.evaluate(() => document.querySelector("[data-flow]").scrollIntoView());
  await page.waitForTimeout(500);
  const next = page.locator("[data-flow] [data-next]").first();
  for (let i = 0; i < 3; i++) {
    await next.click();
    await page.waitForTimeout(900);
  }
  await page.locator(".faq-item summary").nth(1).scrollIntoViewIfNeeded();
  await page.locator(".faq-item summary").nth(1).click();
  await page.waitForTimeout(700);

  const data = await page.evaluate(() => ({
    frames: window.__perf.frames.splice(0),
    long: window.__perf.long,
    events: window.__perf.events,
    cls: window.__perf.cls,
  }));
  const stat = (arr) => {
    const s = [...arr].sort((a, b) => a - b);
    const q = (p) => s[Math.min(s.length - 1, Math.floor(p * s.length))] ?? 0;
    return {
      n: s.length,
      p50: q(0.5).toFixed(1),
      p95: q(0.95).toFixed(1),
      over33: s.length ? `${((s.filter((v) => v > 33.4).length / s.length) * 100).toFixed(1)}%` : "0%",
    };
  };
  results.push({
    viewport: `${width}x${height}`,
    cpu: "4x",
    scroll: stat(scrollFrames),
    interactions: stat(data.frames),
    longTasksLoad: `${loadLong.length} (máx ${Math.round(Math.max(0, ...loadLong))} ms)`,
    longTasksDuringUse: `${data.long.length} (máx ${Math.round(Math.max(0, ...data.long))} ms)`,
    worstEvent: `${Math.round(Math.max(0, ...data.events))} ms`,
    cls: data.cls.toFixed(4),
  });
  await context.close();
}

await browser.close();
server?.close();
console.log(JSON.stringify(results, null, 2));
