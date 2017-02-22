import 'jest';
import KeyProvider from '../src/key-provider';

test('getLocalStorageKeyForEnvironment should return expected value', () => {
  const environment = {
    name: 'Test'
  };

  const sut = new KeyProvider();

  const result = sut.getLocalStorageKeyForEnvironment(environment);

  expect(result).toBe('environment-notifier-modal-dismissed:Test');
});
