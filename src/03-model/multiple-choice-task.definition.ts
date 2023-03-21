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

export class MultipleChoiceQuestion {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  statement: string;
  @IsNotEmpty({
    each: true,
  })
  options: OptionType[];

  constructor(statement: string, options: OptionType[]) {
    this.statement = statement;
    this.options = options;
    this.validator();
  }

  public clone() {
    return new MultipleChoiceQuestion(this.statement, this.options);
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

export class MultipleChoiceTaskDefinition extends BaseTaskDefinition<MultipleChoiceQuestion> {
  constructor(id: string, question: any) {
    super(id, question, TaskTypesEnum.MULTIPLE_CHOICE);
  }
}
