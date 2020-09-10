import { $ } from '@/core/Dom';
import Observer from '@/core/Observer';

/**
 * @description
 * @export
 * @class Excel
 */
export default class Excel {
  /**
   *Creates an instance of Excel.
   * @param {string} selector - DOM selector
   * @param {Object.<string, *>} options
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
    this.observer = new Observer();
  }

  /**
   * @description
   * @return {Object}
   * @memberof Excel
   */
  getRoot() {
    const $rootEl = $.create('div', 'excel');
    const options = {
      observer: this.observer,
    };

    this.components = this.components.map((Component, index) => {
      const $childEl = $.create('div', Component.className);
      const childComponent = new Component($childEl, options);

      $childEl.html(childComponent.toHTML());
      $rootEl.append($childEl);

      return childComponent;
    });

    return $rootEl;
  }

  /**
   * @description
   * @memberof Excel
   */
  render() {
    this.$el.append(this.getRoot());

    this.mounted();
  }

  /**
   * @description
   * @memberof Excel
   */
  mounted() {
    this.components.forEach((component) => component.mounted());
  }

  /**
   * @description
   * @memberof Excel
   */
  destroyed() {
    this.components.forEach((component) => component.destroyed());
  }
}
