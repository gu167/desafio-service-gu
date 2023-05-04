import { WebsiteObjectMother } from 'src/tests/unit/_model/website.object-mother';
import { PrintWebsiteService } from 'src/02-service/print-website.service';

describe('#Printscreen Service - Integration Tests', () => {
  test('#printScreenWebsite - should return an printscreen of website ', async () => {
    const downloadPath = 'src/tests/img';
    const webSitioObj = WebsiteObjectMother.validWebsite();
    const newSvc = new PrintWebsiteService();
    const printImg = await newSvc.printScreenWebsite(
      webSitioObj.url,
      downloadPath,
    );

    expect(webSitioObj).toBeTruthy();
    expect(printImg).toBeTruthy();
  });
});
