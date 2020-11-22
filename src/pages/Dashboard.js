import { fetchStateList } from '@/core/store/createStore';
import { $ } from '@/core/Dom';
import { Page } from '@/core/Page';
import { createDashboard } from './createDashboard.template';

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
  getRoot() {
    const $root = $.create('div', 'db');

    $root.html(createDashboard(fetchStateList()));

    return $root;
  }
}
