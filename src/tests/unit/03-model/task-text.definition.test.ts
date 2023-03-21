import {
  TextTaskDefinition,
  TextQuestion,
} from 'src/03-model/text-task.definition';
import { v4 as uuidv4 } from 'uuid';

describe('#TaskDefinition - Unit Test', () => {
  test('should create a valid instance of TaskDefinition when valid params are given', () => {
    const textQuestionDefinition = new TextQuestion('statement');
    const task = new TextTaskDefinition(uuidv4(), textQuestionDefinition);
    expect(task).toEqual(task.clone());
  });

  test('should throw an error when params are invalid', () => {
    const error = new Error(
      'Task Errors:id must be a UUID; question must be an object; question should not be empty;',
    );
    expect(() => new TextTaskDefinition('', '')).toThrow(error);
  });
});
