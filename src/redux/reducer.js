import { TABLE_RESIZE, TABLE_CELL, TABLE_STYLE, CUSTOM_STYLES, HEADER_TITLE } from './types';
import { clone } from '@/core/utils';

export const reducer = (state, action = {}) => {
  let currentResizerState;

  switch (action.type) {
    case TABLE_RESIZE:
      currentResizerState = state[action.resizer];
      state[action.resizer] = { ...clone(currentResizerState), [action.id]: action.value };

      return clone(state);
    case TABLE_CELL:
      state.cellDataState[action.id] = action.value;
      state.selectedCellTextState = action.value;
      state.selectedCellIdState = action.id;

      return clone(state);
    case TABLE_STYLE:
      state.selectedCellStyleState = {
        ...state.selectedCellStyleState,
        ...action.styles,
      };

      return clone(state);
    case CUSTOM_STYLES:
      if (Array.isArray(action.id)) {
        state.customCellStyleState = action.id.reduce((acc, _id) => {
          acc[_id] = { ...state.customCellStyleState[_id], ...action.styles };
          return acc;
        }, {});
      } else {
        state.customCellStyleState[action.id] = {
          ...state.customCellStyleState[action.id],
          ...action.styles,
        };
      }

      return clone(state);
    case HEADER_TITLE:
      state.titleState = action.value;

      return clone(state);
    default:
      return clone(state);
  }
};
