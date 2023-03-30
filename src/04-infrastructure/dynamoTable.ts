import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  QueryCommandInput,
  DeleteCommand,
  DeleteCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { BaseItem, TypeEnum } from './items/item';

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

  async queryItem(key: { pk: string; sk: string }) {
    const params: QueryCommandInput = {
      ExpressionAttributeNames: {
        '#pk': 'pk', //como esses itens serão chamados, para que não haja confito com os nomes nativos do ddb
        '#sk': 'sk',
      },
      ProjectionExpression: '#pk, #sk',
      TableName: this.tableName,
      ExpressionAttributeValues: {
        ':pk': key.pk, //Atribui o valor das propriedades pelos nomes definidos previamente
        ':sk': key.sk,
      },
      KeyConditionExpression: '#pk = :pk and #sk = :sk', //validação para ter certeza que os valores desejados são os valores que foram atribuidos
    };

    const response = await this.client.send(new QueryCommand(params));
    return response.$metadata.httpStatusCode === 200;
  }

  async deleteItem(key: { pk: string; sk: string }) {
    const params: DeleteCommandInput = {
      TableName: this.tableName,
      Key: key,
    };
    const response = await this.client.send(new DeleteCommand(params));
    return response.$metadata.httpStatusCode === 200;
  }

  //TODO

  async updateItem(item: BaseItem<unknown>, key: { pk: string; sk: string }) {
    const updatedTimeStamp = new Date().toISOString();
    const params: UpdateCommandInput = {
      TableName: this.tableName,
      Key: key,
      ReturnValues: 'ALL_NEW',
      ExpressionAttributeNames: {
        '#data': 'data',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':data': item.data,
        ':updatedAt': updatedTimeStamp,
      },
      UpdateExpression: 'SET #data = :data, #updatedAt = :updatedAt',
    };
    const response = await this.client.send(new UpdateCommand(params));
    return response.$metadata.httpStatusCode === 200;
  }
}
