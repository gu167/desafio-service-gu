import { TaskObjectMother } from '../_model/task.object-mother';

describe('#TaskDefinition - Unit Test', () => {
  test('should create a valid instance of TextTaskDefinition when valid params are given', () => {
    const textTask = TaskObjectMother.validTextTask(); // Instancia a entidade válida

    expect(textTask).toEqual(textTask.clone());
  });

  test('should throw an error when params are invalid', () => {
    const error = new Error(
      'Task Errors:id must be a UUID; question must be an object; question should not be empty; typeId must be one of the following values: 1, 2, 3; Value under type range;',
    );

    expect(() => TaskObjectMother.invalidTextTask()).toThrow(error);
  });
});
