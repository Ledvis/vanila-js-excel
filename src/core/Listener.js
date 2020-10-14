import { capitalize } from '@/core/utils';

/**
 * @description
 * @export
 * @class Listener
 */
export default class Listener {
  /**
   *Creates an instance of Listener.
   * @param {Object} root
   * @param {Array.<string>} [listeners=[]]
   * @memberof Listener
   */
  constructor(root, listeners = []) {
    if (!root) throw new Error('root is not provided');

    /**
     * @type {Object} root object
     */
    this.$root = root;
    this.listeners = listeners;
  }

  /**
   * @description
   * @memberof Listener
   */
  addListeners() {
    if (!this.listeners.length) return;

    this.listeners.forEach((listener) => {
      const handlerName = getHandlerName(listener);

      if (!this[handlerName]) {
        throw new Error(`${listener} handler is not provided for ${this.componentName} component`);
      }

      this[handlerName] = this[handlerName].bind(this);
      this.$root.on(listener, this[handlerName]);
    });
  }

  /**
   * @description
   * @param {String} listener
   * @memberof Listener
   */
  removeListener(listener) {
    const listenerIndex = this.listeners.findIndex((_listener) => _listener === listener);
    const handlerName = getHandlerName(listener);

    this.listeners.splice(listenerIndex, 1);

    this.$root.off(listener, this[handlerName]);
  }

  /**
   * @description
   * @memberof Listener
   */
  removeAllListeners() {
    this.listeners.forEach((_listener) => {
      const handlerName = getHandlerName(_listener);

      this.$root.off(_listener, this[handlerName]);
    });
  }
}

/**
 * @description
 * @param {string} listenerName
 * @return {string}
 */
function getHandlerName(listenerName) {
  return 'on' + capitalize(listenerName);
}
