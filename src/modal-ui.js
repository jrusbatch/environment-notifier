export default class ModalUi {
  show(domScope, environmentName) {
    const modal = document.createElement('div');
    modal.innerHTML = `Environment: ${environmentName}`;

    domScope.appendChild(modal);
  }

  dismiss(environmentName) { // eslint-disable-line no-unused-vars
    // TODO: Add item to local storage that the modal was dismissed in this browser for this environmentName
  }

  previouslyDismissed(environmentName) { // eslint-disable-line no-unused-vars
    return true; // TODO: Check if the modal was previously dismissed for this environment
  }
}
