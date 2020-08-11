import Base from '@/core/Base';
import { createTable } from '@/components/table/createTable.template';
import resizeHandler from '@/components/table/resizeHandler';

/**
 * @description
 * @export
 * @class className
 */
export default class Table extends Base {
  /**
   *Creates an instance of Table.
   * @param {*} root
   * @memberof Table
   */
  constructor(root) {
    super(root, {
      listeners: ['mousedown'],
      name: 'Table',
    });
  }

  static className = 'excel__table'

  /**
   * @description
   * @param {Event} event
   * @memberof Table
   */
  onMousedown(event) {
    if (event.target.dataset.resizer) {
      resizeHandler(this.$root, event);
    }
  }


  /**
   * @description
   * @return {string}
   * @memberof Table
   */
  toHTML() {
    return createTable();
  }
}
