// Verificações no navegador contra um site no ar (padrão: dist/ servido
// localmente; use BASE_URL=http://localhost:8088 para o contêiner).
// - transbordo horizontal de 320 a 2560 px, em paisagem e em alturas baixas
// - erros de console e violações de CSP
// - contraste WCAG de todo texto visível contra o fundo efetivo
// - imagens sem alt, ordem de títulos, um H1, alvos de toque
// - CTA principal visível na primeira tela do celular (390x844 e 360x740)
// - todo dado de mercado com fonte (link) e ano; nenhum termo técnico fora do rodapé técnico
// - menu em tela cheia (foco, inerte, Esc), CTA da base, seção atual na navegação
// - calculadora (teclado, digitação, e-mail com os números), cópia de e-mail
// - movimento reduzido (tudo visível e no estado final) e página sem JavaScript
import { chromium } from "@playwright/test";
import { serveDist } from "./serve-dist.mjs";

let server;
let base = process.env.BASE_URL;
if (!base) {
  server = await serveDist(4331);
  base = "http://127.0.0.1:4331";
}

const routes = [
  "/",
  "/contabilidade/",
  "/casos/clinicflow/",
  "/casos/whatsapp-control-center/",
  "/casos/kairos/",
  "/nao-existe/",
];
const viewports = [
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
// Larguras com a auditoria completa (contraste, títulos, alvos).
const audited = new Set(["320x640", "390x844", "768x1024", "1440x900", "2560x1440"]);
// Primeira tela: onde fica o CTA principal de cada rota.
const heroCta = { "/": ".hero .btn-primary", "/contabilidade/": ".acc-hero .btn-primary" };
// Termos técnicos que não podem aparecer no caminho principal (o rodapé técnico das páginas de caso é a exceção).
const jargon =
  /\b(arquitetura|banco de dados|API|MCP|microsservi\w*|deploy|PostgreSQL|Redis|NestJS|React|OAuth|stack|gateway|outbox|backend|frontend|servidor|webhooks?|JWT|Docker|Prisma)\b/i;

const failures = [];
const fail = (msg) => failures.push(msg);

const browser = await chromium.launch();

{
  const context = await browser.newContext({ colorScheme: "light", reducedMotion: "reduce" });
  const page = await context.newPage();
  let current = "";
  page.on("console", (m) => {
    // A rota de 404 responde 404 de propósito.
    if (current === "/nao-existe/" && m.text().includes("404")) return;
    if (m.type() === "error") fail(`console: ${m.text()}`);
  });
  page.on("pageerror", (e) => fail(`pageerror: ${e.message}`));

  for (const route of routes) {
    current = route;
    for (const [width, height] of viewports) {
      await page.setViewportSize({ width, height });
      await page.goto(base + route, { waitUntil: "networkidle" });
      const tag = `[${width}x${height} ${route}]`;

      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      if (sw > width) fail(`${tag} transbordo: scrollWidth ${sw}`);

      if (heroCta[route] && ((width === 390 && height === 844) || (width === 360 && height === 740))) {
        const box = await page.locator(heroCta[route]).first().boundingBox();
        if (!box || box.y + box.height > height) fail(`${tag} CTA do topo fora da primeira tela (${box?.y}+${box?.height})`);
      }

      if (!audited.has(`${width}x${height}`)) continue;

      const report = await page.evaluate((jargonSource) => {
        const out = { contrast: [], alt: [], headings: [], targets: [], sources: [], jargon: [] };
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
        // Fundo efetivo: compõe as camadas semitransparentes até achar uma opaca.
        const bgOf = (el) => {
          const layers = [];
          for (let n = el; n; n = n.parentElement) {
            const c = parse(getComputedStyle(n).backgroundColor);
            if (c && c.a > 0) {
              layers.push(c);
              if (c.a >= 0.99) break;
            }
          }
          let acc = parse(getComputedStyle(document.body).backgroundColor) ?? { r: 255, g: 255, b: 255, a: 1 };
          for (const c of layers.reverse()) {
            acc = { r: c.r * c.a + acc.r * (1 - c.a), g: c.g * c.a + acc.g * (1 - c.a), b: c.b * c.a + acc.b * (1 - c.a), a: 1 };
          }
          return acc;
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
          if (el.closest("[hidden], [inert], details:not([open]) > :not(summary)")) continue;
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
        for (const el of document.querySelectorAll('a.btn, button, summary, input, [role="tab"], .nav-list a, .text-link')) {
          if (el.closest("[inert]")) continue;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || getComputedStyle(el).visibility === "hidden") continue;
          if (r.height < 44 || r.width < 44) out.targets.push(`${Math.round(r.width)}x${Math.round(r.height)} "${(el.textContent || el.id).trim().slice(0, 30)}"`);
        }
        // Todo dado de mercado: link para a fonte e um ano.
        for (const stat of document.querySelectorAll(".stat")) {
          const cap = stat.querySelector(".fonte");
          const value = stat.querySelector(".stat-value")?.textContent.trim();
          if (!cap || !cap.querySelector("a[href^='http']") || !/\b(19|20)\d{2}\b/.test(cap.textContent)) out.sources.push(value);
        }
        // Jargão técnico fora do rodapé técnico (details.tech).
        const re = new RegExp(jargonSource, "i");
        const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let t = tw.nextNode(); t; t = tw.nextNode()) {
          const el = t.parentElement;
          if (!el || el.closest("script, style, .tech")) continue;
          const m = t.textContent.match(re);
          if (m) out.jargon.push(`"${m[0]}" em "${t.textContent.trim().slice(0, 50)}"`);
        }
        for (const attr of document.querySelectorAll("[alt], [aria-label], meta[name='description'], title")) {
          const text = attr.getAttribute("alt") ?? attr.getAttribute("aria-label") ?? attr.getAttribute("content") ?? attr.textContent;
          const m = text?.match(re);
          if (m) out.jargon.push(`"${m[0]}" em atributo "${text.slice(0, 50)}"`);
        }
        return out;
      }, jargon.source);
      for (const c of report.contrast) fail(`${tag} contraste ${c}`);
      for (const a of report.alt) fail(`${tag} img sem alt ${a}`);
      for (const h of report.headings) fail(`${tag} títulos ${h}`);
      for (const t of report.targets) fail(`${tag} alvo pequeno ${t}`);
      for (const s of report.sources) fail(`${tag} dado sem fonte ou ano: ${s}`);
      for (const j of report.jargon) fail(`${tag} termo técnico ${j}`);
    }
  }
  await context.close();
}

