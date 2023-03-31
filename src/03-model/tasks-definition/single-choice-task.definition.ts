import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  validateSync,
} from 'class-validator';
import { BaseTaskDefinition, TaskTypesEnum } from './base-task.definition';

export type OptionType = {
  text: string;
  checked: boolean;
};

export class SingleChoiceQuestion {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  statement: string;
  @IsNotEmpty({
    each: true,
  })
  options: OptionType;

  constructor(statement: string, options: OptionType) {
    this.statement = statement;
    this.options = options;
    this.validator();
  }

  public clone() {
    return new SingleChoiceQuestion(this.statement, this.options);
  }

  private validator() {
    const validation = validateSync(this);
    if (validation.length) {
      const errors =
        validation
          .map(({ constraints }) => Object.values(constraints).join('; '))
          .join('; ') + ';';

      throw new Error(`TaskQuestion Errors: ${errors}`);
    }

    return;
  }
}

export class SingleChoiceTaskDefinition extends BaseTaskDefinition<SingleChoiceQuestion> {
  constructor(id: string, question: any) {
    super(id, question, TaskTypesEnum.SINGLE_CHOICE);
  }
}
