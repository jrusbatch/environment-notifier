import ColorHelper from './color-helper';

export default class RibbonUi {
  constructor() {
    this.colorHelper = new ColorHelper();
  }

  show(environment) {
    if (!environment) { throw new Error('environment must be provided.'); }
    if (!environment.name) { throw new Error('environment.name must be set.'); }
    if (!environment.ribbonPosition) { throw new Error('environment.ribbonPosition must be set.'); }
    if (!environment.ribbonTarget) { throw new Error('environment.ribbonTarget must be set.'); }

    const elementClass = 'environment-notifier-ribbon';

    const style = document.createElement('style');

    style.innerHTML = `
      .${elementClass} {
        background-color: ${environment.color};
        color: ${this.colorHelper.getFontColor(environment.color)};
        display: flex;
        font-family: inherit;
        font-size: 1.6rem;
        left: 0;
        justify-content: center;
        padding: .7rem 1rem;
        position: ${environment.ribbonPosition};
        ${environment.ribbonLocation === 'top' ? 'top' : 'bottom'}: 0;
        text-transform: uppercase;
        width: 100%;
      }
    `;

    const ribbon = document.createElement('div');

    ribbon.classList.add(elementClass);
    ribbon.classList.add(environment.name.toLowerCase());
    ribbon.innerHTML = `<div>Current Environment: <strong>${environment.name}</strong></div>`;

    environment.ribbonTarget.appendChild(style);
    environment.ribbonTarget.appendChild(ribbon);
  }
}
