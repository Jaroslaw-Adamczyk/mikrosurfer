/* eslint-disable no-console */
import express from 'express';
import puppeteer from 'puppeteer';
import jsonRouter from 'express-json-rpc-router';
import * as browserObject from './browser';
import { pageScraper } from './pageScraper';
import { config } from './config';

const app = express();

const controller = {
  async getContent({ searchKey }: { searchKey: string }) {
    const browserInstance: Promise<puppeteer.Browser> =
      browserObject.startBrowser();
    console.log(`lscraper looking for ${searchKey}`);
    const result = await scrapeAll(browserInstance, searchKey);
    browserObject.closeBrowser(browserInstance);
    return result;
  },
};

app.use(express.json());

app.use(jsonRouter({ methods: controller }));
app.listen(config.app.port, () =>
  console.log(`Service started on port: ${config.app.port}`)
);

async function scrapeAll(
  browserInstance: Promise<puppeteer.Browser>,
  searchKey: string
) {
  return await pageScraper.scraper(browserInstance, searchKey);
}
