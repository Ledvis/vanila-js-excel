import { DEFAULT_HEADER_TITLE, DEFAULT_TOOLBAR_STYLES } from '@/core/constants';
import { storage } from '@/core/utils';

export default {
  columnsWidthState: storage('columnsWidth') || {},
  rowsHeightState: storage('rowsHeight') || {},
  cellDataState: storage('cellData') || {},
  selectedCellIdState: storage('selectedCellId') || '',
  selectedCellTextState: storage('selectedCellText') || '',
  selectedCellStyleState: storage('selectedCellStyle') || DEFAULT_TOOLBAR_STYLES,
  customCellStyleState: storage('customCellStyle') || {},
  titleState: storage('title') || DEFAULT_HEADER_TITLE,
  modifiedState: storage('modified') || Date.now(),
};
