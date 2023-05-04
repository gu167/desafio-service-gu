import { WebsiteDataBuilder } from './website.object.data-builder';

// tod0s os metodos sao estaticos
export class WebsiteObjectMother {
  public static validWebsite() {
    return WebsiteDataBuilder.aWebsite().build();
  }

  public static invalidWebsite() {
    return WebsiteDataBuilder.aWebsite().withInvalidParams().build();
  }
}
