import { TaskDefinition } from 'src/03-model/task.definition';
import { v4 as uuidv4 } from 'uuid';

describe('#TaskDefinition - Unit Test', () => {
  test('should create a valid instance of TaskDefinition when valid params are given', () => {
    const task = new TaskDefinition(uuidv4(), { question: 'Question' }, 1);

    expect(task).toEqual(task.clone());
  });

  test('should throw an error when params are invalid', () => {
    const error = new Error(
      'Task Errors:id must be a UUID; question must be an object; question should not be empty; Value over type range;',
    );
    expect(() => new TaskDefinition('', '', 4)).toThrow(error);
  });
});
