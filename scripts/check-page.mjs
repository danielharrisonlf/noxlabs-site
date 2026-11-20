// Verificações no navegador contra um site no ar (padrão: dist/ servido
// localmente; use BASE_URL=http://localhost:8088 para o contêiner).
// - transbordo horizontal de 320 a 2560 px, em paisagem e em alturas baixas, nos dois temas
// - erros de console e violações de CSP
// - contraste WCAG de todo texto visível contra o fundo efetivo
// - imagens sem alt, ordem de títulos, alvos de toque
// - CTA principal visível na primeira tela do celular (390x844 e 360x740)
// - tema (alternância e persistência), menu em tela cheia (foco, Esc), cópia de e-mail
// - seletor de problemas (abas, teclado, assunto do e-mail) e o caminho do Kairos
//   (próximo, teclado, gesto, reproduzir/pausar); CTA da base no celular
// - movimento reduzido (tudo visível e parado) e página sem JavaScript
import { chromium } from "@playwright/test";
import { serveDist } from "./serve-dist.mjs";

let server;
let base = process.env.BASE_URL;
if (!base) {
  server = await serveDist(4331);
  base = "http://127.0.0.1:4331";
}

const routes = ["/", "/casos/kairos/", "/casos/clinicflow/", "/casos/whatsapp-control-center/", "/nao-existe/"];
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
    for (const [width, height] of viewports) {
      await page.setViewportSize({ width, height });
      await page.goto(base + route, { waitUntil: "networkidle" });
      const tag = `[${theme} ${width}x${height} ${route}]`;

      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      if (sw > width) fail(`${tag} transbordo: scrollWidth ${sw}`);

      // CTA principal na primeira tela do celular.
      if (route === "/" && ((width === 390 && height === 844) || (width === 360 && height === 740))) {
        const box = await page.locator(".hero .btn-primary").boundingBox();
        if (!box || box.y + box.height > height) fail(`${tag} CTA do topo fora da primeira tela (${box?.y}+${box?.height})`);
      }

      if (!audited.has(`${width}x${height}`)) continue;

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
        for (const el of document.querySelectorAll('a.btn, button, summary, .icon-btn, [role="tab"]')) {
          if (el.closest("[inert]")) continue;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || getComputedStyle(el).visibility === "hidden") continue;
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

// Interações no celular (com movimento, como um visitante comum).
{
  const context = await browser.newContext({
    colorScheme: "light",
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  });
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: base });
  const page = await context.newPage();
  page.on("pageerror", (e) => fail(`interações: pageerror ${e.message}`));
  await page.goto(`${base}/`, { waitUntil: "networkidle" });

  // Menu em tela cheia: abre, prende o foco, deixa a página inerte, fecha com Esc.
  await page.click("[data-menu-toggle]");
  await page.waitForTimeout(600);
  if (!(await page.locator("#site-nav").isVisible())) fail("menu: não abriu");
  const inMenu = await page.evaluate(() => document.getElementById("site-nav")?.contains(document.activeElement));
  if (!inMenu) fail("menu: foco não entrou no menu");
  if (!(await page.evaluate(() => document.querySelector("main")?.inert))) fail("menu: página atrás não ficou inerte");

  // Tema, pelo botão de dentro do menu.
  await page.locator("#site-nav [data-theme-toggle]").click();
  await page.waitForTimeout(800);
  if ((await page.evaluate(() => document.documentElement.dataset.theme)) !== "dark") fail("tema: alternância não aplicou dark");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  if (await page.locator("#site-nav").isVisible()) fail("menu: Esc não fechou");
  const focused = await page.evaluate(() => document.activeElement?.hasAttribute("data-menu-toggle"));
  if (!focused) fail("menu: foco não voltou ao botão");
  await page.reload({ waitUntil: "networkidle" });
  if ((await page.evaluate(() => document.documentElement.dataset.theme)) !== "dark") fail("tema: escolha não persistiu");

  // CTA da base: escondido no topo, aparece no meio da página.
  if ((await page.locator("[data-dock]").getAttribute("data-visible")) !== "false") fail("cta da base: visível no topo");
  await page.evaluate(() => document.getElementById("casos")?.scrollIntoView());
  await page.waitForTimeout(800);
  if ((await page.locator("[data-dock]").getAttribute("data-visible")) !== "true") fail("cta da base: não apareceu ao rolar");

  // Seletor de problemas: chips, setas e o problema no assunto do e-mail.
  const svc = page.locator("[data-svc]");
  await svc.scrollIntoViewIfNeeded();
  const svcTabs = svc.locator('[role="tab"]');
  if ((await svcTabs.count()) !== 6) fail(`serviços: ${await svcTabs.count()} abas, esperado 6`);
  await svcTabs.nth(2).click();
  if ((await svcTabs.nth(2).getAttribute("aria-selected")) !== "true") fail("serviços: toque não selecionou a aba");
  const visiblePanels = await svc.locator('[role="tabpanel"]:visible').count();
  if (visiblePanels !== 1) fail(`serviços: ${visiblePanels} painéis visíveis, esperado 1`);
  await page.keyboard.press("ArrowRight");
  if ((await svcTabs.nth(3).getAttribute("aria-selected")) !== "true") fail("serviços: seta não avançou");
  const focusedTab = await page.evaluate(() => document.activeElement?.getAttribute("role"));
  if (focusedTab !== "tab") fail("serviços: foco não acompanhou a aba");
  const svcMail = await svc.locator('[role="tabpanel"]:visible a[href^="mailto:"]').getAttribute("href");
  const problem = await svc.locator(".svc-panel:visible h3").textContent();
  if (!svcMail || !decodeURIComponent(svcMail).includes("Contexto:")) fail(`serviços: e-mail sem o problema (${svcMail}, ${problem})`);

  // Gesto de toque: deslizar para a esquerda num elemento avança.
  const swipe = async (selector) => {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      const r = el.getBoundingClientRect();
      const y = r.top + Math.min(r.height / 2, 200);
      const fire = (type, x) =>
        el.dispatchEvent(new PointerEvent(type, { pointerType: "touch", pointerId: 7, clientX: x, clientY: y, bubbles: true }));
      fire("pointerdown", r.left + r.width * 0.8);
      fire("pointerup", r.left + r.width * 0.2);
    }, selector);
    await page.waitForTimeout(200);
  };
  await swipe(".svc-panels");
  if ((await svcTabs.nth(4).getAttribute("aria-selected")) !== "true") fail("serviços: deslizar não avançou");

  // Caminho do Kairos: próximo, gesto, teclado e reproduzir/pausar.
  const flow = page.locator("[data-flow]").first();
  await flow.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const playBtn = flow.locator("[data-play]");
  if ((await playBtn.getAttribute("data-state")) === "playing") await playBtn.click();
  await flow.locator('[role="tab"]').first().click();
  await flow.locator("[data-next]").click();
  if ((await flow.getAttribute("data-step")) !== "2") fail("kairos: próximo não foi ao passo 2");
  await swipe("[data-flow]");
  if ((await flow.getAttribute("data-step")) !== "3") fail("kairos: deslizar não foi ao passo 3");
  await flow.locator('[role="tab"][aria-selected="true"]').focus();
  await page.keyboard.press("End");
  if ((await flow.getAttribute("data-step")) !== "6") fail("kairos: End não levou ao último passo");
  if ((await flow.locator('[role="tabpanel"]:visible').count()) !== 1) fail("kairos: mais de um passo visível");
  await page.keyboard.press("Home");
  await playBtn.click();
  if ((await playBtn.getAttribute("data-state")) !== "playing") fail("kairos: reproduzir não iniciou");
  await playBtn.click();
  if ((await playBtn.getAttribute("data-state")) === "playing") fail("kairos: pausar não parou");

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

