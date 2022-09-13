const express           = require('express');
const jsonRouter        = require('express-json-rpc-router');
const browserObject     = require('./browser');
const pageScraper       = require('./pageScraper');
const config            = require('./config.js');

const app = express();

const controller = {
    async getContent({ searchKey }) {
        let browserInstance = browserObject.startBrowser();
        console.log(`lscraper looking for ${searchKey}`);
        let result = await scrapeAll(browserInstance, searchKey);
        browserObject.closeBrowser(browserInstance);
        return result;
    }
}

app.use(express.json())
app.use(jsonRouter({ methods: controller }))
app.listen(config.app.port, () => console.log(`Service started on port: ${config.app.port}`))

async function scrapeAll(browserInstance, searchKey){
	let browser;
    let websiteContent;
	try{
		browser = await browserInstance;
        websiteContent =  await pageScraper.scraper(browser, searchKey);	
        return websiteContent;
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

