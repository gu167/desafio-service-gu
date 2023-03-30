import { UserItem } from 'src/04-infrastructure/items/user.type';
import { UserDefinition } from 'src/03-model/user.definition';
import { DynamoTable } from 'src/04-infrastructure/dynamoTable';
import { v4 as uuidv4 } from 'uuid';
import { SsmProvider } from 'src/_shared/ssm';
describe('#UserItem - Integration Tests ', () => {
  let table: DynamoTable;
  let user: UserDefinition;

  beforeAll(async () => {
    const { TABLE_TEST_NAME } = await SsmProvider.getParametersByPrefix(
      'desafio-infra-gu',
    );

    table = new DynamoTable(TABLE_TEST_NAME);
    user = new UserDefinition(uuidv4(), 2, 'name', 'Brasileiro', 18);
  });

  test('#putItem - should put item', async () => {
    const userItem = UserItem.From(user);

    const result = await table.putItem(userItem);

    expect(result).toBeTruthy();
  });
  test('#queryItem - should query item', async () => {
    const userItem = UserItem.From(user);

    const userKeys = {
      pk: userItem.pk,
      sk: userItem.sk,
    };

    const result = await table.queryItem(userKeys);
    expect(result).toBeTruthy();
  });
  test('#UpdateItem - should update item', async () => {
    user.age = 98;
    user.nacionalidade = 'Irlandes';
    const userItem = UserItem.From(user);
    const userKeys = {
      pk: userItem.pk,
      sk: userItem.sk,
    };

    const result = await table.updateItem(userItem, userKeys);
    expect(result).toBeTruthy();
  });
  test('#DeleteItem - should delete item', async () => {
    const userItem = UserItem.From(user);

    const userKeys = {
      pk: userItem.pk,
      sk: userItem.sk,
    };

    const result = await table.deleteItem(userKeys);
    expect(result).toBeTruthy();
  });
});
