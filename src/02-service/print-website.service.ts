import puppeteer from 'puppeteer';
export class PrintWebsiteService {
  async printScreenWebsite(pageUrl: string, imgStoragePath: string) {
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto(pageUrl);

    const imagePrint = await page.screenshot({
      path: imgStoragePath,
      fullPage: true,
      encoding: 'binary',
    });
    await browser.close().then(() => {
      return imagePrint;
    });
  }
}
