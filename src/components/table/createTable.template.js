import { DEFAULT_TOOLBAR_STYLES } from '@/core/constants';
import { camelCaseToSnakeCase } from '@/core/utils';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_COLUMN_WIDTH = '120px';
const DEFAULT_ROW_HEIGHT = '24px';

/**
 * @description
 * @param {_} _ - placeholder
 * @param {Number} index
 * @return {String}
 */
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

/**
 * @description
 * @param {Object} columnsWidth
 * @param {Number} index
 * @return {String}
 */
function createColumn(columnsWidth = {}) {
  return (char, index) => (
    `<div 
      class="column"
      style="width: ${columnsWidth[index] || DEFAULT_COLUMN_WIDTH}" 
      data-type="resizable"
      data-order-number="${index}"
    >
        ${char}
        <span class="resizer resizer--column" data-resizer="column" >
          <span class="resizer__slider" />
        </span>
      </div>`
  );
}

/**
 * @description
 * @param {Object.<string, *>} styles
 * @return {String}
 */
function parseStyles(styles) {
  return Object.keys(styles).map((key) => {
    return `${[camelCaseToSnakeCase(key)]}: ${styles[key]}`;
  }).join('; ');
}

/**
 * @description
 * @param {Number} rowNumber
 * @param {Object} columnsWidth
 * @return {String}
 */
function createCell(rowNumber, { columnsWidth = {}, cellData = {}, customStyles = {} } = {}) {
  const defaultStyles = parseStyles(DEFAULT_TOOLBAR_STYLES);

  return (_, index) =>
    `<div class="cell" 
      style="width: ${columnsWidth[index] || DEFAULT_COLUMN_WIDTH}; 
        ${customStyles[`${rowNumber}:${index}`] ? parseStyles(customStyles[`${rowNumber}:${index}`]) : defaultStyles}"
      data-type="cell-${index}"
      data-id="${rowNumber}:${index}"
      contenteditable
    >
      ${cellData[`${rowNumber}:${index}`] || ''}
    </div>`;
}

/**
 * @description
 * @param {String} index
 * @param {String} content
 * @param {Object.<string, *>} rowsHeight
 * @return {String}
 */
function createRow(index = '', content, rowsHeight = {}) {
  const resizer = index ?
    `<span class="resizer resizer--row" data-resizer="row" >
      <span class="resizer__slider" />
    </span >` :
    '';

  return `<div 
            class="row"
            data-type="resizable"
            data-order-number="${index}" 
            style="height: ${rowsHeight[index] || DEFAULT_ROW_HEIGHT}" 
          >
            <div class="row-info">
              ${index}
              ${resizer}
            </div>
            <div class="row-data">${content}</div>
          </div>`;
}

/**
 * @description
 * @export
 * @param {number} [rowsCount]
 * @return {String}
 */
export function createTable({ rowsCount, columnsWidth, rowsHeight, cellData, customStyles }) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const columns = new Array(columnsCount).fill('').map(toChar).map(createColumn(columnsWidth)).join('');
  const rows = [];
  rows.push(createRow('', columns));

  for (let index = 0; index < rowsCount; index++) {
    const cells = new Array(columnsCount).fill('').map(createCell(index, { columnsWidth, cellData, customStyles })).join('');

    rows.push(createRow(index + 1, cells, rowsHeight));
  }

  return rows.join('');
}
