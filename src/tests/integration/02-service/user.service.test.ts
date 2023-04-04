import { UserServiceFactory } from 'src/02-service/factory/user.service.factory';
import { ErrorTypeEnum } from 'src/_shared/errorType.enum';
describe('#UserService - Integration Tests', () => {
  test('#getOne - should return an empty array in case user doesnt exist', async () => {
    const userService = await UserServiceFactory.getInstance();
    const { data, status, errorType } = await userService.getOne('Gusta');

    expect(data).toEqual([]);
    expect(status).toBeFalsy();
    expect(errorType).toEqual(ErrorTypeEnum.NOT_FOUND);
  });

  test('#getAll - should return an empty array in case there is no users', async () => {
    const userService = await UserServiceFactory.getInstance();
    const { data, status, errorType } = await userService.getAll();

    expect(data).toEqual([]);
    expect(status).toBeFalsy();
    expect(errorType).toEqual(ErrorTypeEnum.NOT_FOUND);
  });
});
