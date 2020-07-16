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
   * @param {*} [options={}]
   * @memberof Base
   */
  constructor(root, options = {}) {
    super(root, options);
  }

  /**
   * @description
   * @memberof Base
   */
  initListeners() {
    this.addListener();
  }
}
