export default class BrowserStorage {
  getModalDismissedAt(environment) {
    if (!environment) { throw new Error('environment must be provided.'); }

    if (localStorage) {
      return localStorage.getItem(this.getModalDismissedStorageKey(environment)) || null;
    }

    return null;
  }

  setModalDismissed(environment) {
    if (!environment) { throw new Error('environment must be provided.'); }

    if (localStorage) {
      localStorage.setItem(
        this.getModalDismissedStorageKey(environment),
        new Date().toJSON());
    }
  }

  getModalDismissedStorageKey(environment) {
    if (!environment) { throw new Error('environment must be provided.'); }
    if (!environment.name) { throw new Error('environment.name must be set.'); }

    return `environment-notifier-modal-dismissed:${environment.name}`;
  }
}
