import 'jest';
import BrowserStorage from '../src/browser-storage';

test('getModalDismissedAt should return null when no value', () => {
  const environment = {
      name: 'Test'
    };

  const sut = new BrowserStorage();

  expect(sut.getModalDismissedAt(environment)).toBeNull();
});

test('getModalDismissedAt should return expected value', () => {
  const environment = {
      name: 'Test'
    };

  const sut = new BrowserStorage();

  const value = new Date().toJSON();

  localStorage.setItem(`environment-notifier-modal-dismissed:${environment.name}`, value);

  expect(sut.getModalDismissedAt(environment)).toBe(value);
});

test('setModalDismissed should set value', () => {
  const environment = {
      name: 'Test'
    };

  const sut = new BrowserStorage();

  sut.setModalDismissed(environment);

  const item = localStorage.getItem(`environment-notifier-modal-dismissed:${environment.name}`);

  expect(item).toBeTruthy();
});

test('getModalDismissedStorageKey should return expected value', () => {
    const environment = {
      name: 'Test'
    };

    const sut = new BrowserStorage();

    const result = sut.getModalDismissedStorageKey(environment);

    expect(result).toBe('environment-notifier-modal-dismissed:Test');
});
