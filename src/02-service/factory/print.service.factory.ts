import { PrintWebsiteService } from '../print-website.service';

export class PrintWebsiteFactory {
  static async getInstance(): Promise<PrintWebsiteService> {
    const service = new PrintWebsiteService();
    return service;
  }
}
