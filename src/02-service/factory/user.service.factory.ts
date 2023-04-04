import { DynamoTable } from 'src/04-infrastructure/dynamoTable';
import { SsmProvider } from 'src/_shared/ssm';
import { UserService } from '../user.service';

export class UserServiceFactory {
  static async getInstance(): Promise<UserService> {
    const { TABLE_NAME } = await SsmProvider.getParametersByPrefix(
      'desafio-infra-gu',
    );
    const table = new DynamoTable(TABLE_NAME);
    const service = new UserService(table);
    return service;
  }
}
