/**
 * @description
 * @class Dom
 */
class Dom {
  /**
   *Creates an instance of $.
   * @param {(string | HTMLElement)} selector
   * @memberof $
   */
  constructor(selector) {
    /**
     * @property {HTMLElement}
     */
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  /**
   * @description
   * @param {(Object | HTMLElement)} node
   * @return {Object}
   * @memberof Dom
   */
  append(node) {
    if ('$el' in node) node = node.$el;

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  /**
   * @description
   * @param {(string | null)} [html='']
   * @return {(Object | string)}
   * @memberof Dom
   */
  html(html = '') {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.innerHTML;
    }
  }

  /**
   * @description
   * @return {Object}
   * @memberof Dom
   */
  clear() {
    this.html('');

    return this;
  }

  /**
   * @description
   * @param {string} eventType
   * @param {function} cb
   * @memberof Dom
   */
  on(eventType, cb) {
    this.$el.addEventListener(eventType, cb);
  }

  /**
   * @description
   * @param {string} eventType
   * @param {function} cb
   * @memberof Dom
   */
  off(eventType, cb) {
    this.$el.removeEventListener(eventType, cb);
  }
}

/**
 * @description
 * @export
 * @param {*} selector
 * @return {HTMLElement}
 */
export function $(selector) {
  return new Dom(selector);
}

/**
 * @description
 * @param {string} element
 * @param {string} [className='']
 * @return {Object} - {@link Dom}
 */
$.create = (element, className = '') => {
  const _element = document.createElement(element);

  if (className) {
    _element.classList.add(className);
  }

  return $(_element);
};
