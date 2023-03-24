import { ddbDocClient } from './ddbDocClient';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { SsmProvider } from 'src/_shared/ssm';
import { UserDefinition } from 'src/03-model/user.definition';

const USER = new UserDefinition(
  '123e4567-e89b-12d3-a456-426614174000',
  'Gu',
  25,
);

export const putItem = async () => {
  // Set the parameters.
  const tableName = await SsmProvider.getParametersByPrefix('desafio-infra-gu');
  const params = {
    TableName: `${tableName.TABLE_NAME}`,
    Item: {
      pk: `${USER.id}`,
      sk: `${USER.age}`,
    },
  };
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log('Success - item added or updated', data);
  } catch (err) {
    console.log('Error', err.stack);
  }
};
putItem();
