import {
  SingleChoiceTaskDefinition,
  SingleChoiceQuestion,
} from 'src/03-model/tasks-definition/single-choice-task.definition';
import { v4 as uuidv4 } from 'uuid';

describe('#TaskDefinition - Unit Test', () => {
  test('should create a valid instance of SingleChoiceTaskDefinition when valid params are given', () => {
    const singleChoiceQuestionDefinition = new SingleChoiceQuestion(
      'Enunciado',
      [
        {
          text: 'PerguntaUm',
          checked: false,
        },
      ],
    );
    const task = new SingleChoiceTaskDefinition(
      uuidv4(),
      singleChoiceQuestionDefinition,
    );
    expect(task).toEqual(task.clone());
    console.log(task); //Visuazlization
  });

  test('should throw an error when params are invalid', () => {
    const error = new Error(
      'Task Errors:id must be a UUID; question must be an object; question should not be empty;',
    );
    expect(() => new SingleChoiceTaskDefinition('', '')).toThrow(error);
  });
});
