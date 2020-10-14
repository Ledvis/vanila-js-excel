import { isEqual } from './utils';

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
    let prevState = this.store.getState('root');

    this.#unsubscribeFn = this.store.subscribe('root', ({ root }) => {
      Object.keys(root).forEach(((stateKey) => {
        if (!(isEqual(prevState[stateKey], root[stateKey]))) {
          components.forEach((component) => {
            if (component.isSubscribed(stateKey)) component.onStoreUpdate({ [stateKey]: root[stateKey] });
          });
        }
      }));

      prevState = this.store.getState('root');
    });
  }

  /**
   * @description
   * @memberof StoreDiff
   */
  unsubscribeFromStore() {
    this.#unsubscribeFn();
  }
}
