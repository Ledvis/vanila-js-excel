import Base from '@/core/Base';
import { createTable } from '@/components/table/createTable.template';
import resizeHandler from '@/components/table/resizeHandler';
import { SelectHandler } from '@/components/table/SelectHandler';
import { shouldResize, shouldSelect } from '@/components/table/table.utils';
import { resizeTableAction, updateTextAction } from '@/redux/actions';

export const ALLOWED_KEYBOARD_KEYS = {
  enter: 'Enter', tab: 'Tab', up: 'ArrowUp', right: 'ArrowRight', down: 'ArrowDown', left: 'ArrowLeft',
};

/**
 * @description
 * @export
 * @class className
 */
export default class Table extends Base {
  static rowsCount = 15

  /**
   *Creates an instance of Table.
   * @param {*} root
   * @param {Object.<string, *>} options
   * @memberof Table
   */
  constructor(root, options) {
    super(root, {
      listeners: ['mousedown', 'keydown', 'input'],
      name: 'Table',
      ...options,
    });
  }

  static className = 'excel__table'

  /**
   * @description
   * @memberof Table
   */
  mounted() {
    super.mounted();

    this.selector = new SelectHandler(this.$root);
    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$subscribe('table', ({ table: { cellDataState, selectedCellIdState } }) => {
      const text = cellDataState[selectedCellIdState];

      this.selector.$current.text(text);
    });
    this.$on('formula:enter', () => {
      this.selector.$current.focus();
    });
  }

  /**
   * @description
   * @param {*} target
   * @memberof Table
   */
  selectCell(target) {
    this.selector.select(target);
    this.updateCellText();
  }

  /**
   * @description
   * @memberof Table
   */
  updateCellText() {
    this.$dispatch(updateTextAction({
      value: this.selector.$current.text(),
      id: this.selector.$current.dataAttr().id,
    }));
  }

  /**
   * @description
   * @param {Event} event
   * @memberof Table
   */
  async onMousedown({ target, shiftKey }) {
    if (shouldResize(target)) {
      const data = await resizeHandler(this.$root, target);

      this.$dispatch(resizeTableAction(data));
    } else if (shouldSelect(target)) {
      if (shiftKey) {
        this.selector.selectGroup(target);
        return;
      }

      this.selectCell(target);
    }
  }

  /**
   * @description
   * @param {String} { key }
   * @memberof Table
   */
  onKeydown({ key, shiftKey }) {
    if (Object.values(ALLOWED_KEYBOARD_KEYS).includes(key) && !shiftKey) {
      this.selectCell(this.selector.selectNext(key));
    }
  }

  /**
   * @description
   * @memberof Table
   */
  onInput() {
    this.updateCellText();
  }

  /**
   * @description
   * @return {string}
   * @memberof Table
   */
  toHTML() {
    return createTable({
      rowsCount: Table.rowsCount,
      columnsWidth: this.store.getState('table').columnsWidthState,
      rowsHeight: this.store.getState('table').rowsHeightState,
      cellData: this.store.getState('table').cellDataState,
    });
  }
}
