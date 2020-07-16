const CODES = {
  A: 65,
  Z: 90,
};

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
 * @param {String} char
 * @return {String}
 */
function createColumn(char) {
  return `<div class="column">
            ${char}
          </div>`;
}

/**
 * @description
 * @param {String} content
 * @return {String}
 */
function createCell(content) {
  return `<div class="cell" contenteditable>${content}</div>`;
}

/**
 * @description
 * @param {String} index
 * @param {String} content
 * @return {String}
 */
function createRow(index = '', content) {
  return `<div class="row">
            <div class="row-info">${index}</div>
            <div class="row-data">${content}</div>
          </div>`;
}

/**
 * @description
 * @export
 * @param {number} [rowsCount=15]
 * @return {String}
 */
export function createTable(rowsCount = 15) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const columns = new Array(columnsCount).fill('').map(toChar).map(createColumn).join('');
  const rows = [];
  rows.push(createRow('', columns));

  for (let index = 0; index < rowsCount; index++) {
    const cells = new Array(columnsCount).fill('').map(createCell).join('');

    rows.push(createRow(index + 1, cells));
  }

  return rows.join('');
}
