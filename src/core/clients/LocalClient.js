import { debounce, storage } from '@/core/utils';
import { LOCAL_ACTION } from '@/core/constants';

/**
 * This class describes a local client.
 *
 * @class      LocalClient
 * @param      {Number} id
 */
export class LocalClient {
  /**
   * Creates an instance of LocalClient.
   *
   * @method     constructor
   * @param      {String}  id      The identifier
   */
  constructor(id) {
    this.id = id;
    this.save = debounce(this.saveLocaly.bind(this), 300);
    this.get = (type) => this.getLocaly.call(this, type);
    this.delete = (type, ...args) => this.deleteLocaly.call(this, type, ...args);
  }

  /**
   * { function_description }
   *
   * @method     save
   * @param      {Any}  data    The data
   */
  saveLocaly(data) {
    storage(this.id, data);
  }

  /**
   * { property_description }
   *
   * @method     get
   * @param      {String} action
   * @return {Object}
   */
  getLocaly(action) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        switch (action) {
          case LOCAL_ACTION.spreadsheet:
            return resolve(this.#fetchSpreadshitList());
          default:
            reject(new Error('GET method is not defined'));
        }
      }, 1000);
    });
  }

  /**
   * { function_description }
   *
   * @method     deleteLocaly
   * @param      {String} action
   * @param      {Number} id
   * @return     {Promise}  (description_of_the_return_value)
   */
  deleteLocaly(action, id) {
    switch (action) {
      case LOCAL_ACTION.spreadsheet:
        return this.#removeSpreadsheet(id);
      default:
        throw new Error('DELETE method is not defined');
    }
  }

  #fetchSpreadshitList = () => {
    const states = [];

    for (let index = 0; index < localStorage.length; index++) {
      const stateKey = localStorage.key(index);

      if (stateKey.includes(LOCAL_ACTION.spreadsheet)) {
        const created = JSON.parse(stateKey.split(':')[1]);
        const { modifiedState: modified, titleState: title } = storage(stateKey);

        states.push({
          title,
          created,
          modified,
        });
      }
    }

    return states;
  }

  #removeSpreadsheet = (id) => {
    localStorage.removeItem(`spreadsheet:${id}`);
  }
}
