import '@/scss/index.scss';
import Excel from '@/components/excel/Excel';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';
import { createStore } from '@/core/createStore';
import { reducer } from '@/redux/reducer';
import { storage } from '@/core/utils';
import initialState from '@/redux/state';

const store = createStore(reducer, initialState);

store.subscribe('root', ({ root }) => {
  storage('columnsWidth', root.columnsWidthState);
  storage('rowsHeight', root.rowsHeightState);
  storage('cellData', root.cellDataState);
  storage('selectedCellId', root.selectedCellIdState);
  storage('selectedCellText', root.selectedCellTextState);
});

window.store = store;

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
