import { BaseAnswerDefinition } from 'src/03-model/answers-definition/base-answer.definition';
import { TaskTypesEnum } from 'src/03-model/tasks-definition/base-task.definition';
import { v4 as uuidv4 } from 'uuid';

describe('#AnswerDefinition - Unit Test', () => {
  test('Should create a valid instance of AnswerDefinition when valid params are given', () => {
    const answer = new BaseAnswerDefinition(uuidv4(), '1', TaskTypesEnum.TEXT, {
      answerContent: 'Oi',
    });

    expect(answer).toEqual(answer.clone());
    console.log(answer); // Visualization
  });

  test('should throw an error when given invalid params', () => {
    const error = new Error(
      'AnswerErrors: id should not be empty; id must be a UUID; taskId should not be empty; answerType must be one of the following values: 1, 2, 3; answerContent must be an object; answerContent should not be empty;',
    );
    expect(() => new BaseAnswerDefinition('', '', 5, '')).toThrow(error);
    console.log(error); //Visuazlization
  });
});
