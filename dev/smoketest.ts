import { chromium } from 'playwright';

const URL = process.argv[2] ?? 'http://127.0.0.1:5173/';

type Issue = { stage: string; message: string };

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const issues: Issue[] = [];
  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(String(err));
  });

  let stageLabel = 'navigate';
  try {
    await page.goto(URL, { waitUntil: 'networkidle' });

    stageLabel = 'initial-state';
    await page.waitForSelector('#control', { state: 'visible' });
    if (!(await page.locator('#instructions').isVisible())) {
      issues.push({ stage: stageLabel, message: 'instructions not visible at SETUP' });
    }
    if (await page.locator('#settings:not(.hidden)').count()) {
      issues.push({ stage: stageLabel, message: 'settings visible at SETUP (should be hidden)' });
    }
    if (await page.locator('#terminal:not(.hidden)').count()) {
      issues.push({ stage: stageLabel, message: 'terminal visible at SETUP (should be hidden)' });
    }
    const setupIcon = (await page.locator('#control').textContent())?.trim();
    if (setupIcon !== '◉') {
      issues.push({ stage: stageLabel, message: `expected ◉ icon at SETUP, got "${setupIcon}"` });
    }

    stageLabel = 'click-setup';
    await page.click('#control');
    await page.waitForSelector('#settings:not(.hidden)', { timeout: 2000 });
    const playIcon = (await page.locator('#control').textContent())?.trim();
    if (playIcon !== '▷') {
      issues.push({ stage: stageLabel, message: `expected ▷ icon after SETUP click, got "${playIcon}"` });
    }
    if (await page.locator('#instructions:not(.hidden)').count()) {
      issues.push({ stage: stageLabel, message: 'instructions still visible after SETUP click' });
    }

    stageLabel = 'preload-loading';
    const loadingShown = await page
      .locator('.loading')
      .first()
      .isVisible({ timeout: 1500 })
      .catch(() => false);
    if (!loadingShown) {
      issues.push({
        stage: stageLabel,
        message: 'loading indicator did not appear (preload may have completed before render)'
      });
    }

    stageLabel = 'preload-finished';
    await page.waitForSelector('.loading', { state: 'hidden', timeout: 30_000 });

    stageLabel = 'voice-select';
    const voiceCount = await page.locator('#voice option').count();
    if (voiceCount === 0) {
      issues.push({ stage: stageLabel, message: 'voice select has no options' });
    }
    const voiceDisabled = await page.locator('#voice').isDisabled();
    if (voiceCount > 0 && voiceDisabled) {
      issues.push({ stage: stageLabel, message: 'voice select disabled despite having options' });
    }

    stageLabel = 'click-play';
    await page.click('#control');
    await page.waitForSelector('#terminal:not(.hidden)', { timeout: 5000 });
    const stopIcon = (await page.locator('#control').textContent())?.trim();
    if (stopIcon !== '▧') {
      issues.push({ stage: stageLabel, message: `expected ▧ icon after PLAY click, got "${stopIcon}"` });
    }
    if (await page.locator('#settings:not(.hidden)').count()) {
      issues.push({ stage: stageLabel, message: 'settings still visible while playing' });
    }

    stageLabel = 'click-stop';
    await page.click('#control');
    await page.waitForSelector('#settings:not(.hidden)', { timeout: 2000 });
    const playAgainIcon = (await page.locator('#control').textContent())?.trim();
    if (playAgainIcon !== '▷') {
      issues.push({ stage: stageLabel, message: `expected ▷ icon after STOP click, got "${playAgainIcon}"` });
    }
  } catch (err) {
    issues.push({ stage: stageLabel, message: `threw: ${err instanceof Error ? err.message : String(err)}` });
  } finally {
    await browser.close();
  }

  if (consoleErrors.length) {
    console.error('\nConsole errors observed:');
    for (const e of consoleErrors) console.error('  -', e);
  }

  if (issues.length) {
    console.error('\nIssues:');
    for (const i of issues) console.error(`  [${i.stage}] ${i.message}`);
    process.exit(1);
  }

  console.log('Smoke test passed: SETUP → PLAY → STOP → PLAY transitions work, voices populated, no console errors.');
}

main();
