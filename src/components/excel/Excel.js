import { $ } from '@/core/Dom';
import Observer from '@/core/Observer';
import StoreDiff from '@/core/store/StoreDiff';

/**
 * @description
 * @export
 * @class Excel
 */
export default class Excel {
  /**
   *Creates an instance of Excel.
   * @param {Object.<String, any>} options
   * @param {Array.<Object>} options.components
   * @memberof Excel
   */
  constructor(options) {
    /**
     * @property {Array}
     */
    this.components = options.components || [];
    this.observer = new Observer();
    this.storeDiff = new StoreDiff(options.store);
    this.store = options.store;
    this.processor = options.processor;
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
      processor: this.processor,
    };

    this.components = this.components.map((Component) => {
      const childComponent = new Component(options);

      childComponent.$root.html(childComponent.toHTML());
      $rootEl.append(childComponent.$root);

      return childComponent;
    });

    return $rootEl;
  }

  /**
   * @description
   * @memberof Excel
   */
  mounted() {
    this.storeDiff.subscribeForStore(this.components);
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
