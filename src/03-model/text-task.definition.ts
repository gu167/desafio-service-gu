import { IsString, MaxLength, MinLength, validateSync } from 'class-validator';
import { BaseTaskDefinition, TaskTypesEnum } from './base-task.definition';

export class TextQuestion {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  statement: string;
  constructor(statement: string) {
    this.statement = statement;
    this.validator();
  }

  public clone() {
    return new TextQuestion(this.statement);
  }

  private validator() {
    const validation = validateSync(this);

    if (validation.length) {
      const errors =
        validation
          .map(({ constraints }) => Object.values(constraints).join('; '))
          .join('; ') + ';';

      throw new Error(`User Errors: ${errors}`);
    }

    return;
  }
}

export class TextTaskDefinition extends BaseTaskDefinition<TextQuestion> {
  constructor(id: string, question: any) {
    super(id, question, TaskTypesEnum.TEXT);
  }
}
