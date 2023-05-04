import { v4 as uuidv4 } from 'uuid';
import { WebsiteObjectDefinition } from 'src/03-model/website-object.definition';

export class WebsiteDataBuilder {
  id: string;
  url: string;

  constructor() {
    this.id = uuidv4();
    this.url = 'https://xuxaxperience.com.br/';
  }

  static aWebsite() {
    return new WebsiteDataBuilder();
  }

  withInvalidParams() {
    this.id = '';
    this.url = '';
    return this;
  }

  build() {
    return new WebsiteObjectDefinition(this.id, this.url);
  }
}
