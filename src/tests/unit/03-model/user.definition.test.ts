import { UserObjectMother } from '../_model/user.object-mother';
describe('#UserDefinition - Unit Tests', () => {
  test('should create valid instace of user when valid params are given', () => {
    const user = UserObjectMother.validUser();

    expect(user).toEqual(user.clone());
  });

  test('should throw error when invalid params are given to user instance', () => {
    const error = new Error(
      'User Errors: id must be a UUID; Must be a Role number between 1 and 4; name must be longer than or equal to 1 characters; nacionalidade should not be empty; User must be above 17 years;',
    );

    expect(() => UserObjectMother.invalidUser()).toThrow(error);
  });
});
