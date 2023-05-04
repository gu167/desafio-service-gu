import { IsNotEmpty, IsString, IsUUID, validateSync } from 'class-validator';

export class WebsiteObjectDefinition {
  @IsUUID()
  id: any;
  @IsString()
  @IsNotEmpty()
  url: string;

  constructor(id: string, url: string) {
    this.id = id;
    this.url = url;
    this.validator();
  }

  public clone() {
    return new WebsiteObjectDefinition(this.id, this.url);
  }

  private validator() {
    const validation = validateSync(this);

    if (validation.length) {
      const errors =
        validation
          .map(({ constraints }) => Object.values(constraints).join('; '))
          .join('; ') + ';';

      throw new Error(`Website Errors: ${errors}`);
    }

    return;
  }
}
