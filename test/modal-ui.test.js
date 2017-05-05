import 'jest';
import { default as swal } from 'sweetalert2';
import ModalUi from '../src/modal-ui';

const environment = {
  name: 'Test',
  detection: () => true,
  modalMessageHtml: 'Test message'
};

beforeEach(() => {
  document.body.innerHTML = '';
});

test('show should append modal to domScope', () => {
  const domScope = document.body;

  new ModalUi().show(domScope, environment);

  expect(domScope.querySelectorAll('.swal2-modal').length).toBe(1);
});

test('show should set expected default modal contents', () => {
  const domScope = document.body;

  new ModalUi().show(domScope, environment);

  const modal = domScope.querySelector('.swal2-modal');

  expect(modal.innerHTML).toContain(environment.name);
});

test('show should permit HTML in modalMessageHtml', () => {
  const domScope = document.body;
  const differentEnvironment = {
    name: 'Test',
    detection: () => true,
    modalMessageHtml: 'This is the <strong>Test</strong> environment.'
  };

  new ModalUi().show(domScope, differentEnvironment);

  const modal = domScope.querySelector('.swal2-modal');

  expect(modal.innerHTML).toContain('This is the <strong>Test</strong> environment.');
})

test('show should replace {{ environment.name }} with environment.name in modalMessageHtml', () => {
  const domScope = document.body;
  const differentEnvironment = {
    name: 'Test',
    detection: () => true,
    modalMessageHtml: 'This is the {{ environment.name }} environment.'
  };

  new ModalUi().show(domScope, differentEnvironment);

  const modal = domScope.querySelector('.swal2-modal');

  expect(modal.innerHTML).toContain('This is the Test environment.');
});

test('modal button should raise environmentNotifier.modalDismissed event when clickConfirm', () => {
  const domScope = document.body;

  const modal = new ModalUi().show(domScope, environment);

  let expectedEventRaised = false;
  domScope.addEventListener('environmentNotifier.modalDismissed', () => {
    expectedEventRaised = true;
  });

  swal.clickConfirm();

  return modal.then(() => {
    expect(expectedEventRaised).toBe(true);
  });
});

test('modal button should raise environmentNotifier.modalDismissed event when clickCancel', () => {
  const domScope = document.body;

  const modal = new ModalUi().show(domScope, environment);

  let expectedEventRaised = false;
  domScope.addEventListener('environmentNotifier.modalDismissed', () => {
    expectedEventRaised = true;
  });

  swal.clickCancel();

  return modal.then(() => {
    expect(expectedEventRaised).toBe(true);
  });
});

test('modal button should set expected dismissed localStorage item when clicked', () => {
  const domScope = document.body;

  const modal = new ModalUi().show(domScope, environment);

  swal.clickConfirm();

  return modal.then(() => {
    const dismissedAt = localStorage.getItem(
      `environment-notifier-modal-dismissed:${environment.name}`);

    expect(dismissedAt).toBeTruthy();
  });
});
