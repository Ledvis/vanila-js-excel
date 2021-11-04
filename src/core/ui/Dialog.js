import { $ } from '@/core/Dom';
import Base from '@/core/Base.js';

/**
 * This class describes a dialog.
 *
 * @class      Dialog
 */
export default class Dialog extends Base {
  /**
   *Creates an instance of Dialog.
   * @param {String} content - inner dialog slot
   * @memberof Dialog
   */
  constructor({ contentEl }) {
    const root = $.create('div', 'dialog');

    super(root);

    this.$root.html(this.template).append(contentEl);

    this.close = this.close.bind(this);
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * { property_description }
   *
   * @method     template
   * @return     {<type>}  (description_of_the_return_value)
   */
  get template() {
    return `
        <button class="dialog__close material-icons"><i>close</i></button>
      `;
  }

  /**
   * { function_description }
   *
   * @method     open
   */
  open() {
    document.body.append(this.$root.el);
    this.$root.find('.dialog__close').on('click', this.close);
  }

  /**
   * { function_description }
   *
   * @method     close
   */
  close() {
    document.body.removeChild(this.$root.el);
    this.$root.off('click', this.close);
  }
}
