// Visual check: screenshots the site at desktop/tablet/mobile widths,
// plus the opened mobile menu. Usage: node scripts/ui-check.mjs [baseUrl]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://127.0.0.1:4173/";
const outDir = "screenshots";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

const viewports = [
  ["desktop", 1440, 900],
  ["tablet", 768, 1024],
  ["mobile", 390, 844],
];

for (const [name, width, height] of viewports) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${outDir}/${name}-full.png`, fullPage: true });
  await page.screenshot({ path: `${outDir}/${name}-fold.png` });
  console.log(`${name}: full + above-the-fold captured`);
  await page.close();
}

// Mobile nav opened
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(base, { waitUntil: "networkidle" });
await page.click(".nav-toggle");
await page.waitForSelector(".nav-mobile");
await page.screenshot({ path: `${outDir}/mobile-menu.png` });
console.log("mobile: menu open captured");
await page.close();

await browser.close();
