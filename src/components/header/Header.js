import Base from '@/core/Base';

/**
 * @description
 * @export
 * @class Header
 */
export default class Header extends Base {
  static className = 'excel__header'

  /**
   * @description
   * @return {string}
   * @memberof Header
   */
  toHTML() {
    return `
        <input type="text" class="input" value="Новая таблица" />
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
