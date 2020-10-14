import Base from '@/core/Base';
import { updateTextAction } from '@/redux/actions';

const ALLOWED_KEYBOARD_KEYS = ['Enter', 'Tab'];

/**
 * @description
 * @export
 * @class Formula
 */
export default class Formula extends Base {
  /**
   *Creates an instance of Formula.
   * @param {Object} root
   * @param {Object.<string, *>} options
   * @memberof Formula
   */
  constructor(root, options) {
    super(root, {
      listeners: ['input', 'keydown'],
      name: 'Formula',
      subscribed: ['selectedCellTextState', 'selectedCellIdState'],
      ...options,
    });
  }

  static className = 'excel__formula'

  /**
   * @description
   * @memberof Formula
   */
  mounted() {
    super.mounted();
    this.$input = this.$root.find('.input');
    const { selectedCellTextState } = this.store.getState('root');

    this.$input.text(selectedCellTextState);
  }

  /**
   * @description
   * @param {*} state
   * @memberof Formula
   */
  onStoreUpdate({ selectedCellTextState, selectedCellIdState }) {
    this.$input.dataAttr({ key: 'selectedCellIdState', value: selectedCellIdState });
    this.$input.text(selectedCellTextState);
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
