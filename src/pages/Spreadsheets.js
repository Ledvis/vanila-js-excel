import { Page } from '@/core/Page';
import Excel from '@/components/excel/Excel';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';
import { createStore } from '@/core/store/createStore';
import { reducer } from '@/redux/reducer';
import { debounce, storage } from '@/core/utils';
import initialState from '@/redux/state';
import { CurrentRoute } from '@/router/CurrentRoute';
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

    const id = 'spreadsheet:' + CurrentRoute.param;
    const store = createStore(reducer, { id, initialState });

    const storeListener = debounce((state) => {
      storage(id, state);
    }, 300);

    store.subscribe(storeListener);
    store.dispatch(updateDate({
      id,
      value: Date.now(),
    }));

    this.child = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store: store,
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
