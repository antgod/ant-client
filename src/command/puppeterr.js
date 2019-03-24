const puppeteer = require('puppeteer');
// const devices = require('puppeteer/DeviceDescriptors');
// const iPhone6 = devices['iPhone 6'];

(async () => {
  const browser = await puppeteer.launch();
	const page = await browser.newPage();
	
	page.on('request', request => {
		
		console.log(request.resourceType());
	});
	await page.goto('https://www.baidu.com');
	// console.log('===为了看清楚，傲娇地等两秒===');
	// await page.waitFor(2000);
	await page.tap('#su');
	// await page.screenshot({path: 'example.png'});
	


  await browser.close();
})();