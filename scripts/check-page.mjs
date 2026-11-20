// Verificações no navegador contra um site no ar (padrão: dist/ servido
// localmente; use BASE_URL=http://localhost:8088 para o contêiner).
// - transbordo horizontal de 360 a 1920 px, nos dois temas
// - erros de console e violações de CSP
// - contraste WCAG de todo texto visível contra o fundo efetivo
// - imagens sem alt, ordem de títulos, alvos de toque
// - tema (alternância e persistência), menu mobile (Esc) e cópia de e-mail
import { chromium } from "@playwright/test";
import { serveDist } from "./serve-dist.mjs";

let server;
let base = process.env.BASE_URL;
if (!base) {
  server = await serveDist(4331);
  base = "http://127.0.0.1:4331";
}

const routes = ["/", "/casos/kairos/", "/casos/clinicflow/", "/casos/whatsapp-control-center/", "/nao-existe/"];
const widths = [360, 390, 768, 1024, 1280, 1440, 1920];
const failures = [];
const fail = (msg) => failures.push(msg);

const browser = await chromium.launch();

for (const theme of ["light", "dark"]) {
  const context = await browser.newContext({ colorScheme: theme, reducedMotion: "reduce" });
  const page = await context.newPage();
  let current = "";
  page.on("console", (m) => {
    // A rota de 404 responde 404 de propósito.
    if (current === "/nao-existe/" && m.text().includes("404")) return;
    if (m.type() === "error") fail(`[${theme}] console: ${m.text()}`);
  });
  page.on("pageerror", (e) => fail(`[${theme}] pageerror: ${e.message}`));

  for (const route of routes) {
    current = route;
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + route, { waitUntil: "networkidle" });
      const tag = `[${theme} ${width}px ${route}]`;

      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      if (sw > width) fail(`${tag} transbordo: scrollWidth ${sw}`);

      if (width !== 390 && width !== 1440) continue;

      const report = await page.evaluate(() => {
        const out = { contrast: [], alt: [], headings: [], targets: [] };
        const parse = (c) => {
          const m = c.match(/rgba?\(([^)]+)\)/);
          if (!m) return null;
          const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
          return { r, g, b, a };
        };
        const lum = ({ r, g, b }) => {
          const f = (v) => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
          };
          return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
        };
        const bgOf = (el) => {
          for (let n = el; n; n = n.parentElement) {
            const c = parse(getComputedStyle(n).backgroundColor);
            if (c && c.a > 0.5) return c;
          }
          return parse(getComputedStyle(document.body).backgroundColor);
        };
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const seen = new Set();
        for (let t = walker.nextNode(); t; t = walker.nextNode()) {
          const el = t.parentElement;
          if (!el || seen.has(el) || !t.textContent.trim()) continue;
          seen.add(el);
          if (el.closest("svg, .visually-hidden, .skip-link, script, style")) continue;
          const cs = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          if (cs.visibility === "hidden" || cs.display === "none" || rect.width === 0) continue;
          if (el.closest("[hidden], details:not([open]) > :not(summary)")) continue;
          const fg = parse(cs.color);
          const bg = bgOf(el);
          if (!fg || !bg) continue;
          const [l1, l2] = [lum(fg), lum(bg)].sort((a, b) => b - a);
          const ratio = (l1 + 0.05) / (l2 + 0.05);
          const size = parseFloat(cs.fontSize);
          const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
          if (ratio < (large ? 3 : 4.5)) out.contrast.push(`${ratio.toFixed(2)} "${t.textContent.trim().slice(0, 40)}"`);
          if (size < 12) out.contrast.push(`fonte ${size}px "${t.textContent.trim().slice(0, 40)}"`);
        }
        for (const img of document.querySelectorAll("img")) {
          if (!img.hasAttribute("alt")) out.alt.push(img.src);
        }
        let last = 0;
        for (const h of document.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
          const lvl = Number(h.tagName[1]);
          if (last && lvl > last + 1) out.headings.push(`${h.tagName} após H${last}: "${h.textContent.trim().slice(0, 30)}"`);
          last = lvl;
        }
        if (document.querySelectorAll("h1").length !== 1) out.headings.push("número de H1 diferente de 1");
        for (const el of document.querySelectorAll("a.btn, button, summary, .icon-btn")) {
          const r = el.getBoundingClientRect();
          if (r.width === 0) continue;
          if (r.height < 44 || r.width < 44) out.targets.push(`${Math.round(r.width)}x${Math.round(r.height)} "${el.textContent.trim().slice(0, 30)}"`);
        }
        return out;
      });
      for (const c of report.contrast) fail(`${tag} contraste ${c}`);
      for (const a of report.alt) fail(`${tag} img sem alt ${a}`);
      for (const h of report.headings) fail(`${tag} títulos ${h}`);
      for (const t of report.targets) fail(`${tag} alvo pequeno ${t}`);
    }
  }
  await context.close();
}

// Interações
{
  const context = await browser.newContext({ colorScheme: "light", viewport: { width: 390, height: 844 } });
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: base });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });

  await page.click("[data-theme-toggle]");
  if ((await page.evaluate(() => document.documentElement.dataset.theme)) !== "dark") fail("tema: alternância não aplicou dark");
  await page.reload({ waitUntil: "networkidle" });
  if ((await page.evaluate(() => document.documentElement.dataset.theme)) !== "dark") fail("tema: escolha não persistiu");

  await page.click("[data-menu-toggle]");
  if (!(await page.locator("#site-nav").isVisible())) fail("menu: não abriu");
  await page.keyboard.press("Escape");
  if (await page.locator("#site-nav").isVisible()) fail("menu: Esc não fechou");
  const focused = await page.evaluate(() => document.activeElement?.hasAttribute("data-menu-toggle"));
  if (!focused) fail("menu: foco não voltou ao botão");

  await page.locator("[data-copy]").scrollIntoViewIfNeeded();
  await page.click("[data-copy]");
  await page.waitForTimeout(300);
  const label = await page.locator("[data-copy-label]").textContent();
  const status = await page.locator("[data-copy-status]").textContent();
  if (label !== "E-mail copiado") fail(`cópia: rótulo "${label}", status "${status}"`);
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  if (clip !== "daniel.harrisonlf@gmail.com") fail(`cópia: área de transferência "${clip}"`);
  await context.close();
}

await browser.close();
server?.close();

if (failures.length) {
  console.error(`${failures.length} problema(s):\n` + [...new Set(failures)].join("\n"));
  process.exitCode = 1;
} else {
  console.log(`OK: ${routes.length} rotas, ${widths.length} larguras, 2 temas, contraste, títulos, alvos e interações.`);
}
