import { AnswerObjectMother } from '../_model/answers.object-mother';

describe('#SingleChoiceAnswerDefinition - Unit Test', () => {
  test('Should create a valid instance of SingleChoiceAnswerDefinition when valid params are given', () => {
    const singleChoiceAnswer = AnswerObjectMother.validSingleChoiceAnswer();

    expect(singleChoiceAnswer).toEqual(singleChoiceAnswer.clone());
  });

  test('should throw an error when given invalid params', () => {
    const error = new Error(
      'AnswerErrors: id should not be empty; id must be a UUID; taskId should not be empty; taskId must be a UUID; answerType must be one of the following values: 1, 2, 3; answerContent must be an object; answerContent should not be empty;',
    );
    expect(() => AnswerObjectMother.invalidSingleChoiceAnswer()).toThrow(error);
  });
});
