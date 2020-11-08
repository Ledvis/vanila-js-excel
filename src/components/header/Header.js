import Base from '@/core/Base';
import { $ } from '@/core/Dom';
import { updateTitle } from '@/redux/actions';

/**
 * @description
 * @export
 * @class Header
 */
export default class Header extends Base {
  static className = 'excel__header'

  /**
   *Creates an instance of Header.
   * @param {Object} root
   * @param {Object} options
   * @memberof Header
   */
  constructor(root, options) {
    super(root, {
      listeners: ['input'],
      ...options,
    });
  }

  /**
   * @description
   * @param {*} { target }
   * @memberof Header
   */
  onInput({ target }) {
    this.$dispatch(updateTitle({ value: $(target).text() }));
  }

  /**
   * @description
   * @return {string}
   * @memberof Header
   */
  toHTML() {
    const title = this.store.getState('root').titleState;

    return `
        <input type="text" class="input" value="${title}" />
        <div>
          <div class="button">
            <i class="material-icons">delete</i>
          </div>
          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>
        </div>
      `;
  }
}
