import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsUUID,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import { TaskTypesEnum } from '../tasks-definition/base-task.definition';

export class BaseAnswerDefinition<T> {
  @IsUUID()
  @IsNotEmpty()
  id: string;
  @Min(1, { message: 'Value under answer range, must match TaskType' })
  @Max(3, { message: 'Value over answer range, must match TaskType' })
  @IsNotEmpty()
  taskId: string;
  @IsEnum(TaskTypesEnum)
  answerType: number;
  @IsNotEmpty()
  @IsObject()
  answerContent: T;

  constructor(
    id: string,
    taskId: string,
    answerType: TaskTypesEnum,
    answerContent: any,
  ) {
    this.id = id;
    this.taskId = taskId;
    this.answerType = answerType;
    this.answerContent = answerContent;
    this.validator();
  }
  public clone() {
    return new BaseAnswerDefinition(
      this.id,
      this.taskId,
      this.answerType,
      this.answerContent,
    );
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
