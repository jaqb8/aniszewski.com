import { spawn } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const resumeHtml = resolve("src/assets/resume.html");
const resumePdf = resolve("src/assets/resume.pdf");
const userDataDir = "/tmp/chrome-resume-profile";

const args = [
  "--headless",
  "--disable-gpu",
  "--disable-background-networking",
  "--disable-component-update",
  "--disable-extensions",
  "--disable-sync",
  "--no-first-run",
  "--no-default-browser-check",
  `--user-data-dir=${userDataDir}`,
  `--print-to-pdf=${resumePdf}`,
  `file://${resumeHtml}`,
];

const startedAt = Date.now();
let pdfWritten = false;
let shutdownTimer;

const chrome = spawn(chromePath, args, {
  stdio: ["ignore", "pipe", "pipe"],
});

const finish = (exitCode = 0) => {
  clearTimeout(shutdownTimer);
  process.exit(exitCode);
};

const hasFreshPdf = () => {
  if (!existsSync(resumePdf)) return false;

  const stats = statSync(resumePdf);
  return stats.size > 0 && stats.mtimeMs >= startedAt - 1000;
};

const markWritten = () => {
  if (pdfWritten) return;

  pdfWritten = true;
  console.log(`Generated ${resumePdf}`);

  shutdownTimer = setTimeout(() => {
    chrome.kill("SIGTERM");
    setTimeout(() => chrome.kill("SIGKILL"), 1500).unref();
    finish(0);
  }, 250);
};

const handleOutput = (chunk) => {
  const output = chunk.toString();

  if (output.includes("bytes written to file") || hasFreshPdf()) {
    markWritten();
    return;
  }

  const meaningfulLines = output
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.includes("ERROR:") && !line.includes("VERBOSE"));

  if (meaningfulLines.length > 0) {
    process.stderr.write(`${meaningfulLines.join("\n")}\n`);
  }
};

chrome.stdout.on("data", handleOutput);
chrome.stderr.on("data", handleOutput);

chrome.on("error", (error) => {
  console.error(`Failed to start Chrome: ${error.message}`);
  finish(1);
});

chrome.on("exit", (code, signal) => {
  clearTimeout(shutdownTimer);

  if (pdfWritten || hasFreshPdf()) {
    if (!pdfWritten) {
      console.log(`Generated ${resumePdf}`);
    }
    finish(0);
  }

  console.error(`Chrome exited before generating PDF. Code: ${code ?? "none"}, signal: ${signal ?? "none"}`);
  finish(code ?? 1);
});

setTimeout(() => {
  if (hasFreshPdf()) {
    markWritten();
    return;
  }

  chrome.kill("SIGTERM");
  console.error("Timed out while generating resume PDF.");
  finish(1);
}, 20000).unref();
