import { $ } from '@/core/Dom';
import { Page } from '@/core/Page';
import { createDashboard } from '@/pages/createDashboard.template';
import { LOCAL_ACTION } from '@/core/constants';

/**
 * @description
 * @export
 * @class Dashboard
 * @extends {Page}
 */
export class Dashboard extends Page {
  /**
   *Creates an instance of Dashboard.
   * @memberof Dashboard
   */
  constructor() {
    super();
  }

  /**
   * @description
   * @return {Object}
   * @memberof Dashboard
   */
  async getRoot() {
    const $root = $.create('div', 'db');
    const data = await this.processor.get(LOCAL_ACTION.spreadsheet);

    $root.html(createDashboard(data));

    return $root;
  }
}
