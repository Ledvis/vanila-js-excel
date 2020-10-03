import { TABLE_CELL, TABLE_RESIZE } from './types';

/**
 * @description
 * @export
 * @param {Object.<string, *>} data
 * @return {Object}
 */
export function resizeTableAction({ resizer, id, value }) {
  return {
    moduleName: 'table',
    type: TABLE_RESIZE,
    resizer: resizer === 'row' ? 'rowsHeightState' : 'columnsWidthState',
    id,
    value,
  };
}

/**
 * @description
 * @export
 * @param {Object.<string, *>} { value, id }
 * @return {Object}
 */
export function updateTextAction({ id, value }) {
  return {
    moduleName: 'table',
    type: TABLE_CELL,
    id,
    value,
  };
}
