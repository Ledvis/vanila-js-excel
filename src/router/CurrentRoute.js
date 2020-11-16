/**
 * @description
 * @export
 * @class CurrentRoute
 */
export class CurrentRoute {
  /**
   * @description
   * @readonly
   * @static
   * @memberof CurrentRoute
   */
  static get path() {
    return window.location.hash.slice(1);
  }

  /**
   * @description
   * @static
   * @param {String} path
   * @memberof CurrentRoute
   */
  static set path(path) {
    window.location.hash = path;
  }

  /**
   * @description
   * @readonly
   * @static
   * @memberof CurrentRoute
   */
  static get name() {
    return CurrentRoute.path.split('/')[0];
  }

  /**
   * @description
   * @readonly
   * @static
   * @memberof CurrentRoute
   */
  static get param() {
    return CurrentRoute.path.split('/')[1];
  }
}
