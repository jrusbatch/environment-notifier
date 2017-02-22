import BrowserStorage from './browser-storage';

export default class ModalUi {
  constructor() {
    this.browserStorage = new BrowserStorage();
  }

  show(domScope, environment) {
    if (!domScope) { throw new Error('domScope must be provided.'); }
    if (!environment) { throw new Error('environment must be provided.'); }
    if (!environment.name) { throw new Error('environment.name must be set.'); }

    const elementClass = 'environment-notifier-modal';

    const style = document.createElement('style');

    style.innerHTML = `
      .${elementClass} {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: ${environment.color};
        opacity: .9;
        transition: opacity 0.5s linear;
        text-align: center;
        font-size: 22px;

        /* https://css-tricks.com/snippets/css/system-font-stack/ */
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

        /* https://stackoverflow.com/a/25461690 answering https://stackoverflow.com/questions/491052/minimum-and-maximum-value-of-z-index*/
        z-index: 2147483647;
      }

      .${elementClass} .${elementClass}-content {
        position: fixed;

        /* https://stackoverflow.com/a/32694476 answering https://stackoverflow.com/questions/3157372/css-horizontal-centering-of-a-fixed-div */
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .${elementClass} .${elementClass}-content button {
        margin-top: 5px;
        padding: 10px;
        width: 300px;
      }
    `;

    const messageId = `${elementClass}-message`;

    const modal = document.createElement('div');
    modal.setAttribute('role', 'alertdialog');
    modal.setAttribute('aria-describedby', messageId);
    modal.classList.add(elementClass);

    const modalContent = document.createElement('div');
    modalContent.classList.add(`${elementClass}-content`);

    const modalContentText = document.createElement('p');
    modalContentText.id = messageId;
    modalContentText.innerHTML = `You are viewing the <strong>${environment.name}</strong> environment.`;

    const modalContentButton = document.createElement('button');
    modalContentButton.innerHTML = 'OK';
    modalContentButton.onclick = evt => {
      evt.preventDefault();

      this.browserStorage.setModalDismissed(environment);

      modal.style.opacity = '0';
      modal.dispatchEvent(new CustomEvent('environmentNotifier.modalDismissed', { bubbles: true }));
    };

    modal.addEventListener('transitionend', evt => {
      evt.currentTarget.parentNode.removeChild(evt.currentTarget);
    });

    document.addEventListener('keydown', function onKeydown(evt) {
      if (evt.keyCode === 13 /* enter */ || evt.keyCode === 27 /* esc */) {
        evt.preventDefault();
        modalContentButton.click();
        document.removeEventListener('keydown', onKeydown);
      }
    });

    modalContent.appendChild(modalContentText);
    modalContent.appendChild(modalContentButton);

    modal.appendChild(modalContent);

    domScope.appendChild(style);
    domScope.appendChild(modal);
  }
}
