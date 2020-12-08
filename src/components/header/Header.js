import Base from '@/core/Base';
import { $ } from '@/core/Dom';
import { updateTitle } from '@/redux/actions';
import { CurrentRoute } from '@/router/CurrentRoute';
import { LOCAL_ACTION } from '@/core/constants';

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
      listeners: ['input', 'click'],
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
   * @param {HTMLElement} {target}
   * @memberof Header
   */
  onClick({ target }) {
    const $el = $(target);
    const actionType = $el.dataAttr().action;

    if (!actionType) return;

    if (actionType === 'delete') this.processor.delete(LOCAL_ACTION.spreadsheet, CurrentRoute.param);
    CurrentRoute.path = '#dashboard';
  }

  /**
   * @description
   * @return {string}
   * @memberof Header
   */
  toHTML() {
    const title = this.store.getState().titleState;

    return `
        <input type="text" class="input" value="${title}" />
        <div>
          <div class="button" data-action="delete">
            <i class="material-icons">delete</i>
          </div>
          <div class="button" data-action="exit">
            <i class="material-icons">exit_to_app</i>
          </div>
        </div>
      `;
  }
}
