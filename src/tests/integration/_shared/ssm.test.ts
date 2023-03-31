import { SsmProvider } from 'src/_shared/ssm';

describe('#SssProvider - Integration Tests', () => {
  test('#getParametersByPrefix - should get parameters by prefix', async () => {
    const { TEST_PARAM } = await SsmProvider.getParametersByPrefix(
      'desafio-infra-gu',
    );
    expect(TEST_PARAM).toBe('test');
  });
});
