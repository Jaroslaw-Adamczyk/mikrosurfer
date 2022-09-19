import express from 'express';
import jsonRouter from 'express-json-rpc-router';
import * as browserObject from './browser';
import { pageScraper } from './pageScraper';
import { config } from './config.js';

const app = express();

const controller = {
  async getContent({ searchKey }) {
    const browserInstance = browserObject.startBrowser();
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

async function scrapeAll(browserInstance, searchKey) {
  let browser;
  let websiteContent;
  try {
    browser = await browserInstance;
    websiteContent = await pageScraper.scraper(browser, searchKey);
    return websiteContent;
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err);
  }
}
