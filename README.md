# Environment Notifier

Display on-screen notifications alerting users when viewing matching web application environments.

## Installation

<!--
```
npm install environment-notifier
```

Or, load this script manually: [https://unpkg.com/environment-notifier@latest/lib/environment-notifier.min.js](https://unpkg.com/environment-notifier@latest/lib/environment-notifier.min.js) -- This targets the latest version, which may include breaking changes for major version updates. A specific version can be targeted to avoid potential breaking changes. See [https://unpkg.com](https://unpkg.com) for more information.
-->

## Quickstart

```javascript
new EnvironmentNotifier().start();
```

## Usage

- Run `new EnvironmentNotifier().start();`, optionally specifying the scope in the parameter *(defaults to `document.body`)*.

Configuration options can be specified in the `EnvironmentNotifier` constructor. Example:

```javascript
new EnvironmentNotifier({
  environmentDefaults: {
    ribbonLocation: 'top'
  }
}).start();
```

## Configuration options

| Option                | Description                                                               | Default Value |
| --------------------- | ------------------------------------------------------------------------- | ------------- |
| `defaultDomScope`     | The default DOM scope to use.                                             | `document.body` |
| `environmentDefaults` | The defaults to apply when specific settings are not provided.            | See below |
| `environments`        | The configured environments.                                              | Local, QA, UAT environments |

### environmentDefaults

| Option                | Description                                                               | Default Value |
| --------------------- | ------------------------------------------------------------------------- | ------------- |
| `color`               | Color associated with the environment.                                    | `'red'` |
| `detection`           | The environment detection function (returns `true` for match).            | `() => false` |
| `showModalEveryView`  | Show modal for every page view.                                           | `false` |
| `showModalFirstView`  | Show modal for first page view.                                           | `true` |
| `ribbonLocation`      | The location of the on-screen ribbon. (Accepted values: `top`, `bottom`)  | `'bottom'` |
| `showRibbon`          | Whether the on-screen ribbon should be shown or not.                      | `true` |

## Methods

### `addEnvironment(environment)`

Add a new environment. `environment` should be `{ name: String, detection: Function, ... }`.

### `getCurrentEnvironment()`

Get the current environment object.

### `removeEnvironment(environmentName)`

Remove an environment where `name` matches provided `environmentName`.

### `start(domScope = this.configuration.defaultDomScope)`

Start environment notifier working with `domScope`.

## Events

### `environmentNotifier.modalDismissed`

Raised when the modal has been dismissed by the user.

## Development

- `npm install`
- `npm start` to run demo.
- `npm run build` or `npm run watch`
- `npm test` or `npm run test:watch` to run tests.
- `npm run lint` to run linter.
- `npm run validate` to run linter than tests.

## License

MIT
