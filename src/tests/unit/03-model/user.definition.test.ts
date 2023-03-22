import { UserDefinition } from 'src/03-model/user.definition';
import { v4 as uuidv4 } from 'uuid';
describe('#UserDefinition - Unit Tests', () => {
  test('should create valid instace of user when valid params are given', () => {
    const user = new UserDefinition(uuidv4(), 'gu', 18);

    expect(user).toEqual(user.clone());
  });

  test('should throw error when invalid params are given to user instance', () => {
    const error = new Error(
      'User Errors: id must be a UUID; name must be longer than or equal to 1 characters; User must be above 17 years;',
    );

    expect(() => new UserDefinition('', '', 17)).toThrow(error);
    console.log(error); //Visuazlization
  });
});
