// Capturas do estado final (movimento reduzido) em todos os tamanhos de tela,
// nos dois temas. O movimento fica em scripts/frames.mjs e scripts/motion-video.mjs.
// Rode depois de `pnpm build`. Saída em docs/screenshots/:
//   fold/   primeira tela (PNG) de cada tamanho e tema
//   full/   página inteira (JPEG) de cada tamanho e tema
//   home-<390|1440>-<tema>-NN-secao.png   seções da home
//   caso-*, 404-*                          páginas de caso e 404 (390, 768 e 1440)
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";
import { serveDist } from "./serve-dist.mjs";

const out = "docs/screenshots";
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
  // Carrega imagens preguiçosas antes da página inteira.
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(400);
}

async function overflow(page, label) {
  const result = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, inner: window.innerWidth }));
  if (result.scroll > result.inner) problems.push(`${label}: scrollWidth ${result.scroll} > ${result.inner}`);
}

for (const theme of themes) {
  for (const [width, height] of sizes) {
    const mobile = width < 600;
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: mobile ? 2 : 1,
      colorScheme: theme,
      reducedMotion: "reduce",
      hasTouch: mobile,
    });
    const page = await context.newPage();
    const tag = `${width}x${height}-${theme}`;
    await page.goto(`${base}/`, { waitUntil: "networkidle" });
    await settle(page);
    await overflow(page, `/ ${tag}`);
    await page.screenshot({ path: `${out}/fold/home-${tag}.png` });
    await page.screenshot({ path: `${out}/full/home-${tag}.jpg`, fullPage: true, type: "jpeg", quality: 78 });

    if ((width === 390 && height === 844) || (width === 1440 && height === 900)) {
      await page.addStyleTag({ content: ".header,.dock{visibility:hidden!important}" });
      for (const [name, selector] of sections) {
        const el = page.locator(selector).first();
        await el.scrollIntoViewIfNeeded();
        await el.screenshot({ path: `${out}/home-${width}-${theme}-${name}.png` });
      }
    }

    if ([390, 768, 1440].includes(width) && height !== 390) {
      for (const [name, path] of pages) {
        await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
        await settle(page);
        await overflow(page, `${path} ${tag}`);
        await page.screenshot({ path: `${out}/full/${name}-${tag}.jpg`, fullPage: true, type: "jpeg", quality: 78 });
      }
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
  console.log(`Capturas em ${out}/. Sem transbordo em ${sizes.length} tamanhos de tela, nos dois temas.`);
}
