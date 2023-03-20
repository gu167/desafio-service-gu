import {
  IsNotEmpty,
  IsUUID,
  Max,
  Min,
  validateSync,
  IsInt,
  IsObject,
} from 'class-validator';

export enum TaskTypesEnum {
  TEXT = 1,
  SINGLE_CHOICE = 2,
  MULTIPLE_CHOICE = 3,
}

export class TaskDefinition {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsObject()
  question: any;

  @IsInt()
  @Min(1, { message: 'Value under type range' })
  @Max(3, { message: 'Value over type range' })
  typeId: number;

  constructor(id: string, question: any, typeId: number) {
    this.id = id;
    this.question = question;
    this.typeId = typeId;
    this.validator();
  }
  public clone() {
    return new TaskDefinition(this.id, this.question, this.typeId);
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
