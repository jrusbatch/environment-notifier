import assignDeep from 'assign-deep';
import BrowserStorage from './browser-storage';
import ModalUi from './modal-ui';
import RibbonUi from './ribbon-ui';

export default class EnvironmentNotifier {
  constructor(configuration = null) {
    this.browserStorage = new BrowserStorage();
    this.ribbonUi = new RibbonUi();
    this.modalUi = new ModalUi();

    this.defaultConfiguration = {
      defaultDomScope: document.body,
      environmentDefaults: {
        color: 'rgba(255, 0, 0, .95)', // Red (opacity 95%)
        detection: () => false,
        modalMessageHtml: '✨ You are viewing the <strong>{{ environment.name }}</strong> environment. ✨',
        showModalEveryView: false,
        showModalFirstView: true,
        ribbonLocation: 'bottom',
        ribbonPosition: 'fixed',
        ribbonTarget: document.body,
        showRibbon: true,
      },
      environments: [
        {
          name: 'Local',
          color: 'rgba(0, 100, 0, .95)', // DarkGreen (opacity 95%)

          // https://stackoverflow.com/a/8426365 answering https://stackoverflow.com/questions/8426171/what-regex-will-match-all-loopback-addresses
          detection: () => /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/.test(window.location.hostname),

          showModalFirstView: false
        },
        {
          name: 'QA',
          color: 'rgba(0, 128, 128, .95)', // Teal (opacity 95%)
          detection: () => /(qa-)|(-qa)/i.test(window.location.hostname)
        },
        {
          name: 'UAT',
          color: 'rgba(0, 100, 0, .95)', // DarkGreen (opacity 95%)
          detection: () => /(uat-)|(-uat)/i.test(window.location.hostname)
        }
      ]
    };

    this.configuration = this.defaultConfiguration;

    if (configuration) {
      assignDeep(this.configuration, configuration);

      if (configuration.environmentDefaults && configuration.environmentDefaults.ribbonTarget) {
        this.configuration.environmentDefaults.ribbonTarget =
          configuration.environmentDefaults.ribbonTarget;
      }
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
    if (!environment) { throw new Error('environment must be provided.'); }
    if (!environment.name) { throw new Error('environment.name must be set.'); }
    if (!environment.detection || typeof environment.detection !== 'function') {
      throw new Error('environment.detection must be a function.');
    }
    if (this.configuration.environments.some(x => x.name === environment.name)) {
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
    if (!domScope) { throw new Error('domScope must be provided.'); }

    const environment = this.getCurrentEnvironment();
    if (!environment) {
      return;
    }

    if (environment.showModalEveryView || (environment.showModalFirstView && !this.modalPreviouslyDismissed(environment))) {
      this.modalUi.show(domScope, environment);
    }

    if (environment.showRibbon) {
      this.ribbonUi.show(environment);
    }

    return this;
  }

  modalPreviouslyDismissed(environment) {
    if (!environment) { throw new Error('environment must be provided.'); }

    return !!this.browserStorage.getModalDismissedAt(environment);
  }
}
