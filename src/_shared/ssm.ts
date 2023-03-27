import { SSMClient, GetParametersByPathCommand } from '@aws-sdk/client-ssm'; // ES Modules import

const ssmClient = new SSMClient({
  region: process.env.AWS_ACCOUNT_REGION ?? 'us-east-1',
});

export class SsmProvider {
  // retorna objeto com os parametros como chave e valor ex: { TABLE_NAME: 'table' }
  public static async getParametersByPrefix(prefix: string) {
    const prefixWithSlashes = `/${prefix}/`;
    const response = await ssmClient.send(
      new GetParametersByPathCommand({
        Path: prefixWithSlashes,
        WithDecryption: true,
      }),
    );

    const {
      $metadata: { httpStatusCode },
      Parameters,
    } = response;

    if (httpStatusCode !== 200) {
      throw new Error('failed to get parameters');
    }

    return Parameters.reduce((acc, curr) => {
      const { Name, Value } = curr;
      const name = Name.replace(prefixWithSlashes, '');

      return { ...acc, [name]: Value };
    }, {}) as Record<string, string>;
  }
}
