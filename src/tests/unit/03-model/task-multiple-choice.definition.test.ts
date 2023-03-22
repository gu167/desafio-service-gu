import {
  MultipleChoiceTaskDefinition,
  MultipleChoiceQuestion,
} from 'src/03-model/tasks-definition/multiple-choice-task.definition';
import { v4 as uuidv4 } from 'uuid';

describe('#TaskDefinition - Unit Test', () => {
  test('should create a valid instance of MultipleChoiceTaskDefinition when valid params are given', () => {
    const multipleChoiceQuestionDefinition = new MultipleChoiceQuestion(
      'Enunciado',
      [
        {
          text: 'PerguntaUm',
          checked: false,
        },
        {
          text: 'PerguntaDois',
          checked: true,
        },
        {
          text: 'PerguntaTres',
          checked: false,
        },
        {
          text: 'PerguntaQuatro',
          checked: true,
        },
      ],
    );
    const task = new MultipleChoiceTaskDefinition(
      uuidv4(),
      multipleChoiceQuestionDefinition,
    );
    expect(task).toEqual(task.clone());
    console.log(task); //Visualization
  });

  test('should throw an error when params are invalid', () => {
    const error = new Error(
      'Task Errors:id must be a UUID; question must be an object; question should not be empty;',
    );
    expect(() => new MultipleChoiceTaskDefinition('', '')).toThrow(error);
    console.log(error); //Visuazlization
  });
});
