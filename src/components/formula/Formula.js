import Base from '@/core/Base';

/**
 * @description
 * @export
 * @class Formula
 */
export default class Formula extends Base {
  /**
   *Creates an instance of Formula.
   * @param {Object} root
   * @memberof Formula
   */
  constructor(root) {
    super(root, {
      listeners: ['input', 'click'],
      name: 'Formula',
    });
  }

  static className = 'excel__formula'

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
   * @param {Event} event
   * @memberof Formula
   */
  onInput(event) {
    console.log(event);
  }

  /**
   * @description
   * @param {Event} event
   * @memberof Formula
   */
  onClick(event) {
    console.log(event);
  }
}
