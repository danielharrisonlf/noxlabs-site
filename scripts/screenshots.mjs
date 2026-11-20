// Capturas de cada seção em 390 e 1440 px, temas claro e escuro, mais as
// páginas de caso. Também mede transbordo horizontal. Rode depois de `pnpm build`.
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";
import { serveDist } from "./serve-dist.mjs";

const out = "docs/screenshots";
mkdirSync(out, { recursive: true });

const port = 4329;
const base = `http://127.0.0.1:${port}`;
const server = await serveDist(port);

const widths = [390, 1440];
const themes = ["light", "dark"];
const sections = [
  ["01-hero", ".hero"],
  ["02-servicos", "#servicos"],
  ["03-kairos", "#kairos"],
  ["04-casos", "#casos"],
  ["05-processo", "#processo"],
  ["06-sobre", "#sobre"],
  ["07-perguntas", "#perguntas"],
  ["08-contato", "#contato"],
  ["09-rodape", "footer"],
];
const pages = [
  ["caso-kairos", "/casos/kairos/"],
  ["caso-clinicflow", "/casos/clinicflow/"],
  ["caso-whatsapp", "/casos/whatsapp-control-center/"],
  ["404", "/nao-existe/"],
];

const browser = await chromium.launch();
const problems = [];

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  // Deixa a exposição do topo se formar (rastros, pacotes e provas) antes de capturar.
  await page.waitForTimeout(4200);
}

// Percorre a página para que as animações ligadas à rolagem e as que esperam a
// seção aparecer cheguem ao estado final; depois volta ao topo.
async function walk(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(400);
}

async function overflow(page, label) {
  const result = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    inner: window.innerWidth,
  }));
  if (result.scroll > result.inner) problems.push(`${label}: scrollWidth ${result.scroll} > ${result.inner}`);
}

for (const width of widths) {
  for (const theme of themes) {
    const context = await browser.newContext({
      viewport: { width, height: width < 600 ? 844 : 900 },
      deviceScaleFactor: width < 600 ? 2 : 1,
      colorScheme: theme,
    });
    const page = await context.newPage();
    const tag = `${width}-${theme}`;

    await page.goto(`${base}/`, { waitUntil: "networkidle" });
    await settle(page);
    await overflow(page, `/ ${tag}`);
    await page.screenshot({ path: `${out}/home-${tag}-fold.png` });
    await walk(page);
    await page.screenshot({ path: `${out}/home-${tag}-full.png`, fullPage: true });
    // O cabeçalho flutuante cobriria o topo das capturas de elemento; some só aqui.
    await page.addStyleTag({ content: ".header{visibility:hidden!important}" });
    for (const [name, selector] of sections) {
      const el = page.locator(selector).first();
      await el.scrollIntoViewIfNeeded();
      await el.screenshot({ path: `${out}/home-${tag}-${name}.png` });
    }

    for (const [name, path] of pages) {
      await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
      await settle(page);
      await overflow(page, `${path} ${tag}`);
      await walk(page);
      await page.screenshot({ path: `${out}/${name}-${tag}-full.png`, fullPage: true });
    }
    await context.close();
  }
}

await browser.close();
server.close();

if (problems.length) {
  console.error("Transbordo horizontal:\n" + problems.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Capturas em ${out}/. Sem transbordo horizontal em ${widths.join(" e ")} px.`);
}
