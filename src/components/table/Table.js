import Base from '@/core/Base';
import { createTable } from '@/components/table/createTable.template';
import resizeHandler from '@/components/table/resizeHandler';
import { SelectHandler } from '@/components/table/SelectHandler';
import { shouldResize, shouldSelect } from '@/components/table/table.utils';
import { resizeTableAction, updateTextAction, updateStylesAction } from '@/redux/actions';
import { DEFAULT_TOOLBAR_STYLES } from '@/core/constants';
import { isEqual } from '@/core/utils';

const styleKeys = Object.keys(DEFAULT_TOOLBAR_STYLES);

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
      subscribed: ['selectedCellTextState', 'selectedCellStyleState'],
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

    this.$on('formula:enter', () => {
      this.selector.$current.focus();
    });
  }

  /**
   * @description
   * @param {*} state
   * @memberof Formula
   */
  onStoreUpdate({ selectedCellTextState, selectedCellStyleState }) {
    if (this.selector.$current.text() !== selectedCellTextState) this.selector.$current.text(selectedCellTextState);
    if (selectedCellStyleState) this.selector.applyStyles(selectedCellStyleState);
  }

  /**
   * @description
   * @param {*} target
   * @memberof Table
   */
  selectCell(target) {
    this.selector.select(target);
    this.updateCellText();
    this.updateCellStyles();
  }

  /**
   * @description
   * @param {*} target
   * @memberof Table
   */
  selectCellsGroup(target) {
    this.selector.selectGroup(target);

    this.$emit('table:groupSelected', this.selector.group.map(($cell) => $cell.dataAttr().id));
  }

  /**
   * @description
   * @memberof Table
   */
  updateCellStyles() {
    const { selectedCellStyleState: prevStyles } = this.store.getState('root');
    const cellStyles = this.selector.$current.css();

    const newStyles = styleKeys.reduce((acc, key) => {
      acc[key] = cellStyles[key];

      return acc;
    }, {});

    if (!isEqual(prevStyles, newStyles)) this.$dispatch(updateStylesAction(newStyles));
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
        this.selectCellsGroup(target);

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
   * @param {Event} event
   * @memberof Table
   */
  onInput(event) {
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
      columnsWidth: this.store.getState('root').columnsWidthState,
      rowsHeight: this.store.getState('root').rowsHeightState,
      cellData: this.store.getState('root').cellDataState,
      customStyles: this.store.getState('root').customCellStyleState,
    });
  }
}
