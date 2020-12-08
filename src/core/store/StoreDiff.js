import { isEqual, debounce } from '@/core/utils';

/**
 * @description
 * @export
 * @class StoreDiff
 */
export default class StoreDiff {
  #unsubscribeFn = null;

  /**
   *Creates an instance of StoreDiff.
   * @param {*} store
   * @memberof StoreDiff
   */
  constructor(store) {
    this.store = store;
  }

  /**
   * @description
   * @param {*} components
   * @memberof StoreDiff
   */
  subscribeForStore(components) {
    let prevState = this.store.getState();

    const storeListener = debounce((state) => {
      Object.keys(state).forEach(((stateKey) => {
        if (!(isEqual(prevState[stateKey], state[stateKey]))) {
          components.forEach((component) => {
            if (component.isSubscribed(stateKey)) component.onStoreUpdate({ [stateKey]: state[stateKey] });
          });
        }
      }));

      prevState = this.store.getState();
    }, 300);

    this.#unsubscribeFn = this.store.subscribe(storeListener);
  }

  /**
   * @description
   * @memberof StoreDiff
   */
  unsubscribeFromStore() {
    this.#unsubscribeFn();
  }
}
