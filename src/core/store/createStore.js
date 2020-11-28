import Observer from '@/core/Observer';
import { clone } from '@/core/utils';

/**
 * @description
 * @export
 * @param {Function} reducer
 * @param {Object.<String, Object>} {id, initialState}
 * @return {Object}
 */
export function createStore(reducer, { id, initialState } = {}) {
  const existedState = JSON.parse(localStorage.getItem(id));
  let state = reducer(existedState ? existedState : initialState);
  const observer = new Observer;

  return {
    subscribe(cb) {
      return observer.on(id, cb);
    },
    dispatch(action) {
      state = reducer(state, action);

      observer.emit(id, state);
    },
    getState() {
      return clone(state);
    },
  };
}
