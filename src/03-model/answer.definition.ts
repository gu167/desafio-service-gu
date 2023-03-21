import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsUUID,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export class AnswerDefinition {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsObject()
  answerContent: any;

  @IsInt()
  @Min(1)
  @Max(3)
  taskId: number;

  constructor(id: string, answerContent: any, typeAnswer: number) {
    this.id = id;
    this.answerContent = answerContent;
    this.taskId = typeAnswer;
    this.validator();
  }
  public clone() {
    return new AnswerDefinition(this.id, this.answerContent, this.taskId);
  }
  private validator() {
    const validation = validateSync(this);

    if (validation.length) {
      const errors =
        validation
          .map(({ constraints }) => Object.values(constraints).join('; '))
          .join('; ') + ';';

      throw new Error(`AnswerErrors: ${errors}`);
    }
  }
}
