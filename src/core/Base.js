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
   * @memberof Base
   */
  constructor(root, options = {}) {
    super(root, options.listeners);

    this.componentName = options.name;
  }

  /**
   * @description
   * @memberof Base
   */
  initListeners() {
    this.addListeners();
  }
}
