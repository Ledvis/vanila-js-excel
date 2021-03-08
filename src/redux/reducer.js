import { TABLE_RESIZE, TABLE_CELL, TABLE_STYLE, CUSTOM_STYLES, HEADER_TITLE, MODIFIED_TABLE } from '@/redux/types';
import { clone } from '@/core/utils';

export const reducer = (state, action = {}) => {
  switch (action.type) {
    case TABLE_RESIZE:
      state[action.resizer] = { ...clone(state[action.resizer]), [action.id]: action.value };

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
    case MODIFIED_TABLE:
      state.modifiedState = action.value;

      return clone(state);
    default:
      return clone(state);
  }
};
