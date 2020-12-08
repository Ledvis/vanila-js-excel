import { Page } from '@/core/Page';
import Excel from '@/components/excel/Excel';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';
import { updateDate } from '@/redux/actions';

/**
 * @description
 * @export
 * @class Spreadsheets
 * @extends {Page}
 */
export class Spreadsheets extends Page {
  /**
   *Creates an instance of Spreadsheets.
   * @memberof Spreadsheets
   */
  constructor() {
    super();

    this.store.dispatch(updateDate({
      value: Date.now(),
    }));

    this.child = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store: this.store,
      processor: this.processor,
    });
  }

  /**
   * @description
   * @return {Function}
   * @memberof Spreadsheets
   */
  getRoot() {
    return this.child.getRoot();
  }
}
