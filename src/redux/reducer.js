import { TABLE_RESIZE, TABLE_CELL, TABLE_STYLE, CUSTOM_STYLES, HEADER_TITLE } from './types';
import { clone } from '@/core/utils';

export const reducer = (state, action = {}) => {
  let currentResizerState;

  switch (action.type) {
    case TABLE_RESIZE:
      currentResizerState = state[action.moduleName][action.resizer];
      state[action.moduleName][action.resizer] = { ...clone(currentResizerState), [action.id]: action.value };

      return clone(state);
    case TABLE_CELL:
      state[action.moduleName].cellDataState[action.id] = action.value;
      state[action.moduleName].selectedCellTextState = action.value;
      state[action.moduleName].selectedCellIdState = action.id;

      return clone(state);
    case TABLE_STYLE:
      state[action.moduleName].selectedCellStyleState = {
        ...state[action.moduleName].selectedCellStyleState,
        ...action.styles,
      };

      return clone(state);
    case CUSTOM_STYLES:
      if (Array.isArray(action.id)) {
        state[action.moduleName].customCellStyleState = action.id.reduce((acc, _id) => {
          acc[_id] = { ...state[action.moduleName].customCellStyleState[_id], ...action.styles };
          return acc;
        }, {});
      } else {
        state[action.moduleName].customCellStyleState[action.id] = {
          ...state[action.moduleName].customCellStyleState[action.id],
          ...action.styles,
        };
      }

      return clone(state);
    case HEADER_TITLE:
      state[action.moduleName].titleState = action.value;

      return clone(state);
    default:
      return clone(state);
  }
};
