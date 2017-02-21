export default class ModalUi {
  show(domScope, environment) {
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

    const modal = document.createElement('div');
    modal.classList.add(elementClass);

    const modalContent = document.createElement('div');
    modalContent.classList.add(`${elementClass}-content`);

    const modalContentText = document.createElement('p');
    modalContentText.innerHTML = `You are viewing the <strong>${environment.name}</strong> environment.`;

    const modalContentButton = document.createElement('button');
    modalContentButton.innerHTML = 'OK';
    modalContentButton.onclick = evt => {
      evt.preventDefault();
      modal.style.display = 'none';
    };

    modalContent.appendChild(modalContentText);
    modalContent.appendChild(modalContentButton);

    modal.appendChild(modalContent);

    domScope.appendChild(style);
    domScope.appendChild(modal);
  }

  dismiss(environment) { // eslint-disable-line no-unused-vars
    // TODO: Add item to local storage that the modal was dismissed in this browser for this `environment.name`
  }

  previouslyDismissed(environment) { // eslint-disable-line no-unused-vars
    return true; // TODO: Check if the modal was previously dismissed for this environment
  }
}
