import { $ } from '@/core/Dom';
import { Page } from '@/core/Page';
import { createDashboard } from '@/pages/createDashboard.template';
import { LOCAL_ACTION } from '@/core/constants';
import { CurrentRoute } from '@/router/CurrentRoute';

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
   * Creates a new spreadsheet.
   *
   * @method     createNewSpreadsheet
   */
  createNewSpreadsheet() {
    CurrentRoute.path = `#spreadsheets/${Date.now()}`;
  }

  /**
   * { function_description }
   *
   * @method     handleTableListLinks
   */
  handleNewTableButtonClick() {
    this.$root.find('.db__create').el.onclick = this.createNewSpreadsheet;
  }

  /**
   * @description
   * @return {Object}
   * @memberof Dashboard
   */
  async getRoot() {
    this.$root = $.create('div', 'db');
    const data = await this.processor.get(LOCAL_ACTION.spreadsheet);

    this.$root.html(createDashboard(data));
    this.handleNewTableButtonClick();

    return this.$root;
  }
}
