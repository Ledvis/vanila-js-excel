import Base from '@/core/Base';
import { debounce } from '@/core/utils';
import { updateTextAction } from '@/redux/actions';
import { $ } from '@/core/Dom';

const ALLOWED_KEYBOARD_KEYS = ['Enter', 'Tab'];

/**
 * @description
 * @export
 * @class Formula
 */
export default class Formula extends Base {
  /**
   *Creates an instance of Formula.
   * @param {Object.<string, *>} options
   * @memberof Formula
   */
  constructor(options) {
    const root = $.create('div', Formula.className);

    super(root, {
      listeners: ['input', 'keydown'],
      name: 'Formula',
      subscribed: ['selectedCellTextState', 'selectedCellIdState'],
      ...options,
    });
  }

  static className = 'excel__formula';

  /**
   * @description
   * @memberof Formula
   */
  created() {
    super.created();

    this.onInput = debounce(this.onInput, 300);
  }

  /**
   * @description
   * @memberof Formula
   */
  mounted() {
    super.mounted();
    this.$input = this.$root.find('.input');
    const { selectedCellTextState, selectedCellIdState } = this.store.getState();

    this.$input.text(selectedCellTextState);
    this.$input.dataAttr({ key: 'selectedCellId', value: selectedCellIdState });
  }

  /**
   * @description
   * @param {*} state
   * @memberof Formula
   */
  onStoreUpdate({ selectedCellTextState, selectedCellIdState }) {
    if (this.$input.text() !== selectedCellTextState) this.$input.text(selectedCellTextState);
    if (selectedCellIdState) this.$input.dataAttr({ key: 'selectedCellId', value: selectedCellIdState });
  }

  /**
   * @description
   * @return {sting}
   * @memberof Formula
   */
  toHTML() {
    return `
        <div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>
      `;
  }

  /**
   * @description
   * @memberof Formula
   */
  onInput() {
    this.$dispatch(updateTextAction({ id: this.$input.dataAttr().selectedCellId, value: this.$input.text() }));
  }

  /**
   * @description
   * @param {Event} event
   * @memberof Formula
   */
  onKeydown(event) {
    if (ALLOWED_KEYBOARD_KEYS.includes(event.key)) {
      event.preventDefault();

      this.$emit('formula:enter');
    }
  }
}
