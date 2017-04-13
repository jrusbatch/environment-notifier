import 'jest';
import RibbonUi from '../src/ribbon-ui';

test('show should append styles to domScope', () => {
  const domScope = document.createElement('div');
  const environment = { name: 'Test', detection: () => true };

  new RibbonUi().show(domScope, environment);

  expect(domScope.querySelectorAll('style').length).toBe(1);
});

test('show should append ribbon to domScope', () => {
  const domScope = document.createElement('div');
  const environment = { name: 'Test', detection: () => true };

  new RibbonUi().show(domScope, environment);

  expect(domScope.querySelectorAll('.environment-notifier-ribbon').length).toBe(1);
});

test('show should set expected ribbon text', () => {
  const domScope = document.createElement('div');
  const environment = { name: 'Test', detection: () => true };

  new RibbonUi().show(domScope, environment);

  const ribbon = domScope.querySelector('.environment-notifier-ribbon');

  expect(ribbon.innerHTML).toBe('Environment: <strong>Test</strong>');
});
