
/*
*
*
*@name okc
*
*
* @desc Basic session management for okc
* 
*
*
*
*/

const puppeteer = require('puppeteer');
var fs = require('fs');
var fileExists;
var step;

const cookiesPath = 'jehrilicookies.txt';

 
fs.exists(cookiesPath, function(exists) {
    console.log("file exists ? " + exists);
    fileExists=exists;
});

console.log('Starting');
(async () => {

    console.log('started');
    // Due to the date format month should be -1 so for 1 april it should be 2019 ,3,1
    var username = "usernam"
    var password = "password"




    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    if (fileExists) {
        console.log('File exists');
        
            const content = fs.readFileSync(cookiesPath);
            const cookiesArr = JSON.parse(content);
            if (cookiesArr.length !== 0) {
                for (let cookie of cookiesArr) {
                    await page.setCookie(cookie)
                }
                console.log('Session has been loaded in the browser')
            }
        
        await page.goto('https://www.okcupid.com/home', { "waitUntil": "load" });
        console.log("------------------------------------------------finishing the if statement")
        await page.waitForSelector('#navigation > div.nav-left > ul > li:nth-child(1) > a')
        

    } else {
        console.log("file doesnt exist");
        await page.goto('https://www.okcupid.com', { "waitUntil": "load" });
        await page.click('#root > span > div > div > div.splashdtf-content > div.splashdtf-header > div.splashdtf-header-signin > a')
        await page.waitForSelector('#root > span > div > div > div.login2017-container > span > div > form > div.login2017-fields > div:nth-child(1) > span.oknf-typable-wrapper.oknf-typable-wrapper--text > input');

        await page.type('#root > span > div > div > div.login2017-container > span > div > form > div.login2017-fields > div:nth-child(1) > span.oknf-typable-wrapper.oknf-typable-wrapper--text > input', username);
        await page.type('#root > span > div > div > div.login2017-container > span > div > form > div.login2017-fields > div:nth-child(2) > span.oknf-typable-wrapper.oknf-typable-wrapper--password > input', password)
        await page.click('#root > span > div > div > div.login2017-container > span > div > form > div.login2017-actions > input')
        await page.waitForSelector('#navigation > div.nav-left > ul > li:nth-child(1) > a')
        console.log("------------------------------------------------finishing the else statement")
        const cookiesObject = await page.cookies()
        fs.writeFileSync(cookiesPath, JSON.stringify(cookiesObject));
        console.log('Session has been saved to ' + cookiesPath);
    }

    
    await page.waitForSelector('#navigation > div.nav-left > ul > li:nth-child(2) > a')
    await page.click('#navigation > div.nav-left > ul > li:nth-child(2) > a')
    await page.waitForSelector('#quickmatch-wrapper > div > div > span > div > div.qm-content > div > div.qm-content-stackholder > span > div > div > div > div.qmcard-top > div.cardactions > button.cardactions-action.cardactions-action--like')
    console.log('Starting the swipes ...........')
    for (step = 0; step < 100; step++) {
        await page.click('#quickmatch-wrapper > div > div > span > div > div.qm-content > div > div.qm-content-stackholder > span > div > div > div > div.qmcard-top > div.cardactions > button.cardactions-action.cardactions-action--like')
        await page.waitFor(100)
        console.log('swipe number .'+step)
    }
    


    await page.waitFor(5000)
    await browser.close()

})()











