# Environment Notifier

[![Build status](https://ci.appveyor.com/api/projects/status/6sktj0hnf1xo9ok1?svg=true)](https://ci.appveyor.com/project/RimDev/environment-notifier) [![npm version](https://img.shields.io/npm/v/environment-notifier.svg)](https://www.npmjs.com/package/environment-notifier)

Display on-screen notifications alerting users when viewing matching web application environments.

![Environment ribbon on top](/docs/images/ribbon_top.png)
_An example with the ribbon fixed at the top_

![Environment ribbon at bottom](/docs/images/ribbon_bottom.png)
_An example with the ribbon fixed at the bottom_

## Installation

```
npm install environment-notifier
```

Or, load this script manually: [https://unpkg.com/environment-notifier@latest/lib/environment-notifier.min.js](https://unpkg.com/environment-notifier@latest/lib/environment-notifier.min.js) -- This targets the latest version, which may include breaking changes for major version updates. A specific version can be targeted to avoid potential breaking changes. See [https://unpkg.com](https://unpkg.com) for more information.

## Quickstart

```javascript
new EnvironmentNotifier().start();
```

## Usage

- Run `new EnvironmentNotifier().start();`, optionally specifying the scope in the parameter _(defaults to `document.body`)_.

Configuration options can be specified in the `EnvironmentNotifier` constructor. Example:

```javascript
new EnvironmentNotifier({
  environmentDefaults: {
    ribbonLocation: 'top'
  }
}).start();
```

## Configuration options

| Option                | Description                                                    | Default Value               |
| --------------------- | -------------------------------------------------------------- | --------------------------- |
| `defaultDomScope`     | The default DOM scope to use.                                  | `document.body`             |
| `environmentDefaults` | The defaults to apply when specific settings are not provided. | See below                   |
| `environments`        | The configured environments.                                   | Local, QA, UAT environments |

### environmentDefaults

| Option               | Description                                                              | Default Value                                                                      |
| -------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `color`              | Environment color. (Accepted value types: `#ccc`, `rgb()`, `rgba()`)     | `'rgba(255, 0, 0, .75)'`                                                           |
| `detection`          | The environment detection function (returns `true` for match).           | `() => false`                                                                      |
| `modalMessageHtml`   | The HTML message to display on the modal.                                | `'✨ You are viewing the <strong>{{ environment.name }}</strong> environment. ✨'` |
| `showModalEveryView` | Show modal for every page view.                                          | `false`                                                                            |
| `showModalFirstView` | Show modal for first page view.                                          | `false`                                                                            |
| `ribbonLocation`     | The location of the on-screen ribbon. (Accepted values: `top`, `bottom`) | `'bottom'`                                                                         |
| `ribbonPosition`     | The CSS `position` of the ribbon.                                        | `'fixed'`                                                                          |
| `ribbonTarget`       | The DOM element to inject the ribbon into.                               | `document.body`                                                                    |
| `showRibbon`         | Whether the on-screen ribbon should be shown or not.                     | `true`                                                                             |
| `customClass`        | Custom class to be added to the body of the ribbon and modal.            | `null`                                                                             |

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
