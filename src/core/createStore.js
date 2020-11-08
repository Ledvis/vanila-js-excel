import Observer from './Observer';
import { clone } from '@/core/utils';

// TODO: refactor into Class
/**
 * @description
 * @export
 * @param {Function} reducer
 * @param {Object.<string, *>} [initialStore={}]
 * @return {Object}
 */
export function createStore(reducer, initialStore = {}) {
  let state = reducer(initialStore);
  const observer = new Observer;

  return {
    subscribe(moduleName, cb) {
      return observer.on(moduleName, cb);
    },
    dispatch(action) {
      state = reducer(state, action);

      if (!('moduleName' in action) || !state) throw new Error(`Invalid ${action.moduleName} action with ${action.type} type`);

      observer.emit(action.moduleName, state);
    },
    getState(moduleName) {
      return moduleName ? clone(state[moduleName]) : clone(state);
    },
  };
}
