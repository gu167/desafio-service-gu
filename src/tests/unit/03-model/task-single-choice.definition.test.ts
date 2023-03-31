import { TaskObjectMother } from '../_model/task.object-mother';

describe('#SingleTaskDefinition - Unit Test', () => {
  test('should create a valid instance of SingleChoiceTaskDefinition when valid params are given', () => {
    const singleChoiceTask = TaskObjectMother.validSingleChoiceTask();
    expect(singleChoiceTask).toEqual(singleChoiceTask.clone());
  });

  test('should throw an error when params are invalid', () => {
    const error = new Error(
      'Task Errors:id must be a UUID; question must be an object; question should not be empty; typeId must be one of the following values: 1, 2, 3; Value under type range;',
    );
    expect(() => TaskObjectMother.invalidSingleChoiceTask()).toThrow(error);
  });
});
