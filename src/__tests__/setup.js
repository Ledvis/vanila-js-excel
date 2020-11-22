/* eslint-disable require-jsdoc */

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

delete window.localStorage;
window.localStorage = new LocalStorageMock;

// delete window.localStorage;
// window.localStorage = { getItem: jest.fn().mockReturnValue(JSON.stringify(mockStorageState)) };
