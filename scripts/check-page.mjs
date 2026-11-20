// Verificações no navegador contra um site no ar (padrão: dist/ servido
// localmente; use BASE_URL=http://localhost:8088 para o contêiner).
// - transbordo horizontal de 320 a 2560 px, em paisagem e em alturas baixas
// - erros de console e violações de CSP
// - contraste WCAG de todo texto visível contra o fundo efetivo
// - imagens sem alt, ordem de títulos, um H1, alvos de toque
// - CTA principal visível na primeira tela do celular (390x844 e 360x740)
// - todo dado de mercado com fonte (link) e ano; nenhum termo técnico fora do rodapé técnico
// - menu do celular: foco preso, página inerte, rolagem travada, Esc, toque fora,
//   gesto de voltar, fechar ao navegar sem a seção ficar sob o cabeçalho, alvos de 48 px
// - seletor de ramos (abas e teclado), CTA da base, seção atual na navegação
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
const heroCta = { "/": ".hero .btn-primary" };
// Termos técnicos que não podem aparecer no caminho principal (o rodapé técnico das páginas de caso é a exceção).
const jargon =
  /\b(arquitetura|banco de dados|API|MCP|microsservi\w*|deploy|PostgreSQL|Redis|NestJS|React|OAuth|stack|gateway|outbox|backend|frontend|servidor|webhooks?|JWT|Docker|Prisma|produção|VPS|monorepo|S3|Vercel|GitHub|código-fonte|CRM)\b/i;

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

      if (heroCta[route] && width <= 390 && height >= 640) {
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
        const targets = 'a.btn, button, summary, input, [role="tab"], .nav-list a, .text-link, .contact-email a, .crumbs a, .footer-group a, .more-link';
        for (const el of document.querySelectorAll(targets)) {
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
        const meta = "[alt], [aria-label], meta[name='description'], meta[property^='og:'], meta[name^='twitter:'], title";
        for (const attr of document.querySelectorAll(meta)) {
          if (attr.matches("meta[property='og:url'], meta[property='og:image'], meta[name='twitter:image']")) continue;
          const text = attr.getAttribute("alt") ?? attr.getAttribute("aria-label") ?? attr.getAttribute("content") ?? attr.textContent;
          const m = text?.match(re);
          if (m) out.jargon.push(`"${m[0]}" em atributo "${text.slice(0, 50)}"`);
        }
        // Dados estruturados: só os textos (URLs de perfis ficam de fora).
        for (const node of document.querySelectorAll('script[type="application/ld+json"]')) {
          const walk = (v) => {
            if (typeof v === "string") {
              if (/^https?:/.test(v)) return;
              const m = v.match(re);
              if (m) out.jargon.push(`"${m[0]}" em JSON-LD "${v.slice(0, 50)}"`);
            } else if (v && typeof v === "object") for (const x of Object.values(v)) walk(x);
          };
          walk(JSON.parse(node.textContent));
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

  // Menu do celular: abre, prende o foco, deixa a página inerte e trava a rolagem do fundo.
  const menuOpen = () => page.evaluate(() => document.querySelector("[data-menu-toggle]")?.getAttribute("aria-expanded") === "true");
  const openMenu = async () => {
    await page.click("[data-menu-toggle]");
    await page.waitForTimeout(500);
  };
  await openMenu();
  if (!(await page.locator("#site-nav").isVisible())) fail("menu: não abriu");
  if (!(await page.evaluate(() => document.getElementById("site-nav")?.contains(document.activeElement)))) fail("menu: foco não entrou no menu");
  if (!(await page.evaluate(() => document.querySelector("main")?.inert))) fail("menu: página atrás não ficou inerte");
  if ((await page.evaluate(() => getComputedStyle(document.documentElement).overflow)) !== "hidden") fail("menu: rolagem do fundo não travou");
  const y0 = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(300);
  if ((await page.evaluate(() => window.scrollY)) !== y0) fail("menu: o fundo rolou com o menu aberto");
  // Foco preso: Tab dá a volta sem sair do menu.
  for (let i = 0; i < 14; i++) await page.keyboard.press("Tab");
  const trapped = await page.evaluate(
    () => document.getElementById("site-nav")?.contains(document.activeElement) || document.activeElement?.hasAttribute("data-menu-toggle"),
  );
  if (!trapped) fail("menu: o foco escapou com Tab");
  // Alvos de 48 px dentro do menu.
  const small = await page.evaluate(() =>
    [...document.querySelectorAll("#site-nav a, #site-nav button")]
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.width > 0 && (r.height < 47.5 || r.width < 47.5)).length,
  );
  if (small) fail(`menu: ${small} alvo(s) menores que 48 px`);
  // Ordem: seções primeiro, depois a ação, e os contatos e links externos por último.
  const order = await page.evaluate(() => {
    const top = (sel) => document.querySelector(sel)?.getBoundingClientRect().top ?? -1;
    return [top("#site-nav .sheet-nav"), top("#site-nav .sheet-cta"), top("#site-nav .sheet-extra")];
  });
  if (!(order[0] < order[1] && order[1] < order[2])) fail(`menu: ordem errada (seções ${order[0]}, ação ${order[1]}, contatos ${order[2]})`);
  // Esc fecha e devolve o foco ao botão.
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  if (await page.locator("#site-nav").isVisible()) fail("menu: Esc não fechou");
  if (!(await page.evaluate(() => document.activeElement?.hasAttribute("data-menu-toggle")))) fail("menu: foco não voltou ao botão");
  // Toque fora (no fundo escurecido) fecha.
  await openMenu();
  await page.mouse.click(195, 90);
  await page.waitForTimeout(500);
  if (await menuOpen()) fail("menu: tocar fora não fechou");
  // Gesto de voltar fecha o menu sem sair da página.
  await openMenu();
  await page.goBack();
  await page.waitForTimeout(500);
  if (await menuOpen()) fail("menu: voltar não fechou");
  if (!page.url().startsWith(`${base}/`)) fail(`menu: voltar saiu da página (${page.url()})`);
  // Tocar num link fecha o menu e leva à seção, sem ela ficar escondida sob o cabeçalho.
  await openMenu();
  await page.click('#site-nav a[href="/#estimativa"]');
  await page.waitForTimeout(1500);
  if (await menuOpen()) fail("menu: tocar num link não fechou");
  const landing = await page.evaluate(() => {
    const top = document.getElementById("estimativa")?.getBoundingClientRect().top ?? -1;
    const header = document.querySelector("[data-header]");
    const hb = header && header.dataset.hidden !== "true" ? header.getBoundingClientRect().bottom : 0;
    return { top, hb, hash: location.hash, overflow: getComputedStyle(document.documentElement).overflow };
  });
  if (landing.top < landing.hb - 1 || landing.top > 160) fail(`menu: seção fora do lugar depois do link (topo ${landing.top}, cabeçalho ${landing.hb})`);
  if (landing.hash !== "#estimativa") fail(`menu: endereço sem a seção (${landing.hash})`);
  if (landing.overflow === "hidden") fail("menu: rolagem continuou travada depois de fechar");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(300);

  // Botão fechado mostra a seção atual depois de rolar até ela.
  await page.evaluate(() => document.getElementById("casos")?.scrollIntoView({ behavior: "instant" }));
  await page.waitForTimeout(700);
  const toggleText = (await page.locator("[data-menu-label]").textContent())?.trim();
  if (toggleText !== "Projetos") fail(`menu: botão fechado não mostra a seção atual ("${toggleText}")`);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(400);

  // Cabeçalho do celular: some ao descer e volta ao subir.
  await page.evaluate(() => window.scrollTo({ top: 1400, behavior: "instant" }));
  await page.waitForTimeout(150);
  await page.evaluate(() => window.scrollTo({ top: 1800, behavior: "instant" }));
  await page.waitForTimeout(500);
  if ((await page.locator("[data-header]").getAttribute("data-hidden")) !== "true") fail("cabeçalho: não sumiu ao rolar para baixo");
  await page.evaluate(() => window.scrollTo({ top: 1500, behavior: "instant" }));
  await page.waitForTimeout(500);
  if ((await page.locator("[data-header]").getAttribute("data-hidden")) === "true") fail("cabeçalho: não voltou ao rolar para cima");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(300);

  // Seletor de ramos: tocar num chip troca o cenário; setas do teclado andam entre os chips.
  await page.locator("#tab-clinica").scrollIntoViewIfNeeded();
  await page.click("#tab-clinica");
  await page.waitForTimeout(500);
  if (!(await page.locator("#panel-clinica").isVisible()) || (await page.locator("#panel-loja").isVisible())) fail("ramos: o chip não trocou o cenário");
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(500);
  if ((await page.locator("#tab-agro").getAttribute("aria-selected")) !== "true") fail("ramos: seta para a direita não andou");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(300);

  // CTA da base: escondido no topo, aparece no meio da página.
  if ((await page.locator("[data-dock]").getAttribute("data-visible")) !== "false") fail("cta da base: visível no topo");
  await page.evaluate(() => document.getElementById("solucoes")?.scrollIntoView());
  await page.waitForTimeout(800);
  if ((await page.locator("[data-dock]").getAttribute("data-visible")) !== "true") fail("cta da base: não apareceu ao rolar");

  // Calculadora: teclado no controle deslizante, digitação no custo e o e-mail com os números.
  await page.evaluate(() => document.getElementById("estimativa")?.scrollIntoView());
  await page.waitForTimeout(500);
  if ((await page.locator("[data-dock]").getAttribute("data-visible")) !== "false") fail("cta da base: cobre a calculadora");
  const freed = () => page.locator('[data-res="freed"]').textContent();
  const before = await freed();
  // Teclado: seta para cima no campo de horas (6 → 7); depois o botão de mais (7 → 8).
  await page.locator("#est-hours").focus();
  await page.keyboard.press("ArrowUp");
  await page.locator('[data-step="hours"][data-dir="1"]').tap();
  await page.waitForTimeout(600);
  const after = await freed();
  // 6 pessoas × 8 h × 4 semanas × 30% = 57,6
  if (after !== "58") fail(`calculadora: horas liberadas "${before}" → "${after}", esperado "58"`);
  if ((await page.locator("#est-hours").inputValue()) !== "8") fail("calculadora: valor das horas não atualizou");
  // Custo como o brasileiro digita: "6.600" vale 6600.
  await page.locator("#est-cost").fill("6.600");
  await page.waitForTimeout(600);
  const month = (await page.locator('[data-res="month"]').textContent())?.replace(/\s/g, " ");
  // 57,6 h × (6600 ÷ 220) = 1.728
  if (month !== "R$ 1.728") fail(`calculadora: valor mensal "${month}", esperado "R$ 1.728"`);
  // Valor inválido: avisa e mantém a última conta válida.
  await page.locator("#est-cost").fill("abc");
  await page.waitForTimeout(500);
  if (!(await page.locator("[data-cost-error]").isVisible())) fail("calculadora: custo inválido sem aviso");
  const kept = (await page.locator('[data-res="month"]').textContent())?.replace(/\s/g, " ");
  if (kept !== "R$ 1.728") fail(`calculadora: custo inválido mudou a conta para "${kept}"`);
  await page.locator("#est-cost").fill("6600");
  await page.locator("#est-cost").blur();
  await page.waitForTimeout(300);
  if ((await page.locator("#est-cost").inputValue()) !== "6.600") fail("calculadora: custo não foi formatado ao sair do campo");
  const mail = decodeURIComponent((await page.locator("[data-est-mail]").getAttribute("href")) ?? "");
  if (!mail.includes("8 h por semana") || !mail.includes("58 horas por mês")) fail(`calculadora: e-mail sem os números (${mail.slice(0, 120)})`);

  // Cópia de e-mail.
  await page.locator("#contato [data-copy]").scrollIntoViewIfNeeded();
  await page.click("#contato [data-copy]");
  await page.waitForTimeout(300);
  const label = await page.locator("#contato [data-copy-label]").textContent();
  const status = await page.locator("[data-copy-status]").textContent();
  if (label !== "E-mail copiado") fail(`cópia: rótulo "${label}", status "${status}"`);
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  if (clip !== "daniel.harrisonlf@gmail.com") fail(`cópia: área de transferência "${clip}"`);
  await context.close();
}

// Menu em telas baixas (360×640 e paisagem 844×390): tudo cabe sem rolagem interna.
for (const [width, height] of [
  [360, 640],
  [320, 568],
]) {
  const context = await browser.newContext({ viewport: { width, height }, hasTouch: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.click("[data-menu-toggle]");
  await page.waitForTimeout(400);
  const fit = await page.evaluate(() => {
    const sheet = document.getElementById("site-nav");
    const nav = sheet?.querySelector(".sheet-nav");
    const extra = sheet?.querySelector(".sheet-extra")?.getBoundingClientRect();
    return { navScroll: nav ? nav.scrollHeight - nav.clientHeight : -1, bottom: extra?.bottom ?? 0, vh: window.innerHeight };
  });
  if (fit.navScroll > 1) fail(`menu ${width}x${height}: seções com rolagem interna (${fit.navScroll}px)`);
  if (fit.bottom > fit.vh + 1) fail(`menu ${width}x${height}: contatos fora da tela`);
  await context.close();
}

// Desktop: seção atual na navegação.
{
  const context = await browser.newContext({ colorScheme: "light", viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.getElementById("casos")?.scrollIntoView({ behavior: "instant" }));
  await page.waitForTimeout(700);
  const current = await page.evaluate(() => document.querySelector('.nav-list [data-nav-link][aria-current="true"]')?.getAttribute("data-nav-link"));
  if (current !== "casos") fail(`menu: seção atual "${current}", esperado casos`);
  await context.close();
}

// Movimento reduzido: tudo visível e o mosaico do topo no estado final.
{
  const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const hidden = await page.evaluate(() =>
      [...document.querySelectorAll("[data-reveal], .piece, .message")].filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length,
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
  if ((await page.locator('[data-res="freed"]').textContent()) !== "43") fail("sem JS: calculadora sem a conta inicial");
  const panels = await page.locator("[data-scen-panel]").evaluateAll((els) => els.filter((el) => el.getBoundingClientRect().height > 0).length);
  if (panels !== 9) fail(`sem JS: ${panels} de 9 cenários de ramo visíveis`);
  await context.close();
}

await browser.close();
server?.close();

if (failures.length) {
  console.error(`${failures.length} problema(s):\n` + [...new Set(failures)].join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `OK: ${routes.length} rotas, ${viewports.length} tamanhos de tela (320–2560, paisagem e baixos), contraste, títulos, alvos, CTA na primeira tela, fontes dos dados, sem termo técnico, menu do celular (foco, trava, Esc, toque fora, voltar, link, 48 px), cabeçalho que some, seletor de ramos, CTA da base, seção atual, calculadora, cópia, movimento reduzido e sem JavaScript.`,
  );
}
