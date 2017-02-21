export default class RibbonUi {
  show(domScope, environmentName, location) {
    const ribbon = document.createElement('div');
    ribbon.classList.add(`position-${location}`);
    ribbon.innerHTML = `Environment: ${environmentName}`;

    domScope.appendChild(ribbon);
  }
}
