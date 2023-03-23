// Create the DynamoDB service client module
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

// Create an Amazon DynamoDB service client object.
export const ddbClient = new DynamoDBClient({
  region: process.env.AWS_ACCOUNT_REGION || 'us-east-1',
});
