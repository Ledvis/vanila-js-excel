import { storage } from '@core/utils';

export default {
  root: {

  },
  table: {
    columnsWidthState: storage('columnsWidth') || {},
    rowsHeightState: storage('rowsHeight') || {},
    cellDataState: storage('cellData') || {},
    selectedCellIdState: storage('selectedCellId') || '',
  },
};
