import { $ } from '@/core/Dom';
import { ALLOWED_KEYBOARD_KEYS } from './Table';

/**
 * @description
 * @export
 * @class SelectHandler
 */
export class SelectHandler {
  static className = 'selected'

  /**
   *Creates an instance of SelectHandler.
   * @param {Object} $root
   * @memberof SelectHandler
   */
  constructor($root) {
    this.$root = $root;
    /**
     * @type {Array} Selected DOM elements
     */
    this.group = [];
    this.$current = null;
  }

  /**
   * @description
   * @param {String} id
   * @return {Object.<String, Number>}
   * @memberof SelectHandler
   */
  parseId(id) {
    const [rowId, columnId] = id.split(':');

    return {
      rowId: +rowId,
      columnId: +columnId,
    };
  }

  /**
   * @description
   * @readonly
   * @memberof SelectHandler
   */
  get currentId() {
    return this.parseId(this.$current.el.dataset.id);
  }

  /**
   * @description
   * @param {Number} start
   * @param {Number} end
   * @return {Array}
   * @memberof SelectHandler
   */
  getSelectionRange(start, end) {
    if (end > start) {
      [end, start] = [start, end];
    }
    const delta = (start - end) + 1;

    return new Array(delta).fill('').map((_, index) => index + end);
  }

  /**
   * @description
   * @param {String} targetId
   * @return {Array}
   * @memberof SelectHandler
   */
  getSelectionMatrix(targetId) {
    const { rowId: rowStart, columnId: columnStart } = this.currentId;
    const { rowId: rowEnd, columnId: columnEnd } = this.parseId(targetId);

    const rowsRange = this.getSelectionRange(+rowStart, +rowEnd);
    const columnsRange = this.getSelectionRange(+columnStart, +columnEnd);

    const cellIds = rowsRange.reduce((ids, row) => {
      columnsRange.forEach((column) => {
        ids.push(`${row}:${column}`);
      });

      return ids;
    }, []);

    return cellIds;
  }

  /**
   * @description
   * @param {*} target
   * @return {Object} DOM class instance
   * @memberof SelectHandler
   */
  normalizeEl(target) {
    return target = 'el' in target ? target : $(target);
  }

  /**
   * @description
   * @param {(HTMLElement|Object)} target
   * @return {Object}
   * @memberof SelectHandler
   */
  select(target) {
    this.unselectAll();

    this.$current = this.normalizeEl(target);

    this.group.push(this.$current);

    this.$current.focus().addClass(SelectHandler.className);

    return this.$current;
  }

  /**
   * @description
   * @param {(HTMLElement|Object)} target
   * @memberof SelectHandler
   */
  selectGroup({ dataset: { id } }) {
    this.unselectAll();

    this.group = this.getSelectionMatrix(id).map((cellId) => {
      return this.$root.find(`[data-id="${cellId}"]`);
    });

    this.group.forEach(($target) => {
      $target.addClass(SelectHandler.className);
    });
  }

  /**
   * @description
   * @param {String} key
   * @return {Object}
   * @memberof SelectHandler
   */
  selectNext(key) {
    const MIN_ID_VALUE = 0;
    let { rowId, columnId } = this.currentId;

    switch (key) {
      case ALLOWED_KEYBOARD_KEYS.enter:
      case ALLOWED_KEYBOARD_KEYS.down:
        rowId++;
        break;

      case ALLOWED_KEYBOARD_KEYS.up:
        rowId = rowId <= MIN_ID_VALUE ? MIN_ID_VALUE : rowId - 1;
        break;

      case ALLOWED_KEYBOARD_KEYS.right:
      case ALLOWED_KEYBOARD_KEYS.tab:
        columnId++;
        break;

      case ALLOWED_KEYBOARD_KEYS.left:
        columnId = columnId <= MIN_ID_VALUE ? MIN_ID_VALUE : columnId - 1;
        break;
    }

    return this.$root.find(`[data-id="${rowId}:${columnId}"]`);
  }

  /**
   * @description
   * @memberof SelectHandler
   */
  unselectAll() {
    this.group.forEach(($el) => $el.removeClass(SelectHandler.className));
    this.group.length = 0;
  }

  /**
   * @description
   * @param {Object.<String, String>} styles
   * @memberof SelectHandler
   */
  applyStyles(styles) {
    this.group.forEach(($cell) => {
      $cell.css(styles);
    });
  }
}
