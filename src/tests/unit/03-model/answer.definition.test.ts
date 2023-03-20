import { AnswerDefinition } from 'src/03-model/answer.definition';
import { v4 as uuidv4 } from 'uuid';

describe('#AnswerDefinition - Unit Test', () => {
  test('Should create a valid instance of AnswerDefinition when valid params are given', () => {
    const answer = new AnswerDefinition(uuidv4(), { answerContent: 'Oi' }, 1);

    expect(answer).toEqual(answer.clone());
  });

  test('should throw an error when given invalid params', () => {
    const error = new Error(
      'AnswerErrors: id must be a UUID; answerContent must be an object; answerContent should not be empty; typeAnswer must not be greater than 3;',
    );
    expect(() => new AnswerDefinition('', '', 5)).toThrow(error);
  });
});
