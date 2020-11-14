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

    if (selector === null) throw new Error('DOM selector can\'t be null');

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
  html(html) {
    if (typeof html === 'string') {
      this.el.innerHTML = html;
      return this;
    } else {
      return this.innerHTML;
    }
  }

  /**
   * @description
   * @param {String | Number} content
   * @return {(Object | String)}
   * @memberof Dom
   */
  text(content) {
    if (typeof content === 'string' || typeof content === 'number') {
      this.el.textContent = content;
      return this;
    } else {
      return this.el.value?.trim() || this.el.textContent?.trim();
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
   * @param {Object} data
   * @param {String} data.key
   * @param {String} data.value
   * @return {Object}
   * @memberof Dom
   */
  dataAttr(data) {
    if (!data) return this.el.dataset;
    if (typeof data !== 'object' && !('key' in data) && !('value' in data)) {
      throw new Error('Invalid data-attribute parameter');
    }

    this.el.dataset[data.key] = data.value;
  }

  /**
   * @description
   * @param {String} selector
   * @return {NodeList}
   * @memberof Dom
   */
  find(selector) {
    return $(this.el.querySelector(selector));
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
   * @return {Object}
   * @memberof Dom
   */
  focus() {
    this.el.focus();

    return this;
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

  /**
   * @description
   * @param {String} className
   * @memberof Dom
   * @return {Object}
   */
  addClass(className) {
    this.el.classList.add(className);

    return this;
  }

  /**
   * @description
   * @param {String} className
   * @memberof Dom
   * @return {Object}
   */
  removeClass(className) {
    this.el.classList.remove(className);

    return this;
  }

  /**
   * @description
   * @param {String} className
   * @memberof Dom
   * @return {Boolean}
   */
  hasClass(className) {
    return this.el.classList.contains(className);
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
