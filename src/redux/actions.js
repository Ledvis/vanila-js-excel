import { TABLE_CELL, TABLE_RESIZE, TABLE_STYLE, CUSTOM_STYLES, HEADER_TITLE } from '@/redux/types';

/**
 * @description
 * @export
 * @param {Object.<string, *>} data
 * @return {Object}
 */
export function resizeTableAction({ resizer, id, value }) {
  return {
    moduleName: 'root',
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
    moduleName: 'root',
    type: TABLE_CELL,
    id,
    value,
  };
}

/**
 * @description
 * @export
 * @param {Object.<String, String>} styles
 * @return {Object}
 */
export function updateStylesAction(styles) {
  return {
    moduleName: 'root',
    type: TABLE_STYLE,
    styles,
  };
}

/**
 * @description
 * @export
 * @param {Object.<String, *>} {id, styles}
 * @return {Object}
 */
export function saveCustomStyles({ id, styles }) {
  return {
    moduleName: 'root',
    type: CUSTOM_STYLES,
    id,
    styles,
  };
}

/**
 * @description
 * @param {Object.<string, string>} { value }
 * @return {Object}
 */
export function updateTitle({ value }) {
  return {
    moduleName: 'root',
    type: HEADER_TITLE,
    value,
  };
}
