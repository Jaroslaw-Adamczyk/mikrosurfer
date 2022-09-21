/* eslint-disable no-console */
import { config } from './config';
import puppeteer from 'puppeteer';

const scraperObject = {
  async scraper(browser: Promise<puppeteer.Browser>, key: string) {
    const page = await (await browser).newPage();
    console.log(
      `Navigating to ${config.scraper.searchEngineUrl}... /n Looking for key: ${key}`
    );
    await page.goto(config.scraper.searchEngineUrl);
    //maybe do smth with input?
    await page.waitForSelector('input[name=q]');
    await page.$eval(
      'input[name=q]',
      (el: Element, updatedValue: string) =>
        ((el as HTMLInputElement).value = updatedValue),
      key
    );
    await page.waitForSelector(config.scraper.cookieApproveButtonSelector, {
      timeout: 100,
    });
    await page.click(config.scraper.cookieApproveButtonSelector);

    const button = await page.$(config.scraper.inputSearchSelector);
    if (!button) {
      throw new Error("The element wasn't found");
    }
    await button.evaluate((b) => (b as HTMLButtonElement).click());
    await page.waitForNavigation();
    await page.waitForSelector(config.scraper.recordSelector);

    const nameLinkList: {
      name: string;
      link: string;
    }[] = await page.$$eval(config.scraper.recordSelector, (records) =>
      records.map((record) => {
        const a = record.querySelector('a');
        const h3 = record.querySelector('h3');
        return {
          name: h3 !== null ? h3.innerText : '',
          link: a !== null ? a.href : '',
        };
      })
    );

    const websiteContent = await Promise.all(
      nameLinkList.map(async (record) => {
        const page = await (await browser).newPage();
        await page.setRequestInterception(true);
        page.on('request', (req) => {
          if (config.scraper.blockResourceType.includes(req.resourceType())) {
            req.abort();
          } else {
            req.continue();
          }
        });
        await page.goto(record.link);
        const pageContent = await page.content();
        page.close();
        return pageContent;
      })
    );
    return websiteContent;
  },
};

export { scraperObject as pageScraper };
