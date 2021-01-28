import { createStore } from '@/core/store/createStore';
import { reducer } from '@/redux/reducer';
import { TABLE_CELL } from '@/redux/types';

const mockEmit = jest.fn();
const mockOn = jest.fn();

jest.mock('@/core/Observer.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      emit: mockEmit,
      on: mockOn,
    };
  });
});

describe('createStore', () => {
  beforeEach(() => {
    localStorage.store = {};
  });

  const mockInitialState = {
    id: 'spreadsheet:1605638074751',
    initialState: {
      columnsWidthState: {},
      rowsHeightState: {},
      cellDataState: {},
      selectedCellIdState: '',
      selectedCellTextState: '',
      selectedCellStyleState: {},
      customCellStyleState: {},
      titleState: {},
      modifiedState: 'spreadsheet:1605638074751',
    },
  };

  it('should initialize store object with methods', () => {
    const store = createStore(reducer, mockInitialState);

    expect(store).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.getState).toBeDefined();
  });

  it('should return state object IF store is empty', () => {
    const store = createStore(reducer, mockInitialState);

    expect(store.getState()).toEqual(mockInitialState.initialState);
  });

  it('should return state object IF store has state', () => {
    const mockLocalStore = {
      'spreadsheet:1605638074751': {
        columnsWidthState: {},
        rowsHeightState: {},
        cellDataState: {
          '0:0': '',
        },
        modifiedState: 1605813572822,
      },
    };

    localStorage.store = mockLocalStore;
    const store = createStore(reducer, mockInitialState);

    expect(store.getState()).toEqual(mockLocalStore['spreadsheet:1605638074751']);
  });

  it('should emit updated state', () => {
    const mockValidAction = {
      type: TABLE_CELL,
      id: 'some id',
      value: 'some value',
    };
    const mockStorageState = {
      ...mockInitialState.initialState,
      ...{
        cellDataState: {
          [mockValidAction.id]: mockValidAction.value,
        },
        selectedCellTextState: mockValidAction.value,
        selectedCellIdState: mockValidAction.id,
      },
    };

    const store = createStore(reducer, mockInitialState);
    store.dispatch(mockValidAction);

    expect(mockEmit).toHaveBeenCalledWith(mockInitialState.id, mockStorageState);
    expect(store.getState()).toEqual(mockStorageState);
  });

  it('should subscribe for event', () => {
    const store = createStore(reducer, mockInitialState);
    const mockCb = () => ({});

    store.subscribe(mockCb);

    expect(mockOn).toHaveBeenCalledWith(mockInitialState.id, mockCb);
  });
});
