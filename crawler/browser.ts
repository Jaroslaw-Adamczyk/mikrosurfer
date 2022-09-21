/* eslint-disable no-console */
import puppeteer from 'puppeteer';

async function startBrowser(): Promise<puppeteer.Browser> {
  return await puppeteer.launch({
    headless: false,
    args: ['--disable-setuid-sandbox'],
    ignoreHTTPSErrors: true,
  });
}

async function closeBrowser(
  browser: Promise<puppeteer.Browser>
): Promise<void> {
  await (await browser).close();
}

export { startBrowser, closeBrowser };
