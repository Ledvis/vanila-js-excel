import Observer from './Observer';

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

      observer.emit(action.moduleName, state);
    },
    getState(moduleName) {
      return moduleName ? state[moduleName] : state;
    },
  };
}

// TODO: refactor into Class