// Interações no celular (com movimento, como um visitante comum).
{
  const context = await browser.newContext({ colorScheme: "light", viewport: { width: 390, height: 844 }, hasTouch: true });
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: base });
  const page = await context.newPage();
  page.on("pageerror", (e) => fail(`interações: pageerror ${e.message}`));
  await page.goto(`${base}/`, { waitUntil: "networkidle" });

  // Menu em tela cheia: abre, prende o foco, deixa a página inerte, fecha com Esc.
  await page.click("[data-menu-toggle]");
  await page.waitForTimeout(500);
  if (!(await page.locator("#site-nav").isVisible())) fail("menu: não abriu");
  const inMenu = await page.evaluate(() => document.getElementById("site-nav")?.contains(document.activeElement));
  if (!inMenu) fail("menu: foco não entrou no menu");
  if (!(await page.evaluate(() => document.querySelector("main")?.inert))) fail("menu: página atrás não ficou inerte");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  if (await page.locator("#site-nav").isVisible()) fail("menu: Esc não fechou");
  const focused = await page.evaluate(() => document.activeElement?.hasAttribute("data-menu-toggle"));
  if (!focused) fail("menu: foco não voltou ao botão");

  // CTA da base: escondido no topo, aparece no meio da página.
  if ((await page.locator("[data-dock]").getAttribute("data-visible")) !== "false") fail("cta da base: visível no topo");
  await page.evaluate(() => document.getElementById("casos")?.scrollIntoView());
  await page.waitForTimeout(800);
  if ((await page.locator("[data-dock]").getAttribute("data-visible")) !== "true") fail("cta da base: não apareceu ao rolar");

  // Calculadora: teclado no controle deslizante, digitação no custo e o e-mail com os números.
  await page.evaluate(() => document.getElementById("estimativa")?.scrollIntoView());
  await page.waitForTimeout(500);
  if ((await page.locator("[data-dock]").getAttribute("data-visible")) !== "false") fail("cta da base: cobre a calculadora");
  const freed = () => page.locator('[data-res="freed"]').textContent();
  const before = await freed();
  await page.locator("#est-hours").focus();
  for (let i = 0; i < 2; i++) await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(600);
  const after = await freed();
  // 5 pessoas × 10 h × 4 semanas × 30% = 60
  if (after !== "60") fail(`calculadora: horas liberadas "${before}" → "${after}", esperado "60"`);
  if ((await page.locator('[data-out="hours"]').textContent()) !== "10 h") fail("calculadora: valor das horas não atualizou");
  await page.locator("#est-cost").fill("6600");
  await page.waitForTimeout(600);
  const month = (await page.locator('[data-res="month"]').textContent())?.replace(/\s/g, " ");
  // 60 h × (6600 ÷ 220) = 1.800
  if (month !== "R$ 1.800") fail(`calculadora: valor mensal "${month}", esperado "R$ 1.800"`);
  const mail = decodeURIComponent((await page.locator("[data-est-mail]").getAttribute("href")) ?? "");
  if (!mail.includes("10 h por semana") || !mail.includes("60 horas por mês")) fail(`calculadora: e-mail sem os números (${mail.slice(0, 120)})`);

  // Cópia de e-mail.
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

