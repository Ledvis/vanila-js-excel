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
 * @param {Number} index
 * @return {String}
 */
function createColumn(char, index) {
  return `<div class="column" data-type="resizable" data-order-number="${index}">
            ${char}
            <span class="resizer resizer--column" data-resizer="column" >
              <span class="resizer__slider" />
            </span>
          </div>`;
}

/**
 * @description
 * @param {Number} rowNumber
 * @return {String}
 */
function createCell(rowNumber) {
  return (content, index) =>
    `<div class="cell" data-type="cell-${index}" data-id="${rowNumber}:${index}" contenteditable>${content}</div>`;
}

/**
 * @description
 * @param {String} index
 * @param {String} content
 * @return {String}
 */
function createRow(index = '', content) {
  const resizer = index ?
    `<span class="resizer resizer--row" data-resizer="row" >
      <span class="resizer__slider" />
    </span >` :
    '';

  return `<div class="row" data-type="resizable" >
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
export function createTable(rowsCount) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const columns = new Array(columnsCount).fill('').map(toChar).map(createColumn).join('');
  const rows = [];
  rows.push(createRow('', columns));

  for (let index = 0; index < rowsCount; index++) {
    const cells = new Array(columnsCount).fill('').map(createCell(index)).join('');

    rows.push(createRow(index + 1, cells));
  }

  return rows.join('');
}
