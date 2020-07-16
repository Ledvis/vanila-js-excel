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
