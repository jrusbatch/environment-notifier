import ColorHelper from './color-helper';

export default class RibbonUi {
  constructor() {
    this.colorHelper = new ColorHelper();
  }

  show(domScope, environment) {
    if (!domScope) { throw new Error('domScope must be provided.'); }
    if (!environment) { throw new Error('environment must be provided.'); }
    if (!environment.name) { throw new Error('environment.name must be set.'); }

    const elementClass = 'environment-notifier-ribbon';

    const style = document.createElement('style');

    style.innerHTML = `
      .${elementClass} {
        position: fixed;
        ${environment.ribbonLocation === 'top' ? 'top' : 'bottom'}: 0;
        height: 35px;
        left: 0;
        padding-top: 6px;
        width: 100%;
        color: ${this.colorHelper.getFontColor(environment.color)};
        background-color: ${environment.color};
        font-size: 16px;
        text-align: center;

        /* https://css-tricks.com/snippets/css/system-font-stack/ */
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

        font-variant: small-caps;
      }
    `;

    const ribbon = document.createElement('div');

    ribbon.classList.add(elementClass);
    ribbon.innerHTML = `Current Environment: <strong>${environment.name}</strong>`;

    domScope.appendChild(style);
    domScope.appendChild(ribbon);
  }
}
