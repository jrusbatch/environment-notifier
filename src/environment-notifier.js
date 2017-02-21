import ModalUi from './modal-ui';
import RibbonUi from './ribbon-ui';

export default class EnvironmentNotifier {
  constructor(configuration = null) {
    this.ribbonUi = new RibbonUi();
    this.modalUi = new ModalUi();

    this.defaultConfiguration = {
      defaultDomScope: document.body,
      environmentDefaults: {
        color: 'red',
        detection: () => false,
        showModalEveryView: false,
        showModalFirstView: true,
        ribbonLocation: 'bottom',
        showRibbon: true,
      },
      environments: [
        {
          name: 'Local',
          color: 'lightyellow',

          // https://stackoverflow.com/a/8426365 answering https://stackoverflow.com/questions/8426171/what-regex-will-match-all-loopback-addresses
          detection: () => /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/.test(window.location.hostname),

          showModalFirstView: false
        },
        {
          name: 'QA',
          color: 'lightblue',
          detection: () => /(qa-)|(-qa)/i.test(window.location.hostname)
        },
        {
          name: 'UAT',
          color: 'lightgreen',
          detection: () => /(uat-)|(-uat)/i.test(window.location.hostname)
        }
      ]
    };

    this.configuration = this.defaultConfiguration;

    if (configuration) {
      Object.assign(this.configuration, configuration);
    }

    // Apply this.defaultConfiguration.environmentDefaults onto each environment
    // where values are currently undefined.
    this.configuration.environments.forEach(env => {
      Object.keys(this.defaultConfiguration.environmentDefaults).forEach(key => {
        if (env[key] === undefined) {
          env[key] = this.defaultConfiguration.environmentDefaults[key];
        }
      });
    });
  }

  addEnvironment(environment) {
    if (!environment) {
      throw new Error('environment must be provided.');
    } else if (!environment.name) {
      throw new Error('environment.name must be set.');
    } else if (!environment.detection || typeof environment.detection !== 'function') {
      throw new Error('environment.detection must be a function.');
    } else if (this.configuration.environments.some(x => x.name === environment.name)) {
      throw new Error('An environment with this name already exists.');
    }

    // Apply this.defaultConfiguration.environmentDefaults onto the new environment
    // where values are currently undefined.
    Object.keys(this.defaultConfiguration.environmentDefaults).forEach(key => {
      if (environment[key] === undefined) {
        environment[key] = this.defaultConfiguration.environmentDefaults[key];
      }
    });

    this.configuration.environments.push(environment);

    return this;
  }

  getCurrentEnvironment() {
    return this.configuration.environments.find(env => env.detection()) || null;
  }

  removeEnvironment(environmentName) {
    this.configuration.environments = this.configuration.environments
      .filter(x => x.name !== environmentName);

    return this;
  }

  start(domScope = this.configuration.defaultDomScope) {
    if (!domScope) {
      throw new Error('domScope must be provided.');
    }

    const environment = this.getCurrentEnvironment();
    if (!environment) {
      return;
    }

    if (environment.showModalEveryView || (environment.showModalFirstView && !this.modalUi.previouslyDismissed(environment.name))) {
      this.modalUi.show(domScope, environment.name);
    }

    if (environment.showRibbon) {
      this.ribbonUi.show(domScope, environment.name, environment.ribbonLocation);
    }
  }
}
