/* eslint-disable require-jsdoc */
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  get storeKeys() {
    return Object.keys(this.store);
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return JSON.stringify(this.store[key]) || null;
  }

  setItem(key, value) {
    this.store[key] = JSON.stringify(value);
  }

  removeItem(key) {
    delete this.store[key];
  }

  get length() {
    return this.storeKeys.length;
  }

  key(index) {
    return this.storeKeys[index];
  }
}

delete window.localStorage;
window.localStorage = new LocalStorageMock();
