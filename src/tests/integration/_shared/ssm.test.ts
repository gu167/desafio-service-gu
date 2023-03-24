import { SsmProvider } from 'src/_shared/ssm';

describe('#SssProvider - Integration Tests', () => {
  test('#getParametersByPrefix - should get parameters by prefix', async () => {
    const { TABLE_NAME } = await SsmProvider.getParametersByPrefix(
      'desafio-infra-gu',
    );
    console.log(TABLE_NAME);
    expect(TABLE_NAME).toBe('desafio-infra-gu-dev-table');
  });
});
