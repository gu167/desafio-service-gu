import { UserItem } from 'src/04-infrastructure/items/user.type';
import { UserDefinition } from 'src/03-model/user.definition';
import { DynamoTable } from 'src/04-infrastructure/dynamoTable';
import { v4 as uuidv4 } from 'uuid';
import { SsmProvider } from 'src/_shared/ssm';
describe('#UserItem - Integration Tests ', () => {
  test('#putItem - should put item', async () => {
    const envsByPrefix = await SsmProvider.getParametersByPrefix(
      'desafio-infra-gu',
    );
    const { TABLE_TEST_NAME } = envsByPrefix;

    const userDefiniton = new UserDefinition(uuidv4(), 'name', 18);
    const userItem = UserItem.From(userDefiniton);
    const table = new DynamoTable(TABLE_TEST_NAME);

    const result = await table.putItem(userItem);

    expect(result).toBeTruthy();
  });
  test('#queryItem - should query item', async () => {
    const envsByPrefix = await SsmProvider.getParametersByPrefix(
      'desafio-infra-gu',
    );
    const { TABLE_TEST_NAME } = envsByPrefix;

    const userDefiniton = new UserDefinition(uuidv4(), 'name', 18);
    const userItem = UserItem.From(userDefiniton);
    const table = new DynamoTable(TABLE_TEST_NAME);

    const userKeys = {
      pk: userItem.pk,
      sk: userItem.sk,
    };

    const result = await table.query(userKeys);
    console.table(userItem);
    expect(result).toBeTruthy();
  });
});
