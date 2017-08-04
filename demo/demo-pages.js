document.getElementById('current-environment-info').innerHTML =
  JSON.stringify(window.environmentNotifier.getCurrentEnvironment(), null, 2);

document.getElementById('environment-notifier-as-json').innerHTML =
  JSON.stringify(window.environmentNotifier, null, 2);

var localStorageKey = 'environment-notifier-modal-dismissed:' + window.environmentNotifier.getCurrentEnvironment().name;

function updateModalDismissedAt() {
  document.getElementById('modal-dismissed-at').innerHTML = localStorage.getItem(localStorageKey) || '---';
}

document.getElementById('clear-modal-dismissed').addEventListener('click', function(evt) {
  evt.preventDefault();

  localStorage.removeItem(localStorageKey);

  updateModalDismissedAt();
});

document.addEventListener('environmentNotifier.modalDismissed', function(evt) {
  updateModalDismissedAt();
});

updateModalDismissedAt();
