import Observer from '@/core/Observer';
import { clone } from '@/core/utils';

/**
 * @description
 * @return {Array}
 * @export
 */
export function fetchStateList() {
  const states = [];

  for (let index = 0; index < localStorage.length; index++) {
    const stateKey = localStorage.key(index);

    if (stateKey.includes('spreadsheet')) {
      const created = JSON.parse(stateKey.split(':')[1]);
      const modified = JSON.parse(localStorage.getItem(stateKey)).modifiedState;

      states.push({
        created,
        modified,
      });
    }
  }

  return states;
}

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

      if (!state) throw new Error(`Invalid action with ${action.type} type`);

      observer.emit(id, state);
    },
    getState() {
      return clone(state);
    },
  };
}
