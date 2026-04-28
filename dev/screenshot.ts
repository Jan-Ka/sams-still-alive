import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as wait } from 'node:timers/promises';
import { chromium } from 'playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HOST = '127.0.0.1';
const PORT = 4173;
const BASE = '/sams-still-alive';
const PREVIEW_URL = `http://${HOST}:${PORT}${BASE}/`;
const OUTPUT = join(ROOT, 'doc', 'app_screenshot.png');

const APP_WIDTH = 1280;
const APP_HEIGHT = 800;
const TITLE_HEIGHT = 32;
const PADDING = 24;

const VIEWPORT = {
  width: APP_WIDTH + PADDING * 2,
  height: APP_HEIGHT + TITLE_HEIGHT + PADDING * 2
};

function wrapperHtml(targetUrl: string): string {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; height: 100%; background: transparent; }
  body { padding: ${PADDING}px; display: flex; }
  .window {
    flex: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid #ffbb00;
    border-radius: 10px;
    overflow: hidden;
  }
  .titlebar {
    height: ${TITLE_HEIGHT}px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    border-bottom: 1px solid #ffbb00;
  }
  .dot {
    width: 10px; height: 10px; border-radius: 50%;
    border: 1px solid #ffbb00;
  }
  iframe {
    flex: 1;
    width: 100%;
    border: 0;
    display: block;
    background: #282828;
  }
</style>
</head>
<body>
  <div class="window">
    <div class="titlebar">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>
    <iframe src="${targetUrl}"></iframe>
  </div>
</body>
</html>`;
}

async function waitForServer(url: string, timeoutMs = 30_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not ready yet
    }
    await wait(250);
  }
  throw new Error(`Preview server not reachable at ${url} after ${timeoutMs}ms`);
}

async function main() {
  console.log(`Starting preview server at ${PREVIEW_URL}`);
  const preview = spawn('pnpm', ['preview', '--host', HOST, '--port', String(PORT)], {
    cwd: ROOT,
    stdio: 'pipe',
    detached: false
  });
  preview.stderr.on('data', (chunk) => process.stderr.write(chunk));

  try {
    await waitForServer(PREVIEW_URL);
    console.log('Server up — capturing screenshot');

    const browser = await chromium.launch();
    try {
      const page = await browser.newPage({
        viewport: VIEWPORT,
        deviceScaleFactor: 1
      });
      await page.setContent(wrapperHtml(PREVIEW_URL), { waitUntil: 'load' });
      const frame = page.frames().find((f) => f.url().startsWith(PREVIEW_URL));
      if (frame) {
        await frame.waitForLoadState('networkidle');
      }
      await page.screenshot({ path: OUTPUT, fullPage: false, omitBackground: true });
    } finally {
      await browser.close();
    }

    console.log(`Wrote ${OUTPUT}`);
  } finally {
    preview.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
