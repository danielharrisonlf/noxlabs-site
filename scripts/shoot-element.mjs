// Captura um elemento: node scripts/shoot-element.mjs <rota> <seletor> <largura> <light|dark> <saida.png>
import { chromium } from "@playwright/test";
import { serveDist } from "./serve-dist.mjs";
const [,, path, selector, width, theme, out] = process.argv;
const server = await serveDist(4330);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +width, height: 900 }, deviceScaleFactor: 2, colorScheme: theme });
await p.goto(`http://127.0.0.1:4330${path}`, { waitUntil: "networkidle" });
await p.addStyleTag({ content: ".header{position:static!important}" });
await p.waitForTimeout(1500);
await p.locator(selector).first().screenshot({ path: out });
await b.close(); server.close();
