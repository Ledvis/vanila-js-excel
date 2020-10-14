import { TABLE_RESIZE, TABLE_CELL } from './types';
import { clone } from '@/core/utils';

export const reducer = (state, action = {}) => {
  let currentResizerState;

  switch (action.type) {
    case TABLE_RESIZE:
      currentResizerState = state[action.moduleName][action.resizer];
      state[action.moduleName][action.resizer] = { };
      state[action.moduleName][action.resizer] = { ...clone(currentResizerState), [action.id]: action.value };

      return clone(state);
    case TABLE_CELL:
      state[action.moduleName].cellDataState[action.id] = action.value;
      state[action.moduleName].selectedCellTextState = action.value;
      state[action.moduleName].selectedCellIdState = action.id;

      return clone(state);
    default:
      return clone(state);
  }
};
