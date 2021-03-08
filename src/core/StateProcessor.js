/**
 * This class describes a state processor.
 * @export
 * @class      StateProcessor
 */
export class StateProcessor {
  #client = null;

  /**
   * Creates an instance of StateProcessor. @memberof StateProcessor
   *
   * @method     constructor
   * @param      {Object}  client  The client
   */
  constructor(client) {
    this.#client = client;
    this.save = this.save.bind(this);
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * { function_description }
   *
   * @method     save
   * @param      {Object}  state   The state
   */
  save(state) {
    this.#client.save(state);
  }

  /**
   * { property_description }
   *
   * @method     get
   * @param      {String}  type    The type
   * @return     {Object}  (description_of_the_return_value)
   */
  get(type) {
    return this.#client.get(type);
  }

  /**
   * { property_description }
   *
   * @method     delete
   * @param      {String}  type    The type
   * @return     {Any}
   */
  delete(type, ...args) {
    return this.#client.delete(type, ...args);
  }
}
