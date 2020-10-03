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
  if (!data) return JSON.parse(localStorage.getItem(key));

  localStorage.setItem(key, JSON.stringify(data));
}