// Desktop: seção atual na navegação e página de contabilidade marcada.
{
  const context = await browser.newContext({ colorScheme: "light", viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.getElementById("casos")?.scrollIntoView({ behavior: "instant" }));
  await page.waitForTimeout(700);
  const current = await page.evaluate(() => document.querySelector('[data-nav-link][aria-current="true"]')?.getAttribute("data-nav-link"));
  if (current !== "casos") fail(`menu: seção atual "${current}", esperado casos`);
  await page.goto(`${base}/contabilidade/`, { waitUntil: "networkidle" });
  if ((await page.locator('[data-nav-link="contabilidade"]').getAttribute("aria-current")) !== "page") fail("menu: Contabilidade sem aria-current na própria página");
  await context.close();
}

// Movimento reduzido: tudo visível e a rotina do topo no estado final.
{
  const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll("[data-reveal], .st-done, .tag-final")].filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length,
  );
  if (hidden) fail(`movimento reduzido: ${hidden} elementos com opacidade < 1`);
  await context.close();
}

// Sem JavaScript: todo o conteúdo aparece e a calculadora mostra a conta inicial.
{
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll("[data-reveal]")].filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length,
  );
  if (hidden) fail(`sem JS: ${hidden} blocos invisíveis`);
  if ((await page.locator('[data-res="freed"]').textContent()) !== "48") fail("sem JS: calculadora sem a conta inicial");
  await context.close();
}

await browser.close();
server?.close();

if (failures.length) {
  console.error(`${failures.length} problema(s):\n` + [...new Set(failures)].join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `OK: ${routes.length} rotas, ${viewports.length} tamanhos de tela (320–2560, paisagem e baixos), contraste, títulos, alvos, CTA na primeira tela, fontes dos dados, sem termo técnico, menu, CTA da base, seção atual, calculadora, cópia, movimento reduzido e sem JavaScript.`,
  );
}
