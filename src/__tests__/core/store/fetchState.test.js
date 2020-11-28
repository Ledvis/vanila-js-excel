import { fetchStateEntries } from "@/core/store/fetchState";

describe('fetchState', () => {
  it('should return spreadsheet valid entry IF existed', () => {
    const mockStore = {
      'spreadsheet:1605638074751': {
        "modifiedState":1605813572822
      }
    }
    const expectedResult = {
      created: 1605638074751,
      modified: 1605813572822
    }

    localStorage.store = mockStore;
    const result = fetchStateEntries();

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(expectedResult);
  });
});