import { StateProcessor } from '@/core/StateProcessor';
import { LocalClient } from '@/core/clients/LocalClient';
import { createStore } from '@/core/store/createStore';
import { reducer } from '@/redux/reducer';
import initialState from '@/redux/state';
import { CurrentRoute } from '@/router/CurrentRoute';
import { LOCAL_ACTION } from '@/core/constants';

/**
 * @description
 * @export
 * @class Page
 */
export class Page {
  #unsubscribeFn = null;

  /** */
  constructor() {
    const id = `${LOCAL_ACTION.spreadsheet}:${(CurrentRoute.param || Date.now())}`;

    this.processor = new StateProcessor(new LocalClient(id));
    this.store = createStore(reducer, { id, initialState });
    this.#unsubscribeFn = this.store.subscribe(this.processor.save);
  }

  /**
   * @description
   * @memberof Page
   */
  getRoot() {
    throw new Error('getRoot method should be provided!');
  }

  /**
   * @description
   * @memberof Page
   */
  mounted() {
    this.child?.mounted();
  }

  /**
   * @description
   * @memberof Page
   */
  destroyed() {
    this.#unsubscribeFn();
    this.child?.destroyed();
  }
}
