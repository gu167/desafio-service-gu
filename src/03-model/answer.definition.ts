import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsUUID,
  validateSync,
} from 'class-validator';

export class AnswerDefinition {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsObject()
  answerContent: object;

  @IsInt()
  typeAnswer: number;

  constructor(id: string, answerContent: object, typeAnswer: number) {
    this.id = id;
    this.answerContent = answerContent;
    this.typeAnswer = typeAnswer;
    this.validator();
  }
  public clone() {
    return new AnswerDefinition(this.id, this.answerContent, this.typeAnswer);
  }
  private validator() {
    const validation = validateSync(this);

    if (validation.length) {
      const errors =
        validation
          .map(({ constraints }) => Object.values(constraints).join('; '))
          .join('; ') + ';';

      throw new Error(`Task Errors:${errors}`);
    }
  }
}
