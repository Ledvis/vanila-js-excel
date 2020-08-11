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
    this.el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  /**
   * @description
   * @param {(Object | HTMLElement)} node
   * @return {Object}
   * @memberof Dom
   */
  append(node) {
    if ('el' in node) node = node.el;

    if (Element.prototype.append) {
      this.el.append(node);
    } else {
      this.el.appendChild(node);
    }

    return this;
  }

  /**
   * @description
   * @param {(String | Undefined)} [html='']
   * @return {(Object | String)}
   * @memberof Dom
   */
  html(html = '') {
    if (typeof html === 'string') {
      this.el.innerHTML = html;
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
   * @param {String} eventType
   * @param {Function} cb
   * @return {Object}
   * @memberof Dom
   */
  on(eventType, cb) {
    this.el.addEventListener(eventType, cb);

    return this;
  }

  /**
   * @description
   * @param {string} eventType
   * @param {function} cb
   * @return {Object}
   * @memberof Dom
   */
  off(eventType, cb) {
    this.el.removeEventListener(eventType, cb);

    return this;
  }

  /**
   * @description
   * @param {String} selector
   * @return {Object}
   * @memberof Dom
   */
  closest(selector) {
    return $(this.el.closest(selector));
  }

  /**
   * @description
   * @return {DOMRect}
   * @memberof Dom
   */
  position() {
    return this.el.getBoundingClientRect();
  }

  /**
   * @description
   * @return {Object}
   * @memberof Dom
   */
  children() {
    return this.el.children;
  }

  /**
   * @description
   * @readonly
   * @memberof Dom
   */
  get data() {
    if (!this.el.dataset) throw new Error('Data attribute should be provided on html tag');

    return this.el.dataset;
  }

  /**
   * @description
   * @param {String} selector
   * @return {NodeList}
   * @memberof Dom
   */
  findAll(selector) {
    return this.el.querySelectorAll(selector);
  }

  /**
   * @description
   * @param {Object} [style={}]
   * @return {Object}
   * @memberof Dom
   */
  css(style) {
    if (typeof style === 'object') {
      for (const key in style) {
        if (key in style) {
          this.el.style[key] = style[key];
        }
      }

      return this;
    } else {
      return this.el.style;
    }
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
