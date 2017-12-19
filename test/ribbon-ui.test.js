import 'jest';
import RibbonUi from '../src/ribbon-ui';

test('show should append styles to domScope', () => {
  const container = document.createElement('div');
  const environment = { name: 'Test', detection: () => true, ribbonPosition: 'top', ribbonTarget: container };

  new RibbonUi().show(environment);

  expect(container.querySelectorAll('style').length).toBe(1);
});

test('show should append ribbon to domScope', () => {
  const container = document.createElement('div');
  const environment = { name: 'Test', detection: () => true, ribbonPosition: 'top', ribbonTarget: container };

  new RibbonUi().show(environment);

  expect(container.querySelectorAll('.environment-notifier-ribbon').length).toBe(1);
});

test('show should set expected ribbon text', () => {
  const container = document.createElement('div');
  const environment = { name: 'Test', detection: () => true, ribbonPosition: 'top', ribbonTarget: container };

  new RibbonUi().show(environment);

  const ribbon = container.querySelector('.environment-notifier-ribbon');

  expect(ribbon.innerHTML).toBe('<div>Current Environment: <strong>Test</strong></div>');
});
