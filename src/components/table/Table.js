import Base from '@/core/Base';
import { createTable } from './createTable.template';

/**
 * @description
 * @export
 * @class className
 */
export default class Table extends Base {
  static className = 'excel__table'

  /**
   * @description
   * @return {string}
   * @memberof Table
   */
  toHTML() {
    return createTable();
  }
}
