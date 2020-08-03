const puppeteer = require('puppeteer');
const { title } = require('process');


async function foxScrape(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('body');

    var headlines = await page.evaluate(() => {
        let articles = document.body.querySelectorAll('div.collection.collection-spotlight > div > article');
        headlineArray = [];

        articles.forEach((item) => {
            title = item.querySelector('h2').innerText;
            link = item.querySelector('a').href;
            headlineArray.push({title: title, link: link});
        });

        return headlineArray;
      });

    console.log(headlines)
    browser.close()

}

async function nytScrape(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('body');

    var headlines = await page.evaluate(() => {
        let articles = document.body.querySelectorAll('.assetWrapper');
        headlineArray = [];

        articles.forEach((item) => {
            try{
                title = item.querySelector('h2').innerText;
                link = item.querySelector('a').href;
                headlineArray.push({title: title, link: link});
            }
            catch (err){

            }
        });

        return headlineArray.slice(3,9);
      });

    console.log(headlines)
    browser.close()

}

foxScrape("https://www.foxnews.com/");
nytScrape("https://www.nytimes.com/");
