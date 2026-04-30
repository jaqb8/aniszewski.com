import { renameSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const resumeHtml = resolve("src/assets/resume.html");
const resumePdf = resolve("src/assets/resume.pdf");
const runDir = await mkdtemp(join(tmpdir(), "resume-pdf-"));
const tempPdf = join(runDir, "resume.pdf");

let browser;

try {
  browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
  });

  const context = await browser.newContext({
    deviceScaleFactor: 1,
    viewport: { width: 794, height: 1123 },
  });

  await context.route("**/*", async (route) => {
    const request = route.request();
    const url = request.url();

    if (url.startsWith("file:")) {
      await route.continue();
      return;
    }

    await route.abort();
  });

  const page = await context.newPage();
  await page.goto(pathToFileURL(resumeHtml).href, {
    waitUntil: "networkidle",
  });
  await page.emulateMedia({ media: "print" });

  await page.pdf({
    path: tempPdf,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();
  browser = undefined;

  renameSync(tempPdf, resumePdf);
  console.log(`Generated ${resumePdf}`);
} catch (error) {
  if (browser) await browser.close();
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  await rm(runDir, { recursive: true, force: true });
}
