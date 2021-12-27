import { $ } from '@/core/Dom';
import Base from '@/core/Base.js';
import Observer from '@/core/Observer';

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
  constructor({ contentEl, title }) {
    const root = $.create('div', 'dialog');

    super(root, {
      observer: new Observer,
    });

    this.title = title;
    this.close = this.close.bind(this);
    this.isOpened = false;

    this.$root.html(this.template).append(contentEl);
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
        <div class="dialog__header">
          <h3 class="dialog__title">${this.title}</h3>
          <button class="dialog__close material-icons"><i>close</i></button>
        </div>
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
    this.isOpened = true;
  }

  /**
   * { function_description }
   *
   * @method     close
   */
  close() {
    document.body.removeChild(this.$root.el);
    this.$root.off('click', this.close);
    this.isOpened = false;
  }
}
