import Base from '@/core/Base';
import { createTable } from '@/components/table/createTable.template';
import resizeHandler from '@/components/table/resizeHandler';
import { SelectHandler } from '@/components/table/SelectHandler';
import { shouldResize, shouldSelect } from '@/components/table/table.utils';

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

    this.$on('formula:input', (text) => {
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
    this.$selected = this.selector.select(target);
    this.$emit('table:input', this.$selected.text());
  }

  /**
   * @description
   * @param {Event} event
   * @memberof Table
   */
  onMousedown({ target, shiftKey }) {
    if (shouldResize(target)) {
      resizeHandler(this.$root, target);
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
    this.$emit('table:input', this.selector.$current.text());
  }

  /**
   * @description
   * @return {string}
   * @memberof Table
   */
  toHTML() {
    return createTable(Table.rowsCount);
  }
}
