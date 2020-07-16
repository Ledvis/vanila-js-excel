import Base from '@/core/Base';

/**
 * @description
 * @export
 * @class className
 */
export default class Toolbar extends Base {
  static className = 'excel__toolbar'

  /**
   * @description
   * @return {string}
   * @memberof Toolbar
   */
  toHTML() {
    return `
        <div class="button">
          <i class="material-icons">format_align_left</i>
        </div>
        <div class="button">
          <i class="material-icons">format_align_center</i>
        </div>
        <div class="button">
          <i class="material-icons">format_align_right</i>
        </div>
        <div class="button">
          <i class="material-icons">format_bold</i>
        </div>
        <div class="button">
          <i class="material-icons">format_italic</i>
        </div>
        <div class="button">
          <i class="material-icons">format_underlined</i>
        </div>
      `;
  }
}
