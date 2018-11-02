import { default as swal } from 'sweetalert2';
import BrowserStorage from './browser-storage';

export default class ModalUi {
  constructor() {
    this.browserStorage = new BrowserStorage();
  }

  show(domScope, environment) {
    if (!domScope) { throw new Error('domScope must be provided.'); }
    if (!environment) { throw new Error('environment must be provided.'); }
    if (!environment.name) { throw new Error('environment.name must be set.'); }
    if (!environment.modalMessageHtml) { throw new Error('environment.modalMessageHtml must be set.'); }

    const domScopeIsBodyTag = domScope.tagName.match(/^body$/i);

    // This is a workaround for a limitation of the `target` property below.
    if (!domScopeIsBodyTag && !domScope.id) {
      throw new Error('domScope must be a body tag or have an id set.');
    }

    return swal({
      titleText: 'Notice',
      html: environment.modalMessageHtml.replace(/{{\s*environment.name\s*}}/g, environment.name),
      type: 'info',
      target: domScopeIsBodyTag ? 'body' : `#${domScope.id}`,
      customClass: environment.customClass
    })
      .then(() => { this.onModalClosed(domScope, environment); })
      .catch(() => { this.onModalClosed(domScope, environment); });
  }

  onModalClosed(domScope, environment) {
    this.browserStorage.setModalDismissed(environment);

    domScope.dispatchEvent(new CustomEvent('environmentNotifier.modalDismissed', { bubbles: true }));
  }
}
