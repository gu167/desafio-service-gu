import { UserItem } from 'src/04-infrastructure/items/user.type';
import { UserDefinition } from 'src/03-model/user.definition';
import { DynamoTable } from 'src/04-infrastructure/dynamoTable';
import { v4 as uuidv4 } from 'uuid';
import { SsmProvider } from 'src/_shared/ssm';
describe('#UserItem - Integration Tests ', () => {
  test('#putItem - should put item', async () => {
    const { TABLE_NAME } = await SsmProvider.getParametersByPrefix(
      'desafion-infra-gu',
    );
    const userDefiniton = new UserDefinition(uuidv4(), 'name', 18);
    const userItem = UserItem.From(userDefiniton);
    const table = new DynamoTable(TABLE_NAME);

    const result = await table.putItem(userItem);

    expect(result).toBeTruthy();
  });
});
