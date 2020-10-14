import { $ } from '@/core/Dom';
import Observer from '@/core/Observer';
import StoreDiff from '@/core/StoreDiff';

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
    this.storeDiff = new StoreDiff(options.store);
    this.store = options.store;
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
      store: this.store,
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

    this.storeDiff.subscribeForStore(this.components);
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
    this.storeDiff.unsubscribeFromStore();
    this.components.forEach((component) => component.destroyed());
  }
}
