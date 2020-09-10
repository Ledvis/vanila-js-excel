/**
 * @description
 * @export
 * @class Observer
 */
export default class Observer {
  /**
   *Creates an instance of Observer.
   * @memberof Observer
   */
  constructor() {
    this.events = {};
  }

  /**
   * @description
   * @param {String} eventName
   * @param {Array} args
   * @memberof Observer
   */
  emit(eventName, args) {
    if (!Array.isArray(this.events[eventName])) return;

    this.events[eventName].forEach((cb) => cb(...args));
  }

  /**
   * @description
   * @param {String} eventName
   * @param {Function} cb
   * @return {Function}
   * @memberof Observer
   */
  on(eventName, cb) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(cb);

    return () => {
      this.events[eventName] = this.events[eventName].filter((_cb) => _cb !== cb);
    };
  }
}
