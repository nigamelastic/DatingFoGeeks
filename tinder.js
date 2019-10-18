const puppeteer = require('puppeteer');

var fs = require('fs');
var fileExists;
var step;

const cookiesPath = 'tindercookies.txt';

 
fs.exists(cookiesPath, function(exists) {
    console.log("file exists ? " + exists);
    fileExists=exists;
});
(async () => {
   
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const context = browser.defaultBrowserContext();
    context.overridePermissions("https://www.facebook.com", ["geolocation", "notifications"])

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
        
        await page.goto('https://tinder.com/app/recs', { "waitUntil": "load" });
        console.log("------------------------------------------------finishing the if statement")
        }
        else{
            await page.goto('https://tinder.com', { "waitUntil": "load" });
            await page.waitFor(30000);
            console.log("------------------------------------------------finishing the else statement")
        const cookiesObject = await page.cookies()
        fs.writeFileSync(cookiesPath, JSON.stringify(cookiesObject));
        console.log('Session has been saved to ' + cookiesPath);

        }

})()
