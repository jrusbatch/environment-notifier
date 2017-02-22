export default class KeyProvider {
  getLocalStorageKeyForEnvironment(environment) {
    if (!environment) { throw new Error('environment must be provided.'); }
    if (!environment.name) { throw new Error('environment.name must be set.'); }

    return `environment-notifier-modal-dismissed:${environment.name}`;
  }
}
