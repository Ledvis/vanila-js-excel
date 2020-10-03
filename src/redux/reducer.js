import { TABLE_RESIZE, TABLE_CELL } from './types';

export const reducer = (state, action = {}) => {
  let currentResizerState;

  switch (action.type) {
    case TABLE_RESIZE:
      currentResizerState = state[action.moduleName][action.resizer];
      state[action.moduleName][action.resizer] = { };
      state[action.moduleName][action.resizer] = { ...currentResizerState, [action.id]: action.value };

      return { ...state };
    case TABLE_CELL:
      state[action.moduleName].cellDataState[action.id] = action.value;
      state[action.moduleName].selectedCellIdState = action.id;

      return { ...state };
    default:
      return { ...state };
  }
};
