import { AnswerDataBuilder } from './answer.data-builder';

export class AnswerObjectMother {
  public static validTextAnswer() {
    return AnswerDataBuilder.aTextAnswer().build();
  }

  public static invalidTextAnswer() {
    return AnswerDataBuilder.aTextAnswer().withInvalidParams().build();
  }

  public static validSingleChoiceAnswer() {
    return AnswerDataBuilder.aSingleChoiceAnswer().build();
  }

  public static invalidSingleChoiceAnswer() {
    return AnswerDataBuilder.aSingleChoiceAnswer().withInvalidParams().build();
  }
  public static validMultipleChoiceAnswer() {
    return AnswerDataBuilder.aMultipleChoiceAnswer().build();
  }
  public static invalidMultipleChoiceAnswer() {
    return AnswerDataBuilder.aMultipleChoiceAnswer()
      .withInvalidParams()
      .build();
  }
}
