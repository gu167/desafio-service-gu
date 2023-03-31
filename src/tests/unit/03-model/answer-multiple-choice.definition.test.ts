import { AnswerObjectMother } from '../_model/answers.object-mother';
describe('#TextAnswerDefinition - Unit Test', () => {
  test('Should create a valid instance of MultipleChoiceAnswerDefinition when valid params are given', () => {
    const multipleChoiceAnswer = AnswerObjectMother.validMultipleChoiceAnswer();

    expect(multipleChoiceAnswer).toEqual(multipleChoiceAnswer.clone());
  });

  test('should throw an error when given invalid params', () => {
    const error = new Error(
      'AnswerErrors: id should not be empty; id must be a UUID; taskId should not be empty; taskId must be a UUID; answerType must be one of the following values: 1, 2, 3; answerContent must be an object; answerContent should not be empty;',
    );
    expect(() => AnswerObjectMother.invalidMultipleChoiceAnswer()).toThrow(
      error,
    );
  });
});
