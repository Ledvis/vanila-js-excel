import { storage } from '@/core/utils';

export default {
  root: {
    columnsWidthState: storage('columnsWidth') || {},
    rowsHeightState: storage('rowsHeight') || {},
    cellDataState: storage('cellData') || {},
    selectedCellIdState: storage('selectedCellId') || '',
    selectedCellTextState: storage('selectedCellText') || '',
  },
};
