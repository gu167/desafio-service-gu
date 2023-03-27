import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { BaseItem } from './items/item';
import { UserItem } from './items/user.type';
import { UserDefinition } from 'src/03-model/user.definition';
import { agent } from 'supertest';

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_ACCOUNT_REGION || 'us-east-1',
});

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: true,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

// Create the DynamoDB document client.
const dynamoDocumentClient = DynamoDBDocumentClient.from(dynamoClient, {
  marshallOptions,
  unmarshallOptions,
});

export class DynamoTable {
  // Não pode ser accessada em outras classes e seu valor n pode ser modificado
  private readonly client = dynamoDocumentClient;

  constructor(readonly tableName: string) {}

  async putItem(baseItem: BaseItem<unknown>) {
    const response = await this.client.send(
      new PutCommand({
        Item: { ...baseItem },
        TableName: this.tableName,
      }),
    );

    // $metadata === dados sobre a resposta da requisição
    return response.$metadata.httpStatusCode === 200;
  }

  async query(key: { pk: string; sk: string }) {
    const params: QueryCommandInput = {
      ExpressionAttributeNames: {
        '#pk': 'pk',
        '#sk': 'sk',
      },
      ProjectionExpression: '#pk, #sk',
      TableName: this.tableName,
      ExpressionAttributeValues: {
        ':pk': key.pk,
        ':sk': key.sk,
      },
      KeyConditionExpression: '#pk = :pk and #sk = :sk',
    };

    const response = await this.client.send(new QueryCommand(params));
    return response.$metadata.httpStatusCode === 200;
  }
}
