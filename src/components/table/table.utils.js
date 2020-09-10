const TYPE = {
  cell: 'id',
  resizer: 'resizer',
};

/**
 * @description
 * @export
 * @param {HTMLElement} target
 * @return {Boolean}
 */
export function shouldResize(target) {
  return target.dataset[TYPE.resizer];
}

/**
 * @description
 * @export
 * @param {HTMLElement} target
 * @return {Boolean}
 */
export function shouldSelect(target) {
  return target.dataset[TYPE.cell];
}
