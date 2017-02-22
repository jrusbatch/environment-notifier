import 'jest';
import ModalUi from '../src/modal-ui';

beforeEach(() => {
  document.body.innerHTML = '';
  localStorage.clear();
});

test('show should append styles to domScope', () => {
  const domScope = document.createElement('div');
  const environment = { name: 'Test', detection: () => true };

  new ModalUi().show(domScope, environment);

  expect(domScope.querySelectorAll('style').length).toBe(1);
});

test('show should append modal to domScope', () => {
  const domScope = document.createElement('div');
  const environment = { name: 'Test', detection: () => true };

  new ModalUi().show(domScope, environment);

  expect(domScope.querySelectorAll('.environment-notifier-modal').length).toBe(1);
});

test('show should set expected modal contents', () => {
  const domScope = document.createElement('div');
  const environment = { name: 'Test', detection: () => true };

  new ModalUi().show(domScope, environment);

  const modal = domScope.querySelector('.environment-notifier-modal');

  expect(modal.innerHTML).toBe(
    `<div class="environment-notifier-modal-content">`
    + `<p id="environment-notifier-modal-message">You are viewing the <strong>Test</strong> environment.</p>`
    + `<button>OK</button>`
    + `</div>`);
});

test('show should not show modal if previously dismissed', () => {
  const domScope = document.createElement('div');
  const environment = { name: 'Test', detection: () => true };

  localStorage.setItem(
    `environment-notifier-modal-dismissed:${environment.name}`,
    new Date().toJSON());

  new ModalUi().show(domScope, environment);

  const modal = domScope.querySelector('.environment-notifier-modal');

  expect(modal).toBeNull();
});

test('modal button should hide modal when clicked', () => {
  const domScope = document.createElement('div');
  const environment = { name: 'Test', detection: () => true };

  new ModalUi().show(domScope, environment);

  const button = domScope.querySelector('.environment-notifier-modal button');
  button.click();

  const modal = domScope.querySelector('.environment-notifier-modal');

  expect(modal.style.opacity).toBe('0');
});

test('model button should raise environmentNotifierModalDismissed event when clicked', () => {
  const domScope = document.createElement('div');
  const environment = { name: 'Test', detection: () => true };

  new ModalUi().show(domScope, environment);

  const button = domScope.querySelector('.environment-notifier-modal button');

  let expectedEventRaised = false;
  domScope.addEventListener('environmentNotifierModalDismissed', () => {
    expectedEventRaised = true;
  });

  button.click();

  expect(expectedEventRaised).toBe(true);
});

test('modal button should set expected dismissed localStorage item when clicked', () => {
  const domScope = document.createElement('div');
  const environment = { name: 'Test', detection: () => true };

  new ModalUi().show(domScope, environment);

  const button = domScope.querySelector('.environment-notifier-modal button');
  button.click();

  const dismissedAt = localStorage.getItem(
    `environment-notifier-modal-dismissed:${environment.name}`);

  expect(dismissedAt).toBeTruthy();
});
