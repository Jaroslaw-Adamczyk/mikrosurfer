const config = require('./config.js')

const scraperObject = {
	async scraper(browser, key){
		let page = await browser.newPage();
		console.log(`Navigating to ${config.scraper.searchEngineUrl}... /n Looking for key: ${key}`);
		await page.goto(config.scraper.searchEngineUrl);
		await page.waitForSelector("input[name=q]");
        await page.$eval('input[name=q]', (el, updatedValue) => el.value = updatedValue, key);
        try{
            await page.waitForSelector(config.scraper.cookieApproveButtonSelector,{timeout: 100 });
            await page.click(config.scraper.cookieApproveButtonSelector);
        }
        catch
        {
            console.log('no cookies window present');
        }
        const button = await page.$(config.scraper.inputSearchSelector);
        await button.evaluate(b => b.click());
        page.waitForNavigation();
        await page.waitForSelector(config.scraper.recordSelector);

        const nameLinkList = await page.$$eval(
            config.scraper.recordSelector,
            (records => records.map(record => {
                const a = record.querySelector('a');
                const h3 = record.querySelector('h3');
                return {
                    name: h3.innerText,
                    link: a.href
                };
            }))
        );

        const websiteContent = await Promise.all(nameLinkList.map( async(record) =>{
            let page = await browser.newPage();
            await page.setRequestInterception(true);
            page.on('request', (req) => {
                if(config.scraper.blockResourceType.includes(req.resourceType())){
                    req.abort();
                }
                else {
                    req.continue();
                }
                });
            await page.goto(record.link);
            const pageContent = await page.content();
            page.close();
            return pageContent;
        }));
        return websiteContent;
	}
}

module.exports = scraperObject;