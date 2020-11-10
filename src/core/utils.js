/**
 * @description
 * @export
 * @param {string} [string='']
 * @return {string}
 */
export function capitalize(string = '') {
  if (typeof string !== 'string') {
    throw new Error('only string type should be provided');
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @description
 * @export
 * @param {String} key
 * @param {Object.<string, *>} [data=null]
 * @return {(Undefined | Object)}
 */
export function storage(key, data = null) {
  if (!data && data !== '') return JSON.parse(localStorage.getItem(key));

  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * @description
 * @export
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 */
export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  } else {
    return a === b;
  }
}

/**
 * @description
 * @export
 * @param {(Object|Array)} value
 * @return {(Object|Array)}
 */
export function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * @description
 * @export
 * @param {String} string
 * @return {String}
 */
export function camelCaseToSnakeCase(string) {
  return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * @description
 * @export
 * @param {Function} fn
 * @param {Number} wait
 * @return {Function}
 */
export function debounce(fn, wait) {
  let timeout;

  return function(...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      clearTimeout(timeout);
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args);
    }, wait);
  };
}