// Desktop: indicador de seção no menu e fio condutor.
{
  const context = await browser.newContext({ colorScheme: "dark", viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.getElementById("kairos")?.scrollIntoView());
  await page.waitForTimeout(700);
  const current = await page.evaluate(() => document.querySelector('[aria-current="true"]')?.getAttribute("data-nav-link"));
  if (current !== "kairos") fail(`menu: seção atual "${current}", esperado kairos`);
  if ((await page.locator(".nav-ind").getAttribute("data-on")) !== "true") fail("menu: indicador de seção apagado");
  if (!(await page.locator("[data-thread]").isVisible())) fail("fio condutor: não aparece em 1440");
  const lit = await page.locator("[data-thread] circle.lit").count();
  if (lit < 2) fail(`fio condutor: ${lit} pontos acesos ao chegar no Kairos`);
  await context.close();
}

// Movimento reduzido: tudo visível e o Kairos parado no primeiro passo.
{
  const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll("[data-reveal]")].filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length,
  );
  if (hidden) fail(`movimento reduzido: ${hidden} blocos com opacidade < 1`);
  await page.evaluate(() => document.getElementById("kairos")?.scrollIntoView());
  await page.waitForTimeout(1500);
  if ((await page.locator("[data-flow]").first().getAttribute("data-step")) !== "1") fail("movimento reduzido: Kairos avançou sozinho");
  await context.close();
}

// Sem JavaScript: todo o conteúdo aparece.
{
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const panels = await page.locator(".svc-panel:visible").count();
  if (panels !== 6) fail(`sem JS: ${panels} respostas de serviço visíveis, esperado 6`);
  const steps = await page.locator(".kf-panel:visible").count();
  if (steps !== 6) fail(`sem JS: ${steps} passos do Kairos visíveis, esperado 6`);
  // As entradas em CSS ainda correm sem script: espera o topo e percorre a página até o fim.
  await page.waitForTimeout(4500);
  for (let y = 0; y < (await page.evaluate(() => document.documentElement.scrollHeight)); y += 400) {
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(400);
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll("[data-reveal], .hero h1, .proofs li")].filter(
      (el) => Number(getComputedStyle(el).opacity) < 0.99,
    ).length,
  );
  if (hidden) fail(`sem JS: ${hidden} blocos invisíveis`);
  await context.close();
}

await browser.close();
server?.close();

if (failures.length) {
  console.error(`${failures.length} problema(s):\n` + [...new Set(failures)].join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `OK: ${routes.length} rotas, ${viewports.length} tamanhos de tela (320–2560, paisagem e baixos), 2 temas, contraste, títulos, alvos, CTA na primeira tela, menu, tema, abas, gesto, Kairos, cópia, CTA da base, fio condutor, movimento reduzido e sem JavaScript.`,
  );
}
