import Listener from '@/core/Listener';

/**
 * @description
 * @export
 * @class Base
 * @extends {Listener}
 */
export default class Base extends Listener {
  /**
   *Creates an instance of Base.
   * @param {Object} root
   * @param {Object} [options={}]
   * @param {Object.<String, String>} options.name
   * @param {Object.<String, Array>} options.listeners
   * @param {Object.<String, Object>} options.observer
   * @memberof Base
   */
  constructor(root, options = {}) {
    super(root, options.listeners);

    this.componentName = options.name;
    this.observer = options.observer;
    this.store = options.store;
    this.subscribed = options.subscribed || [];

    this.unsubscribers = [];
  }

  /**
   * @description
   * @param {String} eventName
   * @param {Array} args
   * @memberof Base
   */
  $emit(eventName, ...args) {
    this.observer.emit(eventName, ...args);
  }

  /**
   * @description
   * @param {String} eventName
   * @param {Function} cb
   * @memberof Base
   */
  $on(eventName, cb) {
    const unsubscribe = this.observer.on(eventName, cb);

    this.unsubscribers.push(unsubscribe);
  }

  /**
   * @description
   * @param {Object.<String, *>} action
   * @memberof Base
   */
  $dispatch(action) {
    this.store.dispatch(action);
  }

  /**
   * @description
   * @param {Object} state
   * @memberof Base
   */
  onStoreUpdate(state) {
    console.warn(`Provide store listener function for ${this.componentName} component`);
  }

  /**
   * @description
   * @param {String} key
   * @memberof Base
   * @return {Boolean}
   */
  isSubscribed(key) {
    return this.subscribed.includes(key);
  }

  /**
   * @description
   * @memberof Base
   */
  mounted() {
    this.addListeners();
  }

  /**
   * @description
   * @memberof Base
   */
  destroyed() {
    this.removeAllListeners();

    this.unsubscribers.forEach((unsubscribe) => unsubscribe());
  }
}
