import { SsmProvider } from 'src/_shared/ssm';
import { mockClient } from 'aws-sdk-client-mock';
import { SSMClient, GetParametersByPathCommand } from '@aws-sdk/client-ssm';

describe('#SssProvider - Integration Tests', () => {
  const ssmClient = mockClient(SSMClient);
  test('#getParametersByPrefix - should get parameters by prefix', async () => {
    ssmClient
      .on(GetParametersByPathCommand, {
        Path: `/prefix/`,
        WithDecryption: true,
      })
      .resolves({
        $metadata: { httpStatusCode: 200 },
        Parameters: [{ Name: '/prefix/TEST_PARAM', Value: 'test' }],
      });

    const { TEST_PARAM } = await SsmProvider.getParametersByPrefix('prefix');

    expect(TEST_PARAM).toBe('test');
  });

  test('#getParametersByPrefix - should throw error', async () => {
    ssmClient
      .on(GetParametersByPathCommand, {
        Path: `/prefix/`,
        WithDecryption: true,
      })
      .resolves({
        $metadata: { httpStatusCode: 500 },
      });

    await expect(SsmProvider.getParametersByPrefix('prefix')).rejects.toThrow(
      'failed to get parameters',
    );
  });
});
