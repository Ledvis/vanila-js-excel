import { $ } from '@/core/Dom';

/**
 * @description
 * @export
 * @class Excel
 */
export default class Excel {
  /**
   *Creates an instance of Excel.
   * @param {string} selector - DOM selector
   * @param {Object} [options]
   * @param {Object.<string, Array>} options.components - composition components Class
   * @memberof Excel
   */
  constructor(selector, options) {
    /**
    * @property {Object}
     */
    this.$el = $(selector);
    /**
     * @property {Array}
     */
    this.components = options.components || [];
  }

  /**
   * @description
   * @return {Object}
   * @memberof Excel
   */
  getRoot() {
    const rootEl = $.create('div', 'excel');

    this.components = this.components.map((Component, index) => {
      const childEl = $.create('div', Component.className);
      const childComponent = new Component(childEl);

      childEl.html(childComponent.toHTML());
      rootEl.append(childEl);

      return childComponent;
    });

    return rootEl;
  }

  /**
   * @description
   * @memberof Excel
   */
  render() {
    this.$el.append(this.getRoot());

    this.components.forEach((component) => component.initListeners());
  }
}
