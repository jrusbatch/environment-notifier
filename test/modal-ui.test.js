import 'jest';
import ModalUi from '../src/modal-ui';

let environment;

beforeEach(() => {
  environment = {
    name: 'Test',
    detection: () => true,
    modalMessageHtml: 'Test message'
  };
});

test('show should append styles to domScope', () => {
  const domScope = document.createElement('div');

  new ModalUi().show(domScope, environment);

  expect(domScope.querySelectorAll('style').length).toBe(1);
});

test('show should append modal to domScope', () => {
  const domScope = document.createElement('div');

  new ModalUi().show(domScope, environment);

  expect(domScope.querySelectorAll('.environment-notifier-modal').length).toBe(1);
});

test('show should set expected default modal contents', () => {
  const domScope = document.createElement('div');

  new ModalUi().show(domScope, environment);

  const modal = domScope.querySelector('.environment-notifier-modal');

  expect(modal.innerHTML).toBe(
    `<div class="environment-notifier-modal-content">`
    + `<p id="environment-notifier-modal-message">Test message</p>`
    + `<button>OK</button>`
    + `</div>`);
});

test('should show permit HTML in modalMessageHtml', () => {
  const domScope = document.createElement('div');
  const differentEnvironment = {
    name: 'Test',
    detection: () => true,
    modalMessageHtml: 'This is the <strong>Test</strong> environment.'
  };

  new ModalUi().show(domScope, differentEnvironment);

  const modalMessage = domScope.querySelector('#environment-notifier-modal-message');

  expect(modalMessage.innerHTML).toBe('This is the <strong>Test</strong> environment.');
})

test('show should replace {{ environment.name }} with environment.name in modalMessageHtml', () => {
  const domScope = document.createElement('div');
  const differentEnvironment = {
    name: 'Test',
    detection: () => true,
    modalMessageHtml: 'This is the {{ environment.name }} environment.'
  };

  new ModalUi().show(domScope, differentEnvironment);

  const modalMessage = domScope.querySelector('#environment-notifier-modal-message');

  expect(modalMessage.innerHTML).toBe('This is the Test environment.');
});

test('modal button should hide modal when clicked', () => {
  const domScope = document.createElement('div');

  new ModalUi().show(domScope, environment);

  const button = domScope.querySelector('.environment-notifier-modal button');
  button.click();

  const modal = domScope.querySelector('.environment-notifier-modal');

  expect(modal.style.opacity).toBe('0');
});

test('model button should raise environmentNotifier.modalDismissed event when clicked', () => {
  const domScope = document.createElement('div');

  new ModalUi().show(domScope, environment);

  const button = domScope.querySelector('.environment-notifier-modal button');

  let expectedEventRaised = false;
  domScope.addEventListener('environmentNotifier.modalDismissed', () => {
    expectedEventRaised = true;
  });

  button.click();

  expect(expectedEventRaised).toBe(true);
});

test('modal button should set expected dismissed localStorage item when clicked', () => {
  const domScope = document.createElement('div');

  new ModalUi().show(domScope, environment);

  const button = domScope.querySelector('.environment-notifier-modal button');
  button.click();

  const dismissedAt = localStorage.getItem(
    `environment-notifier-modal-dismissed:${environment.name}`);

  expect(dismissedAt).toBeTruthy();
});
