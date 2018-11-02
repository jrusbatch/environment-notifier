import 'jest';
import EnvironmentNotifier from '../src/environment-notifier';

beforeEach(() => {
  document.body.innerHTML = '';
});

test('constructor should apply defaults with provided configuration', () => {
  const sut = new EnvironmentNotifier({ environmentDefaults: { showRibbon: false } });

  expect(sut.configuration.defaultDomScope).toBe(document.body);
});

test('constructor should override defaults with provided configuration', () => {
  const sut = new EnvironmentNotifier({ environmentDefaults: { showRibbon: false } });

  expect(sut.configuration.environments.find(x => x.name === 'Local').showRibbon).toBe(false);
});

test('constructor should rewrite environments when provided', () => {
  const sut = new EnvironmentNotifier({
    environments: [
      {
        name: 'Test',
        detection: () => true,
        customClass: 'env-notify'
      }
    ]
  });

  expect(sut.configuration.environments.length).toBe(1);
  expect(sut.configuration.environments[0].customClass).toEqual('env-notify');
});

test('constructor should apply this.configuration.environmentDefaults for built-in environments', () => {
  const sut = new EnvironmentNotifier();

  expect(sut.configuration.environments.find(x => x.name === 'Local').showRibbon).toBe(true);
});

test('constructor should apply this.configuration.environmentDefaults for constructor provided environments', () => {
  const sut = new EnvironmentNotifier({
    environments: [
      {
        name: 'Test',
        detection: () => true
      }
    ]
  });

  expect(sut.configuration.environments[0].showRibbon).toBe(true);
});

test('constructor should apply configuration and keep existing this.configuration.environmentDefaults values', () => {
  const sut = new EnvironmentNotifier({
    environmentDefaults: {
      ribbonLocation: 'top'
    }
  });

  expect(sut.configuration.environmentDefaults.color).toBeTruthy();
});

test('constructor should apply environment specific configuration for built-in environments', () => {
  const sut = new EnvironmentNotifier();

  expect(sut.configuration.environments.find(x => x.name === 'Local').color).toBe('rgba(0, 100, 0, .95)');
});

test('constructor should apply environment specific configuration for constructor provided environments', () => {
  const sut = new EnvironmentNotifier({
    environments: [
      {
        name: 'Test',
        detection: () => true,
        showRibbon: false
      }
    ]
  });

  expect(sut.configuration.environments.find(x => x.name === 'Test').showRibbon).toBe(false);
});

test('add and remove environment methods should be chainable', () => {
  new EnvironmentNotifier()
    .addEnvironment({
      name: 'test',
      detection: () => false
    })
    .removeEnvironment('test')
    .start();
});

test('addEnvironment should apply this.defaultConfiguration.environmentDefaults', () => {
  const sut = new EnvironmentNotifier({ environments: [] })
    .addEnvironment({
      name: 'Test',
      detection: () => true
    });

  expect(sut.getCurrentEnvironment().showRibbon).toBe(true);
});

test('addEnvironment should not permit duplicates', () => {
  expect(() => {
    new EnvironmentNotifier({ environments: [] })
      .addEnvironment({
        name: 'Test',
        detection: () => true
      })
      .addEnvironment({
        name: 'Test',
        detection: () => true
      })
  }).toThrowError('An environment with this name already exists.');
});

test('getCurrentEnvironment should return null when no matches', () => {
  const sut = new EnvironmentNotifier({ environments: [] });

  expect(sut.getCurrentEnvironment()).toBeNull();
});

test('removeEnvironment should remove environment matching name', () => {
  const sut = new EnvironmentNotifier({ environments: [{ name: 'Test', detection: () => true }] })
    .removeEnvironment('Test');

  expect(sut.configuration.environments.length).toBe(0);
});

test('start should default to document.body for displaying modal', () => {
  const sut = new EnvironmentNotifier({
    environments: [
      {
        name: 'Test',
        detection: () => true,
        showRibbon: false,
        showModalEveryView: true
      }
    ]
  });

  sut.start();

  expect(document.body.innerHTML).toMatch(/Test/);
});

test('start should default to document.body for displaying ribbon', () => {
  const sut = new EnvironmentNotifier({
    environments: [
      {
        name: 'Test',
        detection: () => true,
        showRibbon: true,
        showModalEveryView: false
      }
    ]
  });

  sut.start();

  expect(document.body.innerHTML).toMatch(/Test/);
});

test('start(domScope) should use provided domScope for displaying modal', () => {
  const container = document.body;

  const sut = new EnvironmentNotifier({
    environments: [
      {
        name: 'Test',
        detection: () => true,
        showRibbon: false,
        showModalEveryView: true
      }
    ]
  });

  sut.start(container);

  expect(container.innerHTML).toMatch(/Test/);
});

test('start() should use provided ribbonTarget for displaying ribbon', () => {
  const container = document.createElement('body');

  const sut = new EnvironmentNotifier({
    environments: [
      {
        name: 'Test',
        detection: () => true,
        showRibbon: true,
        showModalEveryView: false,
        ribbonTarget: container
      }
    ]
  });

  sut.start();

  expect(container.innerHTML).toMatch(/Test/);
});

test('start should throw if a DOM item is not provided', () => {
  expect(() => new EnvironmentNotifier().start(null))
    .toThrow('domScope must be provided.');
});

test('start should always show modal on every view when shouldShowEveryView is true regardless if previously dismissed', () => {
  const sut = new EnvironmentNotifier({
    environments: [
      {
        name: 'Test',
        detection: () => true,
        showRibbon: true,
        showModalEveryView: true
      }
    ]
  });

  localStorage.setItem(
    `environment-notifier-modal-dismissed:${sut.getCurrentEnvironment().name}`,
    new Date().toJSON());

  sut.start();

  const modal = document.body.querySelector('.swal2-shown');

  expect(modal).toBeTruthy();
});

test('start should not show modal if previously dismissed when showModalEveryView is false and showModalFirstView is true', () => {
  const sut = new EnvironmentNotifier({
    environments: [
      {
        name: 'Test',
        detection: () => true,
        showRibbon: true,
        showModalEveryView: false,
        showModalFirstView: true
      }
    ]
  });

  localStorage.setItem(
    `environment-notifier-modal-dismissed:${sut.getCurrentEnvironment().name}`,
    new Date().toJSON());

  sut.start();

  const modal = document.body.querySelector('.swal2-shown');

  expect(modal).toBeNull();
});
