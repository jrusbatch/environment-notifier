import ColorHelper from './color-helper';

export default class RibbonUi {
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
        height: 30px;
        left: 0;
        padding-top: 5px;
        width: 100%;
        color: ${new ColorHelper().getFontColor(environment.color)};
        background-color: ${environment.color};
        font-size: 16px;
        text-align: center;

        /* https://css-tricks.com/snippets/css/system-font-stack/ */
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      }
    `;

    const ribbon = document.createElement('div');

    ribbon.classList.add(elementClass);
    ribbon.innerHTML = `Environment: <strong>${environment.name}</strong>`;

    domScope.appendChild(style);
    domScope.appendChild(ribbon);
  }
}
