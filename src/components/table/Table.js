import Base from '@/core/Base';
import { createTable } from '@/components/table/createTable.template';
import resizeHandler from '@/components/table/resizeHandler';
import { SelectHandler } from '@/components/table/SelectHandler';
import { shouldResize, shouldSelect } from '@/components/table/table.utils';
import { resizeTableAction, updateTextAction, updateStylesAction } from '@/redux/actions';
import { DEFAULT_TOOLBAR_STYLES } from '@/core/constants';
import { isEqual, parseValue, hasFormula } from '@/core/utils';
import { $ } from '@/core/Dom';

const styleKeys = Object.keys(DEFAULT_TOOLBAR_STYLES);

const ARROW_KEY = { up: 'ArrowUp', right: 'ArrowRight', down: 'ArrowDown', left: 'ArrowLeft' };
export const ALLOWED_KEYBOARD_KEYS = {
  enter: 'Enter',
  tab: 'Tab',
  ...ARROW_KEY,
};

/**
 * @description
 * @export
 * @class className
 */
export default class Table extends Base {
  static rowsCount = 15;

  /**
   *Creates an instance of Table.
   * @param {Object.<string, *>} options
   * @memberof Table
   */
  constructor(options) {
    const root = $.create('div', Table.className);

    super(root, {
      listeners: ['mousedown', 'keydown', 'input'],
      name: 'Table',
      subscribed: ['selectedCellTextState', 'selectedCellStyleState'],
      ...options,
    });
  }

  static className = 'excel__table';

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
      // if (this.isInFormulaMode) this.selector.$current.text(parseValue(this.selector.$current.text()));
    });
  }

  /**
   * @description
   * @param {*} state
   * @memberof Formula
   */
  onStoreUpdate({ selectedCellTextState, selectedCellStyleState }) {
    if (selectedCellTextState !== this.selector.$current.text()) {
      this.selector.$current.text(
        hasFormula(selectedCellTextState, true) ? parseValue(selectedCellTextState) : selectedCellTextState,
      );
    }
    if (selectedCellStyleState) this.selector.applyStyles(selectedCellStyleState);
  }

  /**
   * @description
   * @param {*} target
   * @memberof Table
   */
  selectCell(target) {
    this.selector.select(target);

    const { id, formula } = this.selector.$current.dataAttr();

    this.saveTextToStore({
      id,
      value: formula ? formula : this.selector.$current.text(),
    });
    this.saveStyleToStore();
  }

  /**
   * @description
   * @param {*} target
   * @memberof Table
   */
  selectCellsGroup(target) {
    this.selector.selectGroup(target);

    this.$emit(
        'table:groupSelected',
        this.selector.group.map(($cell) => $cell.dataAttr().id),
    );
  }

  /**
   * @description
   * @memberof Table
   */
  saveStyleToStore() {
    const { selectedCellStyleState: prevStyles } = this.store.getState();
    const cellStyles = this.selector.$current.css();

    const newStyles = styleKeys.reduce((acc, key) => {
      acc[key] = cellStyles[key];

      return acc;
    }, {});

    if (!isEqual(prevStyles, newStyles)) this.$dispatch(updateStylesAction(newStyles));
  }

  /**
   * @description
   * @param {Object.<String, String>} {id, value}
   * @memberof Table
   */
  saveTextToStore({ id, value }) {
    this.$dispatch(updateTextAction({ id, value }));
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
   * @param {Event} event
   * @memberof Table
   */
  onKeydown(event) {
    const hasValue = !!this.selector.$current.text();
    const withFormula = hasFormula(this.selector.$current.text());

    if (withFormula && event.key === ALLOWED_KEYBOARD_KEYS.enter) {
      event.preventDefault();

      this.selector.$current.dataAttr({
        key: 'formula',
        value: this.selector.$current.text(),
      });
      this.selector.$current.text(parseValue(this.selector.$current.text()));
      return;
    }

    if (hasValue && Object.values(ARROW_KEY).includes(event.key)) return;

    if (Object.values(ALLOWED_KEYBOARD_KEYS).includes(event.key) && !event.shiftKey) {
      this.selectCell(this.selector.selectNext(event.key));
    }
  }

  /**
   * @description
   * @memberof Table
   */
  onInput() {
    this.saveTextToStore({
      value: this.selector.$current.text(),
      id: this.selector.$current.dataAttr().id,
    });
  }

  /**
   * @description
   * @return {string}
   * @memberof Table
   */
  toHTML() {
    const {
      columnsWidthState: columnsWidth,
      rowsHeightState: rowsHeight,
      cellDataState: cellData,
      customCellStyleState: customStyles,
    } = this.store.getState();

    return createTable({
      rowsCount: Table.rowsCount,
      columnsWidth,
      rowsHeight,
      cellData,
      customStyles,
    });
  }
}
