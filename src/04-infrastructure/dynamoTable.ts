import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { BaseItem } from './items/item';

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

  async putItem(baseItem: BaseItem<any>) {
    const response = await this.client.send(
      new PutCommand({
        Item: { ...baseItem },
        TableName: this.tableName,
      }),
    );

    // $metadata === dados sobre a resposta da requisição
    return response.$metadata.httpStatusCode === 200;
  }
}
