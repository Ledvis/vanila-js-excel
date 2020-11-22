import { createStore } from '@/core/store/createStore';
import { TABLE_CELL } from '../../../redux/types';

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
  let store;
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
  const mockReducer = (state) => jest.fn().mockReturnValue(state);

  beforeAll(() => {
    store = createStore(mockReducer(mockInitialState.initialState), mockInitialState);
  });

  it('should initialize store object with methods', () => {
    expect(store).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.getState).toBeDefined();
  });

  it('should return state object equal to initial state IF no state exists already', () => {
    expect(store.getState()).toEqual(mockInitialState.initialState);
  });

  it('should return state object equal to state from localStorage IF state already exists', () => {
    const mockStorageState = { ...mockInitialState.initialState, selectedCellIdState: '3:3' };

    store = createStore(mockReducer(mockStorageState), mockInitialState);

    expect(store.getState()).toEqual(mockStorageState);
  });

  it('should emit updated state', () => {
    const mockStorageState = { ...mockInitialState.initialState, selectedCellIdState: '1:1' };
    const mockValidAction = {
      type: TABLE_CELL,
      id: 'some id',
      value: 'some value',
    };

    store = createStore(mockReducer(mockStorageState), mockInitialState);
    store.dispatch(mockValidAction);

    expect(mockEmit).toHaveBeenCalledWith(mockInitialState.id, mockStorageState);
  });

  it('should throw error if NO state provided', () => {
    const mockValidAction = {
      type: 'invalid type',
      id: 'some id',
      value: 'some value',
    };

    store = createStore(mockReducer(null), mockInitialState);

    expect(() => {
      store.dispatch(mockValidAction);
    }).toThrow(`Invalid action with ${mockValidAction.type} type`);
  });

  it('should subscribe for event', () => {
    const mockCb = () => ({});

    store.subscribe(mockCb);

    expect(mockOn).toHaveBeenCalledWith(mockInitialState.id, mockCb);
  });
});
