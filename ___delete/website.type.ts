import { WebsiteObjectDefinition } from 'src/03-model/website.definition';
import { BaseItem, TypeEnum } from './items/item';

const WEBSITE_PREFIX = '##PAGE'; // pk prefix
const URL_PREFIX = '##PATH'; // sk prefix

export class WebsiteType extends BaseItem<WebsiteObjectDefinition> {
  public static Pk(uuid: string) {
    return `${WEBSITE_PREFIX}#${uuid}`;
  }
  public static Sk(url: string) {
    return `${URL_PREFIX}#${url}`;
  }
  public static From(website: WebsiteObjectDefinition) {
    const pk = this.Pk(website.id);
    const sk = this.Sk(website.url);
    return { pk, sk, data: website, type: TypeEnum.WEBSITE };
  }
}
