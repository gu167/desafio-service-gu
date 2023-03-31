import { TaskDataBuilder } from './task.data-builder';

export class TaskObjectMother {
  public static validTextTask() {
    return TaskDataBuilder.aTextTask().build();
  }

  public static invalidTextTask() {
    return TaskDataBuilder.aTextTask().withInvalidParams().build();
  }

  public static validSingleChoiceTask() {
    return TaskDataBuilder.aSingleChoiceTask().build();
  }

  public static invalidSingleChoiceTask() {
    return TaskDataBuilder.aSingleChoiceTask().withInvalidParams().build();
  }

  public static validMultipleChoiceTask() {
    return TaskDataBuilder.aMultipleChoiceTask().build();
  }

  public static invalidMultipleChoiceTask() {
    return TaskDataBuilder.aMultipleChoiceTask().withInvalidParams().build();
  }
}
