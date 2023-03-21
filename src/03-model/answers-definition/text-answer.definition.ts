import { BaseAnswerDefinition } from './base-answer.definition';
import { TaskTypesEnum } from '../tasks-definition/base-task.definition';
import { IsNotEmpty, MinLength, validateSync } from 'class-validator';

export class TextAnswer {
  @IsNotEmpty()
  @MinLength(1)
  answerContent: string;

  constructor(answerContent: string) {
    this.answerContent = answerContent;
  }

  public validator() {
    const validation = validateSync(this);

    if (validation.length) {
      const errors =
        validation
          .map(({ constraints }) => Object.values(constraints).join('; '))
          .join('; ') + ';';

      throw new Error(`AnswerErrors: ${errors}`);
    }
  }
  public clone() {
    return new TextAnswer(this.answerContent);
  }
}
export class TextAnswerDefinition extends BaseAnswerDefinition<TextAnswer> {
  constructor(id: string, taskId: string, answerContent: any) {
    super(id, taskId, TaskTypesEnum.TEXT, answerContent);
  }
}
