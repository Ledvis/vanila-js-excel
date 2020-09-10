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
   * @param {Object.<string, string>} options.name
   * @param {Object.<string, Array>} options.listeners
   * @param {Object.<string, Object>} options.observer
   * @memberof Base
   */
  constructor(root, options = {}) {
    super(root, options.listeners);

    this.componentName = options.name;
    this.observer = options.observer;
    this.unsubscribers = [];
  }

  /**
   * @description
   * @param {String} eventName
   * @param {Array} args
   * @memberof Base
   */
  $emit(eventName, ...args) {
    this.observer.emit(eventName, args);
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
